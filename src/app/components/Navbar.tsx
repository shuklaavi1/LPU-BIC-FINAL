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
            <Link href="/studio" className="border-b border-[#00FFC2] pb-1 text-[#00FFC2]">
              Studio
            </Link>
            <a href="#agents" className="text-[#777] transition-colors hover:text-[#00FFC2]">
              Agents
            </a>
            <a href="#projects" className="text-[#777] transition-colors hover:text-[#00FFC2]">
              Projects
            </a>
            <a href="#schools" className="text-[#777] transition-colors hover:text-[#00FFC2]">
              Schools
            </a>
            <Link href="/docs" className="text-[#777] transition-colors hover:text-[#00FFC2]">
              Docs
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
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-[11px] font-extrabold tracking-tighter text-black">
            IN
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-text-primary">Innobotix</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/studio" className="text-[14px] text-text-secondary transition-colors hover:text-text-primary">
            Studio
          </Link>
          <Link href="/school" className="text-[14px] text-text-secondary transition-colors hover:text-text-primary">
            Schools
          </Link>
          <Link href="/docs" className="text-[14px] text-text-secondary transition-colors hover:text-text-primary">
            Docs
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
