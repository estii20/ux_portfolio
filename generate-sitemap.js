const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://your-new-domain.com'; // <-- Change this to your live URL
const OUTPUT_FILE = 'sitemap.xml';
const ROOT_DIR = '.'; // Starting folder for your HTML files, adjust if needed

function getAllHtmlFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      getAllHtmlFiles(fullPath, files);
    } else if (item.endsWith('.html')) {
      files.push({ path: fullPath, mtime: stats.mtime });
    }
  });
  return files;
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function generateSitemap(files) {
  const urls = files.map(file => {
    // Convert local file path to URL path
    let urlPath = file.path.replace(/\\/g, '/').replace(/^\.\//, '');
    if (urlPath === 'index.html') {
      urlPath = '';
    }
    return `
  <url>
    <loc>${BASE_URL}/${urlPath}</loc>
    <lastmod>${formatDate(file.mtime)}</lastmod>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('')}
</urlset>`;
}

const htmlFiles = getAllHtmlFiles(ROOT_DIR);
const sitemap = generateSitemap(htmlFiles);

fs.writeFileSync(OUTPUT_FILE, sitemap);

console.log(`Sitemap generated: ${OUTPUT_FILE}`);
