import { useInView } from "framer-motion";
import { useRef } from "react";
import { Watermark } from "@/components/brand/backdrop";
import { CtaBand } from "@/components/brand/cta-band";
import { Icon, type IconName } from "@/components/brand/icons";
import { Kicker, Spotlight, TapeMarquee } from "@/components/brand/kinetic";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import type { ServiceContent } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Giant verb sized so it always fits the container on one line. */
export function GiantVerb({
  word,
  tone,
  className,
}: {
  word: string;
  tone: "lime" | "gold";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "select-none font-display font-bold uppercase leading-[0.82] tracking-[-0.06em]",
        tone === "gold" ? "hx-text-gold" : "hx-text-lime",
        className,
      )}
      style={{
        fontSize: `min(15rem, calc((min(100vw, 78rem) - 4rem) / ${(word.length * 0.66).toFixed(2)}))`,
      }}
      aria-hidden
    >
      {word}
    </p>
  );
}

function StrikeWord({ text, index }: { text: string; index: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  return (
    <li className="flex items-baseline gap-4 border-b border-border py-5 md:gap-8">
      <span className="font-mono text-xs text-subtle">0{index + 1}</span>
      <span
        ref={ref}
        data-on={inView}
        className="hx-strike hx-big text-foreground/40 transition-colors duration-700"
        style={{ transitionDelay: `${index * 120}ms` }}
      >
        {text}
      </span>
    </li>
  );
}

type ServicePageProps = {
  content: ServiceContent;
  visual: React.ReactNode;
};

export function ServicePage({ content, visual }: ServicePageProps) {
  const { tone } = content;
  const gold = tone === "gold";
  const ownWord =
    { ai: "AI", blockchain: "Chain", web3: "Web3", crypto: "Crypto" }[
      content.slug
    ] ?? "AI";
  const otherWord = gold ? "AI" : "Chain";

  // Stretch the last capability card so the 4-column bento never leaves a hole.
  const items = content.capabilities.items;
  const cells = items.reduce((n, item) => n + (item.featured ? 2 : 1), 0);
  const gap = (4 - (cells % 4)) % 4;
  const lastSpan = ["", "lg:col-span-2", "lg:col-span-3", "lg:col-span-4"][gap];

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden">
        <div
          className="hx-grid-bg pointer-events-none absolute inset-0"
          aria-hidden
        />
        <div
          className={cn(
            "pointer-events-none absolute -right-40 top-20 h-[38rem] w-[38rem] blur-3xl",
            gold ? "hx-glow-gold" : "hx-glow-lime",
          )}
          aria-hidden
        />

        <div className="hx-container relative z-10 pb-16 pt-12 md:pt-16">
          <Reveal>
            <Kicker tone={tone}>{content.eyebrow}</Kicker>
            <h1 className="sr-only">
              {content.eyebrow}: {content.title}
            </h1>
            <GiantVerb word={content.verb} tone={tone} className="mt-6" />
          </Reveal>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-12">
            <Reveal delay={0.1} className="lg:col-span-6">
              <p className="hx-big" aria-hidden>
                {content.title}
              </p>
              <p className="mt-5 max-w-md text-lg text-muted md:text-xl">
                {content.sub}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink
                  href="/contact"
                  size="lg"
                  variant={gold ? "gold" : "primary"}
                  arrow
                >
                  Talk to an engineer
                </ButtonLink>
                <ButtonLink href="#capabilities" size="lg" variant="secondary">
                  {content.capabilities.title}
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={0.2} className="lg:col-span-6">
              {visual}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Keyword tape ---------- */}
      <div className="overflow-hidden py-10">
        <TapeMarquee words={content.keywords} tone={tone} tilt={-1.5} />
      </div>

      {/* ---------- Problems, struck through ---------- */}
      <section className="relative overflow-hidden">
        <Watermark word={ownWord} tone={tone} className="-right-[3vw] top-0" />
        <div className="hx-container relative py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Kicker tone={tone}>{content.problems.kicker}</Kicker>
              <p className="mt-5 max-w-xs text-lg text-muted">
                The problems we remove —{" "}
                <span className={gold ? "text-gold" : "text-accent"}>
                  for good.
                </span>
              </p>
            </div>
            <ul className="border-t border-border lg:col-span-8">
              {content.problems.items.map((item, i) => (
                <StrikeWord key={item} text={item} index={i} />
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Capabilities bento ---------- */}
      <section
        id="capabilities"
        className="border-y border-border bg-surface/40 py-20 md:py-28"
      >
        <div className="hx-container">
          <Kicker tone={tone}>Capabilities</Kicker>
          <h2 className="hx-big mt-5">{content.capabilities.title}.</h2>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, i) => (
              <Reveal
                key={item.title}
                delay={(i % 4) * 0.05}
                className={cn(
                  item.featured && "sm:col-span-2",
                  i === items.length - 1 && !item.featured && lastSpan,
                )}
              >
                <Spotlight
                  tone={tone}
                  className={cn(
                    "flex h-full flex-col bg-bg/70",
                    item.featured ? "min-h-[20rem]" : "min-h-[14rem]",
                  )}
                >
                  {item.image ? (
                    <>
                      <img
                        src={item.image}
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover opacity-40"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-bg/20" />
                    </>
                  ) : item.featured ? (
                    <Icon
                      name={item.icon as IconName}
                      className={cn(
                        "pointer-events-none absolute -right-8 -top-8 h-56 w-56 stroke-[0.5] opacity-[0.08]",
                        gold ? "text-gold" : "text-accent",
                      )}
                    />
                  ) : null}
                  <div className="relative flex h-full flex-col p-7">
                    <span className={cn("hx-icon-tile", gold && "text-gold")}>
                      <Icon name={item.icon as IconName} />
                    </span>
                    <div className="mt-auto pt-10">
                      <h3
                        className={cn(
                          "font-semibold tracking-tight",
                          item.featured ? "text-3xl md:text-4xl" : "text-xl",
                        )}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={cn(
                          "mt-2 text-muted",
                          item.featured && "text-lg",
                        )}
                      >
                        {item.line}
                      </p>
                      {item.tags ? (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <span key={tag} className="hx-chip">
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Highlight: big words ---------- */}
      <section className="relative overflow-hidden">
        <Watermark
          word={otherWord}
          tone={gold ? "lime" : "gold"}
          className="-left-[3vw] bottom-0"
        />
        <div className="hx-container relative py-20 md:py-28">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <Kicker tone={tone}>{content.highlight.kicker}</Kicker>
              <h2 className="hx-big mt-5">{content.highlight.title}</h2>
            </div>
            {content.highlight.note ? (
              <p className="max-w-xs text-sm text-muted">
                {content.highlight.note}
              </p>
            ) : null}
          </div>

          <div
            className={cn(
              "mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2",
              content.highlight.items.length === 5
                ? "lg:grid-cols-5"
                : "lg:grid-cols-4",
            )}
          >
            {content.highlight.items.map((item, i) => (
              <Reveal key={item.big} delay={i * 0.07} className="bg-bg">
                <div className="group relative h-full px-6 py-10 transition-colors duration-300 hover:bg-surface">
                  <span className="font-mono text-xs text-subtle">
                    0{i + 1}
                  </span>
                  <p
                    className={cn(
                      "mt-4 font-display text-5xl font-bold tracking-[-0.04em] transition-transform duration-300 group-hover:-translate-y-1",
                      content.highlight.items.length === 5
                        ? "md:text-6xl lg:text-[2.6rem] xl:text-5xl"
                        : "md:text-6xl",
                      gold ? "hx-text-gold" : "hx-gradient-text",
                    )}
                  >
                    {item.big}
                  </p>
                  <p className="mt-3 text-sm text-muted">{item.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        size="big"
        tone={tone}
        kicker="Start a project"
        title={content.cta.title}
        accent={content.cta.accent}
      />
    </>
  );
}
