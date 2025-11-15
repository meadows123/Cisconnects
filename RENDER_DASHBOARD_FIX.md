# CRITICAL: Fix 404 in Render Dashboard

## ⚠️ Files Alone Won't Work - You MUST Configure in Dashboard

The `_redirects`, `static.json`, and `render.yaml` files help, but **Render requires manual configuration in the dashboard** for static sites.

## Step-by-Step: Render Dashboard Configuration

### Step 1: Verify Service Type
1. Go to **Render Dashboard** → Your service
2. Click **"Settings"**
3. Check **"Service Type"**:
   - ✅ Should be: **"Static Site"**
   - ❌ If it says "Web Service" → This is the problem!

### Step 2: If It's "Web Service" - Change to Static Site
1. You may need to **create a new Static Site** service
2. Or contact Render support to convert it
3. Static Sites handle SPA routing automatically

### Step 3: Add Rewrite Rule (If Static Site)
1. In **Settings** → Scroll to **"Redirects & Rewrites"**
2. Click **"Add Redirect"**
3. Fill in:
   - **Source:** `/*`
   - **Destination:** `/index.html`
   - **Type:** **Rewrite** (NOT Redirect!)
   - **Status:** 200 (if available)

### Step 4: Alternative - Check "Single Page Application" Option
1. In Settings, look for **"Single Page Application"** checkbox
2. **Enable it** if available
3. This automatically handles all routing

### Step 5: Manual Deploy After Changes
1. After saving settings
2. Go to **"Manual Deploy"** tab
3. Click **"Deploy latest commit"**
4. Wait for completion

## If You Can't Find These Options

### Option A: Contact Render Support
Send them this exact message:

```
Subject: Static Site 404 Errors - Need SPA Routing Configuration

I have a React Router single-page application deployed as a static site on Render. 
Direct URL access to routes (e.g., /websites, /about) returns 404 errors.

I need help configuring rewrite rules so all routes serve /index.html. 
I have _redirects and static.json files in my build output, but they're not being processed.

Service: [your service name]
URL: cisconnects.com

Please help configure SPA routing or enable the rewrite rules.
```

### Option B: Verify You're Using Render
Check your hosting provider:
- What does your dashboard URL look like?
- Is it `dashboard.render.com`?
- Or a different provider?

## Quick Diagnostic

Run this in your browser console on the live site:
```javascript
console.log('Host:', window.location.hostname);
console.log('Path:', window.location.pathname);
```

This will help identify the hosting setup.

## Alternative: Check Build Output

1. In Render Dashboard → **"Logs"** tab
2. Check the build logs
3. Verify it says: `✓ built in X.XXs`
4. Check if `_redirects` file is mentioned in logs

## Most Likely Issue

**Your service is set up as "Web Service" instead of "Static Site"**

Static Sites on Render automatically handle SPA routing better. Web Services need explicit rewrite configuration.

## Next Steps

1. **Check your Render service type** (Settings → Service Type)
2. **If it's "Web Service"** → Consider creating a new "Static Site" service
3. **Or** → Add rewrite rules in Settings → Redirects & Rewrites
4. **Redeploy** after making changes

Let me know what you see in the Render Dashboard settings!

