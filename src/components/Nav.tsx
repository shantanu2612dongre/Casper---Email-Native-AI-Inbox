import { motion } from "motion/react";

export function Nav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-4 z-50 mx-4 md:mx-8 lg:mx-auto lg:max-w-7xl"
    >
      <nav className="backdrop-blur-xl bg-background/70 border border-border/40 rounded-2xl shadow-lg shadow-foreground/5 px-6 h-16 flex items-center justify-between">
        <a
          href="/"
          className="flex items-center gap-1.5 font-semibold text-foreground tracking-tight text-xl"
        >
          <img
            src="/casper-logo.svg"
            alt="Wisps logo"
            className="h-9 w-9 object-contain"
          />
Wisps
        </a>
        <div className="hidden md:flex items-center gap-10 text-sm text-foreground/80">
          <a href="/#pricing" className="hover:text-foreground transition-colors">
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
            href="/login"
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
