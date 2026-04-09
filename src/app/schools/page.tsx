'use client';
import Link from 'next/link';

export default function SchoolsPage() {
  return (
    <main style={{background:'#0e0e0e', minHeight:'100vh', color:'#fff', fontFamily:'Inter, sans-serif', paddingTop:'64px'}}>
      
      {/* ── HERO ── */}
      <section style={{
        borderBottom:'1px solid rgba(170,255,220,0.06)',
        padding:'80px 24px 64px', textAlign:'center',
        backgroundImage:'linear-gradient(rgba(170,255,220,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(170,255,220,0.03) 1px,transparent 1px)',
        backgroundSize:'40px 40px'
      }}>
        <p style={{fontFamily:'JetBrains Mono,monospace', fontSize:'10px', color:'#aaffdc', letterSpacing:'0.4em', textTransform:'uppercase', marginBottom:'16px'}}>
          [ SCHOOL DEPLOYMENT ]
        </p>
        <h1 style={{fontFamily:'Space Grotesk,sans-serif', fontSize:'clamp(36px,6vw,72px)', fontWeight:900, lineHeight:1.1, marginBottom:'20px'}}>
          AI Robotics Infrastructure<br/>for <span style={{color:'#00fdc1'}}>CBSE Schools</span>
        </h1>
        <p style={{color:'#adaaaa', fontSize:'16px', maxWidth:'600px', margin:'0 auto 40px', lineHeight:1.7}}>
          Eliminate hardware wastage, align with NEP 2020 competency frameworks, and empower your teachers to run practical lab sessions securely with our guided multi-agent platform.
        </p>
        <div style={{display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap'}}>
          <a href="mailto:avimohan@innobotix.in" style={{
            background:'#00fdc1', color:'#004734', fontFamily:'Space Grotesk,sans-serif', fontWeight:700, fontSize:'13px',
            textTransform:'uppercase', letterSpacing:'0.15em', padding:'14px 32px', textDecoration:'none', transition:'all 0.2s'
          }}>Book School Demo</a>
          <Link href="/pricing" style={{
            border:'1px solid #777575', color:'#fff', fontFamily:'Space Grotesk,sans-serif', fontWeight:700, fontSize:'13px',
            textTransform:'uppercase', letterSpacing:'0.15em', padding:'14px 32px', textDecoration:'none', transition:'all 0.2s'
          }}>View Pricing</Link>
        </div>
      </section>

      {/* ── WHY SCHOOLS CHOOSE INNOBOTIX ── */}
      <section style={{padding:'80px 24px'}}>
        <div style={{maxWidth:'1100px', margin:'0 auto'}}>
          <p style={{fontFamily:'JetBrains Mono,monospace', fontSize:'10px', color:'#777575', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'24px', textAlign:'center'}}>
             Why Schools Partner With Us 
          </p>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:'24px'}}>
            {[
              {title:'Reduced Hardware Wastage', text:'Minimize blown components by running Wokwi safety simulations before touching physical boards.'},
              {title:'Teacher Assistance at Scale', text:'The Mentor Agent handles repetitive student conceptual questions so teachers can focus on deeper oversight.'},
              {title:'CBSE / NEP 2020 Alignment', text:'Projects mapped directly to Class 6-12 prescribed competency metrics and computational thinking goals.'},
              {title:'Faster Project Completion', text:'Generate BOM, schematic, and boilerplate code in under 30 seconds, saving weeks of troubleshooting.'}
            ].map((feature, i) => (
              <div key={i} style={{background:'#131313', border:'1px solid rgba(73,72,71,0.3)', padding:'32px', borderLeft:'2px solid #00fdc1'}}>
                <h3 style={{fontFamily:'Space Grotesk,sans-serif', fontSize:'18px', fontWeight:700, textTransform:'uppercase', marginBottom:'12px'}}>{feature.title}</h3>
                <p style={{color:'#adaaaa', fontSize:'14px', lineHeight:1.7}}>{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEMO PREVIEW: SCHOOL DASHBOARD ── */}
      <section style={{padding:'80px 24px', background:'#131313', borderTop:'1px solid rgba(170,255,220,0.06)', borderBottom:'1px solid rgba(170,255,220,0.06)'}}>
        <div style={{maxWidth:'1100px', margin:'0 auto'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'32px'}}>
            <h2 style={{fontFamily:'Space Grotesk,sans-serif', fontSize:'32px', fontWeight:900, textTransform:'uppercase'}}>Teacher Oversight Panel</h2>
            <div style={{fontFamily:'JetBrains Mono,monospace', fontSize:'10px', color:'#777575', letterSpacing:'0.3em', textTransform:'uppercase', border:'1px solid rgba(119,117,117,0.3)', padding:'6px 12px'}}>
              [ DEMO PREVIEW ]
            </div>
          </div>

          <div style={{background:'#0a0a0a', border:'1px solid rgba(73,72,71,0.3)'}}>
            {/* KPI Row */}
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', borderBottom:'1px solid rgba(73,72,71,0.3)'}}>
              {[
                {label:'Active Students', val:'142'},
                {label:'Projects This Month', val:'318'},
                {label:'Simulation Success Rate', val:'94.2%'},
                {label:'Curriculum Coverage', val:'68%'}
              ].map((kpi, i) => (
                <div key={i} style={{padding:'24px', borderRight: i < 3 ? '1px solid rgba(73,72,71,0.3)' : 'none'}}>
                  <div style={{fontFamily:'JetBrains Mono,monospace', fontSize:'10px', color:'#777575', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'8px'}}>{kpi.label}</div>
                  <div style={{fontFamily:'Space Grotesk,sans-serif', fontSize:'32px', fontWeight:700, color:'#aaffdc'}}>{kpi.val}</div>
                </div>
              ))}
            </div>

            {/* Submissions Table */}
            <div style={{padding:'32px', overflowX:'auto'}}>
              <h3 style={{fontFamily:'Space Grotesk,sans-serif', fontSize:'16px', fontWeight:700, textTransform:'uppercase', marginBottom:'24px', color:'#fff'}}>Recent Submissions</h3>
              <table style={{width:'100%', minWidth:'700px', borderCollapse:'collapse', textAlign:'left', fontSize:'13px'}}>
                <thead>
                  <tr style={{fontFamily:'JetBrains Mono,monospace', fontSize:'10px', color:'#777575', textTransform:'uppercase', letterSpacing:'0.1em', borderBottom:'1px solid rgba(73,72,71,0.3)'}}>
                    <th style={{paddingBottom:'16px', fontWeight:'normal'}}>Student Name</th>
                    <th style={{paddingBottom:'16px', fontWeight:'normal'}}>Class</th>
                    <th style={{paddingBottom:'16px', fontWeight:'normal'}}>Project</th>
                    <th style={{paddingBottom:'16px', fontWeight:'normal'}}>Last Active</th>
                    <th style={{paddingBottom:'16px', fontWeight:'normal'}}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {name:'Aarav Patel', grade:'10-A', proj:'Smart Irrigation System', time:'2h ago', status:'COMPLETED', color:'#00fdc1'},
                    {name:'Diya Sharma', grade:'9-C', proj:'Obstacle Avoiding Robot', time:'5h ago', status:'IN PROGRESS', color:'#f7b32b'},
                    {name:'Rohan Gupta', grade:'11-B', proj:'Industrial IoT Dashboard', time:'1d ago', status:'NEEDS REVIEW', color:'#ff716c'},
                    {name:'Ananya Singh', grade:'8-A', proj:'Smart Street Light', time:'2d ago', status:'COMPLETED', color:'#00fdc1'},
                    {name:'Kabir Das', grade:'10-B', proj:'RFID Door Lock', time:'2d ago', status:'IN PROGRESS', color:'#f7b32b'}
                  ].map((row, i) => (
                    <tr key={i} style={{borderBottom: i === 4 ? 'none' : '1px solid rgba(73,72,71,0.1)'}}>
                      <td style={{padding:'16px 0', color:'#fff'}}>{row.name}</td>
                      <td style={{padding:'16px 0', color:'#adaaaa'}}>{row.grade}</td>
                      <td style={{padding:'16px 0', color:'#adaaaa'}}>{row.proj}</td>
                      <td style={{padding:'16px 0', color:'#777575', fontFamily:'JetBrains Mono,monospace', fontSize:'11px'}}>{row.time}</td>
                      <td style={{padding:'16px 0'}}>
                        <span style={{fontFamily:'JetBrains Mono,monospace', fontSize:'9px', color:row.color, border:`1px solid ${row.color}`, padding:'4px 8px', letterSpacing:'0.1em'}}>{row.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── DEPLOYMENT MODEL ── */}
      <section style={{padding:'80px 24px'}}>
        <div style={{maxWidth:'1100px', margin:'0 auto'}}>
          <p style={{fontFamily:'JetBrains Mono,monospace', fontSize:'10px', color:'#aaffdc', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'24px', textAlign:'center'}}>
            [ INSTITUTIONAL ROLLOUT ]
          </p>
          <h2 style={{fontFamily:'Space Grotesk,sans-serif', fontSize:'36px', fontWeight:900, textTransform:'uppercase', textAlign:'center', marginBottom:'48px'}}>Deployment Timeline</h2>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'24px'}}>
            {[
              {num:'01', title:'Discovery Call', body:'We align with your robotics faculty to understand current infra and curriculum goals.'},
              {num:'02', title:'Pilot Access', body:'Select teachers receive demo credentials to simulate workflows and validate components.'},
              {num:'03', title:'Lab Deployment', body:'Secure accounts provisioned for all lab PCs. Hardware integration testing begins.'},
              {num:'04', title:'Reporting & Expansion', body:'Full teacher dashboard access is granted to track student submissions and performance.'}
            ].map((step, i) => (
              <div key={i} style={{position:'relative', padding:'32px', border:'1px solid rgba(73,72,71,0.3)', background:'#0e0e0e'}}>
                <div style={{fontFamily:'Space Grotesk,sans-serif', fontSize:'48px', fontWeight:900, color:'rgba(170,255,220,0.1)', position:'absolute', top:'16px', right:'24px'}}>{step.num}</div>
                <h3 style={{fontFamily:'Space Grotesk,sans-serif', fontSize:'16px', fontWeight:700, textTransform:'uppercase', marginBottom:'16px', marginTop:'24px'}}>{step.title}</h3>
                <p style={{color:'#adaaaa', fontSize:'13px', lineHeight:1.7}}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{padding:'80px 24px 120px', textAlign:'center'}}>
        <h2 style={{fontFamily:'Space Grotesk,sans-serif', fontSize:'36px', fontWeight:900, textTransform:'uppercase', marginBottom:'32px'}}>Ready to Modernize Your Robotics Lab?</h2>
        <div style={{display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap'}}>
          <a href="mailto:avimohan@innobotix.in?subject=School%20Demo%20Request" style={{
            background:'#00fdc1', color:'#004734', fontFamily:'Space Grotesk,sans-serif', fontWeight:700, fontSize:'13px',
            textTransform:'uppercase', letterSpacing:'0.15em', padding:'14px 32px', textDecoration:'none', transition:'all 0.2s'
          }}>Request Demo</a>
          <a href="mailto:avimohan@innobotix.in" style={{
            border:'1px solid rgba(170,255,220,0.4)', color:'#aaffdc', fontFamily:'Space Grotesk,sans-serif', fontWeight:700, fontSize:'13px',
            textTransform:'uppercase', letterSpacing:'0.15em', padding:'14px 32px', textDecoration:'none', transition:'all 0.2s'
          }}>Contact Innobotix</a>
        </div>
      </section>

    </main>
  );
}
