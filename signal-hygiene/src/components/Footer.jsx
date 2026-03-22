import SenegalLogo from './SenegalLogo'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(0,0,0,0.06)',
      padding: '2rem 2rem', textAlign: 'center',
      fontSize: '0.8rem', color: '#999',
      fontFamily: 'var(--font-sans)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <SenegalLogo size={20} />
        <strong style={{ color: 'var(--black)' }}>Plateforme de Signalement Hygiène</strong>
      </div>
      Initiative citoyenne · République du Sénégal · 2026<br />
      <span style={{ fontSize: '0.72rem' }}>100% anonyme · Aucune donnée personnelle collectée</span>
    </footer>
  )
}
