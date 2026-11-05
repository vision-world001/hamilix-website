import { AnimatePresence, m } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@/components/brand/icons";
import { Watermark } from "@/components/brand/backdrop";
import {
  Kicker,
  ScrollRevealText,
  Spotlight,
} from "@/components/brand/kinetic";
import { Reveal } from "@/components/motion/reveal";
import {
  BUILD,
  EQUATION,
  MANIFESTO,
  PRINCIPLES,
  PROCESS,
  TESTIMONIALS,
  VERBS,
} from "@/lib/home-content";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Manifesto — text lights up while scrolling                          */
/* ------------------------------------------------------------------ */

export function ManifestoSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      <Watermark word="AI" className="-left-[2vw] top-0" />
      <Watermark word="Chain" tone="gold" className="-right-[4vw] bottom-0" />
      <div className="hx-container relative">
        <ScrollRevealText
          text={MANIFESTO.text}
          highlights={MANIFESTO.highlights}
          className="hx-big mx-auto max-w-5xl text-center"
        />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Verbs — the four disciplines as giant interactive rows              */
/* ------------------------------------------------------------------ */

export function VerbsSection() {
  return (
    <section className="border-y border-border">
      {VERBS.map((v, i) => {
        const gold = v.tone === "gold";
        return (
          <Link
            key={v.href}
            to={v.href}
            className="group relative block overflow-hidden border-b border-border last:border-b-0"
          >
            <div
              className={cn(
                "absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100",
                gold
                  ? "bg-gradient-to-r from-gold/[0.10] to-transparent"
                  : "bg-gradient-to-r from-accent/[0.10] to-transparent",
              )}
              aria-hidden
            />
            <div className="hx-container relative grid items-center gap-4 py-8 md:grid-cols-12 md:py-10">
              <span className="font-mono text-xs text-subtle md:col-span-1">
                0{i + 1}
              </span>
              <span
                className={cn(
                  "hx-giant transition-all duration-500 md:col-span-6",
                  gold
                    ? "hx-outline-gold group-hover:hx-text-gold"
                    : "hx-outline-lime group-hover:hx-text-lime",
                )}
              >
                {v.verb}
              </span>
              <div className="md:col-span-4">
                <p className="flex items-center gap-2 font-display text-xl font-semibold md:text-2xl">
                  <Icon
                    name={v.icon}
                    className={cn(
                      "h-5 w-5",
                      gold ? "text-gold" : "text-accent",
                    )}
                  />
                  {v.title}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {v.keys.map((k) => (
                    <span key={k} className="hx-chip">
                      {k}
                    </span>
                  ))}
                </div>
              </div>
              <span
                className={cn(
                  "hidden h-14 w-14 items-center justify-center justify-self-end rounded-full border border-border-strong text-xl transition-all duration-300 group-hover:-rotate-45 md:col-span-1 md:flex",
                  gold
                    ? "group-hover:border-gold group-hover:bg-gold group-hover:text-[#140F02]"
                    : "group-hover:border-accent group-hover:bg-accent group-hover:text-[#0B0D07]",
                )}
                aria-hidden
              >
                →
              </span>
            </div>
          </Link>
        );
      })}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Equation — AI + BLOCKCHAIN = HAMILIX                                */
/* ------------------------------------------------------------------ */

export function EquationSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      <div
        className="hx-hex-bg pointer-events-none absolute inset-0 opacity-70"
        aria-hidden
      />
      <div className="hx-container relative">
        <Kicker>{EQUATION.kicker}</Kicker>
        <Reveal>
          <h2
            className="mt-8 font-display font-bold uppercase leading-[0.9] tracking-[-0.05em]"
            style={{ fontSize: "clamp(2.6rem, 9.5vw, 8.75rem)" }}
          >
            <span className="block">
              <span className="hx-text-lime">AI</span>
              <span className="mx-[0.15em] text-subtle">+</span>
              <span className="hx-text-gold">Blockchain</span>
            </span>
            <span className="flex items-center gap-[0.2em]">
              <span className="text-subtle">=</span>
              <img
                src="/images/hamilix-icon.png"
                alt=""
                className="h-[0.8em] w-[0.8em] animate-float"
              />
              <span className="hx-gradient-text">Hamilix</span>
            </span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {EQUATION.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <Spotlight className="h-full p-7">
                <Icon name={item.icon} className="h-7 w-7 text-accent" />
                <h3 className="mt-6 text-2xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-muted">{item.line}</p>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Build — bento grid                                                  */
/* ------------------------------------------------------------------ */

export function BuildSection() {
  return (
    <section id="build" className="relative overflow-hidden">
      <Watermark word="Blockchain" tone="gold" className="-right-[6vw] top-6" />
      <div className="hx-container relative py-24 md:py-32">
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Kicker>{BUILD.kicker}</Kicker>
            <h2 className="hx-big mt-5">
              {BUILD.title}{" "}
              <span className="hx-gradient-text">{BUILD.titleAccent}</span>
            </h2>
          </div>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.14em] text-muted hover:text-accent"
          >
            Discuss yours{" "}
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {BUILD.items.map((item, i) => {
            const gold = item.track === "Blockchain";
            const large = item.size === "lg";
            return (
              <Reveal
                key={item.title}
                delay={(i % 4) * 0.06}
                className={cn(large && "lg:col-span-2")}
              >
                <Spotlight
                  tone={gold ? "gold" : "lime"}
                  className={cn(
                    "flex h-full flex-col p-7",
                    large ? "min-h-[18rem]" : "min-h-[16rem]",
                  )}
                >
                  {large ? (
                    <span
                      className={cn(
                        "pointer-events-none absolute -bottom-8 right-4 font-display text-[10rem] font-bold leading-none tracking-tighter opacity-30",
                        gold ? "hx-outline-gold" : "hx-outline-lime",
                      )}
                      aria-hidden
                    >
                      {item.track === "AI" ? "AI" : "Chain"}
                    </span>
                  ) : null}
                  <div className="relative flex items-center justify-between">
                    <span
                      className={cn(
                        "hx-icon-tile h-12 w-12",
                        gold && "text-gold",
                      )}
                    >
                      <Icon name={item.icon} className="h-6 w-6" />
                    </span>
                    <span
                      className={cn(
                        "font-mono text-[0.65rem] uppercase tracking-[0.16em]",
                        gold ? "text-gold" : "text-accent",
                      )}
                    >
                      {item.track}
                    </span>
                  </div>
                  <div className="relative mt-auto pt-10">
                    <h3
                      className={cn(
                        "font-semibold tracking-tight",
                        large ? "text-3xl md:text-4xl" : "text-2xl",
                      )}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-2 text-muted">{item.line}</p>
                  </div>
                </Spotlight>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Principles — four big words                                         */
/* ------------------------------------------------------------------ */

export function PrinciplesSection() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-surface/40 py-24 md:py-32">
      <Watermark
        word="Trust"
        tone="gold"
        className="-right-[3vw] bottom-[-4vw]"
      />
      <div className="hx-container relative">
        <Kicker>{PRINCIPLES.kicker}</Kicker>
        <div className="mt-12 grid gap-x-10 gap-y-14 sm:grid-cols-2">
          {PRINCIPLES.items.map((p, i) => (
            <Reveal key={p.word} delay={(i % 2) * 0.08}>
              <div className="group border-t border-border pt-6">
                <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                <p className="hx-giant mt-2 text-foreground transition-colors duration-300 group-hover:text-accent">
                  {p.word}
                </p>
                <p className="mt-3 text-lg text-muted">{p.line}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Process — four steps, giant outline numbers                         */
/* ------------------------------------------------------------------ */

export function ProcessSection() {
  return (
    <section className="relative overflow-hidden">
      <Watermark word="Neural" className="-right-[4vw] top-4" />
      <div className="hx-container relative py-24 md:py-32">
        <Kicker tone="gold">{PROCESS.kicker}</Kicker>
        <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {PROCESS.items.map((step, i) => (
            <li key={step.word}>
              <Reveal delay={i * 0.08}>
                <span className="hx-outline-text block font-display text-[7rem] font-bold leading-none tracking-tighter">
                  0{i + 1}
                </span>
                <span className="mt-2 block h-px bg-gradient-to-r from-gold/70 to-transparent" />
                <h3 className="mt-5 text-3xl font-semibold">{step.word}</h3>
                <p className="mt-2 text-muted">{step.line}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Testimonials — one big quote at a time                              */
/* ------------------------------------------------------------------ */

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const items = TESTIMONIALS.items;
  const t = items[active];

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % items.length),
      6500,
    );
    return () => window.clearInterval(id);
  }, [paused, items.length]);

  return (
    <section
      className="relative overflow-hidden border-y border-border bg-surface/40 py-24 md:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="hx-glow-lime pointer-events-none absolute -left-40 top-0 h-[30rem] w-[30rem] blur-3xl"
        aria-hidden
      />
      <div className="hx-container relative">
        <Kicker>{TESTIMONIALS.kicker}</Kicker>
        <div
          className="mt-10 min-h-[15rem] md:min-h-[17rem]"
          aria-live="polite"
        >
          <AnimatePresence mode="wait">
            <m.figure
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote className="max-w-5xl font-display text-3xl font-medium leading-[1.15] tracking-tight md:text-5xl">
                <span className="hx-gradient-text">“</span>
                {t.quote}
                <span className="hx-gradient-text">”</span>
              </blockquote>
              <figcaption className="mt-8 text-sm text-muted">
                <span className="font-semibold text-foreground">{t.name}</span>{" "}
                — {t.role}
              </figcaption>
            </m.figure>
          </AnimatePresence>
        </div>

        <div
          className="mt-10 flex flex-wrap items-center gap-3"
          role="tablist"
          aria-label="Testimonials"
        >
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={item.name}
              onClick={() => setActive(i)}
              className={cn(
                "relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-offset-2 ring-offset-bg transition-all duration-300",
                i === active
                  ? "ring-accent"
                  : "opacity-50 ring-transparent grayscale hover:opacity-100",
              )}
            >
              <img
                src={item.image}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
