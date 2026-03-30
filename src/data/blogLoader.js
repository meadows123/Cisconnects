// Blog loader for Vite: dynamically imports all markdown files in src/blogs/
// and parses frontmatter/metadata for use in your blog system.


// vite-plugin-markdown parses markdown at build time
// Each module has: { frontmatter, html, content }
const blogFiles = import.meta.glob('../blogs/*.md', { eager: true });

const blogs = Object.entries(blogFiles)
  .filter(([path, mod]) => mod && (mod.attributes || mod.html))
  .map(([path, mod]) => {
    // Defensive: ensure path is a string and has .md
    let slug = '';
    if (typeof path === 'string' && path.includes('.md')) {
      slug = path.split('/').pop().replace('.md', '');
    }
    const frontmatter = mod.attributes || {};
    return {
      ...frontmatter,
      slug,
      content: mod.html || mod.content || '',
      category: frontmatter.category || '',
      author: frontmatter.author || '',
      date: frontmatter.date || '',
      title: frontmatter.title || slug,
      excerpt: frontmatter.excerpt || frontmatter.description || '',
      readTime: frontmatter.readTime || '',
      comments: frontmatter.comments || 0,
      keywords: frontmatter.keywords || [],
      isoDate: frontmatter.isoDate || frontmatter.date || '',
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
