const fs = require('fs');
const path = '/Users/shantanudongre/Casper---Email-Native-AI-Inbox/src/components/WispsFeatureMockup.tsx';
let content = fs.readFileSync(path, 'utf8');

const conversationCode = `
const CONVERSATION = [
  { from: "wisps", text: "hey — linda's been asking about the last PR's git issues" },
  { from: "user", text: "what is it" },
  { from: "wisps", text: "found two: the CI lint step is failing on the auth module, and the migration script conflicts with main" },
  { from: "wisps", text: "want me to let her know?" },
  { from: "user", text: "yes" },
  { from: "wisps", text: "here's what I'd send — \\"hey linda, found two issues on the last PR: the CI lint step's failing on auth, and the migration script conflicts with main. want me to open tickets for both?\\"" },
];
const SUGGESTIONS = ["Send it", "Let me edit"];
`;

// Inject conversation array
if (!content.includes('const CONVERSATION')) {
  content = content.replace('const AUTOPLAY_MS = 4000;', conversationCode + '\nconst AUTOPLAY_MS = 4000;');
}

const chatCss = `
        .wfm-chat {
          flex: 1;
          padding: 10px 10px 6px;
          display: flex;
          flex-direction: column;
          gap: 5px;
          overflow: hidden;
          background: #f5f5f7;
        }
        .wfm-bubble {
          max-width: 82%;
          padding: 7px 11px;
          border-radius: 14px;
          font-size: 9.5px;
          line-height: 1.35;
        }
        .wfm-bubble--user {
          align-self: flex-end;
          background: #007aff;
          color: #fff;
          border-bottom-right-radius: 4px;
        }
        .wfm-bubble--wisps {
          align-self: flex-start;
          background: #e9e9eb;
          color: #0b0b0d;
          border-bottom-left-radius: 4px;
        }
        .wfm-suggestions {
          display: flex;
          gap: 4px;
          padding: 0 10px 6px;
          background: #f5f5f7;
        }
        .wfm-suggestion-chip {
          font-size: 8.5px;
          font-weight: 500;
          color: #007aff;
          background: #fff;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 10px;
          padding: 4px 8px;
        }
        .wfm-inputbar {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px 12px;
          background: #f5f5f7;
        }
        .wfm-inputpill {
          flex: 1;
          height: 24px;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.12);
          background: #fff;
          display: flex;
          align-items: center;
          padding: 0 10px;
          font-size: 9px;
          color: #9a9aa0;
        }
`;

// Inject CSS
if (!content.includes('.wfm-chat {')) {
  content = content.replace('/* ---- Tone Memory ---- */', chatCss + '\n        /* ---- Tone Memory ---- */');
}

const oldScreen0 = `<Screen active={index === 0} title="Alex Chen" pill="Draft ready">
              <div className="wfm-compose">
                <div className="wfm-compose-meta">
                  Re: <b>Q4 report — final numbers?</b>
                </div>
                <div className="wfm-compose-body">
                  "hey, can you send the finalized Q4 numbers before the board call tomorrow?"
                </div>
                <div className="wfm-draft-card">
                  <div className="wfm-draft-label">
                    <span className="wfm-draft-ghost" />
                    WISPS DRAFT — TONE MEMORY
                  </div>
                  <div className="wfm-draft-text">
                    "yep — finalizing now, you'll have it by 6pm tonight, ahead of the call."
                  </div>
                  <div className="wfm-draft-btn">Use draft</div>
                </div>
              </div>
            </Screen>`;

const newScreen0 = `<Screen active={index === 0} title="wisps" pill="Tone Memory">
              <div className="wfm-chat">
                {CONVERSATION.map((m, i) => (
                  <div key={i} className={\`wfm-bubble wfm-bubble--\${m.from}\`}>
                    {m.text}
                  </div>
                ))}
              </div>
              <div className="wfm-suggestions">
                {SUGGESTIONS.map((s) => (
                  <span className="wfm-suggestion-chip" key={s}>{s}</span>
                ))}
              </div>
              <div className="wfm-inputbar">
                <div className="wfm-inputpill">iMessage</div>
              </div>
            </Screen>`;

content = content.replace(oldScreen0, newScreen0);

fs.writeFileSync(path, content);
console.log("Updated Tone Memory screen with chat style successfully!");
