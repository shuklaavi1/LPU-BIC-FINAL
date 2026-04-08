import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">

      {/* ═══════════════════════════════════════════════════════ */}
      {/*  HERO                                                  */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Subtle radial glow behind headline — identical to Mastra */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(45,212,191,0.08)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="relative mx-auto max-w-4xl px-6 text-center flex flex-col items-center">
          
          {/* Pill badge */}
          <a href="/studio" className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-surface border border-border text-[13px] text-text-secondary hover:border-border-light transition-colors group">
            <span className="flex h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Innobotix Studio is live
            <svg className="text-text-muted group-hover:text-text-secondary transition-colors" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </a>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-[80px] font-extrabold leading-[1.05] tracking-tight text-text-primary mb-7">
            The AI robotics studio
            <br />
            for students.
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl mb-10">
            Describe your project. Innobotix agents generate complete BOM, validated wiring, Arduino code, and Wokwi simulation — aligned to CBSE curriculum.
          </p>

          {/* CTA buttons */}
          <div className="flex items-center gap-4">
            <Link href="/studio" className="inline-flex items-center gap-2.5 px-7 py-3 bg-white text-black font-semibold text-[15px] rounded-full hover:bg-white/90 transition-all shadow-[0_0_40px_rgba(255,255,255,0.06)]">
              Launch Studio
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>
            <Link href="/docs" className="inline-flex items-center gap-2 px-7 py-3 border border-border text-text-secondary font-medium text-[15px] rounded-full hover:border-border-light hover:text-text-primary transition-all">
              Read docs
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/*  INLINE CODE / DEMO PREVIEW                            */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="relative pb-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)]">
            {/* Terminal chrome */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-border bg-surface-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              </div>
              <span className="ml-3 text-[11px] font-mono text-text-muted tracking-wider">innobotix-studio</span>
            </div>
            {/* Code content */}
            <div className="p-6 font-mono text-[13px] leading-[1.8]">
              <p><span className="text-text-muted">// Student prompt:</span></p>
              <p><span className="text-accent">&gt;</span> <span className="text-text-primary">&quot;Build a smart irrigation system with soil moisture sensor&quot;</span></p>
              <br />
              <p><span className="text-text-muted">// Innobotix agents respond in 30 seconds:</span></p>
              <p><span className="text-teal-400">[Builder]</span>  <span className="text-text-secondary">→ BOM: Soil Moisture Sensor, 5V Relay, Mini Pump, Arduino Uno</span></p>
              <p><span className="text-purple-400">[Circuit]</span>  <span className="text-text-secondary">→ Pin map: A0 (sensor) → D8 (relay) → external pump</span></p>
              <p><span className="text-blue-400">[Mentor]</span>   <span className="text-text-secondary">→ Concepts: ADC reading, relay isolation, threshold logic</span></p>
              <p><span className="text-amber-400">[Simulator]</span> <span className="text-text-secondary">→ Wokwi project ready — simulate without hardware</span></p>
              <br />
              <p><span className="text-green-400">✓</span> <span className="text-text-primary">Complete project architecture generated.</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/*  SOCIAL PROOF / TRUST BAR                              */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="border-y border-border py-12">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-text-muted mb-8">Built for Indian schools and CBSE curriculum</p>
          <div className="flex items-center justify-center gap-10 md:gap-16 flex-wrap">
            {["CBSE Aligned", "NEP 2020", "Arduino & ESP32", "Wokwi Simulator", "15 Ready Projects"].map(label => (
              <span key={label} className="text-[14px] text-text-muted font-medium tracking-wide whitespace-nowrap">{label}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/*  THREE AGENTS — FEATURE CARDS                          */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl mb-16">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-primary mb-5 leading-tight">Three AI agents collaborate<br />on every project.</h2>
            <p className="text-[16px] text-text-secondary leading-relaxed">Students describe a project in natural language. Innobotix orchestrates specialized agents to produce verified, classroom-ready output.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                agent: "Builder Agent",
                color: "text-teal-400",
                borderHover: "hover:border-teal-500/30",
                desc: "Generates component selection, pin allocation, BOM with Indian pricing, and complete Arduino/ESP32 firmware.",
                details: ["Component selection", "Pin mapping", "Full code generation", "Budget estimation"],
              },
              {
                agent: "Mentor Agent",
                color: "text-blue-400",
                borderHover: "hover:border-blue-500/30",
                desc: "Adds learning context — what concepts the student will learn, common mistakes, CBSE alignment tags, and follow-up questions.",
                details: ["Learning goals", "CBSE tags", "Common mistakes", "Follow-up questions"],
              },
              {
                agent: "Simulator Agent",
                color: "text-amber-400",
                borderHover: "hover:border-amber-500/30",
                desc: "Validates the circuit logic and prepares a Wokwi simulation environment so students can test without hardware.",
                details: ["Safety checks", "Circuit validation", "Wokwi simulation", "Pin verification"],
              },
            ].map(card => (
              <div key={card.agent} className={`group bg-surface border border-border rounded-2xl p-7 transition-all ${card.borderHover}`}>
                <p className={`text-[13px] font-bold uppercase tracking-wider ${card.color} mb-3`}>{card.agent}</p>
                <p className="text-[15px] text-text-secondary leading-relaxed mb-6">{card.desc}</p>
                <ul className="flex flex-col gap-2.5">
                  {card.details.map(d => (
                    <li key={d} className="flex items-center gap-2.5 text-[13px] text-text-muted">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={card.color}><polyline points="20 6 9 17 4 12"></polyline></svg>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/*  OUTPUT SHOWCASE                                       */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-28 border-t border-border">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">Output</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-primary mb-5 leading-tight">Everything a student needs. Generated instantly.</h2>
            <p className="text-[16px] text-text-secondary leading-relaxed">Each project produces six structured panels — no guesswork, no wiring mistakes, no debugging at midnight.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Bill of Materials", desc: "Components, quantities, Indian pricing. Copy-paste ready for Amazon/Robu order.", icon: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" },
              { title: "Pin Map", desc: "Exact pin connections with notes. Know where every wire goes before you start.", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
              { title: "Circuit Flow", desc: "Step-by-step logic: sensing → processing → decision → actuation → feedback.", icon: "M22 12h-4l-3 9L9 3l-3 9H2" },
              { title: "Safety Checks", desc: "Critical warnings about power isolation, voltage levels, and common mistakes.", icon: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" },
              { title: "Arduino Code", desc: "Complete, commented, beginner-friendly sketch with matching pin numbers.", icon: "M16 18l6-6-6-6M8 6l-6 6 6 6" },
              { title: "Wokwi Simulation", desc: "One-click virtual environment. Test without buying a single component.", icon: "M5 3l14 9-14 9V3z" },
            ].map(item => (
              <div key={item.title} className="group bg-surface border border-border rounded-2xl p-6 hover:border-border-light transition-colors">
                <div className="w-10 h-10 rounded-xl bg-surface-2 border border-border flex items-center justify-center mb-4 group-hover:border-border-light transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted group-hover:text-accent transition-colors"><path d={item.icon} /></svg>
                </div>
                <h3 className="text-[15px] font-semibold text-text-primary mb-2">{item.title}</h3>
                <p className="text-[13px] text-text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/*  PROJECT BUCKETS                                       */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-28 border-t border-border">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl mb-16">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">15 Built-in Projects</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-primary mb-5 leading-tight">CBSE-aligned. Classroom tested.</h2>
            <p className="text-[16px] text-text-secondary leading-relaxed">Every project ships with complete BOM, pin map, code, and Wokwi simulation. Zero setup needed.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* CBSE Column */}
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-teal-400 mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                CBSE / Common
              </h3>
              <ul className="flex flex-col gap-3">
                {["Smart Irrigation System", "Smart Street Light", "Fire & Gas Alarm", "Home Security System", "Smart Dustbin", "Traffic Light Controller", "Parking Assist System", "Temperature Controlled Fan", "RFID Door Lock", "Weather Station"].map(name => (
                  <li key={name} className="text-[14px] text-text-secondary hover:text-text-primary transition-colors">
                    <Link href="/studio" className="flex items-center gap-3">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-muted shrink-0"><polyline points="9 18 15 12 9 6"></polyline></svg>
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Intermediate Column */}
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-blue-400 mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                Intermediate
              </h3>
              <ul className="flex flex-col gap-3">
                {["Line Following Robot", "Obstacle Avoiding Robot", "Bluetooth Controlled Car"].map(name => (
                  <li key={name} className="text-[14px] text-text-secondary hover:text-text-primary transition-colors">
                    <Link href="/studio" className="flex items-center gap-3">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-muted shrink-0"><polyline points="9 18 15 12 9 6"></polyline></svg>
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Advanced Column */}
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-purple-400 mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                Advanced Showcase
              </h3>
              <ul className="flex flex-col gap-3">
                {["IoT Smart Home (ESP32)", "Smart Farm Protection Device"].map(name => (
                  <li key={name} className="text-[14px] text-text-secondary hover:text-text-primary transition-colors">
                    <Link href="/studio" className="flex items-center gap-3">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-muted shrink-0"><polyline points="9 18 15 12 9 6"></polyline></svg>
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/*  STUDENTS vs SCHOOLS SPLIT                             */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-28 border-t border-border">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            
            {/* Students */}
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">For Students</p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-text-primary mb-5 leading-tight">Learn electronics safely.<br/>Build confidently.</h2>
              <ul className="flex flex-col gap-5 mt-8">
                {[
                  { t: "Instant AI mentorship", d: "Get feedback in seconds — no waiting for teacher availability." },
                  { t: "Zero-risk simulation", d: "Test circuits on Wokwi before touching real components." },
                  { t: "Learn by doing", d: "Each output explains concepts, not just wiring. Understand the why." },
                ].map(item => (
                  <li key={item.t} className="flex items-start gap-4">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-accent-dim border border-accent/20 flex items-center justify-center shrink-0">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-accent"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <div>
                      <p className="text-[15px] font-semibold text-text-primary">{item.t}</p>
                      <p className="text-[13px] text-text-muted leading-relaxed mt-1">{item.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Schools */}
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-purple-400 mb-4">For Schools</p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-text-primary mb-5 leading-tight">Scale STEM education.<br/>NEP 2020 aligned.</h2>
              <ul className="flex flex-col gap-5 mt-8">
                {[
                  { t: "Low-cost virtual lab", d: "No bulk hardware purchases needed. Simulate everything first." },
                  { t: "Curriculum aligned", d: "All 15 projects map to CBSE skill lab topics and NEP 2020 guidelines." },
                  { t: "Track student progress", d: "Dashboard shows projects completed, concepts covered, and engagement." },
                ].map(item => (
                  <li key={item.t} className="flex items-start gap-4">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-purple-400"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <div>
                      <p className="text-[15px] font-semibold text-text-primary">{item.t}</p>
                      <p className="text-[13px] text-text-muted leading-relaxed mt-1">{item.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/*  FINAL CTA                                             */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-32 border-t border-border">
        <div className="mx-auto max-w-3xl px-6 text-center flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary mb-6 leading-tight">
            Start building. Now.
          </h2>
          <p className="text-lg text-text-secondary mb-10 max-w-xl leading-relaxed">
            Choose from 15 pre-built projects or describe your own idea. No setup, no API keys, no hardware required.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/studio" className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-white text-black font-semibold text-[15px] rounded-full hover:bg-white/90 transition-all">
              Launch Studio
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>
            <Link href="/docs" className="inline-flex items-center gap-2 px-8 py-3.5 border border-border text-text-secondary font-medium text-[15px] rounded-full hover:border-border-light hover:text-text-primary transition-all">
              Documentation
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
