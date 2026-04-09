'use client';
import { useState } from 'react';
import Link from 'next/link';

const sections = [
  {
    id: 'overview',
    label: '01 — Overview',
    title: 'What is Innobotix?',
    content: `Innobotix is an AI-powered robotics engineering studio built for Indian students and schools. It is designed around three core principles: accessibility, precision, and curriculum alignment.

The platform converts a plain-language project description into a complete engineering package — Bill of Materials (BOM), circuit wiring diagram, pinout mapping, and production-ready Arduino code — in under 30 seconds.

Innobotix is not a chatbot. It is a multi-agent system where three specialized AI agents — The Builder, The Mentor, and The Simulator — work in parallel to handle different layers of the engineering workflow. This architecture is what separates Innobotix from every other EdTech tool in the Indian market.

Aligned to NEP 2020 competency frameworks and the CBSE curriculum, Innobotix is built to be adopted directly by schools, not just individual students.`
  },
  {
    id: 'quickstart',
    label: '02 — Quick Start',
    title: 'Getting Started in 60 Seconds',
    content: `Step 1 — Select your project from the dropdown in the Studio workspace. Projects are organized by curriculum level: CBSE Common, Intermediate, and Advanced Showcase.

Step 2 — Describe your requirements in the prompt bar on the left. Be specific — mention your board (Arduino Uno, ESP32, Raspberry Pi Pico), your sensors, and what you want the project to do. Example: "Build a smart street light that turns on automatically when ambient light drops below 400 lux, using an LDR sensor and a relay module."

Step 3 — Click Generate Architecture. The Builder Agent will produce your complete BOM, wiring diagram, and boilerplate code within 30 seconds.

Step 4 — Use the Wokwi Simulation panel to test your circuit logic in a virtual environment before touching any physical hardware. This eliminates the most common failure point for student projects — incorrect wiring.

Step 5 — Ask the Mentor Agent to explain any concept you don't understand. It identifies short-circuit risks, explains voltage divider logic, and walks through your code line by line in plain English.`
  },
  {
    id: 'agents',
    label: '03 — AI Agents',
    title: 'The Three-Agent Architecture',
    content: `THE BUILDER AGENT handles schematic synthesis. Given a hardware specification and project brief, it generates a complete Bill of Materials with component costs in INR, a wiring diagram in Wokwi-compatible format, GPIO pinout mapping for your board, and optimized Arduino/MicroPython boilerplate code with inline comments.

THE MENTOR AGENT handles real-time debugging and conceptual explanation. It identifies common wiring mistakes (missing pull-up resistors, incorrect voltage levels, floating pins), explains circuit theory in plain English tailored to the student's level, and provides step-by-step assembly guidance. It understands the CBSE and NEP 2020 learning frameworks and aligns its explanations to those competency levels.

THE SIMULATOR AGENT handles Wokwi integration. It pre-configures the virtual simulation environment based on the architecture the Builder produced, allowing students to test their logic without physical components. It also validates code correctness and flags runtime issues before deployment.

All three agents run in parallel, not sequentially, which is what enables the sub-30-second response time.`
  },
  {
    id: 'curriculum',
    label: '04 — Curriculum',
    title: 'NEP 2020 & CBSE Alignment',
    content: `Innobotix is the only AI engineering studio in India built with NEP 2020 competency mapping as a first-class feature, not an afterthought.

The National Education Policy 2020 mandates coding and computational thinking from Class 6 onwards, and emphasises experiential, project-based learning at all levels. Innobotix directly addresses this by making hardware project work accessible to students who have never touched an Arduino before.

Every project in the Innobotix library is tagged with its CBSE alignment level (Class 6-8 Foundation, Class 9-10 Applied, Class 11-12 Advanced) and its NEP 2020 competency cluster (Computational Thinking, Design & Innovation, Data Literacy, Systems Thinking).

For school administrators and teachers: Innobotix can be deployed as a school-wide platform. The Schools Dashboard (coming soon) will provide teacher oversight, student progress tracking, project submission workflows, and curriculum coverage reports aligned to your academic calendar.`
  },
  {
    id: 'projects',
    label: '05 — Projects',
    title: 'Supported Projects & Hardware',
    content: `CBSE COMMON TIER: Smart Irrigation System, Smart Street Light, Fire and Gas Alarm System, Home Security System, Smart Dustbin, Traffic Light Controller, Parking Assist System, Temperature Controlled Fan, RFID Door Lock, Weather Station.

INTERMEDIATE TIER: Line Following Robot, Obstacle Avoiding Robot, Bluetooth Controlled Car, Gesture Controlled Robot, Maze Solver Robot.

ADVANCED SHOWCASE: Autonomous Drone Navigation, Computer Vision Sorting System, Industrial IoT Dashboard, Swarm Robotics Prototype.

SUPPORTED BOARDS: Arduino Uno, Arduino Nano, Arduino Mega, ESP32 (all variants), ESP8266, Raspberry Pi Pico, STM32 Nucleo series.

COMPONENT COST RANGE: Most CBSE Common projects are achievable within INR 200-450 in components, sourced from standard Indian suppliers (Robu.in, Electronicscomp, local Lamington Road/SP Road vendors). The BOM generated by Innobotix includes estimated INR pricing for all components.`
  },
  {
    id: 'faq',
    label: '06 — FAQ',
    title: 'Frequently Asked Questions',
    content: `Q: Do I need prior programming experience?
A: No. Innobotix generates all code automatically and the Mentor Agent explains every line. Students with zero programming background have successfully completed CBSE projects using Innobotix.

Q: Does it work for ESP32 and not just Arduino?
A: Yes. Innobotix supports Arduino Uno, Nano, Mega, all ESP32 variants, ESP8266, and Raspberry Pi Pico. Select your board in the project requirements and the Builder Agent optimises the code and pinout for that specific hardware.

Q: Is the Wokwi simulation accurate enough to trust?
A: Wokwi is used by professional electronics engineers worldwide, not just students. For the component types used in CBSE and intermediate projects, the simulation is highly accurate. Advanced projects with custom RF or industrial sensors may have simulation limitations.

Q: Can my school get a bulk licence?
A: Yes. Email avimohan@innobotix.in with your school name, student count, and board affiliation. We offer school-wide deployment packages with teacher dashboards and curriculum integration support.

Q: Is Innobotix free?
A: A free tier is available for individual students with limited monthly generations. School and institution plans are paid and include unlimited generations, teacher dashboards, and priority support.

Q: Is this aligned to the CBSE Science and Technology curriculum?
A: Yes. All projects in the CBSE Common tier map directly to the Class 8-10 science curriculum topics including electricity, sensors, and control systems.`
  }
];

export default function DocsPage() {
  const [active, setActive] = useState('overview');
  const current = sections.find(s => s.id === active) || sections[0];

  return (
    <main style={{background:'#0e0e0e', minHeight:'100vh',
      color:'#fff', paddingTop:'64px', display:'flex',
      flexDirection:'column'}}>

      {/* Header */}
      <div style={{
        borderBottom:'1px solid rgba(170,255,220,0.06)',
        padding:'40px 40px 32px',
        backgroundImage:'linear-gradient(rgba(170,255,220,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(170,255,220,0.03) 1px,transparent 1px)',
        backgroundSize:'40px 40px'
      }}>
        <p style={{fontFamily:'JetBrains Mono,monospace',
          fontSize:'10px', color:'#aaffdc',
          letterSpacing:'0.4em', textTransform:'uppercase',
          marginBottom:'8px'}}>[ DOCUMENTATION ]</p>
        <h1 style={{fontFamily:'Space Grotesk,sans-serif',
          fontSize:'32px', fontWeight:900, textTransform:'uppercase'}}>
          Innobotix Docs
        </h1>
      </div>

      {/* Body */}
      <div style={{display:'flex', flex:1}}>

        {/* Sidebar */}
        <div style={{width:'260px', flexShrink:0,
          background:'#131313',
          borderRight:'1px solid rgba(170,255,220,0.06)',
          padding:'24px 0', position:'sticky',
          top:'64px', height:'calc(100vh - 64px)',
          overflowY:'auto'}}>
          {sections.map(s => (
            <button key={s.id} onClick={() => setActive(s.id)}
              style={{
                display:'block', width:'100%', textAlign:'left',
                padding:'12px 24px', background:'none', border:'none',
                borderLeft: active === s.id
                  ? '2px solid #00fdc1' : '2px solid transparent',
                color: active === s.id ? '#aaffdc' : '#777575',
                fontFamily:'JetBrains Mono,monospace', fontSize:'11px',
                textTransform:'uppercase', letterSpacing:'0.1em',
                cursor:'pointer', transition:'all 0.15s'
              }}>
              {s.label}
            </button>
          ))}
          <div style={{margin:'24px', marginTop:'40px',
            borderTop:'1px solid rgba(170,255,220,0.06)',
            paddingTop:'24px'}}>
            <a href="mailto:avimohan@innobotix.in"
              style={{
                display:'block', background:'#00fdc1',
                color:'#004734', fontFamily:'Space Grotesk,sans-serif',
                fontWeight:700, fontSize:'11px',
                textTransform:'uppercase', letterSpacing:'0.1em',
                padding:'10px 16px', textDecoration:'none',
                textAlign:'center'
              }}>
              Get Support ↗
            </a>
          </div>
        </div>

        {/* Content */}
        <div style={{flex:1, padding:'48px 64px', maxWidth:'800px'}}>
          <h2 style={{fontFamily:'Space Grotesk,sans-serif',
            fontSize:'28px', fontWeight:900,
            textTransform:'uppercase', marginBottom:'32px',
            borderBottom:'1px solid rgba(170,255,220,0.08)',
            paddingBottom:'16px', color:'#00fdc1'}}>
            {current.title}
          </h2>
          {current.content.split('\n\n').map((para, i) => (
            <p key={i} style={{
              color: para.startsWith('Q:') ? '#aaffdc'
                   : para.startsWith('A:') ? '#adaaaa'
                   : para.toUpperCase() === para && para.length < 60
                   ? '#00fdc1' : '#adaaaa',
              fontFamily: para.toUpperCase() === para && para.length < 60
                ? 'Space Grotesk, sans-serif' : 'Inter, sans-serif',
              fontWeight: para.toUpperCase() === para && para.length < 60
                ? 700 : 400,
              fontSize: para.toUpperCase() === para && para.length < 60
                ? '13px' : '15px',
              lineHeight: 1.9,
              marginBottom:'20px',
              textTransform: para.toUpperCase() === para && para.length < 60
                ? 'uppercase' : 'none'
            }}>
              {para}
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}
