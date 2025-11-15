# Fix 404 Errors on Render.com

If you're hosting on **Render.com**, here's how to fix the routing issue:

## Solution 1: Create `_redirects` File (Easiest)

1. **In your project**, create a file called `_redirects` in the `public` folder
2. **Add this content:**
   ```
   /*    /index.html   200
   ```
3. **Rebuild and redeploy** your site

The `_redirects` file will be copied to your build output automatically.

## Solution 2: Use `render.yaml` (Recommended)

1. **Create `render.yaml`** in your project root (I've created this for you)
2. **The file should contain:**
   ```yaml
   services:
     - type: web
       name: cisconnects
       env: static
       buildCommand: npm run build
       staticPublishPath: build
       routes:
         - type: rewrite
           source: /*
           destination: /index.html
   ```

3. **In Render Dashboard:**
   - Go to your service settings
   - Make sure "Static Site" is selected
   - Render will automatically use the `render.yaml` configuration

## Solution 3: Render Dashboard Settings

1. **Go to Render Dashboard**
2. **Select your service**
3. **Go to Settings → Redirects/Rewrites**
4. **Add a rewrite rule:**
   - **Source:** `/*`
   - **Destination:** `/index.html`
   - **Type:** Rewrite

## Verify It's Working

After deploying, test:
- ✅ `https://cisconnects.com/about`
- ✅ `https://cisconnects.com/infraaiops`
- ✅ `https://cisconnects.com/services`

All should work without 404 errors!

## Which Method to Use?

- **`_redirects` file**: Simplest, works for static sites
- **`render.yaml`**: More control, better for complex setups
- **Dashboard settings**: Quick fix if you don't want to change files

I've created both `_redirects` and `render.yaml` files for you. After your next deploy, the routing should work!

