"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { releases, artists, type Release } from "@/lib/catalog";

// ─── INLINE ICONS (no external icon dependency) ───────────────────────────
const IconMenu = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
);
const IconX = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
);
const IconArrow = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
);
const IconExternal = ({ size = 11 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" /></svg>
);
const IconBag = ({ size = 14, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z M3 6h18 M16 10a4 4 0 01-8 0" /></svg>
);

// ─── STRIPE PAYMENT LINKS ─────────────────────────────────────────────────
// Replace placeholders after Rhett creates Stripe Payment Links for each format
// Format: {catalogNumber}-{format} → Stripe URL
const STRIPE_LINKS: Record<string, string> = {
  // CDs — $10 + shipping
  "MR-001-cd": "STRIPE_CD_PLACEHOLDER_MR001",
  "MR-002-cd": "STRIPE_CD_PLACEHOLDER_MR002",
  "MR-003-cd": "STRIPE_CD_PLACEHOLDER_MR003",
  "MR-004-cd": "STRIPE_CD_PLACEHOLDER_MR004",
  "MR-005-cd": "STRIPE_CD_PLACEHOLDER_MR005",
  "MR-006-cd": "STRIPE_CD_PLACEHOLDER_MR006",
  "MR-007-cd": "STRIPE_CD_PLACEHOLDER_MR007",
  "MR-008-cd": "STRIPE_CD_PLACEHOLDER_MR008",
  "MR-009-cd": "STRIPE_CD_PLACEHOLDER_MR009",
  // Cassettes — $10 + shipping
  "MR-001-cassette": "STRIPE_CASSETTE_PLACEHOLDER_MR001",
  "MR-002-cassette": "STRIPE_CASSETTE_PLACEHOLDER_MR002",
  "MR-003-cassette": "STRIPE_CASSETTE_PLACEHOLDER_MR003",
  "MR-004-cassette": "STRIPE_CASSETTE_PLACEHOLDER_MR004",
  "MR-005-cassette": "STRIPE_CASSETTE_PLACEHOLDER_MR005",
  "MR-006-cassette": "STRIPE_CASSETTE_PLACEHOLDER_MR006",
  "MR-007-cassette": "STRIPE_CASSETTE_PLACEHOLDER_MR007",
  "MR-008-cassette": "STRIPE_CASSETTE_PLACEHOLDER_MR008",
  "MR-009-cassette": "STRIPE_CASSETTE_PLACEHOLDER_MR009",
};

const PHYSICAL_PRICE = 10; // $10 per disc/tape
const SHIPPING_NOTE = "+ shipping calculated at checkout";

// ─── NAV ──────────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Home", href: "/" },
    { label: "EPK", href: "/epk" },
    { label: "Shop", href: "/shop" },
  ];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-6 md:px-10 bg-[--color-canvas]/90 border-b border-[--color-border] backdrop-blur-sm">
      <Link href="/" className="flex items-center gap-3">
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[--color-ink]">
          Manteis
        </span>
        <span className="w-1 h-1 rounded-full bg-[--color-signal]" />
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[--color-ink-3]">
          Recordings
        </span>
      </Link>
      <div className="hidden md:flex items-center gap-8">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`font-body text-[14px] font-medium transition-colors ${
              l.label === "Shop"
                ? "text-[--color-signal]"
                : "text-[--color-ink-2] hover:text-[--color-signal]"
            }`}
          >
            {l.label}
          </Link>
        ))}
      </div>
      <button
        className="md:hidden text-[--color-ink]"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <IconX size={22} /> : <IconMenu size={22} />}
      </button>
      {open && (
        <div className="absolute top-14 left-0 right-0 bg-[--color-canvas] border-b border-[--color-border] flex flex-col py-4 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-6 py-3 font-body text-[15px] font-medium text-[--color-ink-2] hover:text-[--color-signal] transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── FORMAT TOGGLE ────────────────────────────────────────────────────────
type Format = "cd" | "cassette";

function FormatToggle({
  format,
  setFormat,
}: {
  format: Format;
  setFormat: (f: Format) => void;
}) {
  return (
    <div className="inline-flex border border-[--color-border] bg-[--color-surface]">
      <button
        onClick={() => setFormat("cd")}
        className={`px-5 py-2.5 font-mono text-[11px] tracking-[0.14em] uppercase transition-all ${
          format === "cd"
            ? "bg-[--color-signal] text-[--color-canvas]"
            : "text-[--color-ink-3] hover:text-[--color-ink-2]"
        }`}
      >
        CD
      </button>
      <button
        onClick={() => setFormat("cassette")}
        className={`px-5 py-2.5 font-mono text-[11px] tracking-[0.14em] uppercase transition-all border-l border-[--color-border] ${
          format === "cassette"
            ? "bg-[--color-signal] text-[--color-canvas]"
            : "text-[--color-ink-3] hover:text-[--color-ink-2]"
        }`}
      >
        Cassette
      </button>
    </div>
  );
}

// ─── RELEASE CARD ─────────────────────────────────────────────────────────
function ReleaseCard({ release, format }: { release: Release; format: Format }) {
  const fadeUp = {
    initial: { opacity: 1, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.6, ease: "easeOut" as const },
  };

  const stripeKey = `${release.catalogNumber}-${format}`;
  const stripeLink = STRIPE_LINKS[stripeKey];
  const formatLabel = format === "cd" ? "CD" : "Cassette";
  const formatDesc =
    format === "cd"
      ? "High-quality CD-R — lossless audio, printed disc art, gatefold sleeve"
      : "Nostalgic cassette tape — chrome formula, printed label, slip case";

  return (
    <motion.div
      {...fadeUp}
      className="group relative flex flex-col border border-[--color-border] bg-[--color-surface]/60 transition-all duration-300 hover:border-[--color-border-hi]"
    >
      {/* Cover Art */}
      <div className="relative aspect-square overflow-hidden border-b border-[--color-border]">
        <Image
          src={release.coverArt}
          alt={`${release.title} — ${release.artist}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        {/* Catalog number badge */}
        <div className="absolute top-3 left-3 px-2 py-1 bg-[--color-canvas]/80 backdrop-blur-sm border border-[--color-border]">
          <span className="font-mono text-[9px] tracking-[0.14em] uppercase text-[--color-ink-3]">
            {release.catalogNumber}
          </span>
        </div>
        {/* Format badge */}
        <div className="absolute top-3 right-3 px-2 py-1 bg-[--color-signal]/90 backdrop-blur-sm">
          <span className="font-mono text-[9px] tracking-[0.14em] uppercase text-[--color-canvas] font-semibold">
            {formatLabel}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-5">
        <div className="mb-3">
          <h3 className="text-[16px] font-semibold text-[--color-ink] leading-tight tracking-[-0.02em] mb-0.5">
            {release.title}
          </h3>
          <p className="text-[13px] text-[--color-ink-3]">
            {release.artist} · {release.year} · {release.tracks} tracks
          </p>
        </div>

        <p className="text-[12px] leading-[1.5] text-[--color-ink-3] mb-4 flex-1">
          {formatDesc}
        </p>

        {/* Price + Buy */}
        <div className="flex items-center justify-between pt-4 border-t border-[--color-border] mb-3">
          <div>
            <span className="text-[22px] font-bold text-[--color-ink] tracking-[-0.03em]">
              ${PHYSICAL_PRICE}
            </span>
            <span className="text-[10px] text-[--color-ink-3] ml-2 font-mono block leading-tight">
              {SHIPPING_NOTE}
            </span>
          </div>
          {stripeLink && !stripeLink.startsWith("STRIPE_") ? (
            <a
              href={stripeLink}
              className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-wide uppercase px-4 py-2.5 bg-[--color-signal] text-[--color-canvas] hover:bg-[--color-solar-amber] transition-colors"
            >
              Buy <IconArrow size={13} />
            </a>
          ) : (
            <span className="font-mono text-[10px] tracking-wide text-[--color-ink-3] px-4 py-2.5 border border-[--color-border]">
              COMING SOON
            </span>
          )}
        </div>

        {/* Streaming links */}
        <div className="flex items-center gap-3 pt-3 border-t border-[--color-border]/50">
          <a
            href={release.hyperfollow}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] tracking-wide uppercase text-[--color-ink-3] hover:text-[--color-signal] transition-colors inline-flex items-center gap-1"
          >
            Stream <IconExternal size={11} />
          </a>
          <span className="text-[--color-ink-ghost]">·</span>
          <a
            href={release.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] tracking-wide uppercase text-[--color-ink-3] hover:text-[--color-signal] transition-colors inline-flex items-center gap-1"
          >
            Spotify <IconExternal size={11} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────
export default function ShopPage() {
  const [format, setFormat] = useState<Format>("cd");

  const fadeUp = {
    initial: { opacity: 1, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, ease: "easeOut" as const },
  };

  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="relative min-h-[45vh] pt-14 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[15%] w-[350px] h-[350px] rounded-full bg-[rgba(255,85,0,0.04)] blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 md:px-10 pt-20 pb-10">
          <motion.div {...fadeUp}>
            <div className="flex items-center gap-2 mb-5">
              <IconBag size={14} className="text-[--color-signal]" />
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[--color-ink-3]">
                Physical Media · Works of Art · Limited Runs
              </span>
            </div>
            <h1 className="text-[40px] md:text-[56px] font-semibold text-[--color-ink] leading-[1.05] tracking-[-0.035em] mb-5">
              Hold the sound
              <br />
              <span className="text-[--color-signal]">in your hands.</span>
            </h1>
            <p className="text-[16px] md:text-[18px] leading-[1.6] text-[--color-ink-2] max-w-2xl">
              Every Manteis release available on high-quality CD and nostalgic cassette. Each disc is printed with cover art, packaged in a gatefold sleeve. Each cassette is a chrome formula tape with a printed label. These aren&apos;t just formats — they&apos;re artifacts. ${PHYSICAL_PRICE} each, plus shipping.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FORMAT TOGGLE */}
      <section className="relative border-t border-[--color-border]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-[20px] font-semibold text-[--color-ink] tracking-[-0.02em] mb-1">
              All Releases
            </h2>
            <p className="text-[13px] text-[--color-ink-3]">
              {releases.length} releases · {artists.length} artists · choose your format
            </p>
          </div>
          <FormatToggle format={format} setFormat={setFormat} />
        </div>
      </section>

      {/* RELEASE GRID */}
      <section className="relative border-t border-[--color-border]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {releases.map((release) => (
              <ReleaseCard key={release.id} release={release} format={format} />
            ))}
          </div>
        </div>
      </section>

      {/* INFO SECTION */}
      <section className="relative border-t border-[--color-border]">
        <div className="max-w-3xl mx-auto px-6 md:px-10 py-16">
          <motion.div {...fadeUp}>
            <h2 className="text-[24px] font-semibold text-[--color-ink] tracking-[-0.03em] mb-8">
              The Format
            </h2>
            <div className="space-y-6">
              <div className="border-b border-[--color-border] pb-6">
                <h3 className="text-[16px] font-semibold text-[--color-ink] mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[--color-signal]" />
                  CDs
                </h3>
                <p className="text-[14px] leading-[1.6] text-[--color-ink-2]">
                  High-quality CD-R discs with lossless, CD-quality audio (16-bit / 44.1kHz). Each disc features full-color printed cover art directly on the disc surface, housed in a gatefold sleeve with the complete album artwork. These are duplicated, not mass-pressed — every copy is made to order.
                </p>
              </div>
              <div className="border-b border-[--color-border] pb-6">
                <h3 className="text-[16px] font-semibold text-[--color-ink] mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[--color-signal]" />
                  Cassettes
                </h3>
                <p className="text-[14px] leading-[1.6] text-[--color-ink-2]">
                  Chrome formula cassette tapes for warm, analog playback character. Each tape features a printed label with cover art and catalog numbering, housed in a slip case. Nostalgic format, serious audio quality. Made to order — no warehouse of unsold stock.
                </p>
              </div>
              <div className="border-b border-[--color-border] pb-6">
                <h3 className="text-[16px] font-semibold text-[--color-ink] mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[--color-signal]" />
                  Shipping &amp; Production
                </h3>
                <p className="text-[14px] leading-[1.6] text-[--color-ink-2]">
                  Each order is produced on demand — discs and tapes are duplicated, printed, and packaged when you order. Production time is 3–5 business days before shipping. Shipping is calculated at checkout based on your location. Every item is hand-checked before it ships.
                </p>
              </div>
              <div>
                <h3 className="text-[16px] font-semibold text-[--color-ink] mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[--color-signal]" />
                  Streaming
                </h3>
                <p className="text-[14px] leading-[1.6] text-[--color-ink-2]">
                  Every release is also available on all streaming platforms — Spotify, Apple Music, Bandcamp, and more. Use the streaming links on each product card. The physical format is for the listener who wants to hold the work. The stream is for everyone else.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-[--color-border]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[--color-ink]">
              Manteis
            </span>
            <span className="w-1 h-1 rounded-full bg-[--color-signal]" />
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[--color-ink-3]">
              Recordings
            </span>
          </div>
          <Link
            href="/"
            className="font-mono text-[11px] tracking-wide text-[--color-ink-3] hover:text-[--color-signal] transition-colors"
          >
            ← Back to manteisrecordings.com
          </Link>
        </div>
      </footer>
    </>
  );
}