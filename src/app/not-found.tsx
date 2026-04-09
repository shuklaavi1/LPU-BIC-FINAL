'use client';
import Link from 'next/link';
export default function NotFound() {
  return (
    <main style={{background:'#0e0e0e', minHeight:'100vh',
      color:'#fff', display:'flex', alignItems:'center',
      justifyContent:'center', flexDirection:'column',
      fontFamily:'JetBrains Mono, monospace', gap:'16px',
      paddingTop:'64px'}}>
      <p style={{fontSize:'10px', color:'#ff716c',
        letterSpacing:'0.4em', textTransform:'uppercase'}}>
        [ SYSTEM_ERROR ]
      </p>
      <h1 style={{fontFamily:'Space Grotesk, sans-serif',
        fontSize:'96px', fontWeight:900, color:'#aaffdc',
        margin:0, lineHeight:1}}>404</h1>
      <p style={{color:'#adaaaa', fontSize:'14px',
        letterSpacing:'0.1em', marginBottom:'24px'}}>
        PAGE_NOT_FOUND // ROUTE DOES NOT EXIST
      </p>
      <Link href="/" style={{
        background:'#00fdc1', color:'#004734',
        fontFamily:'Space Grotesk, sans-serif',
        fontWeight:700, fontSize:'12px',
        textTransform:'uppercase', letterSpacing:'0.15em',
        padding:'12px 32px', textDecoration:'none',
        border:'none', display:'inline-block'
      }}>
        RETURN TO BASE →
      </Link>
    </main>
  );
}
