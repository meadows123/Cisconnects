# Testing SEO on Live Site

Now that your site is live, here's how to verify all SEO elements are working:

## 🚀 Quick Live Testing Methods

### Method 1: Google Rich Results Test (Best for Structured Data)
1. Go to: **https://search.google.com/test/rich-results**
2. Enter your live URL: `https://conxiea.com/infraaiops`
3. Click "Test URL"
4. **Expected Results:**
   - ✅ FAQPage schema detected
   - ✅ Service schema detected
   - ✅ Organization schema detected (on home page)

### Method 2: Schema Markup Validator
1. Go to: **https://validator.schema.org/**
2. Enter your live URL: `https://conxiea.com/infraaiops`
3. Click "Run Test"
4. Should show all schemas as valid

### Method 3: Social Media Preview Tools

**Facebook Sharing Debugger:**
- URL: https://developers.facebook.com/tools/debug/
- Enter: `https://conxiea.com/infraaiops`
- Click "Debug"
- Should show Open Graph preview with title, description, and image

**Twitter Card Validator:**
- URL: https://cards-dev.twitter.com/validator
- Enter: `https://conxiea.com/infraaiops`
- Should show Twitter card preview

**LinkedIn Post Inspector:**
- URL: https://www.linkedin.com/post-inspector/
- Enter: `https://conxiea.com/infraaiops`
- Should show LinkedIn preview

### Method 4: Browser DevTools (On Live Site)
1. Visit your live site: `https://conxiea.com/infraaiops`
2. Press `F12` to open DevTools
3. Go to **Elements** tab
4. Expand `<html>` → `<head>`
5. Look for:
   - `<meta name="description">`
   - `<meta property="og:title">`
   - `<meta name="twitter:card">`
   - `<script type="application/ld+json">` (should contain FAQPage)

### Method 5: View Page Source (Live Site)
1. Visit: `https://conxiea.com/infraaiops`
2. Right-click → "View Page Source"
3. Press `Ctrl+F` and search for:
   - `FAQPage` - Should find it in JSON-LD
   - `og:title` - Should find Open Graph tags
   - `twitter:card` - Should find Twitter tags
   - `<h1` - Should find H1 headings

**Note:** On a live site with proper SSR or after React hydration, you should see these in View Source.

## 📋 Live Site Testing Checklist

### Home Page (`/`)
- [ ] Meta description present
- [ ] Open Graph tags present
- [ ] Organization schema present
- [ ] H1 tag with keywords

### InfraAIOps Page (`/infraaiops`)
- [ ] Meta description with keywords
- [ ] Open Graph tags present
- [ ] Twitter cards present
- [ ] FAQPage schema present (8 FAQs)
- [ ] Service schema present
- [ ] H1 tag: "AI Network Automation That Transforms IT Operations"
- [ ] FAQ section visible and clickable

### Other Pages
- [ ] `/services` - Has meta tags and H1
- [ ] `/contact` - Has meta tags and H1
- [ ] `/about` - Has meta tags and H1
- [ ] `/missedcalltextback` - Has meta tags and H1
- [ ] `/websites` - Has meta tags and H1

## 🔍 SEO Tools for Live Site

### Google Search Console
1. Go to: https://search.google.com/search-console
2. Add your property: `https://conxiea.com`
3. Submit sitemap: `https://conxiea.com/sitemap.xml`
4. Monitor for:
   - Indexing status
   - Rich results (FAQ snippets)
   - Mobile usability

### Bing Webmaster Tools
1. Go to: https://www.bing.com/webmasters
2. Add your site
3. Submit sitemap: `https://conxiea.com/sitemap.xml`

### PageSpeed Insights
1. Go to: https://pagespeed.web.dev/
2. Enter: `https://conxiea.com/infraaiops`
3. Check SEO score (should be 90+)

## 🧪 Quick Console Test (Live Site)

1. Visit: `https://conxiea.com/infraaiops`
2. Open DevTools Console (F12 → Console)
3. Paste this code:

```javascript
console.log('🔍 SEO Check Results:');
console.log('Meta Description:', document.querySelector('meta[name="description"]')?.content || '❌ Missing');
console.log('OG Title:', document.querySelector('meta[property="og:title"]')?.content || '❌ Missing');
console.log('Twitter Card:', document.querySelector('meta[name="twitter:card"]')?.content || '❌ Missing');
const schemas = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
console.log('Structured Data Scripts:', schemas.length);
schemas.forEach((s, i) => {
  try {
    const d = JSON.parse(s.textContent);
    console.log(`  Schema ${i+1}: ${d['@type']}`);
  } catch(e) {}
});
console.log('H1:', document.querySelector('h1')?.textContent?.trim() || '❌ Missing');
```

## 📊 Expected Results

### On `/infraaiops` page, you should see:

**Meta Tags:**
- Title: "AI Network Automation | AIOps Redefined | Network Automation Services UK"
- Description: Contains "What is AIOps?", "network automation", etc.

**Structured Data:**
- FAQPage schema with 8 questions
- Service schema

**Content:**
- H1: "AI Network Automation That Transforms IT Operations"
- FAQ section with 8 expandable questions
- Keywords throughout: "AIOps", "network automation", "cloud network automation", etc.

## 🚨 If Something's Missing

1. **Check build output:**
   - Make sure `npm run build` completed successfully
   - Check for any errors in build logs

2. **Verify deployment:**
   - Check that all files were uploaded
   - Verify `sitemap.xml` is accessible at `/sitemap.xml`
   - Verify `robots.txt` is accessible at `/robots.txt`

3. **Clear CDN/Cache:**
   - If using a CDN, purge the cache
   - Hard refresh browser: `Ctrl+Shift+R`

4. **Check server logs:**
   - Look for any 404 errors
   - Check for JavaScript errors

## ✅ Success Indicators

When everything is working, you should see:
- ✅ Google Rich Results Test shows FAQPage schema
- ✅ Facebook Debugger shows proper Open Graph preview
- ✅ Twitter Card Validator shows card preview
- ✅ Schema Validator shows all schemas as valid
- ✅ FAQ section is visible and functional on live site
- ✅ All meta tags present in DevTools Elements tab

