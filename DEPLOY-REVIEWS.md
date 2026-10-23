# Going live with live Google reviews

Step-by-step deployment guide for the HandyTech review page.

---

## Read this first: one correction to the key restrictions

Because `reviews.php` calls Google **from the server**, this is a **web service key**, not a browser key.

- ✅ **Restrict by IP address** (your server's IP) — this is what Google recommends for web service keys
- ❌ **Do NOT restrict by website / HTTP referrer** — server-side API calls don't send a `Referer` header, so the API will reject the key with `PERMISSION_DENIED` even though the key looks correctly configured

Referrer restrictions are only for keys used in browser JavaScript. We deliberately did *not* use that approach, so the key never appears in your page source.

You also need **both** restriction types: one application restriction (IP) *and* one API restriction (Places API (New)).

---

## What you need before you start

| Item | Value / how to get it |
|---|---|
| Google account | Any Gmail will do |
| Your server's public IP | `147.93.78.237` (verify with `nslookup handytech.sg` from your own machine) |
| Your Place ID | `ChIJv_M9fgiM2C0R7PzCnGIapNU` — already filled in for you |
| Credit card | Required to link a billing account (free tier covers you) |

---

## Part 1 — Create the Google Cloud project

1. Go to <https://console.cloud.google.com/projectcreate>
2. **Project name:** `HandyTech Reviews`
3. **Location:** pick the region closest to your visitors — `asia-southeast1 (Singapore)` if available
4. Click **Create**
5. When the project is created, make sure the project selector (top bar) shows **HandyTech Reviews**

> Tip: you may be asked to pick a organisation. Choose your own personal account if you don't have one — a personal project is fine for this.

---

## Part 2 — Link a billing account

This is the step people skip, and it's the cause of most "it doesn't work" reports.

1. Open the **Billing** menu in the Cloud console sidebar → **Link project to account** (or go to <https://console.cloud.google.com/billing>)
2. Click **Create billing account** if you don't have one
   - Country: **Singapore**
   - Enter your details and a payment method
   - Google's free monthly usage means you should not actually be charged
3. **Attach** your new billing account to the **HandyTech Reviews** project — the project picker at the top of the Billing page
4. Confirm the project shows a billing account next to it

---

## Part 3 — Enable the Places API (New)

1. Go to <https://console.cloud.google.com/apis/library>
2. Make sure **HandyTech Reviews** is the selected project in the top bar
3. Search for **Places API (New)**
4. Click it → **Enable**
5. Repeat for **Places API (New)** only — you do *not* need the legacy "Places API"

> If you can't find "Places API (New)", try the direct link and substitute your project ID:
> `https://console.cloud.google.com/apis/library/places.googleapis.com?project=YOUR_PROJECT_ID`

---

## Part 4 — Create the API key

1. Go to <https://console.cloud.google.com/google/maps-apis/credentials>
2. Make sure **HandyTech Reviews** is selected
3. Click **Create credentials** → **API key**
4. The key appears. Click **Edit API key** (or just note the string — it starts `AIza...`)

### 4a. Application restriction

- **Set an application restriction** → choose **IP addresses**
- Click **+ Add**
- Enter: `147.93.78.237`
  - If your host has multiple IPs, add each one
  - If your host's IP changes (some shared hosts do), either skip the IP restriction or use a broader CIDR such as `147.93.78.0/24`. A wrong IP here means the API rejects every request.

### 4b. API restriction

- Under **API restrictions**, select **Restrict key**
- Click **Select APIs**
- Choose **Places API (New)**
  - If it isn't in the list, you haven't enabled the API yet — go back to Part 3
- Leave everything else off

### 4c. Save

Click **Save**. Restrictions take effect within a few minutes.

---

## Part 5 — Test the key before you deploy anything

Do this on your own machine first. It takes 30 seconds and saves a lot of debugging later.

Open PowerShell and run:

```powershell
$key = 'PASTE_YOUR_KEY_HERE'
$curl = (Get-Command curl.exe).Source
& $curl -s -H "X-Goog-Api-Key: $key" `
  -H "X-Goog-FieldMask: id,displayName,rating,userRatingCount,reviews" `
  "https://places.googleapis.com/v1/places/ChIJv_M9fgiM2C0R7PzCnGIapNU?reviews_sort=newest"
```

### What a good response looks like

```json
{
  "id": "ChIJv_M9fgiM2C0R7PzCnGIapNU",
  "displayName": { "text": "URBAN BUILD & ELECTRICAL SOLUTION PTE. LTD." },
  "rating": 4.9,
  "userRatingCount": 37,
  "reviews": [ { "authorAttribution": { "displayName": "..." }, "rating": 5, "text": "..." } ]
}
```

### Common errors

| Error message | Cause | Fix |
|---|---|---|
| `API key not valid` | Key pasted wrong, or restrictions saved but not yet propagated | Re-copy the key, wait 5 minutes |
| `PERMISSION_DENIED` … `service not enabled` | Places API (New) not enabled on the project | Part 3 |
| `PERMISSION_DENIED` … `You must enable Billing` | Billing not linked to the project | Part 2 |
| `PERMISSION_DENIED` … `request from this IP not allowed` | IP restriction doesn't match your current IP | Run the test from the server, or fix the IP in Part 4a |
| `"reviews": []` | No reviews on the listing yet | Normal — the page hides itself, no error |

> **Important:** the test in Part 5 runs from *your* machine, not the server. If you set an IP restriction for `147.93.78.237` and your home IP is different, this test will fail with an IP error even though everything is correct. To test properly, run the same command **on the server** via SSH, or temporarily leave the IP restriction off, test, then add it back.

---

## Part 6 — Add the key to the project

Open `reviews-config.php` and paste your key:

```php
return [
    'api_key'   => 'AIzaSy...your-key...',
    'place_id'  => 'ChIJv_M9fgiM2C0R7PzCnGIapNU',
    'cache_ttl' => 900,
    'language'  => 'en',
    'api_base'  => 'https://places.googleapis.com/v1/places/',
];
```

### About the cache

`cache_ttl` is in seconds:

| Value | Behaviour |
|---|---|
| `900` (default) | Cached 15 minutes. New reviews appear within 15 min. |
| `3600` | Cached 1 hour. Cheaper, slower to update. |
| `0` | **No cache at all** — every visitor triggers a fresh API call |

Google's terms restrict caching Places content. The strictest reading says don't store it, so `0` is the safest option if you want to be unambiguous. Given cost isn't a concern for you, `0` is a perfectly reasonable choice.

### The key file is deliberately not in git

`reviews-config.php` is listed in `.gitignore` and blocked from web access by `.htaccess`. **Never commit it**, and upload it to the server separately from your other files.

---

## Part 7 — Deploy

Upload these files to your web root (`handytech.sg`):

| File | In git? | Notes |
|---|---|---|
| `reviews.php` | ✅ yes | The proxy endpoint |
| `reviews.js` | ✅ yes | The renderer |
| `review.html` | ✅ yes | The review page |
| `inner.css` | ✅ yes | Card styles (already contains them) |
| `.htaccess` | ✅ yes | Already contains the 403 rules |
| `reviews-config.php` | ❌ **no** | **Upload manually** |

Then make sure the server can write the cache directory:

```bash
mkdir -p reviews-cache
chmod 755 reviews-cache
chown -R YOUR_USER:YOUR_USER reviews-cache
```

If PHP can't write the cache, the endpoint still works — it just fetches on every request. So this is not fatal, but you'll want it right.

### Verify the protection is live

```powershell
& $curl -s -o NUL -w "config: %{http_code}`n" "https://handytech.sg/reviews-config.php"   # want 403
& $curl -s -o NUL -w "cache:  %{http_code}`n" "https://handytech.sg/reviews-cache/reviews.json"  # want 403
```

If either returns 200, the `.htaccess` rules aren't applying — check that `AllowOverride All` is set for the directory.

---

## Part 8 — Verify on the live site

1. **Open** <https://handytech.sg/review>
2. The live section should appear between the two "Write a review / Read on Google" cards and the "What you can expect" checklist, showing your real rating, review count, and up to 5 review cards
3. **Check the endpoint directly:** <https://handytech.sg/reviews.php>

```json
{"ok":true,"cached":false,"stale":false,"data":{"placeName":"...","rating":4.9,"totalCount":37,"reviews":[...]}}
```

| `reason` | Meaning | Fix |
|---|---|---|
| `not-configured` | The key didn't make it into `reviews-config.php` | Part 6 |
| `upstream-error` | Google rejected the request | Check the error in Part 5 |
| `bad-response` | Google replied but without a `reviews` field | Check the API is enabled |

### If the section is missing but `/reviews.php` says `"ok":true`

The section hides itself when the endpoint fails. Open the browser console (F12) — a `404` on `reviews.php` means the file isn't uploaded; a CORS error means `reviews.php` is running on a different domain.

---

## Part 9 — Check the "260+ Happy customers" stat

Your homepage claims **260+ happy customers**. The live widget shows Google's real `userRatingCount`.

If those two numbers disagree, you'll have both on the same page, which looks careless. Decide which is true and make the other match. The widget's number is the one Google controls and can be verified by anyone.

---

## Part 10 — Keeping it running

### Watching usage

Google Cloud console → **APIs & Services** → **Usage** shows request volume per API.

At a 15-minute cache, that's ~96 requests/day — roughly 2,900/month, well inside the free Places API (New) allowance. With `cache_ttl = 0` and 500 visitors/day, it's ~15,000/month, still fine.

### Setting a spending alert

Console → **Billing** → **Budgets & alerts** → create a budget with a notification threshold. Google won't cap your spending automatically, but it will email you.

### Rotating the key

1. Console → **APIs & Services** → **Credentials**
2. Click the key → **Rotate key** → **Create**
3. Put the new key in `reviews-config.php` and upload it
4. Confirm `/reviews.php` returns `"ok":true`
5. Only then delete the old key

### If the key leaks

Delete it in the console immediately — deletion takes a few minutes to propagate. Then create a new one and follow the rotation steps. Because the key is IP-restricted *and* API-restricted, a leak from outside your server is harmless, but delete it anyway.

---

## Part 11 — Security checklist

- [ ] Key restricted to **IP addresses** (`147.93.78.237`)
- [ ] Key restricted to **Places API (New)** only
- [ ] Key never committed to git
- [ ] `reviews-config.php` returns 403 over HTTP
- [ ] `reviews-cache/` returns 403 over HTTP
- [ ] Key does not appear anywhere in the page source
- [ ] Spending alert configured

---

## Appendix A — Which files are new

| File | Purpose |
|---|---|
| `reviews.php` | Server-side proxy: holds the key, calls Google, caches, returns JSON |
| `reviews.js` | Renders review cards, star ratings, author attribution |
| `reviews-config.php` | The key + Place ID + cache settings (gitignored) |
| `.gitignore` | Excludes the config and cache from git |

The API key never reaches the browser. The page calls `reviews.php`, `reviews.php` calls Google.

---

## Appendix B — How it works

```
Visitor loads /review
        │
        ▼
  reviews.js  ──GET──▶  reviews.php          (same origin, key not exposed)
                              │
                    cache fresh? ──yes──▶ return cached JSON
                              │ no
                              ▼
                    GET places.googleapis.com
                    X-Goog-Api-Key: <server-side key>
                    X-Goog-FieldMask: id,displayName,rating,
                                      userRatingCount,reviews,googleMapsUri
                    ?reviews_sort=newest
                              │
                              ▼
                    write cache, return JSON
```

Google returns a maximum of 5 reviews per request. `reviews_sort=newest` puts the most recent first.

---

## Appendix C — Google policy notes

The implementation follows Google's Places API rules:

- **Attribution** — the "Reviews shown are owned by Google" line is always displayed, and every review credits its author with a link to their Google Maps profile
- **Author attribution** — author name and avatar are rendered for each review
- **Not edited** — review text is displayed exactly as returned
- **Referral tracking** — links to Google Maps include the `google_maps_utm` parameters
- **Referrer link** — the "Read them on Google" link points to your listing
