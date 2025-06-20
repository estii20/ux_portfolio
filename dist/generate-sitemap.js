const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.pixelperfect-ux.store';
const OUTPUT_DIR = 'dist'; // <- match your actual output folder

const content = `
User-agent: *
Disallow:

Sitemap: ${BASE_URL}/sitemap.xml
`;

fs.writeFileSync(path.join(OUTPUT_DIR, 'robots.txt'), content.trim());

console.log('robots.txt generated successfully.');


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
    let urlPath = file.path
      .replace(/\\/g, '/')       // Handle Windows paths
      .replace(/^\.\//, '')      // Remove ./ at the beginning
      .replace(/index\.html$/, '') // Remove index.html
      .replace(/\.html$/, '');   // Remove .html from URLs

    return `
  <url>
    <loc>${BASE_URL}/${urlPath}</loc>
    <lastmod>${formatDate(file.mtime)}</lastmod>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('')}
</urlset>`;
}

const htmlFiles = getAllHtmlFiles(ROOT_DIR);
const sitemap = generateSitemap(htmlFiles);

fs.writeFileSync(OUTPUT_FILE, sitemap);
console.log(`Sitemap generated: ${OUTPUT_FILE}`);
