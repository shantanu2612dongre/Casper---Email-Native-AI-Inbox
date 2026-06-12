import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Plug, Zap, Lock, Code2, Workflow, Boxes, ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/for-agents")({
  head: () => ({
    meta: [
      { title: "For Agents — Casper" },
      { name: "description", content: "Your inbox, now a tool call. Connect once and use Casper from Claude, ChatGPT, Cursor, or any agent via MCP." },
      { property: "og:title", content: "Casper for Agents" },
      { property: "og:description", content: "Connect once. Use Casper from any agent." },
    ],
  }),
  component: ForAgentsPage,
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: "easeOut" as const },
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
        <a href="/" className="flex items-center gap-2 font-semibold text-foreground tracking-tight text-xl">
          <span aria-hidden className="inline-block h-5 w-7 rounded-sm" style={{ background: "var(--gradient-primary)" }} />
          Casper
        </a>
        <div className="hidden md:flex items-center gap-10 text-sm text-foreground/80">
          <a href="/#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          <a href="/enterprise" className="hover:text-foreground transition-colors">Enterprise</a>
          <a href="/for-agents" className="text-foreground">For Agents</a>
          <a href="/#about" className="hover:text-foreground transition-colors">About</a>
        </div>
        <div className="flex items-center gap-5">
          <a href="#" className="text-sm text-foreground/80 hover:text-foreground transition-colors">Login</a>
          <a href="#" className="inline-flex items-center rounded-lg bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity">
            Get Started
          </a>
        </div>
      </nav>
    </motion.header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Soft sunrise wash, echoing the Casper palette */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.95 0.045 55) 0%, oklch(0.94 0.04 35) 35%, oklch(0.9 0.06 340) 70%, oklch(0.85 0.08 300) 100%)",
        }}
      />
      <div className="relative max-w-5xl mx-auto px-6 pt-28 pb-20 text-center">
        <motion.div
          variants={fadeUp} initial="hidden" animate="show" custom={0}
          className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs text-muted-foreground"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-foreground" /> MCP-ready · Works with any agent
        </motion.div>
        <motion.h1
          variants={fadeUp} initial="hidden" animate="show" custom={1}
          className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight text-foreground leading-[1.02]"
        >
          Your inbox,
          <br />now a tool call.
        </motion.h1>
        <motion.p
          variants={fadeUp} initial="hidden" animate="show" custom={2}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Connect once. Use Casper from Claude, ChatGPT, Cursor — or any agent that speaks MCP.
        </motion.p>
        <motion.div
          variants={fadeUp} initial="hidden" animate="show" custom={3}
          className="mt-9 flex items-center justify-center gap-3"
        >
          <a href="#" className="inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-5 py-3 text-sm font-medium hover:opacity-90 transition-opacity">
            Get Started for Free <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#docs" className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors">
            Read the docs
          </a>
        </motion.div>

        {/* Agent mockup */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show" custom={4}
          className="mt-16 mx-auto max-w-3xl rounded-2xl border border-border bg-card overflow-hidden"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border/70 bg-muted/40">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="p-10 text-left">
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center gap-2 text-2xl font-serif tracking-tight text-foreground">
                <span className="h-5 w-5 rounded-sm" style={{ background: "var(--gradient-hero)" }} />
                Claude
              </div>
            </div>
            <div className="rounded-xl border border-border bg-background p-4">
              <div className="text-sm text-foreground/90">What’s in my inbox today?</div>
              <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
                <button className="rounded-md border border-border h-7 w-7 grid place-items-center">+</button>
                <div className="flex items-center gap-2">
                  <span>Sonnet 4.6</span>
                  <span className="grid place-items-center h-7 w-7 rounded-md bg-foreground text-background">↑</span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Plug className="h-3.5 w-3.5" /> Connected to <span className="text-foreground font-medium">casper.inbox</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Agents() {
  const agents = ["Claude", "ChatGPT", "Cursor", "Windsurf", "Zed", "Raycast", "Perplexity", "Cline"];
  return (
    <section className="border-y border-border/60 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <p className="text-center text-xs uppercase tracking-[0.18em] text-muted-foreground">Works everywhere you work</p>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
          {agents.map((a, i) => (
            <motion.div
              key={a}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
              className="h-12 rounded-lg border border-border bg-background grid place-items-center text-sm text-foreground/80 hover:text-foreground transition-colors"
            >
              {a}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  const items = [
    { icon: Plug, title: "Connect once", desc: "OAuth into Gmail in seconds — every agent you authorize gets the same secure handle." },
    { icon: Zap, title: "Real-time tool calls", desc: "Read, search, draft, send, snooze, label — exposed as fast, typed tools." },
    { icon: Workflow, title: "Background agents", desc: "Hand off long-running flows: triage, follow-ups, weekly digests, auto-replies." },
    { icon: Boxes, title: "Structured context", desc: "Threads, labels, contacts and drafts returned as clean JSON, not raw HTML." },
    { icon: Code2, title: "MCP native", desc: "Drop into Claude Desktop, Cursor, or any MCP client with one URL." },
    { icon: Lock, title: "Scoped permissions", desc: "Granular per-agent scopes. Revoke anytime. We never train on your data." },
  ];
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="max-w-2xl"
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            One inbox. Every agent.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Casper turns your email into a first-class surface for AI agents — with the safety rails to actually let them act.
          </p>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
              className="rounded-2xl border border-border bg-card p-6 hover:bg-muted/40 transition-colors"
            >
              <div className="h-10 w-10 rounded-xl bg-muted grid place-items-center text-foreground">
                <it.icon className="h-5 w-5" />
              </div>
              <div className="mt-5 text-base font-semibold text-foreground">{it.title}</div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Connect your inbox", d: "Authorize Casper with Gmail in one click. No mailbox copy, no exports." },
    { n: "02", t: "Add the MCP endpoint", d: "Paste a single URL into Claude, Cursor or your own agent runtime." },
    { n: "03", t: "Let agents act", d: "Triage, reply, schedule and follow up — under scopes you control." },
  ];
  return (
    <section className="py-24 bg-muted/30 border-y border-border/60">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground max-w-2xl"
        >
          Wired up in under a minute.
        </motion.h2>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
              className="rounded-2xl border border-border bg-background p-7"
            >
              <div className="text-xs font-semibold tracking-wider text-muted-foreground">{s.n}</div>
              <div className="mt-3 text-xl font-semibold text-foreground">{s.t}</div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CodeBlock() {
  return (
    <section id="docs" className="py-24">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            A tool call, not a SDK.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            Casper speaks MCP out of the box. Point any compliant client at the endpoint and the tools show up — typed, documented, ready.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-foreground/90">
            {["Typed schemas for every action", "Streaming results for long lists", "Per-agent rate limits & audit log"].map((x) => (
              <li key={x} className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-0.5 text-foreground" /> {x}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
          className="rounded-2xl border border-border overflow-hidden bg-[oklch(0.16_0.01_260)]"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs text-white/50">claude_desktop_config.json</span>
          </div>
          <pre className="p-6 text-[13px] leading-relaxed text-white/90 overflow-x-auto">
{`{
  "mcpServers": {
    "casper": {
      "url": "https://mcp.casper.com/v1",
      "headers": {
        "Authorization": "Bearer sk_live_••••"
      }
    }
  }
}`}
          </pre>
        </motion.div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="rounded-3xl border border-border p-12 text-center"
          style={{ background: "var(--gradient-hero)" }}
        >
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
          Give your agents an inbox.
        </h2>
        <p className="mt-4 text-foreground/80 max-w-xl mx-auto">
          Free to start. Bring your own model. Cancel anytime.
        </p>
        <div className="mt-8 flex justify-center">
          <a href="#" className="inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-5 py-3 text-sm font-medium hover:opacity-90 transition-opacity">
            Get Started for Free <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { title: "Product", links: ["Features", "Pricing", "Enterprise", "For Agents", "Changelog"] },
    { title: "Company", links: ["About", "Careers", "Customers", "Press", "Contact"] },
    { title: "Resources", links: ["Help Center", "Blog", "Guides", "API Docs", "Status"] },
    { title: "Legal", links: ["Privacy", "Terms", "DPA", "Sub-processors", "Trust"] },
  ];
  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-[1.4fr_repeat(4,1fr)] gap-10">
          <div>
            <a href="/" className="flex items-center gap-2 font-semibold text-foreground tracking-tight text-xl">
              <span aria-hidden className="inline-block h-5 w-7 rounded-sm" style={{ background: "var(--gradient-primary)" }} />
              Casper
            </a>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
              The intelligent inbox that learns your voice and handles the busywork.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-xs font-semibold uppercase tracking-wider text-foreground">{c.title}</div>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 pt-8 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Casper, Inc. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
            <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ForAgentsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      <Nav />
      <Hero />
      <Agents />
      <Capabilities />
      <HowItWorks />
      <CodeBlock />
      <CTA />
      <Footer />
    </main>
  );
}