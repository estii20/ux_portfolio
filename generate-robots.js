const fs = require('fs');
const path = require('path');

// ✅ Set to your actual deployed domain
const BASE_URL = 'https://www.pixelperfect-ux.store';

// Format the robots.txt content
const content = `User-agent: *
Disallow:

Sitemap: ${BASE_URL}/sitemap.xml
`;

// Output path (can be customized if needed)
const outputPath = path.join(__dirname, 'robots.txt');

fs.writeFileSync(outputPath, content.trim() + '\n', 'utf8');

console.log('✅ robots.txt generated successfully at', outputPath);
