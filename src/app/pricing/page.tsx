'use client';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <main style={{background:'#0e0e0e', minHeight:'100vh', color:'#fff', fontFamily:'Inter, sans-serif', paddingTop:'64px'}}>
      
      {/* ── HERO ── */}
      <section style={{
        borderBottom:'1px solid rgba(170,255,220,0.06)',
        padding:'80px 24px', textAlign:'center',
        backgroundImage:'linear-gradient(rgba(170,255,220,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(170,255,220,0.03) 1px,transparent 1px)',
        backgroundSize:'40px 40px'
      }}>
        <p style={{fontFamily:'JetBrains Mono,monospace', fontSize:'10px', color:'#aaffdc', letterSpacing:'0.4em', textTransform:'uppercase', marginBottom:'16px'}}>
          [ PRICING MATRIX ]
        </p>
        <h1 style={{fontFamily:'Space Grotesk,sans-serif', fontSize:'clamp(32px,5vw,56px)', fontWeight:900, lineHeight:1.1, marginBottom:'20px', textTransform:'uppercase'}}>
          Simple Access for Students.<br/>Scalable Deployment for <span style={{color:'#00fdc1'}}>Schools</span>.
        </h1>
        <p style={{color:'#adaaaa', fontSize:'16px', maxWidth:'600px', margin:'0 auto', lineHeight:1.7}}>
          Whether you're a curious student building your first circuit, or a school district rolling out a national robotics curriculum, we have a tier for you.
        </p>
      </section>

      {/* ── PRICING CARDS ── */}
      <section style={{padding:'80px 24px', maxWidth:'1100px', margin:'0 auto'}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'24px'}}>
          
          {/* Student */}
          <div style={{border:'1px solid rgba(73,72,71,0.3)', padding:'40px 32px', background:'#131313'}}>
            <div style={{fontFamily:'JetBrains Mono,monospace', fontSize:'11px', color:'#777575', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'16px'}}>STUDENT PLAN</div>
            <div style={{fontFamily:'Space Grotesk,sans-serif', fontSize:'48px', fontWeight:900, color:'#fff', marginBottom:'8px'}}>Free</div>
            <p style={{color:'#adaaaa', fontSize:'14px', lineHeight:1.6, marginBottom:'32px', minHeight:'44px'}}>Perfect for self-learning and building independent school science fair projects.</p>
            <ul style={{listStyle:'none', padding:0, margin:'0 0 40px', color:'#d9d9d9', fontSize:'14px', lineHeight:1.8}}>
              <li style={{marginBottom:'12px', display:'flex', gap:'12px'}}><span style={{color:'#00fdc1'}}>✓</span> 5 Project Generations / month</li>
              <li style={{marginBottom:'12px', display:'flex', gap:'12px'}}><span style={{color:'#00fdc1'}}>✓</span> Basic Wokwi simulations</li>
              <li style={{marginBottom:'12px', display:'flex', gap:'12px'}}><span style={{color:'#00fdc1'}}>✓</span> CBSE Common templates</li>
              <li style={{marginBottom:'12px', display:'flex', gap:'12px'}}><span style={{color:'#00fdc1'}}>✓</span> Public Docs Access</li>
            </ul>
            <Link href="/studio" style={{display:'block', textAlign:'center', background:'#262626', color:'#fff', fontFamily:'Space Grotesk,sans-serif', fontWeight:700, fontSize:'13px', textTransform:'uppercase', letterSpacing:'0.1em', padding:'14px 24px', textDecoration:'none', border:'1px solid rgba(119,117,117,0.3)'}}>Launch Workspace</Link>
          </div>

          {/* School */}
          <div style={{border:'1px solid #00fdc1', padding:'40px 32px', background:'#0a0a0a', boxShadow:'0 0 40px rgba(0,253,193,0.05)', position:'relative', transform:'translateY(-12px)'}}>
            <div style={{position:'absolute', top:'-12px', right:'32px', background:'#00fdc1', color:'#004734', fontFamily:'JetBrains Mono,monospace', fontSize:'10px', fontWeight:'bold', letterSpacing:'0.1em', padding:'4px 12px', textTransform:'uppercase'}}>RECOMMENDED</div>
            <div style={{fontFamily:'JetBrains Mono,monospace', fontSize:'11px', color:'#00fdc1', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'16px'}}>SCHOOL PILOT PLAN</div>
            <div style={{fontFamily:'Space Grotesk,sans-serif', fontSize:'32px', fontWeight:900, color:'#fff', marginBottom:'8px'}}>Custom Pilot Pricing</div>
            <p style={{color:'#adaaaa', fontSize:'14px', lineHeight:1.6, marginBottom:'32px', minHeight:'44px'}}>For a single lab deployment to test the platform with up to 2 teachers.</p>
            <ul style={{listStyle:'none', padding:0, margin:'0 0 40px', color:'#d9d9d9', fontSize:'14px', lineHeight:1.8}}>
              <li style={{marginBottom:'12px', display:'flex', gap:'12px'}}><span style={{color:'#00fdc1'}}>✓</span> Unlimited Project Generations</li>
              <li style={{marginBottom:'12px', display:'flex', gap:'12px'}}><span style={{color:'#00fdc1'}}>✓</span> Advanced Wokwi simulation access</li>
              <li style={{marginBottom:'12px', display:'flex', gap:'12px'}}><span style={{color:'#00fdc1'}}>✓</span> Full Library (All Tiers)</li>
              <li style={{marginBottom:'12px', display:'flex', gap:'12px'}}><span style={{color:'#00fdc1'}}>✓</span> Teacher Dashboard access</li>
              <li style={{marginBottom:'12px', display:'flex', gap:'12px'}}><span style={{color:'#00fdc1'}}>✓</span> School Deployment Onboarding</li>
              <li style={{marginBottom:'12px', display:'flex', gap:'12px'}}><span style={{color:'#00fdc1'}}>✓</span> GST Invoice Issued</li>
            </ul>
            <a href="mailto:avimohan@innobotix.in" style={{display:'block', textAlign:'center', background:'#00fdc1', color:'#004734', fontFamily:'Space Grotesk,sans-serif', fontWeight:700, fontSize:'13px', textTransform:'uppercase', letterSpacing:'0.1em', padding:'14px 24px', textDecoration:'none'}}>Request Pilot</a>
          </div>

          {/* Institution */}
          <div style={{border:'1px solid rgba(73,72,71,0.3)', padding:'40px 32px', background:'#131313'}}>
            <div style={{fontFamily:'JetBrains Mono,monospace', fontSize:'11px', color:'#777575', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'16px'}}>INSTITUTION PLAN</div>
            <div style={{fontFamily:'Space Grotesk,sans-serif', fontSize:'32px', fontWeight:900, color:'#fff', marginBottom:'8px'}}>Contact for Quote</div>
            <p style={{color:'#adaaaa', fontSize:'14px', lineHeight:1.6, marginBottom:'32px', minHeight:'44px'}}>For district-wide or chain-level rollouts supporting multi-campus curriculums.</p>
            <ul style={{listStyle:'none', padding:0, margin:'0 0 40px', color:'#d9d9d9', fontSize:'14px', lineHeight:1.8}}>
              <li style={{marginBottom:'12px', display:'flex', gap:'12px'}}><span style={{color:'#00fdc1'}}>✓</span> Infinite Global Generations</li>
              <li style={{marginBottom:'12px', display:'flex', gap:'12px'}}><span style={{color:'#00fdc1'}}>✓</span> Cross-campus Teacher Dashboards</li>
              <li style={{marginBottom:'12px', display:'flex', gap:'12px'}}><span style={{color:'#00fdc1'}}>✓</span> Admin Organization Oversight</li>
              <li style={{marginBottom:'12px', display:'flex', gap:'12px'}}><span style={{color:'#00fdc1'}}>✓</span> SLA Priority Support</li>
              <li style={{marginBottom:'12px', display:'flex', gap:'12px'}}><span style={{color:'#00fdc1'}}>✓</span> Private Custom Training Workshops</li>
            </ul>
            <a href="mailto:avimohan@innobotix.in" style={{display:'block', textAlign:'center', background:'#262626', color:'#fff', fontFamily:'Space Grotesk,sans-serif', fontWeight:700, fontSize:'13px', textTransform:'uppercase', letterSpacing:'0.1em', padding:'14px 24px', textDecoration:'none', border:'1px solid rgba(119,117,117,0.3)'}}>Contact Sales</a>
          </div>
        </div>
      </section>

      {/* ── FEATURE COMPARISON ── */}
      <section style={{padding:'80px 24px', maxWidth:'900px', margin:'0 auto'}}>
        <h2 style={{fontFamily:'Space Grotesk,sans-serif', fontSize:'32px', fontWeight:900, textTransform:'uppercase', marginBottom:'40px', textAlign:'center'}}>Feature Matrix</h2>
        <table style={{width:'100%', borderCollapse:'collapse', textAlign:'left', fontSize:'14px'}}>
          <thead>
            <tr style={{fontFamily:'JetBrains Mono,monospace', fontSize:'11px', color:'#aaffdc', letterSpacing:'0.1em', textTransform:'uppercase', borderBottom:'1px solid rgba(73,72,71,0.4)'}}>
              <th style={{padding:'16px 8px', fontWeight:'normal'}}>Feature</th>
              <th style={{padding:'16px 8px', fontWeight:'normal'}}>Student</th>
              <th style={{padding:'16px 8px', fontWeight:'normal'}}>School</th>
            </tr>
          </thead>
          <tbody>
            {[
              {name:'Monthly project generations', s:'5 per month', c:'Unlimited'},
              {name:'Wokwi simulation access', s:'Basic', c:'Advanced Priority'},
              {name:'Project templates', s:'CBSE Common', c:'All Tiers'},
              {name:'Arduino / ESP32 support', s:'Yes', c:'Yes'},
              {name:'Documentation access', s:'Yes', c:'Yes'},
              {name:'Teacher dashboard preview', s:'—', c:'Enabled'},
              {name:'School onboarding support', s:'—', c:'Included'},
              {name:'Priority support', s:'—', c:'24hr SLA'}
            ].map((row, i) => (
              <tr key={i} style={{borderBottom:'1px solid rgba(73,72,71,0.1)'}}>
                <td style={{padding:'24px 8px', color:'#fff'}}>{row.name}</td>
                <td style={{padding:'24px 8px', color:'#777575'}}>{row.s}</td>
                <td style={{padding:'24px 8px', color:'#00fdc1'}}>{row.c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ── FAQ ── */}
      <section style={{padding:'80px 24px', maxWidth:'800px', margin:'0 auto', borderTop:'1px solid rgba(170,255,220,0.06)'}}>
        <h2 style={{fontFamily:'Space Grotesk,sans-serif', fontSize:'28px', fontWeight:900, textTransform:'uppercase', marginBottom:'40px'}}>Procurement FAQ</h2>
        <div style={{display:'flex', flexDirection:'column', gap:'32px'}}>
          {[
            {q:'Can schools request pilot deployment?', a:'Absolutely. The School Pilot Plan is specifically designed to let decision-makers and senior lab instructors trial the platform with a live cohort before committing to a campus-wide rollout.'},
            {q:'Do you offer custom pricing?', a:'Yes, for multi-site institutions and school chains we provide volume pricing structures. Please contact us to generate a custom deployment quote.'},
            {q:'Is there a free student version?', a:'We believe curiosity should be free. The Student plan offers 5 free generations a month forever to help students build foundational projects.'},
            {q:'Can schools get onboarding help?', a:'Yes. We offer fully guided onboarding, including a Discovery Call with your curriculum faculty and live technical integration sessions for your lab PCs.'}
          ].map((item, i) => (
            <div key={i}>
              <div style={{fontFamily:'Space Grotesk,sans-serif', fontSize:'16px', fontWeight:700, color:'#00fdc1', marginBottom:'8px'}}>{item.q}</div>
              <p style={{color:'#adaaaa', fontSize:'14px', lineHeight:1.7}}>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{padding:'80px 24px 120px', textAlign:'center', background:'#131313', borderTop:'1px solid rgba(170,255,220,0.06)'}}>
        <h2 style={{fontFamily:'Space Grotesk,sans-serif', fontSize:'32px', fontWeight:900, textTransform:'uppercase', marginBottom:'32px'}}>Deploy Innobotix Today</h2>
        <div style={{display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap'}}>
          <a href="mailto:avimohan@innobotix.in" style={{
            background:'#00fdc1', color:'#004734', fontFamily:'Space Grotesk,sans-serif', fontWeight:700, fontSize:'13px',
            textTransform:'uppercase', letterSpacing:'0.15em', padding:'14px 32px', textDecoration:'none', transition:'all 0.2s'
          }}>Talk to Sales</a>
          <a href="mailto:avimohan@innobotix.in?subject=School%20Demo%20Request" style={{
            border:'1px solid rgba(170,255,220,0.4)', color:'#aaffdc', fontFamily:'Space Grotesk,sans-serif', fontWeight:700, fontSize:'13px',
            textTransform:'uppercase', letterSpacing:'0.15em', padding:'14px 32px', textDecoration:'none', transition:'all 0.2s'
          }}>Book School Demo</a>
        </div>
      </section>

    </main>
  );
}
