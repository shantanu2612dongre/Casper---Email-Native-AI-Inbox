const fs = require('fs');
const path = '/Users/shantanudongre/Casper---Email-Native-AI-Inbox/src/routes/index.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  '<div className="absolute -inset-12 -z-10 bg-white/70 dark:bg-black/70 blur-3xl rounded-full pointer-events-none" />',
  ''
);

fs.writeFileSync(path, content);
console.log("Removed the white glow behind the text successfully!");
