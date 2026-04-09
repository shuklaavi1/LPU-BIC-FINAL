'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function AboutPage() {
  const [muted, setMuted] = useState(true);

  return (
    <main style={{background:'#0e0e0e', minHeight:'100vh', color:'#fff',
      fontFamily:'Inter, sans-serif', paddingTop:'64px'}}>

      {/* ── HERO STRIP ── */}
      <section style={{
        borderBottom:'1px solid rgba(170,255,220,0.06)',
        padding:'80px 24px 64px', textAlign:'center',
        backgroundImage:'linear-gradient(rgba(170,255,220,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(170,255,220,0.03) 1px,transparent 1px)',
        backgroundSize:'40px 40px'
      }}>
        <p style={{fontFamily:'JetBrains Mono,monospace', fontSize:'10px',
          color:'#aaffdc', letterSpacing:'0.4em', textTransform:'uppercase',
          marginBottom:'16px'}}>[ ABOUT_INNOBOTIX ]</p>
        <h1 style={{fontFamily:'Space Grotesk,sans-serif', fontSize:'clamp(36px,6vw,72px)',
          fontWeight:900, lineHeight:1.1, marginBottom:'20px'}}>
          Engineering the <span style={{color:'#00fdc1'}}>Future</span> of<br/>
          Robotics Education.
        </h1>
        <p style={{color:'#adaaaa', fontSize:'16px', maxWidth:'560px',
          margin:'0 auto', lineHeight:1.7}}>
          Built in Ranchi. Aligned to NEP 2020. Trusted by students,
          teachers, and institutions across India.
        </p>
      </section>

      {/* ── FOUNDER ── */}
      <section style={{maxWidth:'1100px', margin:'0 auto', padding:'80px 24px'}}>
        <p style={{fontFamily:'JetBrains Mono,monospace', fontSize:'10px',
          color:'#aaffdc', letterSpacing:'0.4em', textTransform:'uppercase',
          marginBottom:'40px'}}>[ FOUNDER ]</p>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr',
          gap:'64px', alignItems:'center'}}>
          {/* Image */}
          <div style={{position:'relative'}}>
            <div style={{
              width:'100%', aspectRatio:'3/4', overflow:'hidden',
              border:'1px solid rgba(0,253,193,0.2)',
              boxShadow:'0 0 60px -20px rgba(0,253,193,0.15)'
            }}>
              <img
                src="https://i.postimg.cc/VN5W2SLq/1000206514.jpg"
                alt="Avi Mohan Kr Shuklaa"
                style={{width:'100%', height:'100%', objectFit:'cover',
                  objectPosition:'center top', filter:'grayscale(20%)'}}
              />
            </div>
            <div style={{
              position:'absolute', bottom:'-1px', left:0, right:0,
              height:'40%',
              background:'linear-gradient(to top, #0e0e0e 0%, transparent 100%)'
            }}/>
            <div style={{
              position:'absolute', bottom:'20px', left:'20px',
              fontFamily:'JetBrains Mono,monospace', fontSize:'10px',
              color:'#aaffdc', letterSpacing:'0.2em'
            }}>// RANCHI, JHARKHAND</div>
          </div>
          {/* Text */}
          <div>
            <h2 style={{fontFamily:'Space Grotesk,sans-serif',
              fontSize:'42px', fontWeight:900, lineHeight:1.1,
              marginBottom:'4px'}}>Avi Mohan<br/>Kumar Shuklaa</h2>
            <p style={{fontFamily:'JetBrains Mono,monospace', fontSize:'11px',
              color:'#00fdc1', letterSpacing:'0.2em', textTransform:'uppercase',
              marginBottom:'28px'}}>Founder & CEO, Innobotix</p>

            <div style={{borderLeft:'2px solid #00fdc1', paddingLeft:'20px',
              marginBottom:'28px'}}>
              <p style={{color:'#adaaaa', fontSize:'15px', lineHeight:1.8}}>
                From Ranchi, Jharkhand — where access to quality tech education 
                was a privilege, not a right. Avi set out to change that. 
                Innobotix was born from a simple question: why should a student 
                in a tier-3 city have any less access to engineering tools than 
                someone in Bangalore?
              </p>
            </div>
            <p style={{color:'#adaaaa', fontSize:'15px', lineHeight:1.8,
              marginBottom:'32px'}}>
              No cliché achievement list. Just a relentless obsession with 
              making robotics education accessible, practical, and genuinely 
              useful — for every student, every school, everywhere in India.
            </p>

            {/* Award chip */}
            <div style={{
              display:'inline-flex', alignItems:'center', gap:'10px',
              background:'#131313', border:'1px solid rgba(0,253,193,0.2)',
              padding:'10px 16px', marginBottom:'24px'
            }}>
              <span style={{color:'#00fdc1', fontSize:'18px'}}>✦</span>
              <div>
                <div style={{fontFamily:'Space Grotesk,sans-serif',
                  fontWeight:700, fontSize:'13px', textTransform:'uppercase'}}>
                  Best Budding Entrepreneur 2025
                </div>
                <div style={{fontFamily:'JetBrains Mono,monospace',
                  fontSize:'10px', color:'#777575', letterSpacing:'0.1em'}}>
                  Startup Jharkhand
                </div>
              </div>
            </div>

            {/* LinkedIn */}
            <div style={{display:'block'}}>
              <a
                href="https://www.linkedin.com/in/avi-mohan-kr-shuklaa-235605282/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display:'inline-flex', alignItems:'center', gap:'8px',
                  border:'1px solid #aaffdc', color:'#aaffdc',
                  fontFamily:'JetBrains Mono,monospace', fontSize:'11px',
                  textTransform:'uppercase', letterSpacing:'0.15em',
                  padding:'10px 20px', textDecoration:'none',
                  transition:'all 0.2s'
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>)=>(e.currentTarget.style.boxShadow='0 0 15px rgba(170,255,220,0.2)')}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>)=>(e.currentTarget.style.boxShadow='none')}
              >
                ↗ LinkedIn Profile
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── RECOGNIZED EXCELLENCE ── */}
      <section style={{background:'#131313', padding:'80px 24px'}}>
        <div style={{maxWidth:'1100px', margin:'0 auto'}}>
          <p style={{fontFamily:'JetBrains Mono,monospace', fontSize:'10px',
            color:'#aaffdc', letterSpacing:'0.4em', textTransform:'uppercase',
            marginBottom:'16px'}}>[ RECOGNITION ]</p>
          <h2 style={{fontFamily:'Space Grotesk,sans-serif', fontSize:'40px',
            fontWeight:900, textTransform:'uppercase', marginBottom:'48px'}}>
            Recognized Excellence
          </h2>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px'}}>
            {[
              {
                icon:'✦',
                title:'Best Budding Entrepreneur 2025',
                body:'Awarded by Startup Jharkhand for exceptional innovation in robotics education across India.'
              },
              {
                icon:'◈',
                title:'Featured on Doordarshan',
                body:"Invited to speak on India's national broadcaster about Innobotix's vision for accessible robotics."
              },
            ].map((item, i) => (
              <div key={i} style={{
                background:'#1a1919', padding:'32px',
                border:'1px solid rgba(73,72,71,0.3)',
                borderLeft:'2px solid #00fdc1',
                transition:'all 0.2s'
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLDivElement>)=>(e.currentTarget.style.boxShadow='-4px 0 20px rgba(0,253,193,0.15)')}
              onMouseLeave={(e: React.MouseEvent<HTMLDivElement>)=>(e.currentTarget.style.boxShadow='none')}
              >
                <div style={{fontSize:'24px', color:'#00fdc1', marginBottom:'16px'}}>{item.icon}</div>
                <h3 style={{fontFamily:'Space Grotesk,sans-serif', fontWeight:700,
                  fontSize:'18px', textTransform:'uppercase', marginBottom:'12px'}}>
                  {item.title}
                </h3>
                <p style={{color:'#adaaaa', fontSize:'14px', lineHeight:1.7}}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOORDARSHAN VIDEO ── */}
      <section style={{maxWidth:'900px', margin:'0 auto', padding:'80px 24px'}}>
        <p style={{fontFamily:'JetBrains Mono,monospace', fontSize:'10px',
          color:'#aaffdc', letterSpacing:'0.4em', textTransform:'uppercase',
          marginBottom:'16px', textAlign:'center'}}>[ MEDIA ]</p>
        <h2 style={{fontFamily:'Space Grotesk,sans-serif', fontSize:'36px',
          fontWeight:900, textTransform:'uppercase', textAlign:'center',
          marginBottom:'32px'}}>Watch Our Story</h2>

        <div style={{position:'relative', background:'#131313',
          border:'1px solid rgba(0,253,193,0.15)',
          boxShadow:'0 0 60px -20px rgba(0,253,193,0.1)'}}>
          {/* Video */}
          <div style={{position:'relative', paddingBottom:'56.25%', height:0}}>
            <iframe
              src={`https://www.youtube.com/embed/TdMp7XCfPxo?autoplay=0&mute=${muted ? 1 : 0}&controls=1&rel=0`}
              style={{position:'absolute', top:0, left:0,
                width:'100%', height:'100%', border:'none'}}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Innobotix on Doordarshan"
            />
          </div>
          {/* Sound Toggle */}
          <div style={{
            position:'absolute', bottom:'12px', right:'12px',
            background:'rgba(14,14,14,0.85)', backdropFilter:'blur(8px)',
            border:'1px solid rgba(170,255,220,0.2)', padding:'8px 14px',
            cursor:'pointer', display:'flex', alignItems:'center', gap:'8px',
            fontFamily:'JetBrains Mono,monospace', fontSize:'10px',
            color:'#aaffdc', letterSpacing:'0.1em', textTransform:'uppercase',
            zIndex:10
          }}
          onClick={() => setMuted(!muted)}>
            {muted ? '🔇 SOUND OFF' : '🔊 SOUND ON'}
          </div>
        </div>
        <p style={{fontFamily:'JetBrains Mono,monospace', fontSize:'10px',
          color:'#555', textAlign:'center', marginTop:'12px', letterSpacing:'0.1em'}}>
          // Replace REPLACE_WITH_YOUR_YOUTUBE_ID with your actual YouTube video ID
        </p>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section style={{background:'#131313', padding:'80px 24px'}}>
        <div style={{maxWidth:'800px', margin:'0 auto'}}>
          <p style={{fontFamily:'JetBrains Mono,monospace', fontSize:'10px',
            color:'#aaffdc', letterSpacing:'0.4em', textTransform:'uppercase',
            marginBottom:'40px', textAlign:'center'}}>[ STUDENT_TESTIMONIAL ]</p>
          <div style={{
            background:'#1a1919', padding:'48px',
            border:'1px solid rgba(73,72,71,0.3)',
            borderLeft:'2px solid #00fdc1',
            position:'relative'
          }}>
            <div style={{
              fontFamily:'Space Grotesk,sans-serif',
              fontSize:'64px', lineHeight:1,
              color:'rgba(0,253,193,0.15)',
              position:'absolute', top:'16px', left:'24px',
              fontWeight:900
            }}>"</div>
            <p style={{color:'#e0e0e0', fontSize:'16px', lineHeight:1.9,
              fontStyle:'italic', marginBottom:'32px', position:'relative', zIndex:1}}>
              Innobotix transformed my first IoT robotics experience despite my 
              software-only background. Their team's exceptionally clear guidance 
              made the hardware assembly process remarkably smooth and 
              straightforward. The IoT device integrated seamlessly with our 
              machine learning model for real-time data collection. This 
              collaboration proved instrumental in our success at the CBSE 
              Regional Science Exhibition, where we secured first place.
            </p>
            <div style={{display:'flex', alignItems:'center', gap:'16px'}}>
              <div style={{
                width:'40px', height:'40px', background:'#00fdc1',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontFamily:'Space Grotesk,sans-serif', fontWeight:900,
                color:'#004734', fontSize:'16px', flexShrink:0
              }}>Y</div>
              <div>
                <div style={{fontFamily:'Space Grotesk,sans-serif',
                  fontWeight:700, fontSize:'15px'}}>Yash Varshney</div>
                <div style={{fontFamily:'JetBrains Mono,monospace',
                  fontSize:'10px', color:'#777575',
                  letterSpacing:'0.1em', textTransform:'uppercase'}}>
                  Noida, Uttar Pradesh — CBSE Regional Science Exhibition, 1st Place
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section style={{padding:'80px 24px', textAlign:'center'}}>
        <div style={{maxWidth:'600px', margin:'0 auto'}}>
          <p style={{fontFamily:'JetBrains Mono,monospace', fontSize:'10px',
            color:'#aaffdc', letterSpacing:'0.4em', textTransform:'uppercase',
            marginBottom:'16px'}}>[ GET_IN_TOUCH ]</p>
          <h2 style={{fontFamily:'Space Grotesk,sans-serif', fontSize:'40px',
            fontWeight:900, textTransform:'uppercase', marginBottom:'16px'}}>
            Contact Us
          </h2>
          <p style={{color:'#adaaaa', marginBottom:'32px', lineHeight:1.7}}>
            For partnerships, school onboarding, or press enquiries.
          </p>
          <a
            href="mailto:avimohan@innobotix.in"
            style={{
              display:'inline-block',
              background:'#00fdc1', color:'#004734',
              fontFamily:'Space Grotesk,sans-serif', fontWeight:700,
              fontSize:'14px', letterSpacing:'0.15em',
              textTransform:'uppercase', padding:'16px 40px',
              textDecoration:'none', border:'none',
              transition:'all 0.2s'
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>)=>(e.currentTarget.style.boxShadow='0 0 20px rgba(0,253,193,0.4)')}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>)=>(e.currentTarget.style.boxShadow='none')}
          >
            avimohan@innobotix.in ↗
          </a>
        </div>
      </section>

    </main>
  );
}
