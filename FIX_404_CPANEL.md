# Fix 404 Errors Using cPanel File Manager (No Shell Access Needed)

## Step-by-Step Instructions

### Step 1: Log into cPanel
1. Go to your hosting provider's website
2. Log into your cPanel account
3. Look for **"File Manager"** icon and click it

### Step 2: Navigate to Your Website Root
1. In File Manager, you'll see folders on the left
2. Click on **`public_html`** (or **`www`** or your domain name folder)
3. This is where your `index.html` file should be

### Step 3: Show Hidden Files
1. At the top of File Manager, click **"Settings"** (gear icon)
2. Check the box: **"Show Hidden Files (dotfiles)"**
3. Click **"Save"**

### Step 4: Check for .htaccess
1. Look for a file named **`.htaccess`** in the file list
2. You should also see `index.html` in the same folder

### Step 5A: If .htaccess EXISTS
1. **Right-click** on `.htaccess`
2. Select **"Edit"**
3. Make sure it contains this exact content:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [L]
</IfModule>
```

4. Click **"Save Changes"**

### Step 5B: If .htaccess DOES NOT EXIST
1. Click **"+ File"** button at the top
2. Name it: **`.htaccess`** (with the dot at the beginning)
3. Click **"Create New File"**
4. **Right-click** the new `.htaccess` file → **"Edit"**
5. Paste this content:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [L]
</IfModule>
```

6. Click **"Save Changes"**

### Step 6: Verify File Location
Make sure `.htaccess` is in the **same folder** as:
- `index.html`
- `assets/` folder
- Other build files

### Step 7: Test
1. Open a new browser tab (or incognito)
2. Visit: `https://cisconnects.com/about`
3. Should load the page (not show "Not Found")

## Alternative: Upload via File Manager

If you prefer to upload the file from your computer:

1. In File Manager, navigate to `public_html`
2. Click **"Upload"** button at the top
3. Drag and drop the `.htaccess` file from your `build` folder
4. Make sure it uploads successfully

## Still Not Working?

### Check Apache Modules
1. In cPanel, search for **"Apache Modules"** or **"Select PHP Version"**
2. Look for **"rewrite"** module
3. If it's not enabled, you may need to contact your hosting provider

### Contact Your Host
If the above doesn't work, contact your hosting provider and say:
> "I need help enabling Apache mod_rewrite and ensuring .htaccess files are processed for my React Router application. I'm getting 404 errors on all routes except the home page."

## Quick Checklist

- [ ] Logged into cPanel
- [ ] Opened File Manager
- [ ] Enabled "Show Hidden Files"
- [ ] Navigated to public_html (or www)
- [ ] Created/edited .htaccess file
- [ ] Pasted the rewrite rules
- [ ] Saved the file
- [ ] Tested https://cisconnects.com/about

## Visual Guide

```
cPanel → File Manager → public_html/
├── index.html          ← Your main file
├── assets/             ← Your JS/CSS files
└── .htaccess          ← This file must exist here!
```

The `.htaccess` file **must be in the same folder** as `index.html`!

