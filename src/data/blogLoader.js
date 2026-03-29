// Blog loader for Vite: dynamically imports all markdown files in src/blogs/
// and parses frontmatter/metadata for use in your blog system.


// vite-plugin-markdown parses markdown at build time
// Each module has: { frontmatter, html, content }
const blogFiles = import.meta.glob('../blogs/*.md', { eager: true });

const blogs = Object.entries(blogFiles).map(([path, mod]) => {
  const slug = path.split('/').pop().replace('.md', '');
  return {
    ...mod.frontmatter,
    slug,
    content: mod.html || mod.content, // html if configured, else raw markdown
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
