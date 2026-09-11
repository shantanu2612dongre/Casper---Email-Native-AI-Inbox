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
        className="absolute top-0 left-0 right-0 z-50 pt-8 px-6 lg:px-12 w-full"
      >
        <nav className="flex items-center justify-between w-full max-w-[1500px] mx-auto">
          <a
            href="/"
            className="flex items-center gap-2 font-black text-foreground tracking-tight text-2xl"
          >
            <img src="/wisps-logo.svg" alt="Wisps logo" className="h-8 w-8 object-contain" />
            Wisps
          </a>
          
          {/* Main Links */}
          <div className="hidden md:flex items-center gap-10 text-[15px] font-medium text-foreground/80">
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

          {/* Action Buttons */}
          <div className="flex items-center gap-6">
            <a
              href="/login"
              className="text-[16px] font-medium text-foreground hover:opacity-80 transition-opacity bg-white/40 dark:bg-black/20 hover:bg-white/60 px-6 py-3 rounded-full backdrop-blur-md"
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
              className="inline-flex items-center gap-2.5 rounded-full bg-[#E5F973] text-black px-7 py-3 text-[16px] font-medium hover:brightness-105 transition-all cursor-pointer shadow-sm hover:scale-105"
            >
              <div className="bg-white rounded-full p-0.5 shadow-sm">
                <img src="/imessage.svg" className="w-5 h-5 object-contain" alt="iMessage" />
              </div>
              Join Waitlist
            </button>
          </div>
        </nav>
      </motion.header>
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
    </>
  );
}
