"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <footer className="border-t border-[#262626] bg-[#0e0e0e] py-10 text-xs uppercase tracking-[0.18em] text-[#666]">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-8 px-8 md:flex-row">
          <div>
            <Link href="/" className="font-['Space_Grotesk'] text-[16px] font-bold tracking-[-0.08em] text-[#00FFC2]">
              <span className="text-white">Inno</span>
              <span className="text-[#00FFC2]">Botix</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/studio" className="transition-colors hover:text-[#00FFC2]">
              Studio
            </Link>
            <a href="#agents" className="transition-colors hover:text-[#00FFC2]">
              Agents
            </a>
            <a href="#projects" className="transition-colors hover:text-[#00FFC2]">
              Projects
            </a>
            <a href="#schools" className="transition-colors hover:text-[#00FFC2]">
              Schools
            </a>
            <Link href="/docs" className="transition-colors hover:text-[#00FFC2]">
              Docs
            </Link>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 md:mt-0 md:flex-row md:gap-8">
            <a href="mailto:avimohan@innobotix.in" className="font-mono text-[11px] text-[#aaffdc] uppercase tracking-widest transition-colors hover:text-[#00fdc1]">
              avimohan@innobotix.in
            </a>
            <a href="https://www.linkedin.com/in/avi-mohan-kr-shuklaa-235605282/" target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-[#aaffdc] uppercase tracking-widest transition-colors hover:text-[#00fdc1]">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="mt-auto border-t border-border bg-app-bg py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="mb-5 flex items-center gap-2.5">
              <span className="text-[15px] font-semibold tracking-tight text-text-primary">
                Inno<span className="text-accent-teal">Botix</span>
              </span>
            </Link>
            <p className="max-w-xs text-[13px] leading-relaxed text-text-muted">
              AI-powered robotics studio for students and schools. From idea to BOM, circuit, code, and simulation - in 30 seconds.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-[12px] font-semibold uppercase tracking-wider text-text-secondary">Product</h4>
            <ul className="flex flex-col gap-2.5">
              <li><Link href="/studio" className="text-[13px] text-text-muted transition-colors hover:text-text-primary">Studio</Link></li>
              <li><Link href="/school" className="text-[13px] text-text-muted transition-colors hover:text-text-primary">School Dashboard</Link></li>
              <li><Link href="/docs" className="text-[13px] text-text-muted transition-colors hover:text-text-primary">Documentation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[12px] font-semibold uppercase tracking-wider text-text-secondary">Resources</h4>
            <ul className="flex flex-col gap-2.5">
              <li><a href="#" className="text-[13px] text-text-muted transition-colors hover:text-text-primary">CBSE Alignment</a></li>
              <li><a href="#" className="text-[13px] text-text-muted transition-colors hover:text-text-primary">NEP 2020 Guide</a></li>
              <li><a href="#" className="text-[13px] text-text-muted transition-colors hover:text-text-primary">Wokwi Integration</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[12px] font-semibold uppercase tracking-wider text-text-secondary">Legal</h4>
            <ul className="flex flex-col gap-2.5">
              <li><a href="#" className="text-[13px] text-text-muted transition-colors hover:text-text-primary">Privacy</a></li>
              <li><a href="#" className="text-[13px] text-text-muted transition-colors hover:text-text-primary">Terms</a></li>
              <li><a href="#" className="text-[13px] text-text-muted transition-colors hover:text-text-primary">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex items-center justify-between border-t border-border pt-6">
          <p className="text-[12px] text-text-muted">(c) 2026 Innobotix. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <a href="mailto:avimohan@innobotix.in" className="font-mono text-[11px] text-[#aaffdc] uppercase tracking-widest transition-colors hover:text-white">
              avimohan@innobotix.in
            </a>
            <a href="https://www.linkedin.com/in/avi-mohan-kr-shuklaa-235605282/" target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-[#aaffdc] uppercase tracking-widest transition-colors hover:text-white">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
