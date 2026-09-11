const fs = require('fs');
const path = '/Users/shantanudongre/Casper---Email-Native-AI-Inbox/src/routes/index.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldStyle = 'backgroundImage: "url(\'/herobackground.png\')", backgroundSize: "100% 100%"';
const newStyle = 'backgroundImage: "url(\'/herobackground.png\')", backgroundSize: "100% 100%", maskImage: "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)"';

content = content.replace(oldStyle, newStyle);

fs.writeFileSync(path, content);
console.log("Re-applied the gradient mask to blend the hero with the next section.");
