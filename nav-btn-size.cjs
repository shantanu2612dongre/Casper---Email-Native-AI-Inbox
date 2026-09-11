const fs = require('fs');
const path = '/Users/shantanudongre/Casper---Email-Native-AI-Inbox/src/components/Nav.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Update Login button
content = content.replace(
  'className="text-[15px] font-medium text-foreground hover:opacity-80 transition-opacity bg-white/40 dark:bg-black/20 hover:bg-white/60 px-5 py-2 rounded-full backdrop-blur-md"',
  'className="text-[16px] font-medium text-foreground hover:opacity-80 transition-opacity bg-white/40 dark:bg-black/20 hover:bg-white/60 px-6 py-3 rounded-full backdrop-blur-md"'
);

// 2. Update Join Waitlist button
content = content.replace(
  'className="inline-flex items-center gap-2 rounded-full bg-[#E5F973] text-black px-6 py-2.5 text-[15px] font-bold hover:brightness-105 transition-all cursor-pointer shadow-sm hover:scale-105"',
  'className="inline-flex items-center gap-2.5 rounded-full bg-[#E5F973] text-black px-7 py-3 text-[16px] font-medium hover:brightness-105 transition-all cursor-pointer shadow-sm hover:scale-105"'
);

// Optional: increase icon size slightly to match larger text
content = content.replace(
  '<div className="bg-white rounded-full p-0.5 shadow-sm">\n                <img src="/imessage.svg" className="w-4 h-4 object-contain" alt="iMessage" />\n              </div>',
  '<div className="bg-white rounded-full p-0.5 shadow-sm">\n                <img src="/imessage.svg" className="w-5 h-5 object-contain" alt="iMessage" />\n              </div>'
);

fs.writeFileSync(path, content);
console.log("Updated Nav buttons to match screenshot size!");
