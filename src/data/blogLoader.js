// Blog loader for Vite: dynamically imports all markdown files in src/blogs/
// and parses frontmatter/metadata for use in your blog system.

import matter from 'gray-matter';

// Dynamically import all markdown files in src/blogs/
const blogFiles = import.meta.glob('../blogs/*.md', { as: 'raw', eager: true });

// Parse each markdown file for frontmatter and content
const blogs = Object.entries(blogFiles).map(([path, rawContent]) => {
  const { data, content } = matter(rawContent);
  // Extract slug from filename
  const slug = path.split('/').pop().replace('.md', '');
  return {
    ...data,
    slug,
    content,
  };
});

// Sort blogs by date (descending)
blogs.sort((a, b) => new Date(b.date) - new Date(a.date));

export function getAllBlogPosts() {
  return blogs;
}

export function getBlogPostBySlug(slug) {
  return blogs.find((b) => b.slug === slug);
}
