import { motion } from "motion/react";
import { useState } from "react";
import { WaitlistModal } from "./WaitlistModal";
import { trackEvent } from "../lib/utils";

export function Nav() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-4 left-0 right-0 z-50 mx-4 md:mx-8 lg:mx-auto lg:max-w-7xl"
      >
        <nav className="backdrop-blur-2xl backdrop-saturate-150 bg-white/30 dark:bg-black/30 bg-gradient-to-b from-white/60 to-white/20 dark:from-white/10 dark:to-white/5 border border-white/50 dark:border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] px-6 h-16 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-1.5 font-semibold text-foreground tracking-tight text-xl"
          >
            <img src="/casper-logo.svg" alt="Wisps logo" className="h-9 w-9 object-contain" />
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
            <button
              onClick={() => {
                trackEvent("join_waitlist_click", {
                  event_category: "engagement",
                  event_label: "Navbar Join Waitlist Button",
                  button_location: "navbar",
                });
                setIsWaitlistOpen(true);
              }}
              className="inline-flex items-center rounded-lg bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer"
            >
              Join Waitlist
            </button>
          </div>
        </nav>
      </motion.header>
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
    </>
  );
}
