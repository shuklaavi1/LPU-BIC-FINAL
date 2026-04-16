"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/studio", label: "Studio" },
  { href: "/about", label: "About" },
  { href: "/schools", label: "Schools" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  // ── Landing page navbar ──────────────────────────────
  if (pathname === "/") {
    return (
      <header className="fixed inset-x-0 top-0 z-50 bg-[#0e0e0e]/92 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-8">
          <Link href="/" className="font-['Space_Grotesk'] text-[20px] font-bold tracking-[-0.08em] text-[#00FFC2]">
            <span className="text-white">Inno</span>
            <span className="text-[#00FFC2]">Botix</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 font-['Space_Grotesk'] text-[10px] font-bold uppercase tracking-[0.18em] md:flex">
            {NAV_LINKS.map(link => (
              <Link key={link.href} href={link.href}
                className={isActive(link.href)
                  ? "border-b-2 border-[#00fdc1] pb-1 text-[#00fdc1]"
                  : "text-[#777] transition-colors hover:text-[#00fdc1]"
                }>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/studio"
              className="hidden sm:inline-flex min-h-10 items-center justify-center bg-[#00fdc1] px-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#004734] transition-colors hover:bg-[#aaffdc]"
            >
              Launch Studio
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
              aria-label="Toggle navigation menu"
            >
              <span className={`block w-5 h-[2px] bg-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`block w-5 h-[2px] bg-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-[2px] bg-white transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[#262626] bg-[#0e0e0e]/98 backdrop-blur-md px-8 pb-6 pt-4">
            <nav className="flex flex-col gap-4 font-['Space_Grotesk'] text-[11px] font-bold uppercase tracking-[0.18em]">
              {NAV_LINKS.map(link => (
                <Link key={link.href} href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={isActive(link.href)
                    ? "text-[#00fdc1] border-l-2 border-[#00fdc1] pl-3"
                    : "text-[#999] pl-3 border-l-2 border-transparent transition-colors hover:text-[#00fdc1]"
                  }>
                  {link.label}
                </Link>
              ))}
              <Link
                href="/studio"
                onClick={() => setMobileOpen(false)}
                className="mt-2 flex items-center justify-center bg-[#00fdc1] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#004734] transition-colors hover:bg-[#aaffdc]"
              >
                Launch Studio
              </Link>
            </nav>
          </div>
        )}
      </header>
    );
  }

  // ── Interior pages navbar ────────────────────────────
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-app-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-[15px] font-semibold tracking-tight text-text-primary">
            Inno<span className="text-accent-teal">Botix</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href}
              className={isActive(link.href)
                ? "border-b-2 border-[#00fdc1] pb-1 text-[#00fdc1] text-[14px]"
                : "text-[14px] text-text-secondary transition-colors hover:text-[#00fdc1]"
              }>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/studio"
            className="hidden items-center gap-2 bg-white px-5 py-2 text-[13px] font-medium text-black transition-colors hover:bg-white/90 sm:inline-flex"
          >
            Launch Studio
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
            aria-label="Toggle navigation menu"
          >
            <span className={`block w-5 h-[2px] bg-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-5 h-[2px] bg-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-[2px] bg-white transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-app-bg/98 backdrop-blur-md px-6 pb-6 pt-4">
          <nav className="flex flex-col gap-4 text-[13px] font-medium">
            {NAV_LINKS.map(link => (
              <Link key={link.href} href={link.href}
                onClick={() => setMobileOpen(false)}
                className={isActive(link.href)
                  ? "text-accent-teal border-l-2 border-accent-teal pl-3"
                  : "text-text-secondary pl-3 border-l-2 border-transparent transition-colors hover:text-accent-teal"
                }>
                {link.label}
              </Link>
            ))}
            <Link
              href="/studio"
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex items-center justify-center bg-white px-5 py-2.5 text-[13px] font-medium text-black transition-colors hover:bg-white/90"
            >
              Launch Studio
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
