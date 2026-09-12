const fs = require('fs');

const files = [
  '/Users/shantanudongre/Casper---Email-Native-AI-Inbox/src/routes/index.tsx',
  '/Users/shantanudongre/Casper---Email-Native-AI-Inbox/src/routes/about.tsx',
  '/Users/shantanudongre/Casper---Email-Native-AI-Inbox/src/components/WispsFeatureMockup.tsx',
  '/Users/shantanudongre/Casper---Email-Native-AI-Inbox/src/components/Testimonials.tsx',
  '/Users/shantanudongre/Casper---Email-Native-AI-Inbox/src/components/ui/testimonials-columns-1.tsx'
];

files.forEach(path => {
  if (fs.existsSync(path)) {
    let content = fs.readFileSync(path, 'utf8');
    
    // 1. "draft in your voice" -> "Tone Memory"
    content = content.replace(/Drafts in your voice/gi, "Tone Memory");
    content = content.replace(/Drafting response in your voice/g, "Drafting response using Tone Memory");
    content = content.replace(/\(in your voice\)/g, "(Tone Memory)");
    content = content.replace(/Writing in your voice/g, "Using Tone Memory");
    content = content.replace(/DRAFT — IN YOUR VOICE/g, "DRAFT — TONE MEMORY");
    content = content.replace(/learns your voice/g, "learns your tone"); // 'learns your tone' makes more grammatical sense than 'learns your tone memory'

    // 2. "Ask your inbox" -> "Ask anything"
    content = content.replace(/Ask your inbox/gi, "Ask anything");
    
    // 3. "Auto organized inbox" / "Auto-organized inbox" -> "One brain, every tool"
    content = content.replace(/Auto-organized inbox/gi, "One brain, every tool");
    content = content.replace(/Auto-Organized/gi, "One brain, every tool");

    fs.writeFileSync(path, content);
  }
});

console.log("Replaced copy text successfully!");
