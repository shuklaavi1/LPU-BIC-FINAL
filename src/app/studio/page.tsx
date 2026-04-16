'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PROJECTS } from '@/data/projects';
import MOCK_OUTPUTS from '@/data/mockOutputs';
import { BuilderResponse, Project, AgentStep } from '@/types';

// ─── Configuration ──────────────────────────────────────────────
const DEMO_MODE = true; // Set to false to use live /api/agent endpoint

// ─── Agent timeline steps ─────────────────────────────────────────
const AGENT_TIMELINE: AgentStep[] = [
  { t: 0, agent: 'Builder', msg: 'Reading your project idea and selecting optimal components…' },
  { t: 5, agent: 'Circuit', msg: 'Preparing pin map and safe power flow diagram…' },
  { t: 10, agent: 'Mentor', msg: 'Checking learning level, CBSE alignment, and common mistakes…' },
  { t: 15, agent: 'Builder', msg: 'Generating BOM, firmware logic, and project structure…' },
  { t: 20, agent: 'Simulator', msg: 'Preparing Wokwi simulation workspace…' },
  { t: 25, agent: 'Mentor', msg: 'Final review complete — preparing follow-up guidance…' },
  { t: 30, agent: 'All', msg: 'Your project is ready.' },
];



// ─── Agent colour map ────────────────────────────────────────────
const AGENT_COLORS: Record<string, string> = {
  Builder: 'text-teal-400',
  Circuit: 'text-purple-400',
  Mentor: 'text-blue-400',
  Simulator: 'text-amber-400',
  All: 'text-green-400',
};

const AGENT_BG: Record<string, string> = {
  Builder: 'bg-teal-400/10 border-teal-400/20',
  Circuit: 'bg-purple-400/10 border-purple-400/20',
  Mentor: 'bg-blue-400/10 border-blue-400/20',
  Simulator: 'bg-amber-400/10 border-amber-400/20',
  All: 'bg-green-400/10 border-green-400/20',
};

const CATEGORY_LABELS: Record<string, string> = {
  cbse: 'CBSE / Common',
  intermediate: 'Intermediate',
  advanced: 'Advanced Showcase',
};

// ─── Sub-components ──────────────────────────────────────────────

function SeverityIcon({ s }: { s: string }) {
  if (s === 'critical') return <svg className="shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
  if (s === 'warning') return <svg className="shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>;
  return <svg className="shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
}

function CategoryBadge({ cat }: { cat: string }) {
  const styles: Record<string, string> = {
    cbse: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
    intermediate: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    advanced: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  };
  return <span className={`inline-flex text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${styles[cat] || ''}`}>{CATEGORY_LABELS[cat]}</span>;
}

// ─── Main studio content ──────────────────────────────────────────

function StudioContent() {
  const searchParams = useSearchParams();
  const initialPrompt = searchParams.get('prompt') || '';

  const [prompt, setPrompt] = useState(initialPrompt);
  const [selectedId, setSelectedId] = useState<string>('placeholder');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [builderData, setBuilderData] = useState<BuilderResponse | null>(null);
  const [activeSteps, setActiveSteps] = useState<AgentStep[]>([]);
  const [progress, setProgress] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [copied, setCopied] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const [wokwiUrl, setWokwiUrl] = useState(
    'https://wokwi.com/projects/new/arduino-uno'
  );
  const [iframeLoading, setIframeLoading] = useState(true);

  const wokwiProjects: Record<string, string> = {
    'Smart Street Light': 'https://wokwi.com/projects/new/arduino-uno',
    'Fire and Gas Alarm System': 'https://wokwi.com/projects/new/arduino-uno',
    'Smart Irrigation System': 'https://wokwi.com/projects/461266223714257921',
    'Traffic Light Controller': 'https://wokwi.com/projects/new/arduino-uno',
    'Weather Station': 'https://wokwi.com/projects/new/arduino-uno',
    'Alarm Clock with RTC': 'https://wokwi.com/projects/297787059514376717',
    'Electronic Safe': 'https://wokwi.com/projects/297787059514376717',
  };

  const selectedProject: Project | undefined = PROJECTS.find(p => p.id === selectedId);

  // Clear timers on unmount
  useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

  // Auto-scroll terminal
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [activeSteps]);

  const clearTimers = () => { timersRef.current.forEach(clearTimeout); timersRef.current = []; };

  const handleGenerate = async () => {
    if (!selectedProject || prompt.trim() === '') return;
    clearTimers();
    setIsGenerating(true);
    setIsGenerated(false);
    setActiveSteps([]);
    setProgress(0);
    setError(null);
    setBuilderData(null);
    setIsSimulating(false);

    const TOTAL = 30;

    // Schedule fake agent steps
    AGENT_TIMELINE.forEach(step => {
      const id = setTimeout(() => {
        setActiveSteps(prev => [...prev, step]);
        setProgress(Math.round((step.t / TOTAL) * 100));
      }, step.t * 1000);
      timersRef.current.push(id);
    });

    // Fetch actual data (or use mock)
    let data: BuilderResponse | null = null;

    if (DEMO_MODE) {
      data = MOCK_OUTPUTS[selectedProject.id] || null;
    } else {
      try {
        const res = await fetch('/api/agent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt, projectId: selectedProject.id }),
        });
        const json = await res.json();
        if (!json.error) data = json.builderData;
      } catch { /* fall through to mock */ }
      if (!data) data = MOCK_OUTPUTS[selectedProject.id] || null;
    }

    // Reveal at 30s mark
    const revealId = setTimeout(() => {
      setProgress(100);
      setBuilderData(data);
      setIsGenerating(false);
      setIsGenerated(true);
    }, TOTAL * 1000);
    timersRef.current.push(revealId);
  };

  const handleCopyCode = () => {
    if (builderData?.code) {
      navigator.clipboard.writeText(builderData.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // ── Grouped projects for display ─────────────────────────────
  const grouped = (['cbse', 'intermediate', 'advanced'] as const).map(cat => ({
    cat,
    label: CATEGORY_LABELS[cat],
    projects: PROJECTS.filter(p => p.category === cat),
  }));

  // ── Safety severity colours ──────────────────────────────────
  const sevColor: Record<string, string> = {
    critical: 'bg-red-500/10 border-red-500/20 text-red-400',
    warning: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
    info: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
  };

  return (
    <div className="flex flex-col bg-app-bg text-text-primary" style={{ height: 'calc(100vh - 64px)' }}>

      {/* Top breadcrumb */}
      <div className="shrink-0 py-2.5 px-6 border-b border-panel-border bg-[#09090b]/80 flex items-center justify-between">
        <div className="text-[11px] font-semibold text-text-secondary uppercase tracking-widest flex items-center gap-2">
          <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-accent-teal">Studio Workspace</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border ${DEMO_MODE ? 'bg-teal-500/10 border-teal-500/20 text-teal-400' : 'bg-purple-500/10 border-purple-500/20 text-purple-400'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${DEMO_MODE ? 'bg-teal-400' : 'bg-purple-400'} animate-pulse`}></span>
            {DEMO_MODE ? 'Demo Mode' : 'Live API Mode'}
          </span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">

        {/* ── LEFT SIDEBAR ─────────────────────────────────────── */}
        <div className="w-[340px] shrink-0 flex flex-col border-r border-panel-border bg-[#09090b]/90 overflow-hidden">

          {/* Project picker */}
          <div className="shrink-0 p-5 border-b border-panel-border">
            <p className="text-[10px] uppercase tracking-widest font-bold text-text-secondary mb-3">Select Project</p>
            <div className="relative">
              <select
                value={selectedId}
                disabled={isGenerating}
                onChange={e => {
                  setSelectedId(e.target.value);
                  const p = PROJECTS.find(p => p.id === e.target.value);
                  if (p) setPrompt(p.samplePrompt);
                  setIsGenerated(false);
                  setIsSimulating(false);
                  const selectedValue = p ? p.title : e.target.value;
                  setWokwiUrl(wokwiProjects[selectedValue] ?? 'https://wokwi.com/projects/new/arduino-uno');
                }}
                className="w-full appearance-none bg-panel-bg border border-panel-border text-text-primary rounded-lg py-2.5 pl-3 pr-8 text-sm focus:outline-none focus:border-accent-teal transition-all cursor-pointer disabled:opacity-50"
              >
                <option value="placeholder" disabled>Choose a project…</option>
                {grouped.map(g => (
                  <optgroup key={g.cat} label={g.label}>
                    {g.projects.map(p => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </div>

          {/* Project metadata */}
          {selectedProject && (
            <div className="shrink-0 px-5 py-3 border-b border-panel-border flex flex-col gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <CategoryBadge cat={selectedProject.category} />
                <span className="text-[10px] text-text-secondary border border-panel-border px-2 py-0.5 rounded-full bg-panel-bg font-mono uppercase">{selectedProject.board}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${selectedProject.difficulty === 'Beginner' ? 'bg-green-500/10 text-green-400' : selectedProject.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'}`}>
                  {selectedProject.difficulty}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-text-secondary">{selectedProject.estimatedBudget}</span>
                <span className="text-[10px] text-text-secondary">{selectedProject.board === 'esp32' ? 'ESP32' : 'Arduino Uno'}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {selectedProject.cbseTags.map(tag => (
                  <span key={tag} className="text-[9px] bg-zinc-800/60 text-zinc-400 px-1.5 py-0.5 rounded">#{tag}</span>
                ))}
              </div>
            </div>
          )}



          {/* Prompt area */}
          <div className="flex-1 flex flex-col gap-3 overflow-y-auto px-5 pb-5 pt-2">
            {/* Learning goals */}
            {selectedProject && (
              <div className="bg-panel-bg/40 border border-panel-border rounded-xl p-3 shrink-0 mb-4">
                <p className="text-[10px] uppercase font-bold tracking-wider text-text-secondary mb-2">Learning Goals</p>
                <ul className="space-y-1">
                  {selectedProject.learningGoals.map((g, i) => (
                    <li key={i} className="flex items-start gap-2 text-[11px] text-text-secondary">
                      <span className="text-accent-teal mt-0.5 shrink-0">▸</span>{g}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Prompt area */}
            <div className="mt-auto shrink-0 flex flex-col gap-3">
              <p style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
                color: '#aaffdc', letterSpacing: '0.3em',
                textTransform: 'uppercase', marginBottom: '8px'
              }}>
                [ DESCRIBE YOUR PROJECT ]
              </p>
              <textarea
                value={prompt}
                maxLength={500}
                onChange={(e) => {
                  setPrompt(e.target.value);
                  const counter = document.getElementById('char-counter');
                  if (counter) counter.textContent = `${e.target.value.length} / 500`;
                }}
                placeholder="Describe your robotics project... e.g. line-following robot with Arduino Uno"
                style={{
                  width: '100%', minHeight: '120px', padding: '14px',
                  background: '#131313', color: '#ffffff', resize: 'none',
                  border: '1px solid rgba(170,255,220,0.25)', borderRadius: '0px',
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '13px',
                  outline: 'none', boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#00fdc1';
                  e.target.style.boxShadow = 'inset 0 0 0 1px rgba(0,253,193,0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(170,255,220,0.25)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', marginTop: '8px'
              }}>
                <span id="char-counter" style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '10px', color: '#777575'
                }}>{prompt.length} / 500</span>
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  style={{
                    background: '#00fdc1', color: '#004734', fontWeight: '700',
                    fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase',
                    padding: '10px 20px', border: 'none', borderRadius: '0px', cursor: 'pointer',
                    opacity: isGenerating ? 0.5 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!isGenerating) {
                      (e.target as HTMLButtonElement).style.boxShadow =
                        '0 0 15px rgba(0,237,180,0.35)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.boxShadow = 'none';
                  }}
                >
                  {isGenerating ? 'GENERATING...' : 'GENERATE →'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT OUTPUT AREA ───────────────────────────────── */}
        <div className="flex-1 overflow-y-auto bg-[#080809]" style={{ scrollbarWidth: 'thin' }}>

          {/* EMPTY STATE */}
          {!isGenerating && !isGenerated && (
            <div className="flex flex-col items-center justify-center h-full gap-6 px-8 text-center">
              <div className="w-20 h-20 rounded-3xl bg-panel-bg border border-panel-border flex items-center justify-center shadow-sm">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-600"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>
              </div>
              <div className="max-w-md">
                <h2 className="text-2xl font-bold text-text-primary mb-3">Studio Workspace</h2>
                <p className="text-text-secondary leading-relaxed">Select a project, describe your idea, and let Innobotix agents build your complete robotics plan — BOM, circuit, code, and simulation.</p>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4 w-full max-w-lg">
                {[
                  { agent: 'Builder', desc: 'Components, pins, code', color: 'teal' },
                  { agent: 'Mentor', desc: 'Concepts & learning', color: 'blue' },
                  { agent: 'Simulator', desc: 'Wokwi validation', color: 'amber' },
                ].map(a => (
                  <div key={a.agent} className="bg-panel-bg/50 border border-panel-border rounded-xl p-4 text-sm flex flex-col gap-1">
                    <span className={`font-bold text-${a.color}-400 text-xs uppercase`}>{a.agent}</span>
                    <span className="text-text-secondary text-xs">{a.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GENERATING — AGENT TERMINAL */}
          {isGenerating && (
            <div className="flex flex-col items-center justify-center min-h-full px-6 py-10">
              <div className="w-full max-w-xl">

                {/* Progress bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">Agent Orchestration</span>
                    <span className="text-xs font-mono text-text-secondary">{progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-teal-500 to-blue-500 rounded-full transition-all duration-1000"
                      style={{ width: `${progress}%` }}></div>
                  </div>
                </div>

                {/* Terminal */}
                <div className="rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
                  <div className="bg-zinc-900/80 px-4 py-2.5 flex items-center gap-2 border-b border-zinc-800">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
                    </div>
                    <span className="mx-auto text-[10px] font-mono text-zinc-500 tracking-widest uppercase">Innobotix Multi-Agent Terminal</span>
                  </div>
                  <div ref={logRef} className="bg-black/70 p-6 flex flex-col gap-3 max-h-[360px] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                    {activeSteps.map((step, i) => (
                      <div key={i} className="flex gap-3 items-start animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <span className={`text-[10px] font-bold uppercase tracking-widest pt-0.5 shrink-0 w-20 ${AGENT_COLORS[step.agent]}`}>
                          [{step.agent}]
                        </span>
                        <span className="text-sm text-zinc-300 leading-relaxed">&gt; {step.msg}</span>
                      </div>
                    ))}
                    <div className="flex gap-3 items-start mt-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest shrink-0 w-20 text-zinc-600">[System]</span>
                      <span className="text-sm text-zinc-600 flex items-center gap-1">
                        <span className="animate-pulse">▌</span>
                        processing constraints…
                      </span>
                    </div>
                  </div>
                </div>

                {/* Active agent chips */}
                <div className="mt-5 flex flex-wrap gap-2 justify-center">
                  {(['Builder', 'Circuit', 'Mentor', 'Simulator'] as const).map(a => {
                    const active = activeSteps.some(s => s.agent === a);
                    return (
                      <span key={a} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-500 ${active ? AGENT_BG[a] + ' ' + AGENT_COLORS[a] : 'bg-zinc-900 border-zinc-800 text-zinc-600'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${active ? 'animate-pulse bg-current' : 'bg-zinc-700'}`}></span>
                        {a} Agent
                      </span>
                    );
                  })}
                </div>

              </div>
            </div>
          )}

          {/* GENERATED RESULTS */}
          {isGenerated && builderData && selectedProject && (
            <div className="p-6 lg:p-8 flex flex-col gap-6 max-w-[1400px] mx-auto">

              {/* ── Agent Activity Summary ─────────────────────── */}
              <div className="bg-panel-bg border border-panel-border rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    Agent Activity Complete
                  </h3>
                  <span className="text-[10px] text-text-secondary">{new Date().toLocaleTimeString()}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {AGENT_TIMELINE.filter(s => s.agent !== 'All').map((s, i) => (
                    <div key={i} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs ${AGENT_BG[s.agent]} ${AGENT_COLORS[s.agent]}`}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      {s.msg.split('…')[0]}
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Project Info Header ────────────────────────── */}
              <div className="bg-panel-bg border border-panel-border rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CategoryBadge cat={selectedProject.category} />
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${selectedProject.difficulty === 'Beginner' ? 'bg-green-500/10 text-green-400' : selectedProject.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'}`}>{selectedProject.difficulty}</span>
                  </div>
                  <h2 className="text-lg font-bold text-text-primary">{selectedProject.title}</h2>
                  <p className="text-xs text-text-secondary mt-1">{selectedProject.classroomRelevance}</p>
                </div>
                <div className="flex flex-col gap-1 text-right sm:text-right">
                  <span className="text-xs text-text-secondary">Estimated Budget</span>
                  <span className="text-base font-bold text-text-primary">{selectedProject.estimatedBudget}</span>
                </div>
              </div>

              {/* ── BOM + Safety Row ──────────────────────────── */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                {/* BOM */}
                <div className="bg-panel-bg border border-panel-border rounded-2xl p-5">
                  <h3 className="text-sm font-bold text-text-primary flex items-center gap-2 mb-4">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-teal"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
                    Bill of Materials
                    <span className="ml-auto text-[10px] font-normal text-text-secondary">{builderData.bom?.length || 0} components</span>
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-panel-border">
                          <th className="text-left text-xs font-semibold text-text-secondary pb-2 pr-3">Component</th>
                          <th className="text-center text-xs font-semibold text-text-secondary pb-2 px-2 w-12">Qty</th>
                          <th className="text-left text-xs font-semibold text-text-secondary pb-2 pl-2">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(builderData.bom || []).map((item, i) => (
                          <tr key={i} className="border-b border-zinc-800/40 hover:bg-white/[0.02] transition-colors">
                            <td className="py-2.5 pr-3 font-medium text-text-primary text-sm">{item.component}</td>
                            <td className="py-2.5 px-2 text-center">
                              <span className="bg-zinc-800 text-text-secondary text-xs px-2 py-0.5 rounded font-mono">{item.quantity}</span>
                            </td>
                            <td className="py-2.5 pl-2 text-text-secondary text-xs">{item.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Safety Checks */}
                <div className="bg-panel-bg border border-panel-border rounded-2xl p-5">
                  <h3 className="text-sm font-bold text-text-primary flex items-center gap-2 mb-4">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-400"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                    Safety Validations
                  </h3>
                  <div className="flex flex-col gap-2">
                    {(builderData.safety_checks || []).map((check, i) => (
                      <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border ${sevColor[check.severity] || sevColor.info}`}>
                        <SeverityIcon s={check.severity} />
                        <div>
                          <p className="text-sm font-semibold">{check.title}</p>
                          <p className="text-xs opacity-80 mt-0.5 leading-relaxed">{check.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Circuit Flow + Pin Map Row ─────────────────── */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                {/* Circuit Flow */}
                <div className="bg-panel-bg border border-panel-border rounded-2xl p-5">
                  <h3 className="text-sm font-bold text-text-primary flex items-center gap-2 mb-4">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-400"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                    Circuit Flow
                  </h3>
                  <ol className="flex flex-col gap-3">
                    {(builderData.circuit_flow || []).map((step, i) => {
                      const [bold, rest] = step.split(':');
                      return (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                          <p className="text-sm text-text-secondary leading-relaxed">
                            {rest ? <><strong className="text-text-primary font-semibold">{bold}:</strong>{rest}</> : step}
                          </p>
                        </li>
                      );
                    })}
                  </ol>
                </div>

                {/* Pin Map */}
                <div className="bg-panel-bg border border-panel-border rounded-2xl p-5">
                  <h3 className="text-sm font-bold text-text-primary flex items-center gap-2 mb-4">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-teal-400"><circle cx="12" cy="12" r="3"></circle><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path><path d="M4.93 4.93a10 10 0 0 0 0 14.14"></path></svg>
                    Pin Connections
                  </h3>
                  <div className="flex flex-col gap-3">
                    {(builderData.pin_map || []).map((dev, i) => (
                      <div key={i} className="bg-app-bg border border-panel-border rounded-xl p-3">
                        <div className="flex items-start justify-between mb-1.5">
                          <span className="text-sm font-semibold text-text-primary">{dev.device}</span>
                        </div>
                        <p className="text-xs text-text-secondary mb-2">{dev.details}</p>
                        <div className="flex flex-col gap-1.5 pt-2 border-t border-zinc-800/60">
                          {(dev.connections || []).map((c, j) => (
                            <div key={j} className="flex items-center gap-2 text-xs">
                              <span className="font-mono bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded shrink-0">{c.from_pin}</span>
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-zinc-600 shrink-0"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                              <span className="font-mono text-accent-teal shrink-0">{c.to_node}</span>
                              {c.notes && <span className="text-zinc-600 truncate">{c.notes}</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Code Panel ───────────────────────────────────── */}
              <div className="bg-panel-bg border border-panel-border rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-panel-border">
                  <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                    Generated Code
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-text-secondary bg-app-bg border border-panel-border px-2 py-0.5 rounded uppercase">{selectedProject.board}</span>
                    <button onClick={handleCopyCode} className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-btn-bg border border-panel-border text-text-primary rounded-lg hover:bg-btn-hover transition-colors font-medium">
                      {copied ? (
                        <><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>Copied!</>
                      ) : (
                        <><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>Copy</>
                      )}
                    </button>
                  </div>
                </div>
                <pre className="p-6 text-[13px] font-mono leading-relaxed text-zinc-300 overflow-x-auto bg-black/60" style={{ scrollbarWidth: 'thin' }}>
                  <code dangerouslySetInnerHTML={{
                    __html: builderData.code ? builderData.code
                      .replace(/(\/\/.+)/g, '<span style="color:#777575">$1</span>')
                      .replace(/\b(int|float|void|const|String|long)\b/g, '<span style="color:#00edb4">$1</span>')
                      .replace(/\b(setup|loop|pinMode|digitalWrite|analogRead|delay|Serial\.begin|Serial\.print|Serial\.println)\b/g, '<span style="color:#59fac3">$1</span>')
                      .replace(/(#include\s+<[^>]+>)/g, '<span style="color:#7fdede">$1</span>')
                      .replace(/\bHIGH\b|\bLOW\b|\bOUTPUT\b|\bINPUT\b/g, '<span style="color:#aaffdc">$&</span>')
                      : '// No code generated.'
                  }} />
                </pre>
              </div>

              {/* ── Simulation Panel ─────────────────────────────── */}
              <div className="bg-panel-bg border border-panel-border rounded-2xl overflow-hidden">
                <div className="px-5 py-3.5 border-b border-panel-border flex items-center justify-between">
                  <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-400"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    Wokwi Simulation
                  </h3>
                  {isSimulating && (
                    <div className="flex items-center gap-1.5 text-xs text-green-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                      Virtual instance running
                    </div>
                  )}
                </div>

                {!isSimulating ? (
                  <div className="p-8 flex flex-col items-center gap-5 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-amber-400"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-text-primary mb-1">{selectedProject.title} — Wokwi Simulation</h4>
                      <p className="text-sm text-text-secondary max-w-md">Boot a virtual environment to test your circuit without physical hardware. Components will be pre-configured based on the generated architecture.</p>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setIsSimulating(true)}
                        className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]">
                        Simulate Now on Wokwi
                      </button>
                      <a href={`https://wokwi.com/projects/${selectedProject.wokwiId}`} target="_blank" rel="noopener noreferrer"
                        className="px-6 py-2.5 bg-btn-bg border border-panel-border text-text-primary font-semibold rounded-xl text-sm hover:bg-btn-hover transition-all">
                        Open in Wokwi ↗
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 p-4">
                    <div className="w-full aspect-video rounded-xl border border-panel-border overflow-hidden bg-black">
                      <iframe
                        src={`https://wokwi.com/projects/${selectedProject.wokwiId}?gl=1`}
                        className="w-full h-full border-none"
                        title={`${selectedProject.title} simulation`}
                        loading="lazy"
                      />
                    </div>
                    <div className="flex justify-between items-center px-1">
                      <button onClick={() => setIsSimulating(false)} className="text-xs text-text-secondary hover:text-text-primary transition-colors">← Hide simulator</button>
                      <a href={`https://wokwi.com/projects/${selectedProject.wokwiId}`} target="_blank" rel="noopener noreferrer" className="text-xs text-text-secondary underline hover:text-text-primary transition-colors">Pop out ↗</a>
                    </div>
                  </div>
                )}
              </div>

              {/* ── Follow-Up + Concepts Row ─────────────────────── */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                {/* Follow-up Questions */}
                {builderData.follow_up_questions && builderData.follow_up_questions.length > 0 && (
                  <div className="bg-panel-bg border border-panel-border rounded-2xl p-5">
                    <h3 className="text-sm font-bold text-text-primary flex items-center gap-2 mb-4">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                      Ask Innobotix to Modify
                    </h3>
                    <div className="flex flex-col gap-2">
                      {builderData.follow_up_questions.map((q, i) => (
                        <button key={i} onClick={() => setPrompt(q)}
                          className="text-left text-sm text-text-secondary bg-app-bg border border-panel-border rounded-xl px-4 py-3 hover:border-blue-500/40 hover:text-text-primary transition-all">
                          {q}
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 relative">
                      <input type="text" placeholder="Or type your own modification..." value="" readOnly
                        onClick={() => { }} className="w-full bg-[#09090b] border border-panel-border text-text-secondary rounded-xl py-3 pl-4 pr-32 text-sm focus:outline-none focus:border-blue-500/40 cursor-pointer" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-text-secondary bg-zinc-800 px-2 py-0.5 rounded">Coming soon</span>
                    </div>
                  </div>
                )}

                {/* Concepts Learned */}
                {builderData.concepts_learned && builderData.concepts_learned.length > 0 && (
                  <div className="bg-panel-bg border border-panel-border rounded-2xl p-5">
                    <h3 className="text-sm font-bold text-text-primary flex items-center gap-2 mb-4">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-teal-400"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
                      Concepts Learned
                    </h3>
                    <ul className="flex flex-col gap-2">
                      {builderData.concepts_learned.map((c, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm">
                          <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 text-[10px] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                          <span className="text-text-secondary">{c}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CBSE Tags */}
                    <div className="mt-4 pt-4 border-t border-panel-border">
                      <p className="text-[10px] uppercase tracking-wider font-bold text-text-secondary mb-2">CBSE Tags</p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.cbseTags.map(tag => (
                          <span key={tag} className="text-xs bg-teal-500/10 border border-teal-500/20 text-teal-400 px-2 py-0.5 rounded-full">#{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default function Studio() {
  return (
    <Suspense fallback={
      <div className="h-full flex items-center justify-center p-20">
        <div className="text-accent-teal animate-pulse">Loading Studio…</div>
      </div>
    }>
      <StudioContent />
    </Suspense>
  );
}
