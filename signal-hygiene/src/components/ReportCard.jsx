import { getIncidentInfo, getSeverityInfo, getEtabInfo, timeAgo } from '../constants'

export default function ReportCard({ report, detailed = false }) {
  const inc = getIncidentInfo(report.type_incident)
  const sev = getSeverityInfo(report.severity)
  const etab = getEtabInfo(report.type_etablissement)

  if (detailed) {
    return (
      <div className="fade-in" style={{
        padding: '1.25rem 1.5rem', border: '1px solid rgba(0,0,0,0.06)',
        borderRadius: 12, marginBottom: '0.75rem', background: 'white'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: 42, height: 42, borderRadius: 10,
              background: `${inc.color}12`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem'
            }}>{inc.icon}</div>
            <div>
              <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.95rem' }}>
                {etab.icon} {report.nom_etablissement}
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', color: '#999' }}>
                {report.quartier ? `${report.quartier}, ` : ''}{report.region} · {inc.label}
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#bbb' }}>{report.ref}</div>
            <span style={{
              fontFamily: 'var(--font-sans)', display: 'inline-block',
              padding: '0.15rem 0.5rem', borderRadius: 100,
              fontSize: '0.65rem', fontWeight: 600,
              background: `${sev.color}15`, color: sev.color, marginTop: '0.15rem'
            }}>{sev.label}</span>
          </div>
        </div>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.88rem', lineHeight: 1.6, color: '#444', margin: 0 }}>
          {report.description}
        </p>
        {report.details && (
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', lineHeight: 1.5, color: '#888', marginTop: '0.4rem' }}>
            {report.details}
          </p>
        )}
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#bbb', marginTop: '0.75rem' }}>
          {timeAgo(report.created_at)} · {report.date_incident}
        </div>
      </div>
    )
  }

  // Compact version
  return (
    <div style={{
      padding: '1rem 1.25rem', border: '1px solid rgba(0,0,0,0.06)',
      borderRadius: 10, marginBottom: '0.6rem', display: 'flex',
      justifyContent: 'space-between', alignItems: 'center',
      background: 'white', transition: 'all 0.2s'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          width: 38, height: 38, borderRadius: 8,
          background: `${inc.color}12`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem'
        }}>{inc.icon}</div>
        <div>
          <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.88rem' }}>
            {etab.icon} {report.nom_etablissement}
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: '#999' }}>
            {inc.label} · {report.quartier || report.region}
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#999' }}>{timeAgo(report.created_at)}</div>
        <span style={{
          fontFamily: 'var(--font-sans)', display: 'inline-block',
          padding: '0.15rem 0.5rem', borderRadius: 100,
          fontSize: '0.65rem', fontWeight: 600,
          background: `${sev.color}15`, color: sev.color, marginTop: '0.2rem'
        }}>{sev.label}</span>
      </div>
    </div>
  )
}
