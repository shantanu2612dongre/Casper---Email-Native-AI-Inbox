const fs = require('fs');
const path = '/Users/shantanudongre/Casper---Email-Native-AI-Inbox/src/routes/index.tsx';
let content = fs.readFileSync(path, 'utf8');

// The hero background color must match the next section (bg-textured-paper) 
// so the transparency fade blends perfectly into the same color instead of a mismatched bg-background.
content = content.replace(
  'className="relative overflow-hidden min-h-[100dvh] 2xl:min-h-0 2xl:aspect-[16/8.5] flex items-center justify-center py-20 z-0 bg-background"',
  'className="relative overflow-hidden min-h-[100dvh] 2xl:min-h-0 2xl:aspect-[16/8.5] flex items-center justify-center py-20 z-0 bg-textured-paper"'
);

// Smooth out the gradient fade to be longer and more subtle, matching the original code's behavior
const oldMask = 'maskImage: "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)"';
const newMask = 'maskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent)"';

content = content.replace(oldMask, newMask);

fs.writeFileSync(path, content);
console.log("Fixed the hero background color and gradient mask to blend perfectly.");
