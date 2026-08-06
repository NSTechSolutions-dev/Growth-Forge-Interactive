import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Gauge,
  Layers,
  MessageCircle,
  Quote,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { HeroObject } from "@/components/HeroObject";
import { LeadModal } from "@/components/LeadModal";
import { CountUp } from "@/components/CountUp";
import { FORM_TYPES, formatLeadMessage } from "@/lib/lead-message";
import { buildWhatsAppUrl, openWhatsAppChat } from "@/lib/whatsapp";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "My Lead Foundry — Performance Marketing Agency" },
      {
        name: "description",
        content:
          "Data-driven ad systems across Google Ads, WhatsApp, SMS, email and programmatic — engineered to turn cold traffic into paying customers.",
      },
      { property: "og:title", content: "My Lead Foundry — We forge attention into revenue" },
      {
        property: "og:description",
        content:
          "Performance marketing agency running Google Ads, WhatsApp, SMS, email and programmatic campaigns built to convert.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "My Lead Foundry",
          description:
            "Performance marketing agency running Google Ads, WhatsApp, SMS, email and programmatic campaigns.",
          email: "Business@myleadfoundry.com",
          telephone: "+91-7602733055",
        }),
      },
    ],
  }),
});

const SERVICES = [
  {
    icon: Search,
    title: "Google Advertising",
    body: "Search, Display, and YouTube campaigns built around high-intent keywords and audiences, so your budget goes toward clicks that are ready to convert.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Marketing",
    body: "Direct, permission-based campaigns sent straight to your customers' most-used app — built for fast open rates and real replies.",
  },
  {
    icon: Send,
    title: "Bulk SMS & Email",
    body: "High-deliverability SMS and email blasts for launches, offers, and re-engagement — segmented so every message lands with the right audience.",
  },
  {
    icon: Sparkles,
    title: "Programmatic Advertising",
    body: "Automated, AI-assisted media buying across the open web, putting your brand in front of the right audience at scale without the manual guesswork.",
  },
  {
    icon: Target,
    title: "Performance Marketing",
    body: "Integrated, multi-channel strategy where every campaign is tied to a number — cost per lead, cost per sale, and return on ad spend.",
  },
  {
    icon: BarChart3,
    title: "Campaign Reporting",
    body: "Clear, ongoing reporting on spend and results, so you always know what's working and what we're changing next.",
  },
];

const REASONS = [
  {
    icon: Layers,
    title: "Multi-Channel by Default",
    body: "We don't hand you one channel and call it a strategy. Search, messaging, and programmatic work together under one plan.",
  },
  {
    icon: Users,
    title: "Built for Startups and Enterprise Alike",
    body: "From first-campaign brands to established companies scaling ad spend, our process adapts to the size of the budget without losing rigor.",
  },
  {
    icon: ShieldCheck,
    title: "Certified, Hands-On Team",
    body: "Every account is run by practitioners trained in Google and programmatic advertising — not handed off to a template.",
  },
  {
    icon: Gauge,
    title: "ROI Is the Only Metric That Matters",
    body: "Every campaign is judged on cost per lead and return on ad spend, reviewed on a regular cadence, not vanity impressions.",
  },
];

const STEPS = [
  {
    title: "Free Media Plan",
    body: "We audit your current channels and market, then map out where your budget will work hardest.",
  },
  {
    title: "Campaign Build",
    body: "We set up tracking, creative, and targeting across the agreed channels before a single dollar goes live.",
  },
  {
    title: "Launch & Optimize",
    body: "Campaigns go live and are tuned continuously against cost-per-lead and revenue targets.",
  },
  {
    title: "Report & Scale",
    body: "Regular reporting shows what's converting, and budget shifts toward what's working.",
  },
];

const STATS = [
  { to: 12, prefix: "₹", suffix: "Cr+", decimals: 0, label: "Ad spend managed across client accounts" },
  { to: 40, suffix: "+", decimals: 0, label: "Active accounts run by our team" },
  { to: 3.4, suffix: "×", decimals: 1, label: "Average return on ad spend delivered" },
  { to: 38, suffix: "%", decimals: 0, label: "Average drop in cost per lead in 90 days" },
];

const TESTIMONIALS = [
  {
    quote:
      "They rebuilt our Google Ads account from scratch and cut our cost per lead by nearly half in the first quarter. The reporting is the clearest we've ever had.",
    name: "Ananya Rao",
    role: "Head of Growth, D2C skincare brand",
  },
  {
    quote:
      "WhatsApp plus search working together was the unlock. Same budget, roughly double the qualified conversations coming into the sales team.",
    name: "Marcus Bell",
    role: "Founder, B2B SaaS",
  },
  {
    quote:
      "What sold us was accountability — every review meeting starts with ROAS and cost per sale, not impressions.",
    name: "Priya Nair",
    role: "Marketing Director, education group",
  },
];

const CLIENTS = ["NORTHWIND", "Kavya Retail", "APEXLABS", "Blue Harbor", "Sanchit & Co", "VOLTA"];

const CHANNELS = ["Google Ads", "WhatsApp Marketing", "Bulk SMS", "Bulk Email", "Programmatic"];

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why" },
  { label: "Results", href: "#results" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [modal, setModal] = useState<null | string>(null);
  const [ctaName, setCtaName] = useState("");
  const [ctaEmail, setCtaEmail] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* NAV */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/90 shadow-[0_1px_20px_rgba(15,31,61,0.06)] backdrop-blur-md" : ""
        }`}
      >
        <nav className="shell flex h-20 items-center justify-between">
          <a href="#top" aria-label="My Lead Foundry home">
            <Logo />
          </a>
          <div className="hidden items-center gap-7 md:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm font-medium text-charcoal transition-colors hover:text-green"
              >
                {n.label}
              </a>
            ))}
            <button
              className="btn-cta !px-5 !py-2.5 !text-sm"
              onClick={() => setModal("Get Your Free Media Plan")}
            >
              Get Free Media Plan
            </button>
          </div>
          <button
            className="btn-cta !px-4 !py-2 !text-xs md:hidden"
            onClick={() => setModal("Get Your Free Media Plan")}
          >
            Free Media Plan
          </button>
        </nav>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="pt-28 md:pt-32">
          <div className="shell">
            <div className="panel-navy px-6 py-14 md:px-14 md:py-20">
              <span className="grid-tex" aria-hidden />
              <HeroObject />
              <div className="relative max-w-2xl">
                <Reveal>
                  <p className="eyebrow">Performance Marketing Agency</p>
                  <h1 className="mt-5 text-[2.4rem] leading-[1.05] font-bold text-white md:text-6xl">
                    We forge attention into <span className="text-green">revenue.</span>
                  </h1>
                  <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-white/70 md:text-lg">
                    My Lead Foundry builds data-driven ad systems across search, messaging, and
                    programmatic channels — engineered to turn cold traffic into paying customers.
                  </p>
                  <ul className="mt-8 flex flex-wrap gap-2.5">
                    {CHANNELS.map((c) => (
                      <li key={c} className="chip">
                        {c}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-9 flex flex-wrap gap-3">
                    <button className="btn-cta" onClick={() => setModal("Get Your Free Media Plan")}>
                      Get Your Free Media Plan
                    </button>
                    <a
                      href="#services"
                      className="btn-ghost !border-white/25 !bg-transparent !text-white hover:!bg-white hover:!text-navy"
                    >
                      See What We Run
                    </a>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* STAT STRIP */}
        <section className="pt-5">
          <div className="shell grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div className="panel-cream h-full px-6 py-7">
                  <p className="font-display text-3xl font-bold text-navy md:text-4xl">
                    <CountUp
                      to={s.to}
                      prefix={s.prefix}
                      suffix={s.suffix}
                      decimals={s.decimals}
                    />
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CLIENT LOGOS */}
        <section className="pt-12 md:pt-16" aria-label="Brands we work with">
          <div className="shell">
            <p className="eyebrow text-center">Trusted by growth teams at</p>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {CLIENTS.map((c) => (
                <li
                  key={c}
                  className="font-display text-lg font-bold tracking-tight text-navy/25 transition-colors hover:text-navy/50 md:text-xl"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="section-pad">
          <div className="shell">
            <Reveal className="max-w-3xl">
              <p className="eyebrow">What We Do</p>
              <h2 className="mt-4 text-3xl font-bold md:text-5xl">
                One team, every channel that <span className="text-green">closes.</span>
              </h2>
              <p className="lead-text mt-5">
                We run the campaigns that put your brand directly in front of buyers — in their
                search results, their inbox, and their WhatsApp chat — then optimize relentlessly
                toward conversions.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((s, i) => (
                <Reveal key={s.title} delay={i * 70}>
                  <TiltCard className="group card-premium h-full p-7">
                    <span className="pointer-events-none absolute right-4 top-1 font-display text-7xl font-light text-navy/[0.05] select-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="icon-tile relative">
                      <s.icon className="h-5 w-5" strokeWidth={1.7} aria-hidden />
                    </span>
                    <h3 className="relative mt-5 text-lg font-bold">{s.title}</h3>
                    <p className="relative mt-3 text-[0.9rem] leading-relaxed text-muted-foreground">
                      {s.body}
                    </p>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* WHY — dark moment of the page */}
        <section id="why" className="pb-16 md:pb-28">
          <div className="shell">
            <div className="panel-navy px-6 py-14 md:px-14 md:py-20">
              <span className="grid-tex" aria-hidden />
              <Reveal className="relative max-w-3xl">
                <p className="eyebrow">Why My Lead Foundry</p>
                <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">
                  Built to manage real budgets and real{" "}
                  <span className="text-green">accountability.</span>
                </h2>
              </Reveal>

              <div className="relative mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
                {REASONS.map((r, i) => (
                  <Reveal key={r.title} delay={i * 80}>
                    <div className="group flex gap-5">
                      <span className="icon-tile-dark shrink-0">
                        <r.icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-white">{r.title}</h3>
                        <p className="mt-2.5 text-sm leading-relaxed text-white/65">{r.body}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="results" className="pb-16 md:pb-28">
          <div className="shell">
            <Reveal className="max-w-3xl">
              <p className="eyebrow">Client Results</p>
              <h2 className="mt-4 text-3xl font-bold md:text-5xl">
                The numbers do the <span className="text-orange">talking.</span>
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {TESTIMONIALS.map((t, i) => (
                <Reveal key={t.name} delay={i * 90}>
                  <figure className="panel flex h-full flex-col p-7 shadow-[var(--shadow-card)]">
                    <Quote className="h-6 w-6 text-green" strokeWidth={1.6} aria-hidden />
                    <blockquote className="mt-5 flex-1 text-[0.95rem] leading-relaxed text-charcoal">
                      “{t.quote}”
                    </blockquote>
                    <div className="mt-6 flex gap-0.5" aria-label="5 out of 5">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} className="h-3.5 w-3.5 fill-gold text-gold" aria-hidden />
                      ))}
                    </div>
                    <figcaption className="mt-3 text-sm">
                      <span className="font-bold text-navy">{t.name}</span>
                      <span className="block text-xs text-muted-foreground">{t.role}</span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="pb-16 md:pb-28">
          <div className="shell">
            <Reveal className="max-w-3xl">
              <p className="eyebrow">How We Work</p>
              <h2 className="mt-4 text-3xl font-bold md:text-5xl">
                From first call to <span className="text-green">running campaigns.</span>
              </h2>
            </Reveal>

            <div className="relative mt-14">
              <span className="rail hidden md:block" aria-hidden />
              <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
                {STEPS.map((s, i) => (
                  <Reveal key={s.title} delay={i * 110} as="li" className="h-full">
                    <div className="relative h-full md:pt-0">
                      <span
                        className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full font-display text-sm font-bold text-white ring-8 ring-background"
                        style={{
                          background:
                            "radial-gradient(circle at 32% 28%, color-mix(in oklab, var(--green) 85%, white), var(--navy) 78%)",
                        }}
                      >
                        0{i + 1}
                      </span>
                      <p className="eyebrow mt-6">Step {i + 1}</p>
                      <h3 className="mt-2 text-lg font-bold">{s.title}</h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                        {s.body}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section id="contact" className="pb-16 md:pb-24">
          <div className="shell">
            <div className="panel-navy px-6 py-14 md:px-14 md:py-16">
              <span className="grid-tex" aria-hidden />
              <div className="relative grid items-center gap-12 md:grid-cols-2">
                <Reveal>
                  <TrendingUp className="h-8 w-8 text-green" strokeWidth={1.6} aria-hidden />
                  <h2 className="mt-6 text-3xl font-bold text-white md:text-[2.75rem] md:leading-[1.08]">
                    Ready to turn ad spend into <span className="text-orange">pipeline?</span>
                  </h2>
                  <p className="mt-5 max-w-md text-sm leading-relaxed text-white/65 md:text-base">
                    Tell us where you want to grow and we'll send back a free media plan — channel
                    mix, budget split, and the numbers we'd hold ourselves to.
                  </p>
                </Reveal>

                <Reveal delay={120}>
                  <form
                    className="rounded-3xl border border-white/12 bg-white/[0.04] p-6 backdrop-blur-sm md:p-7"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const name = ctaName.trim();
                      const email = ctaEmail.trim();
                      if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
                      openWhatsAppChat(
                        formatLeadMessage(FORM_TYPES.contact, {
                          Name: name,
                          Email: email,
                        }),
                      );
                      setCtaName("");
                      setCtaEmail("");
                    }}
                  >
                    <p className="font-display text-lg font-bold text-white">
                      Get your free media plan
                    </p>
                    <div className="mt-5 space-y-3">
                      <label className="sr-only" htmlFor="cta-name">
                        Your name
                      </label>
                      <input
                        id="cta-name"
                        className="field"
                        placeholder="Your name"
                        value={ctaName}
                        onChange={(e) => setCtaName(e.target.value)}
                        required
                      />
                      <label className="sr-only" htmlFor="cta-email">
                        Work email
                      </label>
                      <input
                        id="cta-email"
                        type="email"
                        className="field"
                        placeholder="Work email"
                        value={ctaEmail}
                        onChange={(e) => setCtaEmail(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className="btn-cta mt-5 w-full">
                      Continue <ArrowRight className="h-4 w-4" aria-hidden />
                    </button>
                    <p className="mt-3 text-center text-xs text-white/45">
                      No spam. A real plan, usually within 48 hours.
                    </p>
                  </form>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="pb-10 text-charcoal">
        <div className="shell">
          <div className="rule" />
          <div className="grid gap-10 pt-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <Logo />
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Ad systems engineered to turn cold traffic into paying customers.
              </p>
              <address className="mt-5 text-sm not-italic leading-relaxed text-muted-foreground">
                32 Chowringee Road, Park Street
                <br />
                Kolkata, West Bengal 700071
              </address>
            </div>
            <div>
              <h3 className="text-sm font-bold">Company</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {[
                  ["Services", "#services"],
                  ["Why Us", "#why"],
                  ["Results", "#results"],
                  ["Process", "#process"],
                  ["Contact", "#contact"],
                ].map(([l, h]) => (
                  <li key={l}>
                    <a href={h} className="transition-colors hover:text-green">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold">Contact</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                <li>
                  <a href="mailto:Business@myleadfoundry.com" className="hover:text-green">
                    Business@myleadfoundry.com
                  </a>
                </li>
                <li>
                  <a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat on WhatsApp at +91-7602733055"
                    className="hover:text-green"
                  >
                    +91-7602733055
                  </a>
                </li>
              </ul>
              <button
                className="btn-cta mt-5 !px-4 !py-2.5 !text-sm"
                onClick={() => setModal("Book a Free Consultation")}
              >
                Book a call
              </button>
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-3 border-t border-navy/10 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p>© 2026 My Lead Foundry. All rights reserved.</p>
              <p className="mt-1 text-navy/70">A unit of Grovix Ventures Pvt Ltd.</p>
            </div>
            <p className="space-x-3">
              <a href="#top" className="hover:text-green">
                Privacy Policy
              </a>
              <span aria-hidden>·</span>
              <a href="#top" className="hover:text-green">
                Terms &amp; Conditions
              </a>
            </p>
          </div>
        </div>
      </footer>

      <LeadModal open={modal !== null} onClose={() => setModal(null)} title={modal ?? undefined} />
    </div>
  );
}
