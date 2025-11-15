#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const CLEAN_CONTENT_REGEX = {
  comments: /\/\*[\s\S]*?\*\/|\/\/.*$/gm,
  templateLiterals: /`[\s\S]*?`/g,
  strings: /'[^']*'|"[^"]*"/g,
  jsxExpressions: /\{.*?\}/g,
  htmlEntities: {
    quot: /&quot;/g,
    amp: /&amp;/g,
    lt: /&lt;/g,
    gt: /&gt;/g,
    apos: /&apos;/g
  }
};

const EXTRACTION_REGEX = {
  route: /<Route\s+[^>]*>/g,
  path: /path=["']([^"']+)["']/,
  element: /element=\{<(\w+)[^}]*\/?\s*>\}/,
  helmet: /<Helmet[^>]*?>([\s\S]*?)<\/Helmet>/i,
  helmetTest: /<Helmet[\s\S]*?<\/Helmet>/i,
  seo: /<SEO\s+[^>]*?title=["']([^"']+)["'][^>]*?description=["']([^"']+)["'][^>]*?\/?>/i,
  seoTest: /<SEO[\s\S]*?\/?>/i,
  title: /<title[^>]*?>\s*(.*?)\s*<\/title>/i,
  description: /<meta\s+name=["']description["']\s+content=["'](.*?)["']/i,
  seoTitle: /title=["']([^"']+)["']/i,
  seoDescription: /description=["']([^"']+)["']/i
};

function cleanContent(content) {
  return content
    .replace(CLEAN_CONTENT_REGEX.comments, '')
    .replace(CLEAN_CONTENT_REGEX.templateLiterals, '""')
    .replace(CLEAN_CONTENT_REGEX.strings, '""');
}

function cleanText(text) {
  if (!text) return text;
  
  return text
    .replace(CLEAN_CONTENT_REGEX.jsxExpressions, '')
    .replace(CLEAN_CONTENT_REGEX.htmlEntities.quot, '"')
    .replace(CLEAN_CONTENT_REGEX.htmlEntities.amp, '&')
    .replace(CLEAN_CONTENT_REGEX.htmlEntities.lt, '<')
    .replace(CLEAN_CONTENT_REGEX.htmlEntities.gt, '>')
    .replace(CLEAN_CONTENT_REGEX.htmlEntities.apos, "'")
    .trim();
}

function extractRoutes(appJsxPath) {
  if (!fs.existsSync(appJsxPath)) return new Map();

  try {
    const content = fs.readFileSync(appJsxPath, 'utf8');
    const routes = new Map();
    const routeMatches = [...content.matchAll(EXTRACTION_REGEX.route)];
    
    for (const match of routeMatches) {
      const routeTag = match[0];
      const pathMatch = routeTag.match(EXTRACTION_REGEX.path);
      const elementMatch = routeTag.match(EXTRACTION_REGEX.element);
      const isIndex = routeTag.includes('index');
      
      if (elementMatch) {
        const componentName = elementMatch[1];
        let routePath;
        
        if (isIndex) {
          routePath = '/';
        } else if (pathMatch) {
          routePath = pathMatch[1].startsWith('/') ? pathMatch[1] : `/${pathMatch[1]}`;
        }
        
        routes.set(componentName, routePath);
      }
    }

    return routes;
  } catch (error) {
    return new Map();
  }
}

function findReactFiles(dir) {
  return fs.readdirSync(dir).map(item => path.join(dir, item));
}

function extractHelmetData(content, filePath, routes) {
  const cleanedContent = cleanContent(content);
  
  // Try to extract from SEO component first (new format)
  const seoMatch = content.match(EXTRACTION_REGEX.seo);
  if (seoMatch) {
    const title = cleanText(seoMatch[1]);
    const description = cleanText(seoMatch[2]);
    
    const fileName = path.basename(filePath, path.extname(filePath));
    const url = routes.length && routes.has(fileName) 
      ? routes.get(fileName) 
      : generateFallbackUrl(fileName);
    
    return {
      url,
      title: title || 'Untitled Page',
      description: description || 'No description available'
    };
  }
  
  // Try SEO component with separate attributes (multiline)
  if (EXTRACTION_REGEX.seoTest.test(cleanedContent)) {
    // Match SEO component with title and description props (can be multiline)
    const seoBlockMatch = content.match(/<SEO\s+([\s\S]*?)\/?>/i);
    if (seoBlockMatch) {
      const seoProps = seoBlockMatch[1];
      const seoTitleMatch = seoProps.match(/title=["']([^"']+)["']/);
      const seoDescMatch = seoProps.match(/description=["']([^"']+)["']/);
      
      if (seoTitleMatch || seoDescMatch) {
        const title = cleanText(seoTitleMatch?.[1]);
        const description = cleanText(seoDescMatch?.[1]);
        
        const fileName = path.basename(filePath, path.extname(filePath));
        const url = routes.length && routes.has(fileName) 
          ? routes.get(fileName) 
          : generateFallbackUrl(fileName);
        
        return {
          url,
          title: title || 'Untitled Page',
          description: description || 'No description available'
        };
      }
    }
  }
  
  // Fallback to Helmet component (old format)
  if (!EXTRACTION_REGEX.helmetTest.test(cleanedContent)) {
    return null;
  }
  
  const helmetMatch = content.match(EXTRACTION_REGEX.helmet);
  if (!helmetMatch) return null;
  
  const helmetContent = helmetMatch[1];
  const titleMatch = helmetContent.match(EXTRACTION_REGEX.title);
  const descMatch = helmetContent.match(EXTRACTION_REGEX.description);
  
  const title = cleanText(titleMatch?.[1]);
  const description = cleanText(descMatch?.[1]);
  
  const fileName = path.basename(filePath, path.extname(filePath));
  const url = routes.length && routes.has(fileName) 
    ? routes.get(fileName) 
    : generateFallbackUrl(fileName);
  
  return {
    url,
    title: title || 'Untitled Page',
    description: description || 'No description available'
  };
}

function generateFallbackUrl(fileName) {
  const cleanName = fileName.replace(/Page$/, '').toLowerCase();
  return cleanName === 'app' ? '/' : `/${cleanName}`;
}

function generateLlmsTxt(pages) {
  // Filter out null values
  const validPages = pages.filter(page => page !== null && page !== undefined);
  
  if (validPages.length === 0) {
    return '## Pages\nNo pages found.';
  }
  
  const sortedPages = validPages.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
  const pageEntries = sortedPages.map(page => 
    `- [${page.title || 'Untitled'}](${page.url || '/'}): ${page.description || 'No description'}`
  ).join('\n');
  
  return `## Pages\n${pageEntries}`;
}

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function processPageFile(filePath, routes) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return extractHelmetData(content, filePath, routes);
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return null;
  }
}

function main() {
  const pagesDir = path.join(process.cwd(), 'src', 'pages');
  const appJsxPath = path.join(process.cwd(), 'src', 'App.jsx');

  let pages = [];
  
  if (!fs.existsSync(pagesDir)) {
    const appPage = processPageFile(appJsxPath, []);
    if (appPage) {
      pages.push(appPage);
    }
  } else {
    const routes = extractRoutes(appJsxPath);
    const reactFiles = findReactFiles(pagesDir);

    pages = reactFiles
      .map(filePath => processPageFile(filePath, routes))
      .filter(Boolean);
  }
  
  // Also check components directory for page components
  const componentsDir = path.join(process.cwd(), 'src', 'components');
  if (fs.existsSync(componentsDir)) {
    const routes = extractRoutes(appJsxPath);
    const componentFiles = fs.readdirSync(componentsDir)
      .filter(file => file.endsWith('.jsx') || file.endsWith('.js'))
      .map(file => path.join(componentsDir, file));
    
    componentFiles.forEach(filePath => {
      const pageData = processPageFile(filePath, routes);
      if (pageData && !pages.find(p => p.url === pageData.url)) {
        pages.push(pageData);
      }
    });
  }
  
  // Filter out null values
  pages = pages.filter(Boolean);
  
  if (pages.length === 0) {
    console.warn('⚠️  No pages with SEO/Helmet components found. Continuing build...');
  }


  const llmsTxtContent = generateLlmsTxt(pages);
  const outputPath = path.join(process.cwd(), 'public', 'llms.txt');
  
  ensureDirectoryExists(path.dirname(outputPath));
  fs.writeFileSync(outputPath, llmsTxtContent, 'utf8');
}

const isMainModule = import.meta.url === `file://${process.argv[1]}`;

if (isMainModule) {
  main();
}
