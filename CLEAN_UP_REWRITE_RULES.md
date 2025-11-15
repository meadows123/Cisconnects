# Clean Up Rewrite Rules - Fix Routing Conflict

## ⚠️ Problem: Multiple Rewrite Rules Causing Conflicts

You have rewrite rules in **3 places**:
1. Render Dashboard (server config)
2. `render.yaml` file
3. `_redirects` file

This is causing `/about` to incorrectly route to `/websites`.

## ✅ Solution: Use ONLY ONE Source

### Recommended: Use render.yaml Only

**Step 1: Remove Dashboard Rules**
1. Go to **Render Dashboard** → Settings → Redirects/Rewrites
2. **DELETE ALL** rewrite rules you added
3. Leave it **empty**
4. **Save**

**Step 2: Keep Only render.yaml**
- ✅ Keep `render.yaml` with the rewrite rule
- ❌ Delete or empty `_redirects` file (or I can do this)
- ✅ Routes are now in better order in `main.jsx`

**Step 3: Rebuild and Redeploy**
```bash
npm run build
git add .
git commit -m "Fix routing conflict - remove duplicate rewrite rules"
git push
```

**Step 4: Clear Browser Cache**
- Clear cookies/cache for cisconnects.com
- Or use Incognito mode
- Test: `https://cisconnects.com/about` should work correctly

## What I Fixed

1. ✅ Reordered routes in `main.jsx` (more specific routes first)
2. ✅ Simplified `render.yaml` (removed `force: true` which might cause issues)
3. ✅ `_redirects` file is already simplified to one rule

## Next Steps

1. **Remove rewrite rules from Render Dashboard** (keep it empty)
2. **Rebuild and redeploy**
3. **Clear browser cache**
4. **Test `/about`** - should work correctly now

The issue is having rewrite rules in multiple places - they're conflicting with each other!

