import Link from 'next/link';

export default function Docs() {
  return (
    <div className="flex flex-1 flex-col md:flex-row bg-app-bg text-text-primary">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 border-r border-panel-border bg-[#09090b] hidden md:block">
        <div className="p-6 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
          <h4 className="font-semibold text-sm mb-4 text-text-primary">Getting Started</h4>
          <ul className="flex flex-col gap-3 text-sm text-text-secondary mb-8 pl-2 border-l border-panel-border">
            <li><a href="#students" className="hover:text-accent-teal transition-colors -ml-[1px] border-l border-transparent hover:border-accent-teal pl-3 py-1 block">For Students</a></li>
            <li><a href="#schools" className="hover:text-accent-teal transition-colors -ml-[1px] border-l border-transparent hover:border-accent-teal pl-3 py-1 block">For Schools</a></li>
          </ul>

          <h4 className="font-semibold text-sm mb-4 text-text-primary">Core Systems</h4>
          <ul className="flex flex-col gap-3 text-sm text-text-secondary mb-8 pl-2 border-l border-panel-border">
            <li><a href="#simulation" className="hover:text-accent-teal transition-colors -ml-[1px] border-l border-transparent hover:border-accent-teal pl-3 py-1 block">Simulation (Wokwi)</a></li>
            <li><a href="#safety" className="hover:text-accent-teal transition-colors -ml-[1px] border-l border-transparent hover:border-accent-teal pl-3 py-1 block">Safety & Best Practices</a></li>
          </ul>

          <h4 className="font-semibold text-sm mb-4 text-text-primary">Developer</h4>
          <ul className="flex flex-col gap-3 text-sm text-text-secondary pl-2 border-l border-panel-border">
            <li><a href="#api" className="hover:text-accent-teal transition-colors -ml-[1px] border-l border-transparent hover:border-accent-teal pl-3 py-1 block">API & Integrations</a></li>
            <li><a href="#" className="hover:text-accent-teal transition-colors -ml-[1px] border-l border-transparent hover:border-accent-teal pl-3 py-1 block">OpenRouter integration</a></li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 xl:p-16 max-w-4xl">
        <div className="space-y-12">
          
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Innobotix Documentation</h1>
            <p className="text-lg text-text-secondary leading-relaxed">
              Welcome to the official documentation for Innobotix AI Robotics Studio. Learn how to transform project definitions into safe, verified electronics builds and automated logic.
            </p>
          </div>

          <hr className="border-panel-border" />

          {/* Section: Students */}
          <section id="students" className="space-y-4 scroll-mt-24">
            <h2 className="text-2xl font-bold text-text-primary">Getting Started – For Students</h2>
            <p className="text-text-secondary leading-relaxed text-sm">
              Innobotix is designed to help you quickly move past "blank page syndrome" and focus on building. Instead of guessing component requirements or scrolling through scattered tutorials, simply head over to the <Link href="/studio" className="text-accent-teal hover:underline">Studio</Link> and express your idea in plain English.
            </p>
            <div className="bg-panel-bg border border-panel-border rounded-lg p-5 mt-4">
              <h4 className="font-medium text-sm mb-2 text-text-primary">Quick Example Prompt</h4>
              <p className="italic text-text-secondary text-sm bg-app-bg p-3 rounded border border-panel-border">
                "I want an automatic door lock system using RFID and a servo motor."
              </p>
            </div>
          </section>

          {/* Section: Schools */}
          <section id="schools" className="space-y-4 scroll-mt-24">
            <h2 className="text-2xl font-bold text-text-primary">Getting Started – For Schools</h2>
            <p className="text-text-secondary leading-relaxed text-sm">
              We align with the NEP 2020 framework to enforce problem-solving logic before heavy hardware usage. Using the <Link href="/school" className="text-accent-teal hover:underline">Dashboard</Link>, educators can monitor class engagement, track deployed simulations, and approve concepts before bulk ordering the Bill of Materials (BOM).
            </p>
            <ul className="list-disc ml-5 mt-2 space-y-2 text-sm text-text-secondary">
              <li>Manage students via custom bulk invites.</li>
              <li>Track aggregate simulation scores.</li>
              <li>Review generated Arduino/ESP32 code outputs.</li>
            </ul>
          </section>

          {/* Section: API */}
          <section id="api" className="space-y-4 scroll-mt-24">
            <h2 className="text-2xl font-bold text-text-primary">API & Integrations</h2>
            <p className="text-text-secondary leading-relaxed text-sm">
              The internal AI agent infrastructure relies on highly-tuned models generating standardized data for Wokwi and component APIs. 
            </p>
            <div className="bg-[#0d0d0f] border border-panel-border rounded-lg p-4 font-mono text-sm overflow-x-auto text-[#e4e4e7]">
              <span className="text-purple-400">POST</span> <span className="text-green-400">/api/generate-plan</span>{"\n"}
              {"{\n"}
              {"  "}<span className="text-blue-300">"prompt"</span>: <span className="text-yellow-200">"Build a weather station"</span>,{"\n"}
              {"  "}<span className="text-blue-300">"board"</span>: <span className="text-yellow-200">"ESP32"</span>{"\n"}
              {"}\n"}
            </div>
          </section>

          {/* Section: Safety */}
          <section id="safety" className="space-y-4 scroll-mt-24">
            <h2 className="text-2xl font-bold text-text-primary">Safety & Best Practices</h2>
            <p className="text-text-secondary leading-relaxed text-sm">
              While we generate simulated hardware schematics, always follow the AI-generated Safety Validation checklist provided in the Studio panels. Common mistakes like skipping motor drivers or miswiring 12V supplies are usually flagged before simulation execution.
            </p>
            <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 rounded-lg p-4 text-sm flex gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              <span>Verify your component current draw. Do not power external motors directly through your microcontroller's 5V pin.</span>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
