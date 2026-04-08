import Link from "next/link";

const trustItems = [
  "CBSE Aligned",
  "NEP 2020",
  "Arduino & ESP32",
  "Wokwi Simulator",
  "15 Ready Projects",
];

const agentCards = [
  {
    title: "Builder Agent",
    accent: "primary",
    symbol: "*",
    description:
      "Builds the full project package from prompt to parts, wiring flow, and classroom-ready implementation.",
    points: ["Bill of Materials", "Pin planning", "Arduino code"],
  },
  {
    title: "Mentor Agent",
    accent: "secondary",
    symbol: "[ ]",
    description:
      "Explains concepts in student language and maps every build step back to curriculum learning outcomes.",
    points: ["Concept clarity", "CBSE mapping", "Learn by doing"],
  },
  {
    title: "Simulator Agent",
    accent: "tertiary",
    symbol: "[=]",
    description:
      "Validates logic before hardware use, catches common issues, and generates a safe Wokwi simulation path.",
    points: ["Wokwi simulation", "Safety checks", "Circuit validation"],
  },
];

const outputCards = [
  {
    title: "Bill of Materials",
    description: "Structured part list with component groups, quantities, and fit for student builds.",
    extra: "Includes Circuit Flow",
    large: true,
  },
  {
    title: "Arduino Code",
    description: "Generated code matched to the exact circuit plan and ready to test or extend.",
    extra: "Includes Wokwi Simulation",
    code: true,
  },
  {
    title: "Pin Map",
    description: "Clear wire-by-wire layout to show where every signal and power line goes.",
  },
  {
    title: "Safety Checks",
    description: "Warnings for shorts, wrong polarity, risky current paths, and fragile assumptions.",
  },
];

const projectGroups = [
  {
    label: "CBSE / Common",
    title: "Smart Irrigation System",
    projects: ["Smart Street Light", "Fire & Gas Alarm", "Home Security System"],
  },
  {
    label: "CBSE / Common",
    title: "Smart Dustbin",
    projects: ["Traffic Light Controller", "Parking Assist System", "Temperature Controlled Fan"],
  },
  {
    label: "CBSE / Common",
    title: "RFID Door Lock",
    projects: ["Weather Station", "Line Following Robot", "Obstacle Avoiding Robot"],
  },
  {
    label: "Advanced Showcase",
    title: "Bluetooth Controlled Car",
    projects: ["IoT Smart Home (ESP32)", "Smart Farm Protection Device"],
  },
];

const studentBenefits = [
  {
    title: "Instant AI mentorship",
    description: "Project guidance appears immediately, with explainers students can actually follow.",
  },
  {
    title: "Zero-risk simulation",
    description: "Validate the circuit virtually before touching components or making wiring mistakes.",
  },
  {
    title: "Learn by doing",
    description: "Outputs teach the logic behind the build instead of handing over a black box.",
  },
];

const schoolBenefits = [
  "Low-cost virtual lab",
  "Curriculum aligned",
  "Track student progress",
];

export default function Home() {
  return (
    <div className="landing-page">
      <section className="landing-hero">
        <div className="landing-shell">
          <div className="landing-hero-grid">
            <div className="landing-hero-copy">
              <div className="landing-kicker">[ SYSTEM_VERSION_2.4 ]</div>
              <h1 className="landing-hero-title">
                The AI <span>Robotics Studio</span> for Students.
              </h1>
              <p className="landing-hero-text">
                Describe your project. Innobotix agents generate complete BOM, validated wiring, Arduino
                code, and Wokwi simulation - aligned to CBSE curriculum.
              </p>
              <div className="landing-hero-actions">
                <Link href="/studio" className="landing-button landing-button-primary">
                  Launch Studio
                </Link>
                <Link href="/docs" className="landing-button landing-button-secondary">
                  Read docs
                </Link>
              </div>
            </div>

            <div className="landing-console-wrap" aria-hidden="true">
              <div className="landing-console-glow" />
              <div className="landing-console">
                <div className="landing-console-panel landing-console-main">
                  <div className="landing-console-label">PROJECT INPUT</div>
                  <div className="landing-console-line w-88" />
                  <div className="landing-console-line w-62" />
                  <div className="landing-console-line w-72" />
                  <div className="landing-console-line w-46" />
                  <div className="landing-console-subpanel">
                    <div className="landing-console-subtitle">ACTIVE OUTPUT</div>
                    <div className="landing-console-chip">Builder Agent</div>
                    <div className="landing-console-chip">Arduino Code</div>
                  </div>
                </div>
                <div className="landing-console-panel landing-console-float">
                  <div className="landing-console-label">STATUS</div>
                  <div className="landing-console-line w-70" />
                  <div className="landing-console-line w-54" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-trust-strip" aria-label="Trust indicators">
        <div className="landing-trust-track">
          {[...trustItems, ...trustItems].map((item, index) => (
            <span key={`${item}-${index}`} className="landing-trust-item">
              <span className="landing-trust-dot" />
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="landing-section landing-shell" id="agents">
        <div className="landing-section-title">
          <p>Meet the Studio Core</p>
          <span />
        </div>
        <div className="landing-agent-grid">
          {agentCards.map((card) => (
            <article key={card.title} className={`landing-agent-card accent-${card.accent}`}>
              <div className="landing-agent-symbol">{card.symbol}</div>
              <h2>{card.title}</h2>
              <p>{card.description}</p>
              <ul>
                {card.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section landing-output-section">
        <div className="landing-shell">
          <div className="landing-output-header">
            <div>
              <h2>High-Fidelity Studio Outputs</h2>
            </div>
            <p>[ OUTPUT_MATRIX_01 ]</p>
          </div>

          <div className="landing-output-grid">
            {outputCards.map((card) => (
              <article
                key={card.title}
                className={[
                  "landing-output-card",
                  card.large ? "landing-output-card-large" : "",
                  card.code ? "landing-output-card-code" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className="landing-output-label">{card.title}</div>
                <p>{card.description}</p>
                {"extra" in card ? <div className="landing-output-extra">{card.extra}</div> : null}
                {card.large ? (
                  <div className="landing-output-art" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                ) : null}
                {card.code ? (
                  <pre aria-label="Generated Arduino code preview">
                    <code>
                      <span className="code-muted">#include</span> &lt;Arduino.h&gt;
                      {"\n"}
                      <span className="code-muted">// Builder Agent output</span>
                      {"\n"}const int sensorPin = A0;
                      {"\n"}const int relayPin = 8;
                      {"\n"}
                      {"\n"}void setup() {"\n"}  pinMode(relayPin, OUTPUT);
                      {"\n"}}{"\n"}
                    </code>
                  </pre>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section landing-shell" id="projects">
        <div className="landing-project-title">Popular Project Templates</div>
        <div className="landing-project-grid">
          {projectGroups.map((group, index) => (
            <article key={`${group.title}-${index}`} className="landing-project-card">
              <div className={`landing-project-visual visual-${index + 1}`} aria-hidden="true" />
              <div className="landing-project-body">
                <div className="landing-project-label">{group.label}</div>
                <h2>{group.title}</h2>
                <ul>
                  {group.projects.map((project) => (
                    <li key={project}>{project}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section landing-school-section" id="schools">
        <div className="landing-shell landing-school-grid">
          <div>
            <h2>
              Modernizing the <span>Robotics Lab</span>
            </h2>
            <div className="landing-benefit-list">
              {studentBenefits.map((item) => (
                <article key={item.title} className="landing-benefit-item">
                  <div className="landing-benefit-icon">*</div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="landing-school-visual">
            <div className="landing-school-image" aria-hidden="true" />
            <div className="landing-school-overlay">
              <div className="landing-school-overlay-label">For Schools</div>
              <ul>
                {schoolBenefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-recognition">
        <div className="landing-shell">
          <div className="landing-recognition-row">
            <span>For Students</span>
            <span>For Schools</span>
            <span>Innovation Ready</span>
          </div>
        </div>
      </section>

      <section className="landing-section landing-final-cta">
        <div className="landing-shell landing-final-cta-inner">
          <div className="landing-kicker">[ CONNECTION_ESTABLISHED ]</div>
          <h2>Start building. Now.</h2>
          <p>
            AI robotics workflows for students and schools with full project outputs from one prompt.
          </p>
          <div className="landing-hero-actions">
            <Link href="/studio" className="landing-button landing-button-primary">
              Launch Studio
            </Link>
            <Link href="/docs" className="landing-button landing-button-secondary">
              Read docs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
