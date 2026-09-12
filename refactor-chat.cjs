const fs = require('fs');
const path = '/Users/shantanudongre/Casper---Email-Native-AI-Inbox/src/components/WispsFeatureMockup.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Replace ToneMemoryScreen with AnimatedChatScreen
const toneMemoryRegex = /function ToneMemoryScreen\(\{ active \}: \{ active: boolean \}\) \{[\s\S]*?return \([\s\S]*?<\/Screen>\s*\);\s*\}/;

const animatedChatScreenCode = `
function AnimatedChatScreen({ active, title, pill, conversation, suggestions, timing }: { active: boolean, title: string, pill: string, conversation: any[], suggestions: string[], timing: any[] }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typingFrom, setTypingFrom] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const timers = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (!active) {
       setVisibleCount(0);
       setTypingFrom(null);
       setShowSuggestions(false);
       return;
    }

    function clearAll() {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    }

    function schedule(fn: () => void, delay: number) {
      const id = setTimeout(fn, delay);
      timers.current.push(id);
      return id;
    }

    function runStep(index: number) {
      if (index >= conversation.length) {
        schedule(() => setShowSuggestions(true), 450);
        schedule(() => {
          setVisibleCount(0);
          setTypingFrom(null);
          setShowSuggestions(false);
          schedule(() => runStep(0), RESET_PAUSE);
        }, HOLD_AFTER_LAST);
        return;
      }

      const { pre, typing } = timing[index];
      const msg = conversation[index];

      schedule(() => {
        if (typing > 0) {
          setTypingFrom(msg.from);
          schedule(() => {
            setTypingFrom(null);
            setVisibleCount(index + 1);
            runStep(index + 1);
          }, typing);
        } else {
          setVisibleCount(index + 1);
          runStep(index + 1);
        }
      }, pre);
    }

    runStep(0);
    return clearAll;
  }, [active, conversation, timing]);

  return (
    <Screen active={active} title={title} pill={pill} hideAppBar>
      <div className="wfm-chat-header">
        <span className="wfm-back">‹</span>
        <div className="wfm-avatar">
          <img src="/wisps-logo.svg" alt="wisps" />
        </div>
        <div className="wfm-headertext">
          <span className="name">wisps</span>
          <span className="chevron">›</span>
        </div>
        <svg className="wfm-video" viewBox="0 0 20 15" fill="currentColor">
          <rect x="0" y="1.5" width="13" height="12" rx="2.5" />
          <path d="M13 5.5l6-3.5v11l-6-3.5z" />
        </svg>
      </div>
      <div className="wfm-chat">
        {conversation.slice(0, visibleCount).map((m, i) => (
          <div key={i} className={\`wfm-bubble wfm-bubble--\${m.from}\`}>
            {m.text}
          </div>
        ))}
        {typingFrom === "wisps" && <TypingBubble />}
      </div>
      {showSuggestions && (
        <div className="wfm-suggestions">
          {suggestions.map((s) => (
            <span className="wfm-suggestion-chip" key={s}>{s}</span>
          ))}
        </div>
      )}
      <div className="wfm-inputbar">
        <div className="wfm-inputpill">iMessage</div>
      </div>
    </Screen>
  );
}

const SMART_FOLLOWUP_CONVERSATION = [
  { from: "wisps", text: "hey — remember Sarah from Nimbus? she emailed 3 weeks ago asking about enterprise pricing, never got a reply" },
  { from: "user", text: "oh damn, totally forgot about that" },
  { from: "wisps", text: "she just posted on LinkedIn that they're finalizing a vendor by friday" },
  { from: "wisps", text: "might be worth closing the loop today" },
  { from: "user", text: "yeah, send something" },
  { from: "wisps", text: "here's what I'd send — \\"hi sarah, sorry for the delay! here's our enterprise pricing: [link]. happy to hop on a call before friday if that's useful.\\"" },
];

const SMART_FOLLOWUP_SUGGESTIONS = ["Use draft", "Edit"];

const SMART_FOLLOWUP_TIMING = [
  { pre: 600, typing: 1500 },
  { pre: 500, typing: 0 },
  { pre: 500, typing: 1200 },
  { pre: 400, typing: 800 },
  { pre: 700, typing: 0 },
  { pre: 500, typing: 1800 },
];
`;

content = content.replace(toneMemoryRegex, animatedChatScreenCode);

// 2. Update usage of ToneMemoryScreen for index 0
content = content.replace(
  '<ToneMemoryScreen active={index === 0} />',
  '<AnimatedChatScreen active={index === 0} title="wisps" pill="Tone Memory" conversation={CONVERSATION} suggestions={SUGGESTIONS} timing={TIMING} />'
);

// 3. Replace Screen 3 (Smart follow-ups)
const screen3Regex = /\{\/\*\s*3\s*—\s*Smart\s*follow-ups\s*\*\/\}\s*<Screen\s*active=\{index\s*===\s*3\}[\s\S]*?<\/Screen>/;
content = content.replace(
  screen3Regex,
  `{/* 3 — Smart follow-ups */}
            <AnimatedChatScreen active={index === 3} title="wisps" pill="Smart follow-ups" conversation={SMART_FOLLOWUP_CONVERSATION} suggestions={SMART_FOLLOWUP_SUGGESTIONS} timing={SMART_FOLLOWUP_TIMING} />`
);

fs.writeFileSync(path, content);
console.log("Refactored to AnimatedChatScreen and applied to Smart follow-ups!");
