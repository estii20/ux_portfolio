const fs = require('fs');

const BASE_URL = 'https://your-new-domain.com'; // Change to your actual URL

const content = `
User-agent: *
Disallow:

Sitemap: ${BASE_URL}/sitemap.xml
`;

fs.writeFileSync('robots.txt', content.trim());

console.log('robots.txt generated successfully.');
