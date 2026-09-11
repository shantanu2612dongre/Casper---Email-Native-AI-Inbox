const fs = require('fs');
const path = '/Users/shantanudongre/Casper---Email-Native-AI-Inbox/src/routes/index.tsx';
let content = fs.readFileSync(path, 'utf8');

// Move toggle further down
content = content.replace(
  'translate-y-2 lg:translate-y-4',
  'translate-y-6 lg:translate-y-12'
);

fs.writeFileSync(path, content);
console.log("Moved toggle further down successfully!");
