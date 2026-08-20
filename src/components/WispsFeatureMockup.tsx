import React, { useEffect, useState } from "react";

/**
 * WispsFeatureMockup
 * ------------------------------------------------------------------
 * A single phone mockup that stays put in the features-section art
 * box while its SCREEN CONTENT swaps to match whichever feature is
 * currently highlighted. Built to be driven by your existing
 * feature-rotation timer — just pass the active index down:
 *
 *   <WispsFeatureMockup activeIndex={activeFeatureIndex} />
 *
 * Index order matches the feature copy top-to-bottom:
 *   0 = Drafts in your voice
 *   1 = Auto-organized inbox
 *   2 = Ask your inbox
 *   3 = Smart follow-ups
 *
 * If no activeIndex prop is passed, it free-runs on its own timer
 * (4s per screen) so it's previewable standalone — remove that
 * fallback once it's wired to your real timer, or just leave it,
 * since passing activeIndex always overrides it.
 *
 * The component renders ONLY the phone — no background box. Drop it
 * inside your existing textured art box and it'll fill/center itself
 * via the wrapper's max-width; it does not fight your box's size.
 * ------------------------------------------------------------------
 */

const AUTOPLAY_MS = 4000;

export default function WispsFeatureMockup({ activeIndex }: { activeIndex?: number }) {
  const [internalIndex, setInternalIndex] = useState(0);
  const controlled = typeof activeIndex === "number";
  const index = controlled ? activeIndex : internalIndex;

  useEffect(() => {
    if (controlled) return;
    const id = setInterval(() => {
      setInternalIndex((i) => (i + 1) % 4);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [controlled]);

  return (
    <div className="wfm-wrap">
      <style>{`
        .wfm-wrap {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .wfm-phone {
          position: relative;
          height: 100%;
          max-height: 580px;
          aspect-ratio: 9 / 19.5;
          background: linear-gradient(155deg, #3a3a3f, #0b0b0d 40%);
          border-radius: 46px;
          padding: 4px;
          box-sizing: border-box;
          box-shadow:
            0 30px 60px -20px rgba(20, 20, 40, 0.5),
            0 0 0 1px rgba(255,255,255,0.08) inset;
        }
        .wfm-btn {
          position: absolute;
          background: linear-gradient(180deg, #232326, #08080a);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.05);
        }
        .wfm-btn--action { left: -2px; top: 15%; width: 2px; height: 16px; border-radius: 1px 0 0 1px; }
        .wfm-btn--vol-up { left: -2px; top: 25%; width: 2px; height: 34px; border-radius: 1px 0 0 1px; }
        .wfm-btn--vol-down { left: -2px; top: 34%; width: 2px; height: 34px; border-radius: 1px 0 0 1px; }
        .wfm-btn--power { right: -2px; top: 27%; width: 2px; height: 48px; border-radius: 0 1px 1px 0; }
        .wfm-screen {
          position: relative;
          width: 100%;
          height: 100%;
          background: #f5f5f7;
          border-radius: 40px;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif;
        }
        .wfm-island {
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 68px;
          height: 20px;
          background: #0b0b0d;
          border-radius: 16px;
          z-index: 6;
        }
        .wfm-statusbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 18px 2px;
          font-size: 11px;
          font-weight: 600;
          color: #0b0b0d;
        }
        .wfm-appbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 14px 6px;
        }
        .wfm-appbar .title {
          font-size: 15px;
          font-weight: 700;
          color: #0b0b0d;
        }
        .wfm-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 8.5px;
          font-weight: 600;
          color: #2b8a5e;
          background: #e3f5ea;
          padding: 3px 7px;
          border-radius: 10px;
        }
        .wfm-pill-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #2b8a5e;
        }
        .wfm-screens {
          position: relative;
          flex: 1;
          height: calc(100% - 58px);
        }
        .wfm-screen-layer {
          position: absolute;
          inset: 0;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.45s ease, transform 0.45s ease;
          pointer-events: none;
          display: flex;
          flex-direction: column;
        }
        .wfm-screen-layer--active {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        /* ---- Auto-organized inbox ---- */
        .wfm-list { padding: 4px 12px; display: flex; flex-direction: column; gap: 1px; overflow: hidden; }
        .wfm-row { display: flex; align-items: center; gap: 7px; padding: 7px 4px; border-bottom: 1px solid rgba(0,0,0,0.05); }
        .wfm-row--highlight { background: #e9f0fb; border-radius: 8px; }
        .wfm-dot { width: 6px; height: 6px; border-radius: 50%; background: #4c8dff; flex-shrink: 0; }
        .wfm-dot--hidden { background: transparent; }
        .wfm-row-main { flex: 1; min-width: 0; }
        .wfm-row-top { display: flex; align-items: center; justify-content: space-between; gap: 6px; }
        .wfm-sender { font-size: 10.5px; font-weight: 700; color: #0b0b0d; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .wfm-time { font-size: 8.5px; color: #9a9aa0; flex-shrink: 0; }
        .wfm-subject { font-size: 9.5px; color: #6b6e79; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .wfm-tag { font-size: 7.5px; font-weight: 700; padding: 1px 6px; border-radius: 6px; margin-top: 2px; display: inline-block; }
        .wfm-tag--important { background: #fde4e1; color: #c8503b; }
        .wfm-tag--work { background: #e2ecfd; color: #3268c9; }
        .wfm-tag--calendar { background: #efe4fb; color: #7f4bcf; }
        .wfm-tag--newsletter { background: #fbecd6; color: #b8791c; }

        /* ---- Drafts in your voice ---- */
        .wfm-compose { padding: 10px 14px; display: flex; flex-direction: column; gap: 8px; }
        .wfm-compose-meta { font-size: 9.5px; color: #9a9aa0; border-bottom: 1px solid rgba(0,0,0,0.06); padding-bottom: 6px; }
        .wfm-compose-meta b { color: #0b0b0d; font-weight: 600; }
        .wfm-compose-body { font-size: 10px; color: #4a4a4f; line-height: 1.5; }
        .wfm-draft-card { margin-top: 4px; background: #f0eeff; border: 1px solid #d8d4ff; border-radius: 12px; padding: 9px 10px; }
        .wfm-draft-label { display: flex; align-items: center; gap: 5px; font-size: 8.5px; font-weight: 700; color: #6a63e0; margin-bottom: 5px; }
        .wfm-draft-ghost { width: 10px; height: 10px; border-radius: 50%; background: #6a63e0; flex-shrink: 0; }
        .wfm-draft-text { font-size: 9.5px; color: #2c2a3a; line-height: 1.5; }
        .wfm-draft-btn { margin-top: 8px; align-self: flex-start; font-size: 8.5px; font-weight: 700; color: #fff; background: #6a63e0; padding: 5px 11px; border-radius: 8px; }

        /* ---- Ask your inbox ---- */
        .wfm-ask { padding: 10px 14px; display: flex; flex-direction: column; gap: 10px; }
        .wfm-search-bar { display: flex; align-items: center; gap: 6px; background: #fff; border: 1px solid rgba(0,0,0,0.1); border-radius: 12px; padding: 8px 10px; font-size: 10px; color: #0b0b0d; }
        .wfm-search-bar svg { flex-shrink: 0; color: #9a9aa0; }
        .wfm-answer-card { background: #fff; border-radius: 12px; padding: 10px 11px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
        .wfm-answer-label { font-size: 8px; font-weight: 700; letter-spacing: 0.03em; color: #9a9aa0; text-transform: uppercase; margin-bottom: 5px; }
        .wfm-answer-text { font-size: 10px; color: #2c2a3a; line-height: 1.5; }
        .wfm-answer-src { margin-top: 7px; font-size: 8.5px; color: #6a63e0; font-weight: 600; }

        /* ---- Smart follow-ups ---- */
        .wfm-follow { padding: 10px 14px; display: flex; flex-direction: column; gap: 8px; }
        .wfm-follow-card { background: #fff; border-radius: 12px; padding: 10px 11px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); display: flex; gap: 8px; }
        .wfm-follow-avatar { width: 26px; height: 26px; border-radius: 8px; background: #ffe3d6; color: #c8603a; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; flex-shrink: 0; }
        .wfm-follow-body { min-width: 0; }
        .wfm-follow-name { font-size: 10.5px; font-weight: 700; color: #0b0b0d; }
        .wfm-follow-sub { font-size: 9px; color: #6b6e79; margin-top: 1px; }
        .wfm-follow-badge { display: inline-flex; align-items: center; gap: 4px; margin-top: 6px; font-size: 8px; font-weight: 700; color: #2b8a5e; background: #e3f5ea; padding: 2px 7px; border-radius: 8px; }

        @media (prefers-reduced-motion: reduce) {
          .wfm-screen-layer { transition: none !important; }
        }
      `}</style>

      <div className="wfm-phone">
        <div className="wfm-btn wfm-btn--action" />
        <div className="wfm-btn wfm-btn--vol-up" />
        <div className="wfm-btn wfm-btn--vol-down" />
        <div className="wfm-btn wfm-btn--power" />

        <div className="wfm-screen">
          <div className="wfm-island" />

          <div className="wfm-statusbar">
            <span>9:41</span>
            <span></span>
          </div>

          <div className="wfm-screens">
            {/* 0 — Drafts in your voice */}
            <Screen active={index === 0} title="Alex Chen" pill="Draft ready">
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
                    WISPS DRAFT — IN YOUR VOICE
                  </div>
                  <div className="wfm-draft-text">
                    "yep — finalizing now, you'll have it by 6pm tonight, ahead of the call."
                  </div>
                  <div className="wfm-draft-btn">Use draft</div>
                </div>
              </div>
            </Screen>

            {/* 1 — Auto-organized inbox */}
            <Screen active={index === 1} title="All Mail" pill="Auto-organized">
              <div className="wfm-list">
                <Row dot sender="Product Hunt" time="3:45 PM" subject="You're featured today!" tag="important" />
                <Row dot sender="Figma" time="3:15 PM" subject="Design system updates" tag="work" />
                <Row dot sender="Jira" time="2:45 PM" subject="Sprint review in 30 mins" tag="calendar" />
                <Row dot sender="Alex Chen" time="2:15 PM" subject="Q4 report ready for review" tag="important" />
                <Row sender="Sarah Kim" time="1:42 PM" subject="Meeting notes from standup" tag="work" />
                <Row highlight sender="Notion" time="11:30 AM" subject="Your weekly digest is ready" tag="newsletter" />
              </div>
            </Screen>

            {/* 2 — Ask your inbox */}
            <Screen active={index === 2} title="Ask" pill="Searching">
              <div className="wfm-ask">
                <div className="wfm-search-bar">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4.3-4.3" />
                  </svg>
                  when's the sprint review?
                </div>
                <div className="wfm-answer-card">
                  <div className="wfm-answer-label">Answer</div>
                  <div className="wfm-answer-text">
                    Today at 2:45 PM — Jira sent a 30-minute heads-up. No prep doc attached.
                  </div>
                  <div className="wfm-answer-src">from: Jira · 2:45 PM</div>
                </div>
              </div>
            </Screen>

            {/* 3 — Smart follow-ups */}
            <Screen active={index === 3} title="Follow-ups" pill="1 resurfaced">
              <div className="wfm-follow">
                <div className="wfm-follow-card">
                  <div className="wfm-follow-avatar">AC</div>
                  <div className="wfm-follow-body">
                    <div className="wfm-follow-name">Alex Chen</div>
                    <div className="wfm-follow-sub">Q4 report — no reply in 4 days</div>
                    <div className="wfm-follow-badge">
                      <span className="wfm-pill-dot" />
                      Draft ready to send
                    </div>
                  </div>
                </div>
              </div>
            </Screen>
          </div>
        </div>
      </div>
    </div>
  );
}

function Screen({ active, title, pill, children }: { active: boolean, title: string, pill: string, children: React.ReactNode }) {
  return (
    <div className={`wfm-screen-layer ${active ? "wfm-screen-layer--active" : ""}`}>
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
}

function Row({ sender, time, subject, tag, dot, highlight }: { sender: string, time: string, subject: string, tag: string, dot?: boolean, highlight?: boolean }) {
  return (
    <div className={`wfm-row ${highlight ? "wfm-row--highlight" : ""}`}>
      <span className={`wfm-dot ${dot ? "" : "wfm-dot--hidden"}`} />
      <div className="wfm-row-main">
        <div className="wfm-row-top">
          <span className="wfm-sender">{sender}</span>
          <span className="wfm-time">{time}</span>
        </div>
        <div className="wfm-subject">{subject}</div>
        <span className={`wfm-tag wfm-tag--${tag}`}>
          {tag === "important" ? "Important" : tag === "work" ? "Work" : tag === "calendar" ? "Calendar" : "Newsletter"}
        </span>
      </div>
    </div>
  );
}
