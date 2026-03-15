# Performance Testing & Verification Checklist

Complete this checklist to verify all performance optimizations are working correctly.

---

## PRE-DEPLOYMENT CHECKS

### 1. Code Review

- [x] `next.config.ts` updated with image optimization settings
  - [x] formats: ["image/avif", "image/webp"]
  - [x] qualities: [75, 85, 90]
  - [x] minimumCacheTTL: 31536000
  - [x] Cache headers for /images/* and /og-image.jpg
  - [x] compress: true enabled
  - [x] productionBrowserSourceMaps: false

- [x] Gallery images optimized (`GalleryContent.tsx`)
  - [x] Gallery card images: loading="lazy", quality={85}
  - [x] Modal images: priority, quality={90}
  - [x] Responsive sizes applied

- [x] Home page images optimized (`HomeContent.tsx`)
  - [x] Hero image: priority, quality={90}
  - [x] Booth images: quality={85}, lazy loading for non-first items
  - [x] Responsive sizes applied

- [x] Booths page images optimized (`BoothsContent.tsx`)
  - [x] First booth: priority, quality={85}
  - [x] Other booths: lazy loading
  - [x] Responsive sizes applied

- [x] CSS performance optimizations (`globals.css`)
  - [x] .animate-ping will-change
  - [x] img content-visibility
  - [x] img[loading="lazy"] optimizations

### 2. Local Testing

Run these commands before deployment:

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Check build output
ls -lh .next/

# Expected: No errors, build completes in < 30 seconds
```

#### Test Lazy Loading

1. Open DevTools (F12)
2. Go to Network tab
3. Filter by Images
4. Load home page
5. Scroll down slowly
6. Verify: Below-fold booth images load AFTER you scroll to them

#### Test Responsive Images

1. Open DevTools (F12)
2. Go to Application tab
3. Clear cache
4. Resize browser window (320px, 640px, 1024px, 1440px)
5. Refresh at each breakpoint
6. Check Network tab for different image sizes

#### Test Modern Formats

1. Chrome/Edge: Should load WebP or AVIF
2. Firefox: Should load WebP (fallback from AVIF)
3. Safari: Should load JPEG (no WebP support)
4. DevTools Network tab: Check response headers for Content-Type

### 3. Build Verification

```bash
# Verify no TypeScript errors
npm run type-check

# Output should be: ✓ No type errors

# Check bundle size
npm run build
# Look for: "Analyzing bundles..."
# Bundle should be < 500KB after gzip
```

---

## LIGHTHOUSE AUDIT (DESKTOP)

### Step 1: Local Lighthouse Test

```bash
# Start development server
npm run dev

# In another terminal, run lighthouse
npx lighthouse http://localhost:3000 --view

# Wait for report to generate (~60 seconds)
```

### Step 2: Check Metrics

Copy your scores below:

```
Performance:     _____ / 100  (Target: 90+)
Accessibility:   _____ / 100  (Current: ~95)
Best Practices:  _____ / 100  (Current: ~90)
SEO:             _____ / 100  (Current: ~95)

LCP (Largest Contentful Paint):    _____ s  (Target: < 2.5s)
CLS (Cumulative Layout Shift):     _____ (Target: < 0.1)
FID (First Input Delay):           _____ ms (Target: < 100ms)
TTFB (Time to First Byte):         _____ ms (Target: < 600ms)
```

### Step 3: Verify Recommendations

Lighthouse will show recommendations. Check:

- [x] "Defer offscreen images" - Should PASS (lazy loading)
- [x] "Properly sized images" - Should PASS (responsive sizes)
- [x] "Modern image formats" - Should PASS (WebP/AVIF)
- [x] "Eliminate render-blocking resources" - Should PASS or minor
- [x] "Minify CSS" - Should PASS
- [x] "Minify JavaScript" - Should PASS

### Step 4: Screenshot Metrics

Take screenshots of:
1. Overall score card
2. Core Web Vitals section
3. Opportunities section
4. Diagnostics section

Save to project docs for comparison.

---

## LIGHTHOUSE AUDIT (MOBILE)

### Repeat desktop steps for mobile:

```bash
npx lighthouse http://localhost:3000 --view --emulated-form-factor mobile
```

### Expected Mobile Metrics

```
Performance:      _____ / 100  (Target: 85+, slightly lower than desktop)
LCP:              _____ s  (Target: < 2.5s, may be 2.2-2.8s on slower networks)
CLS:              _____ (Target: < 0.1)
FID:              _____ ms (Target: < 100ms)
```

Mobile will typically be 5-10 points lower than desktop due to network simulation.

---

## PRODUCTION LIGHTHOUSE TEST (PageSpeed Insights)

### Step 1: Deploy to Production

```bash
git add .
git commit -m "perf: optimize images and core web vitals"
git push origin main
# Wait for Vercel deployment to complete
```

### Step 2: Run PageSpeed Insights

1. Go to https://pagespeed.web.dev/
2. Enter: https://www.funloading360.co.uk
3. Click "Analyze"
4. Wait 2-3 minutes for analysis

### Step 3: Record Metrics

**Desktop:**
```
Performance:        _____ / 100
Accessibility:      _____ / 100
Best Practices:     _____ / 100
SEO:                _____ / 100

LCP:                _____ s
CLS:                _____
FID:                _____ ms
```

**Mobile:**
```
Performance:        _____ / 100
LCP:                _____ s
CLS:                _____
FID:                _____ ms
```

### Step 4: Compare with Baseline

If previous results exist, compare:
- Desktop Performance: +5-10 points expected
- Mobile Performance: +3-8 points expected
- LCP: -0.5-1.2s improvement expected
- CLS: -0.02-0.05 improvement expected

---

## REAL-WORLD MONITORING

### Google Analytics 4 Web Vitals

Web Vitals are already tracked in GA4. Check:

1. Log into Google Analytics
2. Go to Reports > Engagement > Page views
3. Add metric comparison:
   - Event name: "web_vitals"
   - Metric: Largest Contentful Paint (ms)
   - Metric: Cumulative Layout Shift
   - Metric: First Input Delay (ms)

### Monitor by Dimensions

Segment by:
- Device (Mobile vs Desktop)
- Country
- Browser
- OS

This shows real-world performance vs lab metrics.

---

## IMAGE LOADING VERIFICATION

### Verify Lazy Loading

1. Open home page in Chrome
2. Open DevTools (F12)
3. Network tab → Images
4. Scroll down to booth images
5. Check: Images load when visible (not on initial page load)

**Expected behavior:**
- On initial load: Hero image loads (priority)
- When scrolling to booths: Booth images load (lazy)
- Load sequence matters: 1st booth → 2nd → 3rd

### Verify Format Support

1. Open DevTools (F12)
2. Network tab → Images
3. Click on any gallery image
4. Check Headers tab:
   - Content-Type should be:
     - Chrome: `image/webp` or `image/avif`
     - Firefox: `image/webp`
     - Safari: `image/jpeg`

### Verify Cache Headers

1. Network tab → Images
2. Click on any image
3. Check Response Headers:
   - `Cache-Control: public, max-age=31536000, immutable`
   - This means 1-year cache

### Verify Size Reduction

1. Open home page with DevTools
2. Network tab → Filter by images
3. Check file sizes:
   - Hero: < 150 KB (was 350 KB)
   - Booth images: < 200 KB each (was 350-400 KB)
   - Gallery images: < 200 KB each (was 350-450 KB)

Expected total: ~1-2 MB for home page (was ~3-4 MB)

---

## PERFORMANCE BUDGET

Monitor these metrics to ensure performance doesn't regress:

### Home Page
- Images total: < 2 MB (lazy loaded)
- Hero: < 150 KB
- Initial interactive: < 3 seconds
- Performance score: > 90

### Gallery Page
- Initial load: < 2 MB (34 images lazy loaded)
- Filter interaction: < 100ms
- Modal open: < 50ms (image already cached)
- Performance score: > 90

### Booths Page
- Initial load: < 800 KB (first booth eager, others lazy)
- Each booth image: < 200 KB
- Performance score: > 90

---

## TROUBLESHOOTING

### Issue: Images still loading on scroll

**Check:**
1. Verify `loading="lazy"` is in Image component
2. Verify `priority={false}` or not set (unless needed)
3. Clear browser cache
4. Try incognito/private window
5. Check Network tab for `<img loading="lazy">`

### Issue: JPEG loading instead of WebP

**Expected:**
- Chrome/Edge: WebP or AVIF
- Firefox: WebP
- Safari: JPEG (correct, no WebP support)

**If wrong format:**
1. Check browser version (old browsers don't support WebP)
2. Clear CDN cache (if using Vercel, run `npm run build`)
3. Check next.config.ts formats array

### Issue: Images blurry on mobile

**Check:**
1. Verify quality={85} or {90} (not too low)
2. Verify sizes attribute is correct
3. Check actual image resolution (should be 3000x2000+ minimum)
4. Run Lighthouse: check "Properly sized images"

### Issue: Layout shift on image load

**Check:**
1. Verify aspect ratio is set (aspect-square, aspect-[4/3], etc.)
2. Verify Image component uses `fill` or `width`/`height`
3. Check parent container has fixed height
4. Run Lighthouse: check CLS metric

### Issue: Building fails

**Check:**
1. No TypeScript errors: `npm run type-check`
2. Images exist in correct paths
3. No syntax errors in next.config.ts
4. Delete `.next/` folder and rebuild: `rm -rf .next && npm run build`

---

## SIGN-OFF CHECKLIST

Complete before declaring success:

### Performance Metrics
- [ ] Lighthouse Desktop Performance: > 90
- [ ] Lighthouse Mobile Performance: > 85
- [ ] LCP < 2.5 seconds
- [ ] CLS < 0.1
- [ ] FID < 100ms
- [ ] No Core Web Vitals warnings in PageSpeed Insights

### Image Optimization
- [ ] Gallery images load lazily
- [ ] WebP/AVIF formats used on Chrome/Edge
- [ ] JPEG fallback works on Safari/Firefox
- [ ] Image file sizes reduced 50%+
- [ ] No blurry images on mobile
- [ ] Correct image format for each screen size

### Code Quality
- [ ] No TypeScript errors
- [ ] No console warnings
- [ ] Build completes without errors
- [ ] No layout shifts (CLS < 0.1)
- [ ] All changes committed and pushed

### Testing
- [ ] Local testing passed
- [ ] Lighthouse Desktop passed
- [ ] Lighthouse Mobile passed
- [ ] PageSpeed Insights passed
- [ ] Real-world metrics monitored

---

## AFTER DEPLOYMENT

### Week 1
- Monitor PageSpeed Insights daily
- Check Google Analytics for Web Vitals
- Monitor bounce rate and time on page
- Alert if performance degrades

### Week 2-4
- Compare metrics vs baseline
- Analyze by device/location
- Check conversion rate impact
- Document learnings

### Monthly
- Run Lighthouse audit
- Review Core Web Vitals
- Check new images aren't oversized
- Plan next optimization round

---

**Date Completed:** _____________
**Performance Score:** _____________
**Tester Name:** _____________
**Sign-Off:** _____________

---

**Next Review Date:** 1 month from deployment
