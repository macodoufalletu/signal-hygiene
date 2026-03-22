import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ReportCard from '../components/ReportCard'
import SenegalLogo from '../components/SenegalLogo'

export default function Home() {
  const [reports, setReports] = useState([])
  const [stats, setStats] = useState({ total: 0, ce_mois: 0 })

  useEffect(() => {
    async function load() {
      // Last 4 reports
      const { data } = await supabase
        .from('signalements')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(4)

      if (data) setReports(data)

      // Stats
      const { data: statsData } = await supabase
        .from('stats_signalements')
        .select('*')
        .single()

      if (statsData) setStats(statsData)
    }
    load()
  }, [])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* HERO */}
      <div style={{ padding: '5rem 2rem 4rem', maxWidth: 780, margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <SenegalLogo size={56} />
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--red)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: 7, height: 7, background: 'var(--red)', borderRadius: '50%', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              Plateforme citoyenne
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: '#00853F', fontWeight: 600 }}>République du Sénégal</div>
          </div>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.8rem, 7vw, 4.5rem)', lineHeight: 1,
          letterSpacing: '-0.04em', fontWeight: 700, marginBottom: '1.5rem'
        }}>
          Les manquements<br />d'hygiène ne doivent<br />plus rester <em style={{ color: 'var(--red)', fontStyle: 'italic' }}>invisibles.</em>
        </h1>

        <p style={{
          fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--gray)',
          maxWidth: 480, fontWeight: 300, marginBottom: '2.5rem'
        }}>
          Signalez anonymement les incidents d'hygiène dans les boulangeries, restaurants et commerces alimentaires. Ensemble, exigeons mieux.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link to="/signaler" style={{
            padding: '1rem 2rem', background: 'var(--red)', color: 'white',
            border: 'none', borderRadius: 8, fontSize: '1rem',
            fontFamily: 'var(--font-sans)', fontWeight: 600, textDecoration: 'none',
            boxShadow: '0 2px 12px rgba(196,30,30,0.25)',
            transition: 'all 0.2s'
          }}>
            ⚡ Signaler un incident
          </Link>
          <Link to="/alertes" style={{
            padding: '1rem 2rem', background: 'transparent',
            border: '1.5px solid rgba(0,0,0,0.15)', borderRadius: 8,
            fontSize: '1rem', fontFamily: 'var(--font-sans)', fontWeight: 500,
            textDecoration: 'none', color: 'inherit', transition: 'all 0.2s'
          }}>
            Consulter les alertes →
          </Link>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex', gap: '3rem', marginTop: '4rem', paddingTop: '2rem',
          borderTop: '1px solid rgba(0,0,0,0.08)', flexWrap: 'wrap'
        }}>
          {[
            { n: stats.ce_mois || '—', l: 'Ce mois-ci' },
            { n: stats.total || '—', l: 'Total signalements' },
            { n: '100%', l: 'Anonyme' },
            { n: '14', l: 'Régions couvertes' }
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--red)' }}>{s.n}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#999', marginTop: '0.2rem' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ background: 'white', padding: '4rem 2rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--red)', marginBottom: '0.5rem' }}>Comment ça marche</div>
          <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '2.5rem', letterSpacing: '-0.02em' }}>3 étapes, zéro donnée personnelle</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {[
              { n: '01', t: 'Identifiez', d: "Le type d'établissement, son nom et sa localisation" },
              { n: '02', t: 'Décrivez', d: "La nature de l'incident, sa gravité et les détails observés" },
              { n: '03', t: 'Envoyez', d: 'Votre signalement est publié anonymement et archivé' }
            ].map((s, i) => (
              <div key={i} style={{ padding: '1.5rem', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 700, color: 'var(--red)', opacity: 0.3 }}>{s.n}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '1.05rem', margin: '0.5rem 0 0.3rem' }}>{s.t}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: '#6B6B6B', lineHeight: 1.5 }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Senegal tricolor bar */}
      <div style={{ display: 'flex', height: 4 }}>
        <div style={{ flex: 1, background: '#00853F' }} />
        <div style={{ flex: 1, background: '#FDEF42' }} />
        <div style={{ flex: 1, background: '#E31B23' }} />
      </div>

      {/* RECENT */}
      {reports.length > 0 && (
        <div style={{ padding: '4rem 2rem', maxWidth: 780, margin: '0 auto', width: '100%' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--red)', marginBottom: '0.5rem' }}>Derniers signalements</div>
          <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>Fil des alertes</h2>
          {reports.map(r => <ReportCard key={r.id} report={r} />)}
          {stats.total > 4 && (
            <Link to="/alertes" style={{
              display: 'block', fontFamily: 'var(--font-sans)',
              marginTop: '1rem', padding: '0.7rem 1.5rem',
              background: 'transparent', border: '1px solid rgba(0,0,0,0.12)',
              borderRadius: 8, fontSize: '0.85rem', textDecoration: 'none',
              color: 'inherit', fontWeight: 500, width: '100%', textAlign: 'center'
            }}>
              Voir tous les signalements ({stats.total}) →
            </Link>
          )}
        </div>
      )}

      <div style={{ flex: 1 }} />
      <Footer />
    </div>
  )
}
