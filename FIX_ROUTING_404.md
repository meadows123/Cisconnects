# Fix 404 Error on React Router Routes

## Problem
Getting "Not Found" error when accessing routes like `/infraaiops` directly or refreshing the page.

## Solution

### For Apache Servers (Most Common)

Your `.htaccess` file should already be in the `public` folder. Vite automatically copies it to the build output.

**Steps to fix:**

1. **Verify .htaccess is in build output:**
   ```bash
   npm run build
   ls -la build/.htaccess
   ```
   Should show the file exists.

2. **Upload the build folder to your server:**
   - Make sure the entire `build` folder contents are uploaded
   - The `.htaccess` file must be in the root of your web directory

3. **Verify .htaccess is on the server:**
   - Check via FTP/cPanel that `.htaccess` exists in your public_html or www root
   - Make sure it's not hidden (some FTP clients hide dot-files)

4. **Check Apache mod_rewrite is enabled:**
   - In cPanel: Apache Modules → Ensure "rewrite" is enabled
   - Or contact your host to enable mod_rewrite

### Alternative: If .htaccess isn't working

**Option 1: Create/Update .htaccess on server directly**

Create a `.htaccess` file in your server's root directory with:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [L]
</IfModule>
```

**Option 2: Server Configuration (if you have access)**

If using Nginx, add to your server config:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**Option 3: cPanel Configuration**

1. Go to cPanel → File Manager
2. Navigate to your domain's root directory
3. Create/Edit `.htaccess` file
4. Add the rewrite rules above
5. Save and test

### Verify It's Working

1. Visit: `https://cisconnects.com/infraaiops`
2. Should load the page (not 404)
3. Refresh the page - should still work
4. Navigate to other routes - should all work

### Common Issues

**Issue:** `.htaccess` not being uploaded
- **Fix:** Make sure your FTP client shows hidden files
- Or upload via cPanel File Manager

**Issue:** Apache mod_rewrite not enabled
- **Fix:** Contact your hosting provider or enable in cPanel

**Issue:** Wrong directory
- **Fix:** Ensure `.htaccess` is in the same directory as `index.html`

### Quick Test

After uploading, test with:
```bash
curl -I https://cisconnects.com/infraaiops
```

Should return `200 OK`, not `404 Not Found`.

