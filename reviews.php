<?php
/**
 * Google Places API (New) proxy for the HandyTech review page.
 *
 * The API key never leaves the server: the browser calls this endpoint, this
 * endpoint calls Google. That means the key is not in the page source, not in
 * View Source of the published site, and not in a screenshot.
 *
 * Usage:  GET /reviews.php   ->  JSON
 *
 * Response shape:
 *   { ok: true,  cached: bool, stale: bool, data: { ... } }
 *   { ok: false, reason: 'not-configured' | 'upstream-error' | 'bad-response' }
 *
 * The endpoint always answers 200 with ok:false when it cannot reach Google,
 * so a billing lapse or an expired key degrades the page to "no reviews"
 * instead of throwing a visible error at visitors.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
// The browser must not cache; freshness is governed by the server-side cache.
header('Cache-Control: no-store');

/**
 * @param array<string,mixed> $payload
 */
function respond(array $payload): void
{
    http_response_code(200);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

// ---------------------------------------------------------------- config ---
$configFile = __DIR__ . '/reviews-config.php';
$config     = is_file($configFile) ? require $configFile : [];
if (!is_array($config)) {
    $config = [];
}

$apiKey   = trim((string) ($config['api_key'] ?? ''));
$placeId  = trim((string) ($config['place_id'] ?? ''));
$apiBase  = rtrim((string) ($config['api_base'] ?? 'https://places.googleapis.com/v1/places/'), '/') . '/';
$language = trim((string) ($config['language'] ?? 'en'));

// Seconds. 0 disables the disk cache entirely (fetch on every request).
$cacheTtl = max(0, (int) ($config['cache_ttl'] ?? 900));

$cacheDir  = __DIR__ . '/reviews-cache';
$cacheFile = $cacheDir . '/reviews.json';

if ($apiKey === '' || $placeId === '') {
    respond(['ok' => false, 'reason' => 'not-configured']);
}

// ----------------------------------------------------------------- cache ---
$cached = null;
if (is_file($cacheFile)) {
    $raw = @file_get_contents($cacheFile);
    if ($raw !== false) {
        $decoded = json_decode($raw, true);
        if (is_array($decoded) && isset($decoded['fetchedAt'], $decoded['data'])) {
            $cached = $decoded;
        }
    }
}

if ($cached !== null && $cacheTtl > 0 && (time() - (int) $cached['fetchedAt']) < $cacheTtl) {
    respond(['ok' => true, 'cached' => true, 'stale' => false, 'data' => $cached['data']]);
}

// ----------------------------------------------------------------- fetch ---
// Field mask is mandatory for Place Details (New); requesting fewer fields
// keeps the Atmosphere/Enterprise SKU bill down.
$fields = 'id,displayName,rating,userRatingCount,reviews,googleMapsUri';

$url = $apiBase . rawurlencode($placeId)
    . '?fields=' . rawurlencode($fields)
    . '&reviews_sort=newest'
    . '&languageCode=' . rawurlencode($language);

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER     => [
        'X-Goog-Api-Key: ' . $apiKey,
        'X-Goog-FieldMask: ' . $fields,
    ],
    CURLOPT_TIMEOUT        => 12,
    CURLOPT_CONNECTTIMEOUT => 6,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_USERAGENT      => 'HandyTech.sg review widget',
]);

$body   = curl_exec($ch);
$status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($body === false || $status >= 400) {
    // Prefer a stale copy over showing nothing.
    if ($cached !== null) {
        respond(['ok' => true, 'cached' => true, 'stale' => true, 'data' => $cached['data']]);
    }
    respond(['ok' => false, 'reason' => 'upstream-error', 'status' => $status]);
}

$json = json_decode((string) $body, true);
if (!is_array($json) || !isset($json['reviews']) || !is_array($json['reviews'])) {
    if ($cached !== null) {
        respond(['ok' => true, 'cached' => true, 'stale' => true, 'data' => $cached['data']]);
    }
    respond(['ok' => false, 'reason' => 'bad-response', 'status' => $status]);
}

// ------------------------------------------------------------- normalise ---
$reviews = [];
foreach ($json['reviews'] as $review) {
    if (!is_array($review)) {
        continue;
    }
    $attribution = isset($review['authorAttribution']) && is_array($review['authorAttribution'])
        ? $review['authorAttribution']
        : [];

    $reviews[] = [
        'author' => (string) ($attribution['displayName'] ?? ''),
        'avatar' => (string) ($attribution['photoURI'] ?? ''),
        'uri'    => (string) ($attribution['uri'] ?? ''),
        'rating' => (int) ($review['rating'] ?? 0),
        'text'   => (string) ($review['text'] ?? ''),
        'when'   => (string) ($review['relativePublishTimeDescription'] ?? ''),
        'date'   => (string) ($review['publishTime'] ?? ''),
    ];
}

$data = [
    'placeName'  => (string) ($json['displayName']['text'] ?? ''),
    'rating'     => (float) ($json['rating'] ?? 0),
    'totalCount' => (int) ($json['userRatingCount'] ?? 0),
    'mapsUri'    => (string) ($json['googleMapsUri'] ?? ''),
    'reviews'    => $reviews,
];

if ($cacheTtl > 0) {
    if (!is_dir($cacheDir)) {
        @mkdir($cacheDir, 0755, true);
    }
    @file_put_contents(
        $cacheFile,
        (string) json_encode(['fetchedAt' => time(), 'data' => $data], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
        LOCK_EX
    );
}

respond(['ok' => true, 'cached' => false, 'stale' => false, 'data' => $data]);
