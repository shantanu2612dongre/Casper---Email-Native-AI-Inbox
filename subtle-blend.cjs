const fs = require('fs');
const path = '/Users/shantanudongre/Casper---Email-Native-AI-Inbox/src/routes/index.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace the previous mask with an incredibly smooth, multi-stop eased gradient
const oldMask = 'maskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent)"';
const newMask = 'maskImage: "linear-gradient(to bottom, black 0%, black 60%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,0.5) 88%, rgba(0,0,0,0.15) 96%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 60%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,0.5) 88%, rgba(0,0,0,0.15) 96%, transparent 100%)"';

content = content.replace(oldMask, newMask);

fs.writeFileSync(path, content);
console.log("Updated to an ultra-subtle eased mask gradient!");
