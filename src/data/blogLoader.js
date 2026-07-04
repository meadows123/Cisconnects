// Blog loader for Vite: combines static blogPosts.js entries with dynamically
// imported markdown files from src/blogs/*.md

import { blogPosts as staticPosts } from './blogPosts';

function formatDate(raw) {
  if (!raw) return '';
  const d = new Date(raw);
  if (isNaN(d.getTime())) return String(raw);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function parseDate(str) {
  if (!str) return new Date(0);
  const cleaned = String(str).replace(/(\d+)(st|nd|rd|th)/, '$1');
  const d = new Date(cleaned);
  return isNaN(d.getTime()) ? new Date(0) : d;
}

// vite-plugin-markdown parses markdown at build time
// Each module exports: { attributes (frontmatter), html, toc }
const blogFiles = import.meta.glob('../blogs/*.md', { eager: true });

const markdownBlogs = Object.entries(blogFiles)
  .filter(([, mod]) => mod && (mod.attributes || mod.markdown))
  .map(([path, mod]) => {
    const slug = path.split('/').pop().replace('.md', '');
    const fm = mod.attributes || {};
    return {
      ...fm,
      slug,
      content: mod.markdown || '',
      category: fm.category || '',
      author: fm.author || '',
      date: formatDate(fm.date),
      title: fm.title || slug,
      excerpt: fm.excerpt || fm.description || '',
      readTime: fm.readTime || '',
      comments: fm.comments || 0,
      keywords: fm.keywords || [],
      isoDate: fm.isoDate || fm.date || '',
    };
  });

// Merge: markdown posts take precedence over static posts with the same slug
const staticSlugs = new Set(markdownBlogs.map((b) => b.slug));
const combined = [
  ...markdownBlogs,
  ...staticPosts.filter((p) => !staticSlugs.has(p.slug)),
];

combined.sort((a, b) => parseDate(b.date) - parseDate(a.date));

export function getAllBlogPosts() {
  return combined;
}

export function getBlogPostBySlug(slug) {
  return combined.find((b) => b.slug === slug);
}

// Convert a category name to a URL-safe slug
export function getCategorySlug(category) {
  const primary = (category || '').split(',')[0].trim();
  return primary.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// Convert a category slug back to a display name
export function getCategoryDisplayName(slug) {
  const map = {
    'network-automation': 'Network Automation',
    'network-management': 'Network Management',
    'wifi-solutions': 'WiFi Solutions',
    'ai-development': 'AI Development',
  };
  return map[slug] || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

// Return all posts whose primary category matches the given slug
export function getPostsByCategory(categorySlug) {
  return combined.filter((post) => getCategorySlug(post.category) === categorySlug);
}

// Return all unique primary categories with slug, display name, and post count
export function getAllCategories() {
  const seen = new Map();
  combined.forEach((post) => {
    const slug = getCategorySlug(post.category);
    if (!slug) return;
    if (!seen.has(slug)) {
      seen.set(slug, { slug, name: getCategoryDisplayName(slug), count: 0 });
    }
    seen.get(slug).count += 1;
  });
  return Array.from(seen.values()).sort((a, b) => b.count - a.count);
}
