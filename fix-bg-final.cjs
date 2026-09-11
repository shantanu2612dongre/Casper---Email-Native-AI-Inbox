const fs = require('fs');
const path = '/Users/shantanudongre/Casper---Email-Native-AI-Inbox/src/routes/index.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Remove 100% 100% stretch and restore proper cover
content = content.replace(
  'backgroundSize: "100% 100%", ',
  ''
);

// 2. Make the container aspect ratio match the image closer to prevent aggressive cropping when using bg-cover
content = content.replace(
  'className="relative overflow-hidden min-h-[100dvh] 2xl:min-h-0 2xl:aspect-[16/8.5] flex items-center justify-center py-20 z-0 bg-textured-paper"',
  'className="relative overflow-hidden min-h-[100dvh] lg:min-h-[85vh] 2xl:min-h-0 2xl:aspect-[16/9] flex items-center justify-center py-24 z-0 bg-textured-paper"'
);

// 3. Brighten the image and use cover/bottom so bridge and houses are visible without stretching
content = content.replace(
  'className="absolute inset-0 -z-10 bg-no-repeat bg-no-repeat opacity-100 transition-all duration-300"',
  'className="absolute inset-0 -z-10 bg-cover bg-bottom bg-no-repeat opacity-100 brightness-[1.1] contrast-[1.05] saturate-[1.15] transition-all duration-300"'
);

// Note: I also fixed the double bg-no-repeat typo

fs.writeFileSync(path, content);
console.log("Adjusted background scaling to production level and enhanced image brightness/saturation.");
