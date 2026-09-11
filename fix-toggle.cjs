const fs = require('fs');
const path = '/Users/shantanudongre/Casper---Email-Native-AI-Inbox/src/routes/index.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Move toggle down and reduce gap
content = content.replace(
  'className="flex items-center p-1 mb-[clamp(1rem,2vw,2rem)] rounded-full bg-white/70 border border-white/60 dark:bg-black/40 dark:border-white/10 shadow-lg backdrop-blur-md z-20"',
  'className="flex items-center p-0.5 mb-2 rounded-full bg-white/70 border border-white/60 dark:bg-black/40 dark:border-white/10 shadow-md backdrop-blur-md z-20 relative translate-y-2 lg:translate-y-4"'
);

// 2. Reduce iMessage button size
const oldIMessageBtn = "className={`flex items-center gap-2 px-[clamp(1rem,1.5vw,1.5rem)] py-[clamp(0.5rem,0.75vw,0.75rem)] rounded-full text-[clamp(0.75rem,0.9vw,0.875rem)] font-semibold transition-all ${activeMockup === 'imessage'";
const newIMessageBtn = "className={`flex items-center gap-1.5 px-[clamp(0.75rem,1vw,1rem)] py-[clamp(0.35rem,0.5vw,0.5rem)] rounded-full text-[clamp(0.7rem,0.75vw,0.8rem)] font-medium transition-all ${activeMockup === 'imessage'";
content = content.replace(oldIMessageBtn, newIMessageBtn);

// 3. Reduce Slack button size
const oldSlackBtn = "className={`flex items-center gap-2 px-[clamp(1rem,1.5vw,1.5rem)] py-[clamp(0.5rem,0.75vw,0.75rem)] rounded-full text-[clamp(0.75rem,0.9vw,0.875rem)] font-semibold transition-all ${activeMockup === 'slack'";
const newSlackBtn = "className={`flex items-center gap-1.5 px-[clamp(0.75rem,1vw,1rem)] py-[clamp(0.35rem,0.5vw,0.5rem)] rounded-full text-[clamp(0.7rem,0.75vw,0.8rem)] font-medium transition-all ${activeMockup === 'slack'";
content = content.replace(oldSlackBtn, newSlackBtn);

// 4. Reduce icons
content = content.replace(
  '<img src="/imessage.svg" className="w-[18px] h-[18px] object-contain" alt="iMessage" />',
  '<img src="/imessage.svg" className="w-[14px] h-[14px] object-contain" alt="iMessage" />'
);
content = content.replace(
  '<img src="/slack.svg" className="w-[18px] h-[18px] object-contain" alt="Slack" />',
  '<img src="/slack.svg" className="w-[14px] h-[14px] object-contain" alt="Slack" />'
);

fs.writeFileSync(path, content);
console.log("Reduced toggle size and gap successfully!");
