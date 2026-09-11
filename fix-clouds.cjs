const fs = require('fs');
const path = '/Users/shantanudongre/Casper---Email-Native-AI-Inbox/src/routes/index.tsx';
let content = fs.readFileSync(path, 'utf8');

// Change bg-bottom to bg-[center_25%] to prioritize the clouds and the bridge.
// Since the image is portrait (1054x1493) and the screen is landscape, 
// anchoring it towards the top ensures the sky and clouds are fully visible.
content = content.replace(
  'bg-cover bg-bottom bg-no-repeat',
  'bg-cover bg-[center_30%] bg-no-repeat'
);

fs.writeFileSync(path, content);
console.log("Adjusted background position to reveal the clouds and bridge!");
