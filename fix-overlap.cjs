const fs = require('fs');
const path = '/Users/shantanudongre/Casper---Email-Native-AI-Inbox/src/routes/index.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace the grid container to give the text more room and increase the gap
content = content.replace(
  'className="relative w-[clamp(320px,90vw,1600px)] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[clamp(2rem,4vw,4rem)] items-center h-full"',
  'className="relative w-[clamp(320px,92vw,1600px)] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-[clamp(3rem,6vw,8rem)] items-center h-full max-w-[1500px]"'
);

// Optional: ensure text doesn't overflow by giving it word-break if necessary (it should wrap normally)

fs.writeFileSync(path, content);
console.log("Updated Hero grid to provide more space between text and mockup!");
