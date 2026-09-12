const fs = require('fs');
const path = '/Users/shantanudongre/Casper---Email-Native-AI-Inbox/src/components/WispsFeatureMockup.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Define constants for One brain
const constants = `
const ONE_BRAIN_CONVERSATION = [
  { from: "wisps", text: "morning — cleared 47 notifications overnight across slack, email, and github" },
  { from: "wisps", text: "newsletters, CI pings, standup bot messages — none of it needed you" },
  { from: "wisps", text: "2 things actually do:" },
  { from: "wisps", text: "1. priya asked on slack if staging's ready for the demo" },
  { from: "wisps", text: "2. github flagged a merge conflict on the pricing-page branch" },
  { from: "user", text: "staging's ready, tell priya" },
  { from: "wisps", text: "sent — \\"hey priya, staging's ready whenever you want to walk through it\\"" },
];

const ONE_BRAIN_SUGGESTIONS = [];

const ONE_BRAIN_TIMING = [
  { pre: 500, typing: 1500 },
  { pre: 500, typing: 1200 },
  { pre: 400, typing: 600 },
  { pre: 400, typing: 1400 },
  { pre: 400, typing: 1500 },
  { pre: 1000, typing: 0 },
  { pre: 500, typing: 1600 },
];
`;

if (!content.includes('const ONE_BRAIN_CONVERSATION')) {
  content = content.replace('const SMART_FOLLOWUP_CONVERSATION', constants + '\nconst SMART_FOLLOWUP_CONVERSATION');
}

// 2. Replace Screen 1 (One brain, every tool)
const screen1Regex = /\{\/\*\s*1\s*—\s*One\s*brain,\s*every\s*tool\s*\*\/\}\s*<Screen\s*active=\{index\s*===\s*1\}[\s\S]*?<\/Screen>/;
content = content.replace(
  screen1Regex,
  `{/* 1 — One brain, every tool */}
            <AnimatedChatScreen active={index === 1} title="wisps" pill="One brain, every tool" conversation={ONE_BRAIN_CONVERSATION} suggestions={ONE_BRAIN_SUGGESTIONS} timing={ONE_BRAIN_TIMING} />`
);

// 3. Remove wfm-list, wfm-row, etc. if they are not used anymore to clean up CSS
// (I will leave them in case they are used somewhere else or user reverts, it doesn't hurt)

fs.writeFileSync(path, content);
console.log("Applied AnimatedChatScreen to One brain!");
