import SenegalLogo from './SenegalLogo'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(0,0,0,0.06)',
      padding: '2.5rem 2rem 2rem', textAlign: 'center',
      fontFamily: 'var(--font-sans)'
    }}>
      {/* Senegal tricolor bar */}
      <div style={{ display: 'flex', height: 3, maxWidth: 120, margin: '0 auto 1.5rem', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ flex: 1, background: '#00853F' }} />
        <div style={{ flex: 1, background: '#FDEF42' }} />
        <div style={{ flex: 1, background: '#E31B23' }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <SenegalLogo size={22} />
        <strong style={{ color: 'var(--black)', fontSize: '0.9rem' }}>Plateforme de Signalement Hygiène</strong>
      </div>

      <div style={{ fontSize: '0.78rem', color: '#999', lineHeight: 1.8 }}>
        Initiative citoyenne pour la sécurité alimentaire · République du Sénégal<br />
        <span style={{ fontSize: '0.72rem' }}>100% anonyme · Aucune donnée personnelle collectée</span>
      </div>

      <div style={{
        marginTop: '1.5rem', paddingTop: '1.25rem',
        borderTop: '1px solid rgba(0,0,0,0.04)',
        fontSize: '0.7rem', color: '#bbb',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem'
      }}>
        © {new Date().getFullYear()} Macodou Fall — Tous droits réservés
      </div>
    </footer>
  )
}