const fs = require('fs');
const path = '/Users/shantanudongre/Casper---Email-Native-AI-Inbox/src/components/WispsFeatureMockup.tsx';
let content = fs.readFileSync(path, 'utf8');

const regex = /function AnimatedChatScreen[\s\S]*?<\/Screen>\s*;\s*\}/;

const newComponent = `function AnimatedChatScreen({ active, title, pill, conversation, suggestions, timing }: { active: boolean, title: string, pill: string, conversation: any[], suggestions: string[], timing: any[] }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typingFrom, setTypingFrom] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const timers = useRef<NodeJS.Timeout[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);

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

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [visibleCount, typingFrom, showSuggestions]);

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
      <div className="wfm-chat" ref={chatRef} style={{ scrollBehavior: 'smooth' }}>
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
}`;

content = content.replace(regex, newComponent);

fs.writeFileSync(path, content);
console.log("Added auto-scroll to AnimatedChatScreen!");
