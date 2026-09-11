const fs = require('fs');
const path = '/Users/shantanudongre/Casper---Email-Native-AI-Inbox/src/routes/index.tsx';
let content = fs.readFileSync(path, 'utf8');

// Update background position from bg-bottom to bg-center to reveal the top bridge
// And adjust the hero container to respect a 16:10 or 16:9 aspect ratio on large screens 
// so the image doesn't get violently cropped by an overly tall dVh container.
content = content.replace(
  'className="relative overflow-hidden min-h-[100dvh] flex items-center justify-center py-20 z-0 bg-background"',
  'className="relative overflow-hidden min-h-[100dvh] 2xl:min-h-0 2xl:aspect-[16/8.5] flex items-center justify-center py-20 z-0 bg-background"'
);

content = content.replace(
  'className="absolute inset-0 -z-10 bg-cover bg-bottom bg-no-repeat opacity-90 transition-all duration-300"',
  'className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-100 transition-all duration-300"'
);

// If they want 100% visibility, another option is background-size: 100% 100%
// Let's add an explicit style fallback in case cover still crops too much for their taste.
content = content.replace(
  'backgroundImage: "url(\'/herobackground.png\')"',
  'backgroundImage: "url(\'/herobackground.png\')", backgroundSize: "100% 100%"'
);
content = content.replace('bg-cover bg-center', 'bg-no-repeat'); // remove tailwind cover since we override it

fs.writeFileSync(path, content);
console.log("Updated background visibility to show everything!");
