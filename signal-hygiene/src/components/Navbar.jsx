import { Link } from 'react-router-dom'
import SenegalLogo from './SenegalLogo'

export default function Navbar({ transparent = false }) {
  return (
    <nav style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '1rem 2rem',
      borderBottom: transparent ? 'none' : '1px solid rgba(0,0,0,0.06)',
      background: transparent ? 'transparent' : 'white'
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none', color: 'inherit' }}>
        <SenegalLogo size={36} />
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', fontFamily: 'var(--font-sans)', lineHeight: 1.1 }}>SignalHygiène</div>
          <div style={{ fontSize: '0.6rem', color: '#00853F', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>Sénégal</div>
        </div>
      </Link>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Link to="/alertes" style={{
          padding: '0.5rem 1rem', background: 'transparent',
          border: '1px solid rgba(0,0,0,0.12)', borderRadius: 6,
          fontSize: '0.8rem', textDecoration: 'none', color: 'inherit',
          fontFamily: 'var(--font-sans)', fontWeight: 500
        }}>Alertes</Link>
        <Link to="/signaler" style={{
          padding: '0.5rem 1rem', background: 'var(--red)', color: 'white',
          border: 'none', borderRadius: 6, fontSize: '0.8rem', textDecoration: 'none',
          fontFamily: 'var(--font-sans)', fontWeight: 600
        }}>Signaler</Link>
      </div>
    </nav>
  )
}
