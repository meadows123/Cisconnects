# Fix Routing Conflict - /about going to /websites

## The Problem
You have rewrite rules in multiple places, which is causing conflicts:
- Render Dashboard server config
- `render.yaml` file
- `_redirects` file

This is causing `/about` to incorrectly route to `/websites`.

## ✅ Solution: Remove Duplicate Rules

### Step 1: In Render Dashboard
1. Go to **Settings** → **Redirects/Rewrites**
2. **DELETE ALL existing rewrite rules**
3. Keep it **empty** (we'll use the files instead)

### Step 2: Keep Only ONE Source of Truth

**Option A: Use render.yaml (Recommended)**
- Keep `render.yaml` with ONE rewrite rule
- Remove/empty the `_redirects` file
- Remove rules from Render Dashboard

**Option B: Use _redirects file**
- Keep `_redirects` with ONE rule
- Remove routes from `render.yaml`
- Remove rules from Render Dashboard

### Step 3: Verify Route Order in React Router

The routes in `main.jsx` should be in this order (most specific first):
```jsx
<Route path="/" element={<App />} />
<Route path="/about" element={<About />} />
<Route path="/websites" element={<WebsiteServices />} />
// ... other routes
```

## Quick Fix: Remove Dashboard Rules

1. **Render Dashboard** → Settings → Redirects/Rewrites
2. **Delete ALL rules** you added
3. **Save**
4. **Redeploy**

The `render.yaml` file should handle it automatically.

## Test After Fix

1. Clear browser cache (Ctrl+Shift+Delete)
2. Or use Incognito mode
3. Visit: `https://cisconnects.com/about` - should show About page
4. Visit: `https://cisconnects.com/websites` - should show Websites page

## Why This Happens

When you have rewrite rules in multiple places:
- Dashboard: `/* → /index.html`
- render.yaml: `/* → /index.html`  
- _redirects: `/* → /index.html`

They can conflict and cause unexpected routing behavior.

**Solution: Pick ONE source and remove the others!**

