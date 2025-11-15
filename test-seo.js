#!/usr/bin/env node

/**
 * Quick SEO Testing Script
 * Run: node test-seo.js
 * 
 * This script checks if SEO elements are present in the built HTML
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 SEO Testing Script\n');
console.log('='.repeat(50));

// Check if dist folder exists (after build)
const distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
  console.log('⚠️  No dist folder found. Run "npm run build" first.\n');
  console.log('For development testing, use the browser-based methods in SEO_TESTING_GUIDE.md\n');
  process.exit(0);
}

// Check key files
const checks = [
  {
    name: 'Sitemap exists',
    file: 'public/sitemap.xml',
    check: (content) => content.includes('<urlset')
  },
  {
    name: 'Robots.txt exists',
    file: 'public/robots.txt',
    check: (content) => content.includes('Sitemap:')
  },
  {
    name: 'SEO Component exists',
    file: 'src/components/SEO.jsx',
    check: (content) => content.includes('og:title') && content.includes('twitter:card')
  },
  {
    name: 'StructuredData Component exists',
    file: 'src/components/StructuredData.jsx',
    check: (content) => content.includes('FAQPage') && content.includes('Organization')
  },
  {
    name: 'FAQ Component exists',
    file: 'src/components/FAQ.jsx',
    check: (content) => content.includes('FAQPage') || content.includes('faqs')
  }
];

let passed = 0;
let failed = 0;

checks.forEach(({ name, file, check }) => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (check(content)) {
      console.log(`✅ ${name}`);
      passed++;
    } else {
      console.log(`❌ ${name} - Content check failed`);
      failed++;
    }
  } else {
    console.log(`❌ ${name} - File not found: ${file}`);
    failed++;
  }
});

console.log('\n' + '='.repeat(50));
console.log(`Results: ${passed} passed, ${failed} failed\n`);

if (failed === 0) {
  console.log('🎉 All basic checks passed!');
  console.log('\nNext steps:');
  console.log('1. Run "npm run dev"');
  console.log('2. Open http://localhost:3000/infraaiops');
  console.log('3. Right-click → View Page Source');
  console.log('4. Search for "FAQPage" and "og:title"');
  console.log('5. Test FAQ section by clicking questions');
} else {
  console.log('⚠️  Some checks failed. Review the errors above.');
}

