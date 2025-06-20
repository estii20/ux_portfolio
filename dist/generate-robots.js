const fs = require('fs');

const BASE_URL = 'https://www.pixelperfect-ux.store';

const content = `
User-agent: *
Disallow:

Sitemap: ${BASE_URL}/sitemap.xml
`;

fs.writeFileSync('./robots.txt', content.trim());  // Explicitly root
console.log('robots.txt generated successfully.');
