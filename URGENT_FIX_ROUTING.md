# URGENT: Fix 404 Routing Issue

## The Problem
Direct URLs like `https://cisconnects.com/websites` return 404 because the server doesn't know to serve `index.html` for React Router routes.

## Solution: Configure in Render Dashboard (REQUIRED)

The files we created help, but **you MUST configure this in Render Dashboard**:

### Step 1: Go to Render Dashboard
1. Log into https://dashboard.render.com
2. Click on your **cisconnects** service

### Step 2: Add Rewrite Rule
1. Click **"Settings"** tab
2. Scroll to **"Redirects & Rewrites"** section
3. Click **"Add Redirect"** or **"Add Rewrite"**
4. Configure:
   - **Source:** `/*` (or `/websites`, `/about`, etc.)
   - **Destination:** `/index.html`
   - **Type:** **Rewrite** (NOT Redirect - this is important!)
   - **Status Code:** 200 (if option available)

5. **Save**

### Step 3: Alternative - Check Service Type
1. In Settings, check **"Service Type"**
2. If it says "Web Service", you might need to change it to **"Static Site"**
3. Static Sites on Render automatically handle SPA routing better

### Step 4: Manual Deploy
1. After saving settings, go to **"Manual Deploy"**
2. Click **"Deploy latest commit"**
3. Wait for deployment to complete

### Step 5: Test
Visit: `https://cisconnects.com/websites` - should work now!

## If Render Dashboard Doesn't Have Rewrite Options

### Option A: Contact Render Support
Send them this message:
> "I have a React Router single-page application deployed as a static site. Direct URL access to routes like /websites returns 404. I need help configuring rewrite rules so all routes serve index.html. I have _redirects and static.json files in my build output, but they're not being processed."

### Option B: Check if Using Different Hosting
If you're NOT using Render, tell me which hosting provider you're using:
- **Netlify** → Uses `_redirects` or `netlify.toml`
- **Vercel** → Uses `vercel.json`
- **Cloudflare Pages** → Uses `_redirects` or `_headers`
- **GitHub Pages** → Needs `404.html` workaround
- **Apache/cPanel** → Needs `.htaccess`
- **Nginx** → Needs server config

## Quick Test
After configuring, test these URLs:
- ✅ `https://cisconnects.com/websites`
- ✅ `https://cisconnects.com/about`
- ✅ `https://cisconnects.com/infraaiops`
- ✅ `https://cisconnects.com/services`

All should load the React app (not show 404).

## Why This Happens
React Router is **client-side routing**. When you visit `/websites` directly:
- Server looks for a file at `/websites/index.html` → doesn't exist → 404
- We need to tell the server: "For any route, serve `/index.html`"
- React Router then takes over and shows the correct page

The rewrite rule does exactly that!

