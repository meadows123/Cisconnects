# How to Test SEO - Step by Step

## ⚠️ Important: Use DevTools Elements Tab, NOT View Source!

`react-helmet` adds tags dynamically, so "View Page Source" shows the original HTML. You need to check the **rendered DOM** instead.

## Method 1: Check Elements Tab (Correct Way)

1. **Start your dev server:**
   ```bash
   npm run dev
   ```

2. **Open browser:** Go to `http://localhost:3000/infraaiops`

3. **Open DevTools:**
   - Press `F12` or `Right-click → Inspect`
   - Go to **Elements** tab (NOT Sources)

4. **Check the `<head>` section:**
   - In Elements tab, expand `<html>` → `<head>`
   - Look for these tags:

   ✅ **Meta Description:**
   ```html
   <meta name="description" content="What is AIOps? How does network automation...">
   ```

   ✅ **Open Graph Tags:**
   ```html
   <meta property="og:title" content="AI Network Automation | AIOps Redefined...">
   <meta property="og:description" content="...">
   <meta property="og:image" content="...">
   ```

   ✅ **Twitter Cards:**
   ```html
   <meta name="twitter:card" content="summary_large_image">
   <meta name="twitter:title" content="...">
   ```

   ✅ **Structured Data (JSON-LD):**
   ```html
   <script type="application/ld+json">
   {
     "@context": "https://schema.org",
     "@type": "FAQPage",
     ...
   }
   </script>
   ```

5. **Check H1 tags:**
   - In Elements tab, search for `<h1>` (Ctrl+F, type "h1")
   - Should see: "AI Network Automation That Transforms IT Operations"

## Method 2: Quick Search in Elements Tab

1. Open DevTools Elements tab
2. Press `Ctrl+F` (or `Cmd+F` on Mac)
3. Search for:
   - `FAQPage` → Should find the schema
   - `og:title` → Should find Open Graph tags
   - `twitter:card` → Should find Twitter tags
   - `<h1` → Should find H1 headings

## Method 3: Console Check (Quick Test)

1. Open DevTools Console tab
2. Paste this code and press Enter:

```javascript
// Check for meta tags
console.log('Meta Description:', document.querySelector('meta[name="description"]')?.content);
console.log('OG Title:', document.querySelector('meta[property="og:title"]')?.content);
console.log('Twitter Card:', document.querySelector('meta[name="twitter:card"]')?.content);

// Check for structured data
const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
console.log('Structured Data Scripts:', scripts.length);
scripts.forEach((script, i) => {
  try {
    const data = JSON.parse(script.textContent);
    console.log(`Schema ${i+1}:`, data['@type']);
  } catch(e) {}
});

// Check for H1
console.log('H1:', document.querySelector('h1')?.textContent);
```

You should see output like:
```
Meta Description: What is AIOps? How does network automation...
OG Title: AI Network Automation | AIOps Redefined...
Twitter Card: summary_large_image
Structured Data Scripts: 2
Schema 1: FAQPage
Schema 2: Service
H1: AI Network Automation That Transforms IT Operations
```

## Method 4: Visual FAQ Test

1. Navigate to `/infraaiops`
2. Scroll down to the FAQ section
3. You should see 8 questions
4. Click on any question - it should expand to show the answer
5. This confirms the FAQ component is working

## Method 5: Network Tab Check

1. Open DevTools → **Network** tab
2. Refresh the page
3. Look for requests - all should load successfully
4. Check that no errors appear in red

## Common Issues & Solutions

### ❌ "I don't see any meta tags"
- **Solution:** Make sure you're in the **Elements** tab, not Sources
- Make sure you're on the `/infraaiops` page
- Make sure the dev server is running

### ❌ "FAQ section not showing"
- **Solution:** Check that you're on `/infraaiops` route
- Scroll down - FAQ is after Solutions section
- Check browser console for errors

### ❌ "Structured data not found"
- **Solution:** Check Elements tab → `<head>` → look for `<script type="application/ld+json">`
- Make sure `StructuredData` component is imported in `InfraAIOps.jsx`

## Quick Verification Checklist

- [ ] DevTools Elements tab shows `<meta name="description">`
- [ ] Elements tab shows `<meta property="og:title">`
- [ ] Elements tab shows `<meta name="twitter:card">`
- [ ] Elements tab shows `<script type="application/ld+json">` with FAQPage
- [ ] FAQ section is visible and clickable on `/infraaiops`
- [ ] H1 tag contains "AI Network Automation"
- [ ] Console script shows all tags present

## Still Not Working?

If you still can't see the tags:

1. **Check browser console for errors:**
   - Open Console tab
   - Look for red error messages
   - Share any errors you see

2. **Verify components are imported:**
   - Check `src/components/InfraAIOps.jsx`
   - Should have: `import SEO from './SEO';`
   - Should have: `import StructuredData from './StructuredData';`

3. **Clear browser cache:**
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

