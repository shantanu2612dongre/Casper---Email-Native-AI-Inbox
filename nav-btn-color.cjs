const fs = require('fs');
const path = '/Users/shantanudongre/Casper---Email-Native-AI-Inbox/src/components/Nav.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldBtn = 'bg-[#E5F973] text-black px-7 py-3 text-[16px] font-medium hover:brightness-105 transition-all cursor-pointer shadow-sm hover:scale-105';
const newBtn = 'bg-white/40 dark:bg-black/20 hover:bg-white/60 text-foreground backdrop-blur-md px-7 py-3 text-[16px] font-medium transition-all cursor-pointer shadow-sm hover:scale-105';

content = content.replace(oldBtn, newBtn);

fs.writeFileSync(path, content);
console.log("Updated Join Waitlist button color successfully!");
