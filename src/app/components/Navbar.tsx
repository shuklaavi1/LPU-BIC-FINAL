"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <header className="fixed inset-x-0 top-0 z-50 bg-[#0e0e0e]/92 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-8">
          <Link href="/" className="font-['Space_Grotesk'] text-[20px] font-bold tracking-[-0.08em] text-[#00FFC2]">
            <span className="text-white">Inno</span>
            <span className="text-[#00FFC2]">Botix</span>
          </Link>

          <nav className="hidden items-center gap-8 font-['Space_Grotesk'] text-[10px] font-bold uppercase tracking-[0.18em] md:flex">
            <Link href="/studio" className={(pathname as string) === '/studio' ? "border-b-2 border-[#00fdc1] pb-1 text-[#00fdc1]" : "text-[#777] transition-colors hover:text-[#00fdc1]"}>
              Studio
            </Link>
            <Link href="/schools" className={(pathname as string) === '/schools' ? "border-b-2 border-[#00fdc1] pb-1 text-[#00fdc1]" : "text-[#777] transition-colors hover:text-[#00fdc1]"}>
              Schools
            </Link>
            <Link href="/pricing" className={(pathname as string) === '/pricing' ? "border-b-2 border-[#00fdc1] pb-1 text-[#00fdc1]" : "text-[#777] transition-colors hover:text-[#00fdc1]"}>
              Pricing
            </Link>
            <Link href="/docs" className={(pathname as string) === '/docs' ? "border-b-2 border-[#00fdc1] pb-1 text-[#00fdc1]" : "text-[#777] transition-colors hover:text-[#00fdc1]"}>
              Docs
            </Link>
            <Link href="/about" className={(pathname as string) === '/about' ? "border-b-2 border-[#00fdc1] pb-1 text-[#00fdc1]" : "text-[#777] transition-colors hover:text-[#00fdc1]"}>
              About
            </Link>
          </nav>

          <Link
            href="/studio"
            className="inline-flex min-h-10 items-center justify-center bg-[#00fdc1] px-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#004734] transition-colors hover:bg-[#aaffdc]"
          >
            Launch Studio
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-app-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">

          <span className="text-[15px] font-semibold tracking-tight text-text-primary">
            Inno<span className="text-accent-teal">Botix</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/studio" className={pathname === '/studio' ? "border-b-2 border-[#00fdc1] pb-1 text-[#00fdc1] text-[14px]" : "text-[14px] text-text-secondary transition-colors hover:text-[#00fdc1]"}>
            Studio
          </Link>
          <Link href="/schools" className={pathname === '/schools' ? "border-b-2 border-[#00fdc1] pb-1 text-[#00fdc1] text-[14px]" : "text-[14px] text-text-secondary transition-colors hover:text-[#00fdc1]"}>
            Schools
          </Link>
          <Link href="/pricing" className={pathname === '/pricing' ? "border-b-2 border-[#00fdc1] pb-1 text-[#00fdc1] text-[14px]" : "text-[14px] text-text-secondary transition-colors hover:text-[#00fdc1]"}>
            Pricing
          </Link>
          <Link href="/docs" className={pathname === '/docs' ? "border-b-2 border-[#00fdc1] pb-1 text-[#00fdc1] text-[14px]" : "text-[14px] text-text-secondary transition-colors hover:text-[#00fdc1]"}>
            Docs
          </Link>
          <Link href="/about" className={pathname === '/about' ? "border-b-2 border-[#00fdc1] pb-1 text-[#00fdc1] text-[14px]" : "text-[14px] text-text-secondary transition-colors hover:text-[#00fdc1]"}>
            About
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/studio"
            className="hidden items-center gap-2 rounded-full bg-white px-5 py-2 text-[13px] font-medium text-black transition-colors hover:bg-white/90 sm:inline-flex"
          >
            Launch Studio
          </Link>
        </div>
      </div>
    </header>
  );
}
