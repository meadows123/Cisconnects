# Fix 404 on Render Static Site - Exact Steps

Since you confirmed it's a **Static Site** on Render, here's the exact fix:

## Method 1: Render Dashboard (REQUIRED)

Even though you have `render.yaml`, Render Static Sites often need **manual configuration in the dashboard**:

### Step 1: Go to Render Dashboard
1. Log into https://dashboard.render.com
2. Click on your **cisconnects** service

### Step 2: Settings → Redirects & Rewrites
1. Click **"Settings"** tab
2. Scroll down to **"Redirects & Rewrites"** section
3. If you see existing rules, you can edit them
4. If empty, click **"Add Redirect"** or **"Add Rewrite"**

### Step 3: Add Rewrite Rule
Configure exactly like this:
- **Source Path:** `/*`
- **Destination:** `/index.html`
- **Type:** **Rewrite** (NOT Redirect - this is critical!)
- **Status Code:** 200 (if option available)

### Step 4: Save & Redeploy
1. Click **"Save"**
2. Go to **"Manual Deploy"** tab
3. Click **"Deploy latest commit"**
4. Wait for deployment (usually 2-3 minutes)

### Step 5: Test
Visit: `https://cisconnects.com/websites` - should work!

## Method 2: Verify render.yaml is Being Used

1. In Dashboard → **Settings**
2. Look for **"Render Configuration File"** or **"Config File"**
3. Should say: `render.yaml` (in root)
4. If it says "Not found" or "Not configured":
   - Make sure `render.yaml` is in your **repository root**
   - Push it to your Git repo
   - Render should auto-detect it

## Method 3: Check Build Output

1. Go to **"Logs"** tab in Render
2. Look at the **build logs**
3. Check if it mentions:
   - `_redirects` file
   - `static.json` file
   - Routes configuration

## Method 4: Contact Render Support

If dashboard configuration doesn't work, contact Render support with:

```
Subject: Static Site 404 Errors - React Router SPA

I have a React Router single-page application deployed as a Static Site on Render.
Direct URL access to routes returns 404 errors.

Service: cisconnects
URL: cisconnects.com

I've added:
- _redirects file in public folder
- static.json in public folder  
- render.yaml with rewrite rules

But routes like /websites, /about still return 404.

Please help configure rewrite rules or enable SPA routing mode.
```

## Why This Happens

Render Static Sites serve files directly. When you visit `/websites`:
- Server looks for `/websites/index.html` → doesn't exist → 404
- We need to tell Render: "For any route, serve `/index.html`"
- React Router then handles the routing client-side

The rewrite rule does exactly that!

## Quick Checklist

- [ ] Logged into Render Dashboard
- [ ] Went to Settings → Redirects & Rewrites
- [ ] Added rewrite: `/*` → `/index.html` (Type: Rewrite)
- [ ] Saved settings
- [ ] Triggered manual deploy
- [ ] Tested https://cisconnects.com/websites

## Still Not Working?

1. **Check service logs** for errors
2. **Verify render.yaml** is in repo root and pushed to Git
3. **Try creating a new Static Site** service and deploying fresh
4. **Contact Render support** - they can enable it server-side

The key is: **Static Sites on Render need the rewrite rule configured in the dashboard**, even if you have the files.

