const fs = require('fs');
const path = '/Users/shantanudongre/Casper---Email-Native-AI-Inbox/src/components/WispsFeatureMockup.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Define constants for Ask anything
const constants = `
const ASK_ANYTHING_CONVERSATION = [
  { from: "user", text: "when does our AWS reserved instance renewal come up" },
  { from: "wisps", text: "found it — it's in the invoice AWS sent on July 14th" },
  { from: "wisps", text: "renewal date is Sept 30, auto-renews unless cancelled 7 days before" },
  { from: "wisps", text: "from: billing@aws.com · attachment: invoice-9042.pdf" },
  { from: "user", text: "perfect, thanks" },
];

const ASK_ANYTHING_SUGGESTIONS = [];

const ASK_ANYTHING_TIMING = [
  { pre: 500, typing: 0 },
  { pre: 600, typing: 1400 },
  { pre: 400, typing: 1600 },
  { pre: 400, typing: 1200 },
  { pre: 1000, typing: 0 },
];
`;

if (!content.includes('const ASK_ANYTHING_CONVERSATION')) {
  content = content.replace('const SMART_FOLLOWUP_CONVERSATION', constants + '\nconst SMART_FOLLOWUP_CONVERSATION');
}

// 2. Replace Screen 2 (Ask anything)
const screen2Regex = /\{\/\*\s*2\s*—\s*Ask\s*anything\s*\*\/\}\s*<Screen\s*active=\{index\s*===\s*2\}[\s\S]*?<\/Screen>/;
content = content.replace(
  screen2Regex,
  `{/* 2 — Ask anything */}
            <AnimatedChatScreen active={index === 2} title="wisps" pill="Ask anything" conversation={ASK_ANYTHING_CONVERSATION} suggestions={ASK_ANYTHING_SUGGESTIONS} timing={ASK_ANYTHING_TIMING} />`
);

fs.writeFileSync(path, content);
console.log("Applied AnimatedChatScreen to Ask anything!");
