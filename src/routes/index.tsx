import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Inbox,
  Sparkles,
  Zap,
  Shield,
  Search,
  Bot,
  Check,
  Star,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Facebook,
  Mail,
  Send,
  Clock,
  FileText,
  Trash2,
} from "lucide-react";
import { SiGooglecalendar, SiGmail } from "react-icons/si";
import { Footer } from "../components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Casper — The Copilot for Your Professional Relationships" },
      {
        name: "description",
        content:
          "Casper learns how you write, drafts your replies, and handles the busywork — so you can focus on what matters.",
      },
      { property: "og:title", content: "Casper — The Copilot for Your Professional Relationships" },
      {
        property: "og:description",
        content: "An AI inbox that learns your voice and handles the busywork.",
      },
    ],
  }),
  component: Index,
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function Nav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/60"
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          className="flex items-center gap-2 font-semibold text-foreground tracking-tight text-xl"
        >
          <span
            aria-hidden
            className="inline-block h-5 w-7 rounded-sm"
            style={{ background: "var(--gradient-primary)" }}
          />
          Casper
        </a>
        <div className="hidden md:flex items-center gap-10 text-sm text-foreground/80">
          <a href="#pricing" className="hover:text-foreground transition-colors">
            Pricing
          </a>
          <a href="/enterprise" className="hover:text-foreground transition-colors">
            Enterprise
          </a>
          <a href="/for-agents" className="hover:text-foreground transition-colors">
            For Agents
          </a>
        </div>
        <div className="flex items-center gap-5">
          <a
            href="#"
            className="text-sm text-foreground/80 hover:text-foreground transition-colors"
          >
            Login
          </a>
          <a
            href="#"
            className="inline-flex items-center rounded-lg bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Get Started
          </a>
        </div>
      </nav>
    </motion.header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden py-28">
      {/* Centered text container with readable max-width */}
      <div className="relative max-w-4xl mx-auto px-6 pb-10 text-center flex flex-col items-center">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="text-5xl md:text-7xl font-semibold tracking-tight text-foreground leading-[1.02]"
        >
          The copilot for your professional relationships.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="mx-auto mt-6 max-w-xl text-lg md:text-xl text-muted-foreground leading-relaxed"
        >
          Casper learns how you write, drafts your replies, and handles the busywork, so you can
          focus on what matters.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-10 flex items-center justify-center"
        >
          <a
            href="#"
            className="inline-flex items-center rounded-lg bg-foreground text-background px-6 py-3 text-base font-medium hover:opacity-90 transition-opacity"
          >
            Get Started
          </a>
        </motion.div>
      </div>

      {/* Expanded Mockup Container - showing large visual product walkthrough */}
      <div className="relative max-w-7xl mx-auto px-6 pb-24">
        <InboxMockup />
      </div>
    </section>
  );
}

function InboxMockup() {
  const rows = [
    {
      from: "Huỳnh Anh Tuấn",
      subject: "Partnership Opportunity – AI Email",
      preview: "Hi team, I wanted to reach out about…",
      tag: "Important",
      time: "12:21 PM",
      active: true,
    },
    {
      from: "Neil Patel",
      subject: "Have you optimized for agents yet?",
      preview: "You've heard everyone…",
      tag: "Newsletter",
      time: "12:07 PM",
    },
    {
      from: "Business Insider",
      subject: "Ending soon — 1 year for only $29",
      preview: "Limited time only. End…",
      tag: "Newsletter",
      time: "12:01 PM",
    },
    {
      from: "The Hustle",
      subject: "✨ A new kind of power suit",
      preview: "Plus: A popular plumber, a wi…",
      tag: "Newsletter",
      time: "11:30 AM",
    },
    {
      from: "Business Insider",
      subject: "Today: What Amazon's job cuts mean for you",
      preview: "Plus: More…",
      tag: "Newsletter",
      time: "10:52 AM",
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
      style={{ perspective: 1400 }}
      className="relative mx-auto mt-10 max-w-7xl"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="relative rounded-2xl p-3 md:p-4"
        style={{
          background: "var(--gradient-hero)",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        <div className="rounded-xl overflow-hidden bg-card border border-border/60 flex flex-col h-[520px]">
          {/* Window chrome */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/60 bg-muted/20">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[oklch(0.72_0.18_25)]" />
              <span className="h-3 w-3 rounded-full bg-[oklch(0.82_0.14_85)]" />
              <span className="h-3 w-3 rounded-full bg-[oklch(0.78_0.16_145)]" />
              <div className="ml-4 flex items-center gap-2 text-xs font-medium text-foreground/70">
                <Mail className="h-3.5 w-3.5" />
                <span>Inbox</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-background/50 border border-border/60 px-2.5 py-1 rounded-md max-w-xs w-48">
              <Search className="h-3.5 w-3.5" />
              <span>Search mail...</span>
            </div>
          </div>

          {/* Panes */}
          <div className="flex flex-1 min-h-0 divide-x divide-border/60">
            {/* Sidebar */}
            <aside className="hidden md:flex flex-col w-48 flex-shrink-0 bg-muted/10 py-3 text-xs">
              <div className="px-3 mb-4">
                <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-foreground text-background py-2 font-medium hover:opacity-90 transition-opacity">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Compose</span>
                </button>
              </div>
              <div className="space-y-1 px-2">
                {[
                  { icon: Inbox, label: "Inbox", count: 12, active: true },
                  { icon: Clock, label: "Snoozed" },
                  { icon: Send, label: "Sent" },
                  { icon: FileText, label: "Drafts", count: 3 },
                  { icon: Trash2, label: "Trash" },
                ].map((item) => (
                  <button
                    key={item.label}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md font-medium transition-colors ${
                      item.active
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <item.icon className="h-3.5 w-3.5" />
                      <span>{item.label}</span>
                    </div>
                    {item.count && (
                      <span className="text-[10px] bg-muted-foreground/10 px-1.5 py-0.5 rounded-full text-foreground/80">
                        {item.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <div className="mt-6 px-4 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider text-left">
                AI Agents
              </div>
              <div className="mt-2 space-y-1 px-2">
                {[
                  { label: "Auto-Drafting", active: true },
                  { label: "Meeting scheduler" },
                  { label: "Thread summarizer" },
                ].map((agent) => (
                  <button
                    key={agent.label}
                    className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md font-medium text-left transition-colors ${
                      agent.active
                        ? "text-primary-glow bg-primary-glow/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${agent.active ? "bg-primary-glow" : "bg-muted-foreground/30"}`}
                    />
                    <span className="truncate">{agent.label}</span>
                  </button>
                ))}
              </div>
            </aside>

            {/* Email List */}
            <section className="flex flex-col w-full md:w-80 flex-shrink-0 bg-card divide-y divide-border/60 overflow-y-auto">
              {rows.map((r, i) => (
                <div
                  key={i}
                  className={`p-4 text-xs text-left transition-colors relative ${
                    r.active ? "bg-muted/50" : "hover:bg-muted/20"
                  }`}
                >
                  {r.active && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-glow" />
                  )}
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-foreground">{r.from}</span>
                    <span className="text-[10px] text-muted-foreground">{r.time}</span>
                  </div>
                  <div className="font-medium text-foreground truncate mb-1">{r.subject}</div>
                  <div className="text-muted-foreground truncate">{r.preview}</div>
                  {r.tag && (
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="rounded bg-pink-wash/10 text-foreground/80 text-[10px] px-1.5 py-0.5 border border-pink-wash/20">
                        {r.tag}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </section>

            {/* Detail & AI Draft Pane */}
            <section className="hidden lg:flex flex-col flex-1 bg-muted/5 p-6 overflow-y-auto text-left">
              {/* Selected Email Header */}
              <div className="border-b border-border/60 pb-4 mb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      Partnership Opportunity – AI Email
                    </h3>
                    <div className="mt-1 text-xs text-muted-foreground flex items-center gap-1.5">
                      <span className="font-medium text-foreground">Huỳnh Anh Tuấn</span>
                      <span>&lt;tuan@breezeway.io&gt;</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    12:21 PM (10 minutes ago)
                  </span>
                </div>
              </div>

              {/* Selected Email Body */}
              <div className="text-xs text-foreground/90 leading-relaxed mb-6 space-y-2">
                <p>Hi team,</p>
                <p>
                  I've been following Casper and love what you are building. We have an active
                  developer base that uses automated agents, and we'd love to partner to enable
                  Casper's email tools for them.
                </p>
                <p>
                  Let me know if you have time for a quick intro call next week to discuss details.
                </p>
                <p className="text-muted-foreground">
                  Best,
                  <br />
                  Huỳnh Anh Tuấn
                </p>
              </div>

              {/* Casper AI Draft Section */}
              <div
                className="rounded-xl border border-border p-4 bg-card relative overflow-hidden"
                style={{
                  boxShadow: "0 4px 20px -2px oklch(0.7 0.16 230 / 0.08)",
                }}
              >
                {/* Glow/Gradient background border highlight */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary-glow via-pink-wash to-lavender-wash" />

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                    <Sparkles className="h-3.5 w-3.5 text-primary-glow" />
                    <span>Drafted by Casper</span>
                    <span className="text-[10px] font-normal text-muted-foreground">
                      (in your voice)
                    </span>
                  </div>
                  <span className="text-[9px] rounded-full bg-primary-glow/10 text-primary-glow px-2 py-0.5 font-medium border border-primary-glow/20 font-sans">
                    Ready to send
                  </span>
                </div>

                <div className="text-xs text-foreground/90 leading-relaxed space-y-2 mb-4 bg-muted/30 p-3 rounded-lg border border-border/40 font-serif italic">
                  <p>Hi Tuấn,</p>
                  <p>
                    Thanks for reaching out! This sounds like a great fit. Casper's MCP native
                    integration makes it super easy for developer agents to query and write emails.
                  </p>
                  <p>
                    Let's jump on a quick call next week. Would Wednesday at 3 PM PST work for you?
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <button className="inline-flex items-center justify-center rounded-lg bg-foreground text-background px-3 py-1.5 font-medium hover:opacity-90 transition-opacity">
                      <span>Approve &amp; Send</span>
                    </button>
                    <button className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-3 py-1.5 font-medium text-foreground hover:bg-muted transition-colors">
                      <span>Edit</span>
                    </button>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono">⌘Enter</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Logos() {
  const integrationLogos = [
    { name: "Breezeway", domain: "breezeway.io" },
    { name: "Stripe", domain: "stripe.com" },
    { name: "Slack", domain: "slack.com" },
    { name: "Intuit", domain: "intuit.com" },
    { name: "Zapier", domain: "zapier.com" },
    { name: "Ramp", domain: "ramp.com" },
    { name: "Lodgify", domain: "lodgify.com" },
    { name: "Hostaway", domain: "hostaway.com" },
    { name: "Airbnb", domain: "airbnb.com" },
    { name: "Vrbo", domain: "vrbo.com" },
    { name: "Guesty", domain: "guesty.com" },
    { name: "Hostfully", domain: "hostfully.com" },
  ];
  // Repeat the logos list multiple times so the track is wider than any viewport
  const marqueeLogos = [
    ...integrationLogos,
    ...integrationLogos,
    ...integrationLogos,
    ...integrationLogos,
  ];
  return (
    <section className="border-t border-border/60 overflow-hidden py-28">
      <div>
        <p className="text-center text-xs uppercase tracking-[0.18em] text-muted-foreground px-6">
          Trusted by professionals at
        </p>
        <div className="relative mt-10 w-full overflow-hidden py-4">
          {/* Edge fade gradients for premium aesthetic */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="flex w-max">
            {/* First sliding track */}
            <motion.div
              animate={{ x: ["0%", "-100%"] }}
              transition={{
                ease: "linear",
                duration: 180,
                repeat: Infinity,
              }}
              className="flex items-center gap-20 pr-20 shrink-0"
            >
              {marqueeLogos.map((logo, i) => (
                <span
                  key={`l1-${i}`}
                  className="text-lg md:text-xl font-semibold tracking-tight text-muted-foreground/60 hover:text-foreground transition-colors duration-300 pointer-events-none select-none"
                >
                  {logo.name}
                </span>
              ))}
            </motion.div>

            {/* Second sliding track to maintain seamless loop */}
            <motion.div
              animate={{ x: ["0%", "-100%"] }}
              transition={{
                ease: "linear",
                duration: 120,
                repeat: Infinity,
              }}
              className="flex items-center gap-20 pr-20 shrink-0"
              aria-hidden="true"
            >
              {marqueeLogos.map((logo, i) => (
                <span
                  key={`l2-${i}`}
                  className="text-lg md:text-xl font-semibold tracking-tight text-muted-foreground/60 hover:text-foreground transition-colors duration-300 pointer-events-none select-none"
                >
                  {logo.name}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: Sparkles,
    title: "Drafts in your voice",
    desc: "Casper studies the way you write and proposes replies that actually sound like you.",
  },
  {
    icon: Inbox,
    title: "Auto-organized inbox",
    desc: "Newsletters, receipts, and noise are quietly tucked away so only what matters stays in view.",
  },
  {
    icon: Bot,
    title: "Background agents",
    desc: "Schedule meetings, summarize threads, and follow up — without lifting a finger.",
  },
  {
    icon: Search,
    title: "Ask your inbox",
    desc: "Search like you think. Find any email, attachment, or detail with a single question.",
  },
  {
    icon: Zap,
    title: "Your personal email assistant",
    desc: "Set custom rules that automatically handle CCs, apply templates, and trigger actions based on who you're emailing.",
  },
  {
    icon: Shield,
    title: "Private by default",
    desc: "End-to-end encrypted. We never train on your mail — your inbox stays yours.",
  },
];

const draftVoiceLines = [
  "Hi Sarah,",
  "Thanks for sending the updated deck — the direction feels much sharper now.",
  "I added one thought on positioning and the rollout timeline.",
  "Best,",
  "Alex",
];

const draftThreadContext = [
  {
    sender: "Maya Patel",
    time: "Yesterday at 2:09 PM",
    body: "Did you get a chance to look at the updated deck yet? Curious what you think.",
    initials: "MP",
  },
  {
    sender: "You",
    time: "Today at 1:16 PM",
    body: "Yeah, I went through it this morning. It looks strong overall — want me to tighten slide 6?",
    initials: "A",
  },
];

function DraftVoiceAnimation() {
  const [displayLines, setDisplayLines] = useState<string[]>(
    Array.from({ length: draftVoiceLines.length }, () => ""),
  );
  const [activeLine, setActiveLine] = useState(0);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

    const setLineText = (lineIndex: number, text: string) => {
      setDisplayLines((current) => {
        const next = [...current];
        next[lineIndex] = text;
        return next;
      });
    };

    const typeLine = async (lineIndex: number, text: string, speed: number) => {
      setActiveLine(lineIndex);
      for (let index = 1; index <= text.length; index += 1) {
        if (cancelled) {
          return;
        }
        setLineText(lineIndex, text.slice(0, index));
        await sleep(speed);
      }
      await sleep(220);
    };

    const eraseLine = async (lineIndex: number, fromText: string, speed: number) => {
      setActiveLine(lineIndex);
      for (let index = fromText.length; index >= 0; index -= 1) {
        if (cancelled) {
          return;
        }
        setLineText(lineIndex, fromText.slice(0, index));
        await sleep(speed);
      }
      await sleep(160);
    };

    const run = async () => {
      setIsSending(false);
      setDisplayLines(Array.from({ length: draftVoiceLines.length }, () => ""));

      await typeLine(0, draftVoiceLines[0], 52);
      await typeLine(1, draftVoiceLines[1], 24);
      await typeLine(2, draftVoiceLines[2], 22);

      await sleep(700);
      await eraseLine(2, draftVoiceLines[2], 20);
      await typeLine(2, "I added one thought on positioning and the rollout timeline.", 20);
      await sleep(360);
      await typeLine(3, draftVoiceLines[3], 54);
      await typeLine(4, draftVoiceLines[4], 50);
      await sleep(1100);

      if (!cancelled) {
        setActiveLine(-1);
        setIsSending(true);
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="bg-gradient-to-br from-card to-muted/30 border border-border rounded-2xl p-6 w-[26rem] shadow-xl">
        {/* Email Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/60">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                boxShadow: isSending
                  ? "0 0 20px rgba(99, 102, 241, 0.3)"
                  : "0 0 10px rgba(99, 102, 241, 0.1)",
              }}
              transition={{ duration: 0.3 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-glow/20 to-primary/10 flex items-center justify-center border border-primary-glow/30"
            >
              <Sparkles className="h-5 w-5 text-primary-glow" />
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">AI Draft</span>
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-green-500"
                />
              </div>
              <span className="text-[10px] text-muted-foreground">Writing in your voice</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-[10px] text-muted-foreground">
              {isSending ? "Ready to send" : "Drafting..."}
            </div>
            <motion.div
              animate={{
                scale: isSending ? [1, 1.1, 1] : 1,
                backgroundColor: isSending ? "#22c55e" : "#6366f1",
              }}
              transition={{ duration: 0.3 }}
              className="w-2 h-2 rounded-full"
            />
          </div>
        </div>

        {/* Email Body */}
        <div className="space-y-4">
          {/* From/To/Subject */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground w-12">From:</span>
              <span className="text-foreground font-medium">alex@company.com</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground w-12">To:</span>
              <span className="text-foreground font-medium">sarah@partner.io</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground w-12">Subject:</span>
              <span className="text-foreground">Re: Partnership update</span>
            </div>
          </div>

          {/* Context Preview */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="rounded-lg bg-muted/30 border border-border/40 p-3"
          >
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-2">
              <span className="font-medium">Thread context</span>
              <span className="text-muted-foreground/60">•</span>
              <span>2 messages</span>
            </div>
            <div className="space-y-2">
              {draftThreadContext.map((message, messageIndex) => (
                <div
                  key={`${message.sender}-${messageIndex}`}
                  className="flex items-start gap-2 text-[10px]"
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-semibold shrink-0 ${
                      message.sender === "You"
                        ? "bg-foreground text-background"
                        : "bg-primary/20 text-primary"
                    }`}
                  >
                    {message.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-foreground truncate">
                        {message.sender}
                      </span>
                      <span className="text-muted-foreground/60 truncate">
                        {message.body}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Draft Content */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="rounded-xl border-2 border-dashed border-border/60 bg-background/50 p-4 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-primary-glow/5 to-transparent"
              animate={{
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <div className="relative space-y-2 text-sm leading-relaxed text-foreground">
              {displayLines.map((line, lineIndex) => (
                <motion.div
                  key={`draft-line-${lineIndex}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: lineIndex * 0.1, duration: 0.3 }}
                  className="min-h-[1.5rem] flex items-start"
                >
                  <span className={lineIndex >= 3 ? "font-medium" : ""}>{line}</span>
                  {lineIndex === activeLine && !isSending && (
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="ml-1 inline-block h-4 w-[2px] rounded-full bg-primary-glow align-middle"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isSending ? { opacity: 1, y: 0 } : { opacity: 0.6, y: 10 }}
          transition={{ duration: 0.4 }}
          className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <motion.div
              animate={{
                scale: isSending ? [1, 1.2, 1] : 1,
              }}
              transition={{ duration: 0.5, repeat: isSending ? Infinity : 0 }}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/10 flex items-center justify-center border border-green-500/30"
            >
              <Check className="h-4 w-4 text-green-500" />
            </motion.div>
            <span className="text-xs text-muted-foreground">
              {isSending ? "Sounds like you" : "Generating..."}
            </span>
          </div>
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-foreground to-foreground/90 px-4 py-2 text-xs font-medium text-background shadow-lg hover:shadow-xl transition-shadow"
          >
            <Send className="h-3.5 w-3.5" />
            Send
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

function FeatureAnimation({ activeFeature }: { activeFeature: number }) {
  const animations = [
    // Drafts in your voice
    <div className="w-full h-full flex items-center justify-center">
      <DraftVoiceAnimation />
    </div>,
    // Auto-organized inbox
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="bg-card border border-border rounded-2xl p-4 w-72 shadow-lg">
          <div className="space-y-2">
            {[
              { label: "Important", color: "bg-green-500/20" },
              { label: "Newsletter", color: "bg-blue-500/20" },
              { label: "Receipts", color: "bg-yellow-500/20" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.15, duration: 0.4 }}
                className="flex items-center gap-3 p-2 rounded-lg bg-muted/30"
              >
                <div className={`w-2 h-2 rounded-full ${item.color}`} />
                <span className="text-xs text-foreground">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>,
    // Background agents
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="bg-card border border-border rounded-2xl p-6 w-80 shadow-lg">
          <div className="flex items-center justify-center gap-4">
            {[
              { icon: "📅", label: "Schedule" },
              { icon: "📝", label: "Summarize" },
              { icon: "✉️", label: "Follow-up" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: i * 0.2, duration: 0.5, type: "spring" }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl">
                  {item.icon}
                </div>
                <span className="text-[10px] text-muted-foreground">{item.label}</span>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-4 text-center text-xs text-muted-foreground"
          >
            Running in background...
          </motion.div>
        </div>
      </motion.div>
    </div>,
    // Ask your inbox
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="bg-card border border-border rounded-2xl p-6 w-80 shadow-lg">
          <div className="flex items-center gap-2 bg-muted/30 rounded-lg px-4 py-3 mb-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-sm text-foreground"
            >
              "Find receipts from last month"
            </motion.span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="space-y-2"
          >
            <div className="p-3 rounded-lg bg-muted/20 border border-border/60">
              <div className="text-xs font-medium text-foreground">Amazon Receipt</div>
              <div className="text-[10px] text-muted-foreground">Dec 15, 2024</div>
            </div>
            <div className="p-3 rounded-lg bg-muted/20 border border-border/60">
              <div className="text-xs font-medium text-foreground">Uber Receipt</div>
              <div className="text-[10px] text-muted-foreground">Dec 12, 2024</div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>,
    // Your personal email assistant
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="bg-card border border-border rounded-2xl p-6 w-80 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-yellow-500" />
            <span className="text-sm font-medium text-foreground">Custom Rules</span>
          </div>
          <div className="space-y-3">
            {[
              { rule: "Auto-CC team", action: "When emailing clients", icon: "👥" },
              { rule: "Apply template", action: "For project updates", icon: "📝" },
              { rule: "Create event", action: "When scheduling meetings", icon: "📅" },
            ].map((item, i) => (
              <motion.div
                key={item.rule}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/40"
              >
                <span className="text-lg">{item.icon}</span>
                <div className="flex-1">
                  <div className="text-xs font-medium text-foreground">{item.rule}</div>
                  <div className="text-[10px] text-muted-foreground">{item.action}</div>
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.15, duration: 0.3 }}
                  className="w-2 h-2 rounded-full bg-green-500"
                />
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-4 text-center text-xs text-muted-foreground"
          >
            Rules running automatically...
          </motion.div>
        </div>
      </motion.div>
    </div>,
    // Private by default
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="bg-card border border-border rounded-2xl p-6 w-80 shadow-lg">
          <div className="flex items-center justify-center mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center"
            >
              <Shield className="h-8 w-8 text-green-500" />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="space-y-2 text-center"
          >
            <div className="text-xs font-medium text-foreground">End-to-end encrypted</div>
            <div className="text-[10px] text-muted-foreground">
              Your data never leaves your device
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-4 flex justify-center gap-1"
          >
            {["🔒", "🔒", "🔒"].map((lock, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + i * 0.1, duration: 0.3 }}
                className="text-xl"
              >
                {lock}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>,
  ];

  return animations[activeFeature];
}

function Features() {
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="features" className="relative py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            Email that thinks ahead.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            A quiet, intelligent layer over your inbox — no plug-ins, no extra apps, no learning
            curve.
          </p>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Feature list */}
          <div className="space-y-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                onClick={() => setActiveFeature(i)}
                className={`p-5 rounded-xl border cursor-pointer transition-all ${
                  activeFeature === i
                    ? "bg-card border-primary-glow/50 shadow-lg"
                    : "bg-card/50 border-border/60 hover:border-border hover:bg-card"
                }`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                      activeFeature === i
                        ? "bg-primary-glow/20 text-primary-glow"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <f.icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-foreground tracking-tight">
                      {f.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right side - Animation box */}
          <div className="relative">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-muted/20 to-card border border-border/60 rounded-3xl p-8 min-h-[400px] flex items-center justify-center shadow-xl"
            >
              <FeatureAnimation activeFeature={activeFeature} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OrbitalAnimation() {
  const apps = [
    {
      name: "Gmail",
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
          <path
            fill="#EA4335"
            d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
          />
        </svg>
      ),
    },
    {
      name: "Outlook",
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
          <path
            fill="#0078D4"
            d="M19.5 3h-15C3.1 3 2 4.1 2 5.5v13C2 19.9 3.1 21 4.5 21h15c1.4 0 2.5-1.1 2.5-2.5v-13C22 4.1 20.9 3 19.5 3zm-15 2h15c.3 0 .5.2.5.5v6.5l-2.5-2-3.5 3-3.5-3-2.5 2V5.5c0-.3.2-.5.5-.5zm15 14h-15c-.3 0-.5-.2-.5-.5v-5.5l2.5-2 3.5 3 3.5-3 2.5 2v5.5c0 .3-.2.5-.5.5z"
          />
        </svg>
      ),
    },
    {
      name: "Calendar",
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
          <path
            fill="#4285F4"
            d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"
          />
        </svg>
      ),
    },
    {
      name: "HubSpot",
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
          <path
            fill="#FF7A59"
            d="M18.164 7.93V5.086a2.572 2.572 0 0 0-2.572-2.572H8.408a2.572 2.572 0 0 0-2.572 2.572v2.844a2.572 2.572 0 0 0 0 5.14v2.844a2.572 2.572 0 0 0 2.572 2.572h7.184a2.572 2.572 0 0 0 2.572-2.572v-2.844a2.572 2.572 0 0 0 0-5.14zM8.408 4.514h7.184a1.572 1.572 0 0 1 1.572 1.572v1.844H6.836V6.086a1.572 1.572 0 0 1 1.572-1.572zm7.184 10.972H8.408a1.572 1.572 0 0 1-1.572-1.572v-1.844h10.328v1.844a1.572 1.572 0 0 1-1.572 1.572zm1.572-4.416H6.836v-3.072h10.328v3.072z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central Casper text */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 bg-card border border-border rounded-full px-6 py-3 shadow-lg"
      >
        <span className="text-lg font-semibold tracking-tight text-foreground">Casper</span>
      </motion.div>

      {/* Orbiting apps */}
      {apps.map((app, i) => {
        const angle = i * 90 * (Math.PI / 180);
        const radius = 70;

        return (
          <motion.div
            key={app.name}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
            className="absolute"
            style={{
              width: 40,
              height: 40,
            }}
          >
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                transformOrigin: "center center",
              }}
              className="w-full h-full"
            >
              <motion.div
                style={{
                  x: Math.cos(angle) * radius,
                  y: Math.sin(angle) * radius,
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
                  {app.logo}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      t: "Connect your inbox",
      d: "Sign in with Gmail or Outlook. Casper is live in seconds, no migration required.",
    },
    {
      n: "02",
      t: "It learns your voice",
      d: "Casper quietly studies how you write and what you care about — privately, on your account.",
    },
    {
      n: "03",
      t: "Reach inbox zero",
      d: "Triage, drafts, and follow-ups happen in the background. You just review and send.",
    },
  ];
  return (
    <section id="how" className="relative py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground max-w-2xl mx-auto text-center"
        >
          From signed-in to inbox zero in three steps.
        </motion.h2>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="relative rounded-2xl bg-card border border-border p-10 min-h-[400px] flex flex-col"
            >
              <span className="text-sm font-mono text-muted-foreground">{s.n}</span>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              <div className="mt-auto pt-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3, duration: 0.6 }}
                  className="h-32 bg-muted/30 rounded-lg flex items-center justify-center relative"
                >
                  {i === 0 && <OrbitalAnimation />}
                  {i === 1 && (
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="text-4xl"
                    >
                      🧠
                    </motion.div>
                  )}
                  {i === 2 && (
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="text-4xl"
                    >
                      ✨
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const pricing = {
    starter: { price: "$0", sub: "Free forever" },
    pro:
      billingCycle === "monthly"
        ? { price: "$29", sub: "per user / month" }
        : { price: "$290", sub: "per user / year" },
    enterprise: { price: "Custom", sub: "Talk to sales" },
  };

  const plans = [
    {
      name: "Starter",
      price: pricing.starter.price,
      sub: pricing.starter.sub,
      features: ["1 workspace", "5 active workflows", "Community support", "Casper AI starter"],
      cta: "Start free",
      featured: false,
    },
    {
      name: "Pro",
      price: pricing.pro.price,
      sub: pricing.pro.sub,
      features: ["Unlimited workflows", "All integrations", "Priority support", "Advanced agents"],
      cta: "Start 14-day trial",
      featured: true,
    },
    {
      name: "Enterprise",
      price: pricing.enterprise.price,
      sub: pricing.enterprise.sub,
      features: ["SSO & SAML", "Audit logs", "Dedicated CSM", "Custom SLAs"],
      cta: "Contact sales",
      featured: false,
    },
  ];
  return (
    <section id="pricing" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm text-primary font-medium">Pricing</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            Simple, transparent pricing.
          </h2>
          <p className="mt-4 text-muted-foreground">Start free. Scale when you're ready.</p>
        </div>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-full border border-border bg-card p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                billingCycle === "monthly"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("yearly")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                billingCycle === "yearly"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className={`relative rounded-2xl border p-7 ${
                p.featured
                  ? "border-transparent bg-foreground text-background shadow-[var(--shadow-soft)]"
                  : "border-border bg-card text-foreground"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-7 rounded-full bg-[image:var(--gradient-primary)] text-primary-foreground text-xs px-3 py-1">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold tracking-tight">{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl font-semibold tracking-tight">{p.price}</span>
                <span
                  className={`text-sm ${p.featured ? "text-background/70" : "text-muted-foreground"}`}
                >
                  {p.sub}
                </span>
              </div>
              <ul className="mt-6 space-y-2.5 text-sm">
                {p.features.map((ft) => (
                  <li key={ft} className="flex items-center gap-2">
                    <Check
                      className={`h-4 w-4 ${p.featured ? "text-primary-glow" : "text-primary"}`}
                    />
                    <span className={p.featured ? "text-background/90" : "text-foreground/80"}>
                      {ft}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`mt-7 inline-flex w-full items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                  p.featured
                    ? "bg-background text-foreground hover:bg-background/90"
                    : "bg-foreground text-background hover:bg-foreground/90"
                }`}
              >
                {p.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative py-20">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-border/60 p-12 md:p-16 text-center"
          style={{
            background:
              "radial-gradient(80% 100% at 50% 0%, var(--lavender-wash) 0%, transparent 70%), radial-gradient(80% 100% at 50% 120%, var(--pink-wash) 0%, transparent 70%), var(--card)",
          }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            Ready to build something delightful?
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Join thousands of teams using Casper to ship workflows their customers love.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Get Started
            </a>
            <a
              href="#"
              className="inline-flex items-center rounded-full border border-border bg-card/70 px-6 py-3 text-sm font-medium text-foreground hover:bg-card transition-colors"
            >
              Book a demo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      <Nav />
      <Hero />
      <Logos />
      <Features />
      <HowItWorks />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
