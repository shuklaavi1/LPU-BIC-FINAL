'use client';

import { useEffect } from 'react';
import Link from "next/link";

const trustItems = [
  "INDIAN CURRICULUM",
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
    projects: ["IoT Smart Home (ESP32)", "Smart Farm Protection Device", "Alarm Clock with RTC", "Electronic Safe"],
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
  useEffect(() => {
    const hero = document.querySelector('.hero-section');
    const panel = document.getElementById('tilt-panel');
    if (!hero || !panel) return;
    const onMove = (e: any) => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      panel.style.transform = `perspective(1000px) rotateY(${-30 + x * 40}deg) rotateX(${20 - y * 30}deg)`;
    };
    const onLeave = () => {
      panel.style.transform = 'perspective(1000px) rotateY(-22deg) rotateX(12deg)';
    };
    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseleave', onLeave);
    return () => {
      hero.removeEventListener('mousemove', onMove);
      hero.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div className="landing-page">
      <section className="landing-hero hero-section" style={{
        backgroundImage: 'linear-gradient(rgba(170,255,220,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(170,255,220,0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}>
        {/* Status chip (Absolute top right for Desktop) */}
        <div className="absolute top-6 right-6 hidden md:flex items-center gap-2 bg-[#161616]/40 backdrop-blur border border-[#1a1a1a] px-3 py-1.5 overflow-hidden z-20">
          <div className="absolute inset-0 w-full h-[1px] top-0 bg-gradient-to-r from-transparent via-[#2dd4bf] to-transparent" style={{ animation: 'shimmer 7s linear infinite' }} />
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="2"><path d="m11 21-4.8 1.6c-.6.2-1.2-.3-1.2-.9V18c0-.6-.4-1-1-1H3c-.6 0-1-.4-1-1v-4c0-.6.4-1 1-1h1l3.5-7.5C7.8 2.2 8.3 2 8.9 2h6.2c.6 0 1.1.2 1.4.7L20 10h1c.6 0 1 .4 1 1v4c0 .6-.4 1-1 1h-1c-.6 0-1 .4-1 1v3.7c0 .6-.6 1.1-1.2.9L13 21"/></svg>
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#999999]">EMERGENT VENTURES</span>
        </div>

        <div className="landing-shell relative">
          <div className="landing-hero-grid">
            <div className="landing-hero-copy">
              <div className="landing-kicker">[ SYSTEM_VERSION_2.4 ]</div>
              <h1 className="landing-hero-title">
                The AI <span>Robotics Studio</span> for Students.
              </h1>
              
              {/* Status chip (Mobile Flow) */}
              <div className="md:hidden flex mb-6 w-max mx-auto md:mx-0">
                <div className="relative flex items-center gap-2 bg-[#161616]/40 backdrop-blur border border-[#1a1a1a] px-3 py-1.5 overflow-hidden">
                  <div className="absolute inset-0 w-full h-[1px] top-0 bg-gradient-to-r from-transparent via-[#2dd4bf] to-transparent" style={{ animation: 'shimmer 7s linear infinite' }} />
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="2"><path d="m11 21-4.8 1.6c-.6.2-1.2-.3-1.2-.9V18c0-.6-.4-1-1-1H3c-.6 0-1-.4-1-1v-4c0-.6.4-1 1-1h1l3.5-7.5C7.8 2.2 8.3 2 8.9 2h6.2c.6 0 1.1.2 1.4.7L20 10h1c.6 0 1 .4 1 1v4c0 .6-.4 1-1 1h-1c-.6 0-1 .4-1 1v3.7c0 .6-.6 1.1-1.2.9L13 21"/></svg>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#999999]">EMERGENT VENTURES</span>
                </div>
              </div>

              <p className="landing-hero-text">
                Describe your project. Innobotix agents generate complete BOM, validated wiring, Arduino
                code, and Wokwi simulation - aligned to NEP 2020.
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

            <div className="relative flex items-center justify-center">
              <div
                id="tilt-panel"
                className="relative w-full"
                style={{
                  height: '600px',
                  transform: 'perspective(1000px) rotateY(-15deg) rotateX(5deg)',
                  transition: 'transform 0.08s ease'
                }}
              >
                {/* Main Code Panel */}
                <div style={{
                  position:'absolute', inset:0,
                  background:'#1a1919',
                  border:'1px solid rgba(73,72,71,0.3)',
                  padding:'4px',
                  boxShadow:'0 0 40px -10px rgba(0,253,193,0.15)'
                }}>
                  {/* Panel Title Bar */}
                  <div style={{
                    background:'#201f1f', height:'32px',
                    display:'flex', alignItems:'center',
                    padding:'0 16px', justifyContent:'space-between',
                    borderBottom:'1px solid rgba(73,72,71,0.2)'
                  }}>
                    <div style={{display:'flex', gap:'6px'}}>
                      <div style={{width:'8px',height:'8px',background:'#ff716c'}}/>
                      <div style={{width:'8px',height:'8px',background:'#9cfbfa'}}/>
                      <div style={{width:'8px',height:'8px',background:'#aaffdc'}}/>
                    </div>
                    <span style={{
                      fontFamily:'JetBrains Mono, monospace', fontSize:'10px',
                      color:'#adaaaa', textTransform:'uppercase'
                    }}>main_controller.ino</span>
                  </div>
                  {/* Code Content */}
                  <div style={{padding:'24px', fontFamily:'JetBrains Mono, monospace', fontSize:'13px', lineHeight:'1.8'}}>
                    <div><span style={{color:'#00edb4'}}>#include</span> <span style={{color:'#7fdede'}}>&lt;Wire.h&gt;</span></div>
                    <div><span style={{color:'#00edb4'}}>#include</span> <span style={{color:'#7fdede'}}>&lt;Adafruit_Sensor.h&gt;</span></div>
                    <div><span style={{color:'#00edb4'}}>#include</span> <span style={{color:'#7fdede'}}>&lt;Adafruit_BNO055.h&gt;</span></div>
                    <div><span style={{color:'#00edb4'}}>#include</span> <span style={{color:'#7fdede'}}>&lt;utility/imumaths.h&gt;</span></div>
                    <div style={{color:'#fff', marginTop:'8px'}}><span style={{color:'#00edb4'}}>Adafruit_BNO055</span> bno = Adafruit_BNO055(55, 0x28, &amp;Wire);</div>
                    
                    <div style={{color:'#555', marginTop:'12px'}}>{'// Initialize IMU system and prepare I2C clock'}</div>
                    <div style={{color:'#fff', marginTop:'4px'}}><span style={{color:'#00edb4'}}>void</span> setup() {'{'}</div>
                    <div style={{color:'#fff', paddingLeft:'20px'}}>Serial.begin(<span style={{color:'#59fac3'}}>115200</span>);</div>
                    <div style={{color:'#fff', paddingLeft:'20px'}}><span style={{color:'#00edb4'}}>while</span>(!Serial) delay(10); <span style={{color:'#555'}}>// wait for port</span></div>
                    <div style={{color:'#fff', paddingLeft:'20px'}}>Serial.begin(<span style={{color:'#59fac3'}}>115200</span>);</div>
                    <div style={{color:'#fff', paddingLeft:'20px'}}><span style={{color:'#00edb4'}}>if</span>(!bno.begin()) {'{'}</div>
                    <div style={{color:'#d7383b', paddingLeft:'40px'}}>Serial.print(<span style={{color:'#59fac3'}}>"ERR: NO_BNO055"</span>);</div>
                    <div style={{color:'#fff', paddingLeft:'20px'}}>{'}'}</div>
                    <div style={{color:'#fff'}}>{'}'}</div>
                  </div>
                </div>

                {/* Floating COMPONENT_BOM panel — top right */}
                <div style={{
                  position:'absolute', top:'48px', right:'-48px',
                  width:'200px', background:'#262626',
                  border:'1px solid rgba(0,253,193,0.4)',
                  padding:'16px', zIndex:10,
                  display:'none'
                }} className="lg:block">
                  <div style={{
                    fontFamily:'JetBrains Mono, monospace', fontSize:'10px',
                    color:'#00fdc1', letterSpacing:'0.15em',
                    textTransform:'uppercase', marginBottom:'12px'
                  }}>[ COMPONENT_BOM ]</div>
                  {[
                    {name:'Arduino Nano R3', qty:'x1'},
                    {name:'L298N Motor Driver', qty:'x2'},
                    {name:'HC-SR04 Sensor', qty:'x4'},
                  ].map((item, i) => (
                    <div key={i} style={{
                      display:'flex', justifyContent:'space-between',
                      borderBottom:'1px solid rgba(73,72,71,0.2)',
                      paddingBottom:'8px', marginBottom:'8px'
                    }}>
                      <span style={{fontFamily:'JetBrains Mono, monospace', fontSize:'12px', color:'#fff'}}>{item.name}</span>
                      <span style={{fontFamily:'JetBrains Mono, monospace', fontSize:'10px', color:'#aaffdc'}}>{item.qty}</span>
                    </div>
                  ))}
                </div>

                {/* Floating BUILDER_AGENT_LOG — bottom left */}
                <div style={{
                  position:'absolute', bottom:'64px', left:'-64px',
                  width:'280px', background:'#131313',
                  border:'1px solid rgba(73,72,71,0.3)',
                  padding:'16px', zIndex:10,
                  display:'none'
                }} className="lg:block">
                  <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'12px'}}>
                    <span style={{fontFamily:'JetBrains Mono, monospace', fontSize:'10px', color:'#adaaaa', textTransform:'uppercase', letterSpacing:'0.15em'}}>BUILDER_AGENT_LOG</span>
                  </div>
                  <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:'11px', lineHeight:'1.8'}}>
                    <div style={{color:'#555'}}>&gt;&gt; Analyzing schematic requirements...</div>
                    <div style={{color:'#00edb4'}}>&gt;&gt; Optimized I2C bus detected.</div>
                    <div style={{color:'#fff'}}>&gt;&gt; Code validation: 98.4% success.</div>
                    <div style={{color:'#59fac3'}}>&gt;&gt; READY_FOR_SIMULATION</div>
                  </div>
                </div>

                {/* Innobotix Multi Agents badge — bottom left */}
                <div style={{
                  position:'absolute', bottom:'24px', left:'32px',
                  background:'#0e0e0e', padding:'8px 16px',
                  border:'1px solid #aaffdc',
                  display:'flex', alignItems:'center', gap:'12px', zIndex:10
                }}>
                  <div style={{position:'relative', width:'16px', height:'16px'}}>
                    <div style={{
                      position:'absolute', inset:0, background:'#00fdc1',
                      borderRadius:'50%', animation:'ping 1s infinite'
                    }}/>
                    <div style={{
                      position:'relative', width:'16px', height:'16px', background:'#00fdc1'
                    }}/>
                  </div>
                  <span style={{
                    fontFamily:'JetBrains Mono, monospace', fontSize:'12px',
                    textTransform:'uppercase', letterSpacing:'0.05em', color:'#fff'
                  }}>Innobotix Multi Agents</span>
                </div>

                {/* CSS Wireframe Cube */}
                <div style={{
                  position:'absolute', bottom:'20px', right:'20px',
                  width:'80px', height:'80px', perspective:'200px',
                  pointerEvents:'none', zIndex:0
                }}>
                  <div style={{
                    width:'80px', height:'80px', position:'relative',
                    transformStyle:'preserve-3d',
                    animation:'rotateCube 10s linear infinite'
                  }}>
                    {[
                      {transform:'rotateY(0deg) translateZ(40px)'},
                      {transform:'rotateY(90deg) translateZ(40px)'},
                      {transform:'rotateY(180deg) translateZ(40px)'},
                      {transform:'rotateY(-90deg) translateZ(40px)'},
                      {transform:'rotateX(90deg) translateZ(40px)'},
                      {transform:'rotateX(-90deg) translateZ(40px)'},
                    ].map((f, i) => (
                      <div key={i} style={{
                        position:'absolute', width:'80px', height:'80px',
                        border:'1px solid rgba(0,253,193,0.2)',
                        background:'transparent', ...f
                      }}/>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{
        width:'100%', height:'44px', background:'#131313',
        borderTop:'1px solid rgba(170,255,220,0.08)',
        borderBottom:'1px solid rgba(170,255,220,0.08)',
        display:'flex', alignItems:'center', overflow:'hidden',
        position:'relative'
      }}>
        <div style={{
          flexShrink:0, padding:'0 32px',
          fontFamily:'JetBrains Mono, monospace', fontSize:'10px',
          color:'#777575', textTransform:'uppercase', letterSpacing:'0.15em',
          whiteSpace:'nowrap', zIndex:2, background:'#131313',
          borderRight:'1px solid rgba(170,255,220,0.08)'
        }}>
          FEATURED IN:
        </div>
        <div style={{overflow:'hidden', flex:1}}>
          <div style={{
            display:'flex', alignItems:'center',
            animation:'marquee 35s linear infinite',
            whiteSpace:'nowrap', width:'max-content'
          }}>
            {[
              'Doordarshan','The Better India','Startup Jharkhand',
              'NEP 2020','Arduino','ESP32','CBSE Tech',
              'Doordarshan','The Better India','Startup Jharkhand',
              'NEP 2020','Arduino','ESP32','CBSE Tech'
            ].map((item, i) => (
              <span key={i} style={{
                fontFamily:'JetBrains Mono, monospace',
                fontSize:'11px', color:'#aaffdc',
                textTransform:'uppercase', letterSpacing:'0.15em',
                marginRight:'0'
              }}>
                {item}
                <span style={{color:'#00fdc1', margin:'0 14px', fontSize:'8px'}}>✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

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
                      {"\n"}{"}"}{"\n"}
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
          
          {/* Card 1 – Alarm Clock with RTC */}
          <article className="landing-project-card group relative hover:translate-y-[-6px] transition-transform duration-300 hover:shadow-[0_12px_30px_rgba(0,253,193,0.08)]">
            <div className="landing-project-visual flex items-center justify-center border-b border-[#262626] relative">
              <span className="font-mono text-[10px] text-[#777575] max-w-[200px] text-center px-4">
                [INSERT real wokwi screenshot for Alarm Clock manually here]
              </span>
            </div>
            
            {/* Hover overlay */}
            <div className="absolute inset-x-0 top-0 h-[154px] bg-[#0e0e0e]/95 backdrop-blur-sm p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center z-10 border-b border-[#262626]">
              <p className="text-[12px] text-[#9f9f9f] leading-[1.6]">
                Arduino-powered alarm clock with RTC, 7-segment display, buttons, and buzzer.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full">Advanced</span>
                <span className="bg-zinc-800 border border-zinc-700 text-zinc-300 text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full">Timekeeping</span>
              </div>
            </div>

            <div className="landing-project-body relative z-0 bg-[#1a1919]">
              <div className="landing-project-label">Advanced Showcase</div>
              <h2 className="font-space-grotesk text-[14px] uppercase font-bold tracking-[-0.04em] mt-2 mb-1">Alarm Clock with RTC</h2>
              <p className="text-[11px] text-[#777] font-inter leading-[1.7]">
                Set alarms, see real time, hear the buzzer.
              </p>
            </div>
          </article>

          {/* Card 2 – Electronic Safe */}
          <article className="landing-project-card group relative hover:translate-y-[-6px] transition-transform duration-300 hover:shadow-[0_12px_30px_rgba(0,253,193,0.08)]">
            <div className="landing-project-visual flex items-center justify-center border-b border-[#262626] relative">
              <span className="font-mono text-[10px] text-[#777575] max-w-[200px] text-center px-4">
                [INSERT real wokwi screenshot for Electronic Safe manually here]
              </span>
            </div>
            
            {/* Hover overlay */}
            <div className="absolute inset-x-0 top-0 h-[154px] bg-[#0e0e0e]/95 backdrop-blur-sm p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center z-10 border-b border-[#262626]">
              <p className="text-[12px] text-[#9f9f9f] leading-[1.6]">
                Enter a PIN on the keypad to unlock a servo-driven safe; wrong code triggers a buzzer.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full">Advanced</span>
                <span className="bg-zinc-800 border border-zinc-700 text-zinc-300 text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full">Security</span>
              </div>
            </div>

            <div className="landing-project-body relative z-0 bg-[#1a1919]">
              <div className="landing-project-label">Advanced Showcase</div>
              <h2 className="font-space-grotesk text-[14px] uppercase font-bold tracking-[-0.04em] mt-2 mb-1">Electronic Safe</h2>
              <p className="text-[11px] text-[#777] font-inter leading-[1.7]">
                Keypad + LCD + servo-lock demo.
              </p>
            </div>
          </article>
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
          <div className="landing-hero-actions" style={{ justifyContent: 'center', width: '100%' }}>
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
