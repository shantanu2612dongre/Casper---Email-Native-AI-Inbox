const fs = require('fs');
const path = '/Users/shantanudongre/Casper---Email-Native-AI-Inbox/src/components/WispsFeatureMockup.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add header CSS
const headerCss = `
        /* ---- Chat Header ---- */
        .wfm-chat-header {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          padding: 6px 44px 8px;
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .wfm-back {
          position: absolute;
          left: 10px;
          top: 6px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 1px 3px rgba(0,0,0,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1c1c1e;
          font-size: 15px;
          line-height: 1;
        }
        .wfm-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: linear-gradient(135deg, #dcdaff, #b9bcff);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
        }
        .wfm-avatar img {
          width: 66%;
          height: 66%;
          object-fit: contain;
        }
        .wfm-headertext {
          display: flex;
          flex-direction: column;
          align-items: center;
          line-height: 1.15;
        }
        .wfm-headertext .name {
          font-size: 11px;
          font-weight: 600;
          color: #0b0b0d;
        }
        .wfm-headertext .chevron {
          font-size: 7px;
          color: #9a9aa0;
        }
        .wfm-video {
          position: absolute;
          right: 12px;
          top: 8px;
          color: #007aff;
          width: 15px;
          height: 11px;
        }
`;

if (!content.includes('.wfm-chat-header {')) {
  content = content.replace('/* ---- Tone Memory ---- */', headerCss + '\n        /* ---- Tone Memory ---- */');
}

// 2. Modify Screen component to accept hideAppBar
const oldScreenComp = `function Screen({ active, title, pill, children }: { active: boolean, title: string, pill: string, children: React.ReactNode }) {
  return (
    <div className={\`wfm-screen-layer \${active ? "wfm-screen-layer--active" : ""}\`}>
      <div className="wfm-appbar">
        <span className="title">{title}</span>
        <span className="wfm-pill">
          <span className="wfm-pill-dot" />
          {pill}
        </span>
      </div>
      {children}
    </div>
  );
}`;

const newScreenComp = `function Screen({ active, title, pill, hideAppBar, children }: { active: boolean, title: string, pill: string, hideAppBar?: boolean, children: React.ReactNode }) {
  return (
    <div className={\`wfm-screen-layer \${active ? "wfm-screen-layer--active" : ""}\`}>
      {!hideAppBar && (
        <div className="wfm-appbar">
          <span className="title">{title}</span>
          <span className="wfm-pill">
            <span className="wfm-pill-dot" />
            {pill}
          </span>
        </div>
      )}
      {children}
    </div>
  );
}`;
content = content.replace(oldScreenComp, newScreenComp);

// 3. Inject the header into Screen 0
const oldScreen0 = `<Screen active={index === 0} title="wisps" pill="Tone Memory">`;
const newScreen0 = `<Screen active={index === 0} title="wisps" pill="Tone Memory" hideAppBar>
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
              </div>`;
content = content.replace(oldScreen0, newScreen0);

fs.writeFileSync(path, content);
console.log("Injected the iMessage header into Tone Memory mockup!");
