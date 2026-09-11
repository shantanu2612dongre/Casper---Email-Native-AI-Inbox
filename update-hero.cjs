const fs = require('fs');
const path = '/Users/shantanudongre/Casper---Email-Native-AI-Inbox/src/routes/index.tsx';
let content = fs.readFileSync(path, 'utf8');

const heroRegex = /function Hero\(\) \{[\s\S]*?\}\n\nconst heroThreads/m;

const newHero = `function Hero() {
  const { openWaitlist } = useContext(WaitlistContext);
  const [activeMockup, setActiveMockup] = useState<'imessage' | 'slack'>('imessage');
  return (
    <section className="relative overflow-hidden min-h-[100dvh] flex items-center justify-center py-20 z-0 bg-background">
      {/* Background Image - Changed to bg-bottom to prevent cropping the skyline/bridge */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-bottom bg-no-repeat opacity-90 transition-all duration-300"
        style={{
          backgroundImage: "url('/herobackground.png')",
        }}
      />

      {/* Replaced fixed max-width with clamped fluid width constraints */}
      <div className="relative w-[clamp(320px,90vw,1600px)] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[clamp(2rem,4vw,4rem)] items-center h-full">
        {/* Left Column: Text */}
        <div className="relative flex flex-col items-center lg:items-start text-center lg:text-left z-10">
          <div className="absolute -inset-12 -z-10 bg-white/70 dark:bg-black/70 blur-3xl rounded-full pointer-events-none" />

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            // Fluid Headline Size
            className="font-black tracking-tighter text-foreground leading-[1.05] text-[clamp(2.5rem,4.5vw,5rem)]"
          >
            The copilot for your professional relationships.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            // Fluid Paragraph Size
            className="mt-[clamp(1rem,2vw,1.5rem)] max-w-xl font-medium text-foreground/80 leading-relaxed text-[clamp(1rem,1.2vw+0.25rem,1.25rem)]"
          >
            Wisps learns how you write, drafts your replies, and handles the busywork, so you can focus on what matters.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-[clamp(2rem,3vw,3rem)] flex items-center justify-center lg:justify-start gap-4"
          >
            <button
              onClick={() => openWaitlist("hero")}
              // Fluid Button Size
              className="inline-flex items-center rounded-full bg-foreground text-background px-[clamp(1.5rem,2.5vw,2.5rem)] py-[clamp(0.75rem,1.25vw,1.25rem)] text-[clamp(0.9rem,1vw,1.1rem)] font-bold hover:opacity-90 transition-opacity cursor-pointer shadow-xl shadow-black/10"
            >
              Join Waitlist
            </button>
          </motion.div>
        </div>

        {/* Right Column: Mockup */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="relative flex flex-col items-center justify-center w-full mt-12 lg:mt-0"
        >
          {/* Removed scale hack, fluid width is now handled by components themselves */}
          <div className="flex flex-col items-center w-full origin-center">
            <div className="flex items-center p-1 mb-[clamp(1rem,2vw,2rem)] rounded-full bg-white/70 border border-white/60 dark:bg-black/40 dark:border-white/10 shadow-lg backdrop-blur-md z-20">
              <button
                onClick={() => setActiveMockup('imessage')}
                className={\`flex items-center gap-2 px-[clamp(1rem,1.5vw,1.5rem)] py-[clamp(0.5rem,0.75vw,0.75rem)] rounded-full text-[clamp(0.75rem,0.9vw,0.875rem)] font-semibold transition-all \${activeMockup === 'imessage'
                  ? 'bg-[#1D1C20] text-white shadow-md'
                  : 'text-foreground/70 hover:text-foreground hover:bg-white/50'
                  }\`}
              >
                <img src="/imessage.svg" className="w-[18px] h-[18px] object-contain" alt="iMessage" />
                iMessage
              </button>
              <button
                onClick={() => setActiveMockup('slack')}
                className={\`flex items-center gap-2 px-[clamp(1rem,1.5vw,1.5rem)] py-[clamp(0.5rem,0.75vw,0.75rem)] rounded-full text-[clamp(0.75rem,0.9vw,0.875rem)] font-semibold transition-all \${activeMockup === 'slack'
                  ? 'bg-[#1D1C20] text-white shadow-md'
                  : 'text-foreground/70 hover:text-foreground hover:bg-white/50'
                  }\`}
              >
                <img src="/slack.svg" className="w-[18px] h-[18px] object-contain" alt="Slack" />
                Slack
              </button>
            </div>

            <div className="relative w-full flex justify-center z-10">
              {activeMockup === 'imessage' ? (
                <WispsMockup />
              ) : (
                <WispsSlackMockup />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const heroThreads`;

if (content.match(heroRegex)) {
  fs.writeFileSync(path, content.replace(heroRegex, newHero));
  console.log("Updated Hero layout to use fluid clamps successfully!");
} else {
  console.log("Could not find Hero component to replace.");
}
