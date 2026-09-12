const fs = require('fs');
const path = '/Users/shantanudongre/Casper---Email-Native-AI-Inbox/src/components/Nav.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldLogo = `<a
            href="/"
            className="flex items-center gap-2 font-black text-foreground tracking-tight text-2xl"
          >
            <img src="/wisps-logo.svg" alt="Wisps logo" className="h-8 w-8 object-contain" />
            Wisps
          </a>`;

const newLogo = `<a
            href="/"
            className="flex items-center gap-2.5 font-black text-foreground tracking-tight text-3xl lg:text-[2.25rem]"
          >
            <img src="/wisps-logo.svg" alt="Wisps logo" className="h-10 w-10 lg:h-12 lg:w-12 object-contain" />
            Wisps
          </a>`;

content = content.replace(oldLogo, newLogo);

fs.writeFileSync(path, content);
console.log("Increased navbar logo size successfully!");
