# Render Dashboard - Rewrite Rules to Create

## ✅ Required: One Catch-All Rule

In Render Dashboard → Settings → Redirects/Rewrites, add **ONE rule**:

### Rewrite Rule #1 (Required)
- **Source Path:** `/*`
- **Destination Path:** `/index.html`
- **Action/Type:** **Rewrite** (NOT Redirect!)
- **Status Code:** 200 (if option available)

This single rule will handle ALL routes including:
- `/websites`
- `/about`
- `/infraaiops`
- `/services`
- `/contact`
- `/missedcalltextback`
- `/blog`
- `/blog/*` (all blog posts)
- `/privacy-policy`
- `/terms-of-service`

## Why Only One Rule?

The `/*` pattern matches **everything**, so you don't need individual rules for each route. React Router will handle the routing once `index.html` loads.

## Step-by-Step in Render Dashboard

1. **Go to:** Render Dashboard → Your Service → **Settings**
2. **Find:** "Redirects/Rewrites" section
3. **Click:** "Add a Redirect or Rewrite Rule"
4. **Fill in:**
   ```
   Source Path: /*
   Destination Path: /index.html
   Action: Rewrite
   ```
5. **Save**
6. **Redeploy** (Manual Deploy → Deploy latest commit)

## Optional: Specific Rules (Not Required)

If for some reason the catch-all doesn't work, you could add individual rules, but **you shouldn't need to**:

- Source: `/websites` → Destination: `/index.html` (Rewrite)
- Source: `/about` → Destination: `/index.html` (Rewrite)
- Source: `/infraaiops` → Destination: `/index.html` (Rewrite)
- etc.

But again, **the `/*` rule should handle everything!**

## Important Notes

- ✅ Use **Rewrite** (not Redirect)
- ✅ Source: `/*` (matches everything)
- ✅ Destination: `/index.html` (your React app entry point)
- ❌ Don't use Redirect (that changes the URL)
- ❌ Don't use 301/302 status codes

## After Adding the Rule

1. **Save** the settings
2. **Go to Manual Deploy** tab
3. **Click "Deploy latest commit"**
4. **Wait 2-3 minutes** for deployment
5. **Test:** Visit `https://cisconnects.com/websites` - should work!

## Verification

After deployment, test these URLs - all should work:
- ✅ `https://cisconnects.com/websites`
- ✅ `https://cisconnects.com/about`
- ✅ `https://cisconnects.com/infraaiops`
- ✅ `https://cisconnects.com/services`
- ✅ `https://cisconnects.com/contact`
- ✅ `https://cisconnects.com/blog`

