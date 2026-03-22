import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { REGIONS, TYPES_INCIDENT } from '../constants'
import Navbar from '../components/Navbar'
import ReportCard from '../components/ReportCard'

export default function Reports() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterType, setFilterType] = useState('all')
  const [filterRegion, setFilterRegion] = useState('all')

  useEffect(() => {
    async function load() {
      let query = supabase
        .from('signalements')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50)

      if (filterType !== 'all') query = query.eq('type_incident', filterType)
      if (filterRegion !== 'all') query = query.eq('region', filterRegion)

      const { data } = await query
      setReports(data || [])
      setLoading(false)
    }
    setLoading(true)
    load()
  }, [filterType, filterRegion])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <Navbar />

      <div style={{ maxWidth: 820, margin: '0 auto', padding: '2.5rem 2rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--red)', marginBottom: '0.5rem' }}>Registre public</div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>Tous les signalements</h1>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <select value={filterType} onChange={e => setFilterType(e.target.value)} style={{
            fontFamily: 'var(--font-sans)', padding: '0.55rem 1rem',
            border: '1.5px solid rgba(0,0,0,0.1)', borderRadius: 8,
            fontSize: '0.82rem', background: 'white', cursor: 'pointer'
          }}>
            <option value="all">Tous les types</option>
            {TYPES_INCIDENT.map(t => <option key={t.id} value={t.id}>{t.icon} {t.label}</option>)}
          </select>
          <select value={filterRegion} onChange={e => setFilterRegion(e.target.value)} style={{
            fontFamily: 'var(--font-sans)', padding: '0.55rem 1rem',
            border: '1.5px solid rgba(0,0,0,0.1)', borderRadius: 8,
            fontSize: '0.82rem', background: 'white', cursor: 'pointer'
          }}>
            <option value="all">Toutes les régions</option>
            {Object.keys(REGIONS).map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#999', marginLeft: 'auto' }}>
            {loading ? '...' : `${reports.length} résultat${reports.length > 1 ? 's' : ''}`}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#999', fontFamily: 'var(--font-sans)' }}>
            Chargement des signalements...
          </div>
        ) : reports.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', border: '1px dashed rgba(0,0,0,0.1)', borderRadius: 12 }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📋</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, marginBottom: '0.3rem' }}>Aucun signalement trouvé</div>
            <div style={{ fontFamily: 'var(--font-sans)', color: '#999', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              {filterType !== 'all' || filterRegion !== 'all'
                ? 'Essayez de modifier les filtres'
                : "Soyez le premier à signaler un manquement d'hygiène"}
            </div>
            <Link to="/signaler" style={{
              fontFamily: 'var(--font-sans)', display: 'inline-block',
              padding: '0.7rem 1.5rem', background: 'var(--red)', color: 'white',
              border: 'none', borderRadius: 8, fontSize: '0.85rem',
              textDecoration: 'none', fontWeight: 600
            }}>Faire un signalement</Link>
          </div>
        ) : (
          reports.map(r => <ReportCard key={r.id} report={r} detailed />)
        )}
      </div>
    </div>
  )
}
