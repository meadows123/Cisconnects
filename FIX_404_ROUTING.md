# Fix 404 Error on React Router Routes - Quick Fix

## ✅ Your .htaccess file is correct and in the build folder!

The issue is on your **live server**. Here's how to fix it:

## Step-by-Step Fix

### Option 1: Via cPanel File Manager (Easiest)

1. **Log into cPanel**
2. **Open File Manager**
3. **Navigate to your domain's root directory** (usually `public_html` or `www`)
4. **Enable "Show Hidden Files"** (Settings → Show Hidden Files)
5. **Check if `.htaccess` exists:**
   - ✅ If it exists: Make sure it has the correct content (see below)
   - ❌ If it doesn't exist: Create a new file named `.htaccess`

6. **Copy this content into `.htaccess`:**

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [L]
</IfModule>
```

7. **Save the file**
8. **Test:** Visit `https://cisconnects.com/about` - should work now!

### Option 2: Via FTP

1. **Connect via FTP** (FileZilla, WinSCP, etc.)
2. **Enable "Show Hidden Files"** in your FTP client settings
3. **Navigate to your domain root** (public_html/www)
4. **Upload the `.htaccess` file** from your `build` folder
5. **Set permissions to 644** (if needed)

### Option 3: Check Apache mod_rewrite

If `.htaccess` is there but still not working:

1. **In cPanel:** Go to "Apache Modules" or "Select PHP Version" → Extensions
2. **Ensure "rewrite" module is enabled**
3. **If not enabled:** Contact your hosting provider to enable it

## Verify It's Working

After uploading `.htaccess`, test these URLs:
- ✅ `https://cisconnects.com/` - Home page
- ✅ `https://cisconnects.com/about` - Should work (not 404)
- ✅ `https://cisconnects.com/infraaiops` - Should work
- ✅ `https://cisconnects.com/services` - Should work
- ✅ `https://cisconnects.com/contact` - Should work

## Common Issues

### Issue: "Still getting 404"
**Solution:** 
- Make sure `.htaccess` is in the **root directory** (same folder as `index.html`)
- Check file permissions (should be 644)
- Clear browser cache (Ctrl+Shift+R)
- Wait 1-2 minutes for server to process changes

### Issue: "Can't see .htaccess file"
**Solution:**
- Enable "Show Hidden Files" in File Manager/FTP client
- Files starting with `.` are hidden by default

### Issue: "Server error 500"
**Solution:**
- Check `.htaccess` syntax is correct (no typos)
- Make sure Apache mod_rewrite is enabled
- Check server error logs in cPanel

## Quick Test Command

After uploading, test with:
```bash
curl -I https://cisconnects.com/about
```

Should return `200 OK`, not `404 Not Found`.

## Still Not Working?

If none of the above works:
1. Contact your hosting provider
2. Ask them to enable Apache mod_rewrite
3. Verify `.htaccess` files are allowed on your hosting plan
4. Some hosts require specific configuration - they can help

