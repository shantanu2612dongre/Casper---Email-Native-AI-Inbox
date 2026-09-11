const fs = require('fs');
const path = '/Users/shantanudongre/Casper---Email-Native-AI-Inbox/src/components/Nav.tsx';
let content = fs.readFileSync(path, 'utf8');

const newNav = `export function Nav() {
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
              className="text-[15px] font-medium text-foreground hover:opacity-80 transition-opacity bg-white/40 dark:bg-black/20 hover:bg-white/60 px-5 py-2 rounded-full backdrop-blur-md"
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
              className="inline-flex items-center gap-2 rounded-full bg-[#E5F973] text-black px-6 py-2.5 text-[15px] font-bold hover:brightness-105 transition-all cursor-pointer shadow-sm hover:scale-105"
            >
              <div className="bg-white rounded-full p-0.5 shadow-sm">
                <img src="/imessage.svg" className="w-4 h-4 object-contain" alt="iMessage" />
              </div>
              Join Waitlist
            </button>
          </div>
        </nav>
      </motion.header>
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
    </>
  );
}`;

content = content.replace(/export function Nav\(\) \{[\s\S]*\}\n/m, newNav + '\n');
fs.writeFileSync(path, content);
console.log("Updated Nav to match seamless Tomo header.");
