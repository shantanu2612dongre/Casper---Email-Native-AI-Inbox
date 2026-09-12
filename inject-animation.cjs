const fs = require('fs');
const path = '/Users/shantanudongre/Casper---Email-Native-AI-Inbox/src/components/WispsFeatureMockup.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add useRef to imports
if (!content.includes('useRef')) {
  content = content.replace('import React, { useEffect, useState } from "react";', 'import React, { useEffect, useState, useRef } from "react";');
}

// Inject constants
const constants = `
const TIMING = [
  { pre: 600, typing: 1200 },
  { pre: 500, typing: 0 },
  { pre: 500, typing: 1500 },
  { pre: 500, typing: 900 },
  { pre: 700, typing: 0 },
  { pre: 500, typing: 1600 },
];
const HOLD_AFTER_LAST = 3600;
const RESET_PAUSE = 700;
`;
if (!content.includes('const TIMING =')) {
  content = content.replace('const AUTOPLAY_MS = 4000;', constants + '\nconst AUTOPLAY_MS = 4000;');
}

// Add ToneMemoryScreen and TypingBubble components
const components = `
function TypingBubble() {
  return (
    <div className="wfm-bubble wfm-bubble--wisps wfm-typing">
      <span className="wfm-dot" />
      <span className="wfm-dot" />
      <span className="wfm-dot" />
    </div>
  );
}

function ToneMemoryScreen({ active }: { active: boolean }) {
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
      if (index >= CONVERSATION.length) {
        schedule(() => setShowSuggestions(true), 450);
        schedule(() => {
          setVisibleCount(0);
          setTypingFrom(null);
          setShowSuggestions(false);
          schedule(() => runStep(0), RESET_PAUSE);
        }, HOLD_AFTER_LAST);
        return;
      }

      const { pre, typing } = TIMING[index];
      const msg = CONVERSATION[index];

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
  }, [active]);

  return (
    <Screen active={active} title="wisps" pill="Tone Memory" hideAppBar>
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
        {CONVERSATION.slice(0, visibleCount).map((m, i) => (
          <div key={i} className={\`wfm-bubble wfm-bubble--\${m.from}\`}>
            {m.text}
          </div>
        ))}
        {typingFrom === "wisps" && <TypingBubble />}
      </div>
      {showSuggestions && (
        <div className="wfm-suggestions">
          {SUGGESTIONS.map((s) => (
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

`;

if (!content.includes('function ToneMemoryScreen')) {
  content = content + '\n' + components;
}

// Add animation CSS
const animationCss = `
        @keyframes wfm-rise {
          from { opacity: 0; transform: translateY(8px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .wfm-bubble {
          max-width: 82%;
          padding: 7px 11px;
          border-radius: 14px;
          font-size: 9.5px;
          line-height: 1.35;
          animation: wfm-rise 0.32s ease-out;
        }
        .wfm-typing {
          display: flex;
          gap: 3px;
          align-items: center;
          padding: 7px 10px;
        }
        .wfm-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #9a9aa0;
          animation: wfm-bounce 1.1s infinite ease-in-out;
        }
        .wfm-dot:nth-child(2) { animation-delay: 0.15s; }
        .wfm-dot:nth-child(3) { animation-delay: 0.3s; }
        @keyframes wfm-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-2px); opacity: 1; }
        }
        .wfm-suggestions {
          display: flex;
          gap: 4px;
          padding: 0 10px 6px;
          background: #f5f5f7;
          animation: wfm-rise 0.28s ease-out;
        }
`;

// Replace existing wfm-bubble and wfm-suggestions definitions with animated versions
content = content.replace(/\.wfm-bubble\s*\{[^}]*\}/g, '');
content = content.replace(/\.wfm-suggestions\s*\{[^}]*\}/g, '');
if (!content.includes('@keyframes wfm-rise')) {
  content = content.replace('/* ---- Tone Memory ---- */', animationCss + '\n        /* ---- Tone Memory ---- */');
}

// Finally, replace Screen 0 in the render tree with the ToneMemoryScreen component
const oldScreen0 = /<Screen active=\{index === 0\}.*?<\/Screen>/s;
content = content.replace(oldScreen0, '<ToneMemoryScreen active={index === 0} />');

fs.writeFileSync(path, content);
console.log("Injected animation logic and state into WispsFeatureMockup!");
