import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-app-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-accent text-black font-extrabold text-[11px] tracking-tighter">
            IN
          </div>
          <span className="font-semibold text-[15px] tracking-tight text-text-primary">Innobotix</span>
        </Link>
        
        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/studio" className="text-[14px] text-text-secondary hover:text-text-primary transition-colors">
            Studio
          </Link>
          <Link href="/school" className="text-[14px] text-text-secondary hover:text-text-primary transition-colors">
            Schools
          </Link>
          <Link href="/docs" className="text-[14px] text-text-secondary hover:text-text-primary transition-colors">
            Docs
          </Link>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <Link href="/studio" className="hidden sm:inline-flex items-center gap-2 px-5 py-2 text-[13px] font-medium bg-white text-black rounded-full hover:bg-white/90 transition-colors">
            Launch Studio
          </Link>
        </div>
      </div>
    </header>
  );
}
