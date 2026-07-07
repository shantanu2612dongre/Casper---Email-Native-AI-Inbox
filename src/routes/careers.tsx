import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers at Wisps — Join Our Team" },
      { name: "description", content: "We're always looking for talented people to join our mission of reimagining email." },
      { property: "og:title", content: "Careers at Wisps — Join Our Team" },
      { property: "og:description", content: "Join our team and help build the future of email." },
    ],
  }),
  component: Careers,
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function Careers() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      <Nav />
      <section className="relative overflow-hidden py-12 md:py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-glow/5 via-transparent to-transparent" />
        <div className="relative max-w-3xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="relative rounded-2xl border border-border/60 bg-card p-12 md:p-16 text-center"
            style={{
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-4">
              Careers
            </h1>
            <p className="text-xl text-muted-foreground">
              Job openings will be listed soon
            </p>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
