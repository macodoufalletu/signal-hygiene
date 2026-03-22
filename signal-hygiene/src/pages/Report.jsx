import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { REGIONS, TYPES_ETAB, TYPES_INCIDENT, SEVERITY, getIncidentInfo, getSeverityInfo, getEtabInfo, generateRef } from '../constants'
import Navbar from '../components/Navbar'
import PlaceSearch from '../components/PlaceSearch'
import PhotoUpload from '../components/PhotoUpload'
import SenegalLogo from '../components/SenegalLogo'

const s = {
  label: { fontFamily: 'var(--font-sans)', display: 'block', fontWeight: 600, fontSize: '0.82rem', marginBottom: '0.6rem' },
  input: { fontFamily: 'var(--font-sans)', width: '100%', padding: '0.8rem 1rem', border: '1.5px solid rgba(0,0,0,0.1)', borderRadius: 10, fontSize: '0.92rem', marginBottom: '1.5rem', outline: 'none', boxSizing: 'border-box', background: 'white' },
  chip: (selected, color = 'var(--red)') => ({ fontFamily: 'var(--font-sans)', padding: '0.55rem 1rem', border: `1.5px solid ${selected ? color : 'rgba(0,0,0,0.1)'}`, borderRadius: 100, fontSize: '0.82rem', cursor: 'pointer', background: selected ? `${color}10` : 'white', color: selected ? color : '#1A1A1A', fontWeight: selected ? 600 : 400, transition: 'all 0.2s' })
}

export default function Report() {
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [successRef, setSuccessRef] = useState('')
  const [error, setError] = useState('')
  const [photos, setPhotos] = useState([])

  const [form, setForm] = useState({
    type_etablissement: '', nom_etablissement: '', adresse_etablissement: '',
    region: '', quartier: '',
    type_incident: '', severity: '', description: '',
    date_incident: new Date().toISOString().split('T')[0], details: ''
  })

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))
  const canNext1 = form.type_etablissement && form.nom_etablissement && form.region
  const canNext2 = form.type_incident && form.severity && form.description.length >= 10

  const handleSubmit = async () => {
    setSubmitting(true)
    setError('')
    const ref = generateRef()
    const { error: err } = await supabase
      .from('signalements')
      .insert([{ ...form, ref, photo_count: photos.length }])
    if (err) {
      setError("Erreur lors de l'envoi. Veuillez réessayer.")
      console.error(err)
    } else {
      setSuccessRef(ref)
      setStep(4)
      setPhotos([])
    }
    setSubmitting(false)
  }

  const resetForm = () => {
    setForm({ type_etablissement: '', nom_etablissement: '', adresse_etablissement: '', region: '', quartier: '', type_incident: '', severity: '', description: '', date_incident: new Date().toISOString().split('T')[0], details: '' })
    setPhotos([])
    setStep(1)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <Navbar />
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '2.5rem 2rem' }}>
        {step < 4 && (<>
          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '2.5rem' }}>
            {[1, 2, 3].map(i => (<div key={i} style={{ flex: 1, height: 4, borderRadius: 100, background: i < step ? 'var(--green)' : i === step ? 'var(--red)' : 'rgba(0,0,0,0.08)', transition: 'all 0.4s' }} />))}
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(45,147,108,0.08)', border: '1px solid rgba(45,147,108,0.15)', color: 'var(--green)', padding: '0.45rem 0.9rem', borderRadius: 6, fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 600, marginBottom: '2rem' }}>🔒 Signalement 100% anonyme</div>
        </>)}

        {/* STEP 1 */}
        {step === 1 && (
          <div className="fade-in">
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.3rem', letterSpacing: '-0.02em' }}>Où est l'établissement ?</h2>
            <p style={{ fontFamily: 'var(--font-sans)', color: '#999', fontSize: '0.9rem', marginBottom: '2rem' }}>Choisissez le type et la zone — les établissements apparaîtront</p>

            <label style={s.label}>Type d'établissement</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.5rem' }}>
              {TYPES_ETAB.map(t => (<button key={t.id} onClick={() => set('type_etablissement', t.id)} style={s.chip(form.type_etablissement === t.id)}>{t.icon} {t.label}</button>))}
            </div>

            <label style={s.label}>Région</label>
            <select value={form.region} onChange={e => { set('region', e.target.value); set('quartier', ''); set('nom_etablissement', ''); set('adresse_etablissement', '') }} style={s.input}>
              <option value="">Sélectionnez une région</option>
              {Object.keys(REGIONS).map(r => <option key={r} value={r}>{r}</option>)}
            </select>

            {form.region && (<>
              <label style={s.label}>Quartier / Ville</label>
              <select value={form.quartier} onChange={e => { set('quartier', e.target.value); set('nom_etablissement', ''); set('adresse_etablissement', '') }} style={s.input}>
                <option value="">Sélectionnez un quartier</option>
                {REGIONS[form.region]?.map(q => <option key={q} value={q}>{q}</option>)}
              </select>
            </>)}

            <label style={s.label}>
              Nom de l'établissement
              {form.type_etablissement && form.region && <span style={{ fontWeight: 400, color: 'var(--green)', marginLeft: '0.5rem', fontSize: '0.75rem' }}>✦ Suggestions disponibles</span>}
            </label>
            <PlaceSearch typeEtab={form.type_etablissement} region={form.region} quartier={form.quartier} value={form.nom_etablissement}
              onChange={(name, address) => setForm(f => ({ ...f, nom_etablissement: name, adresse_etablissement: address || f.adresse_etablissement }))} />

            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
              <button onClick={() => canNext1 && setStep(2)} disabled={!canNext1} style={{ fontFamily: 'var(--font-sans)', padding: '0.8rem 2rem', background: canNext1 ? 'var(--red)' : '#ddd', color: canNext1 ? 'white' : '#999', border: 'none', borderRadius: 8, fontSize: '0.9rem', fontWeight: 600, cursor: canNext1 ? 'pointer' : 'not-allowed' }}>Continuer →</button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="fade-in">
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.3rem', letterSpacing: '-0.02em' }}>Que s'est-il passé ?</h2>
            <p style={{ fontFamily: 'var(--font-sans)', color: '#999', fontSize: '0.9rem', marginBottom: '2rem' }}>Décrivez l'incident et ajoutez des preuves si possible</p>

            <label style={s.label}>Type d'incident</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.5rem' }}>
              {TYPES_INCIDENT.map(t => (<button key={t.id} onClick={() => set('type_incident', t.id)} style={s.chip(form.type_incident === t.id, t.color)}>{t.icon} {t.label}</button>))}
            </div>

            <label style={s.label}>Gravité</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem', marginBottom: '1.5rem' }}>
              {SEVERITY.map(sv => (<button key={sv.id} onClick={() => set('severity', sv.id)} style={{ fontFamily: 'var(--font-sans)', padding: '1rem 0.5rem', border: `1.5px solid ${form.severity === sv.id ? sv.color : 'rgba(0,0,0,0.08)'}`, borderRadius: 10, background: form.severity === sv.id ? `${sv.color}08` : 'white', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s' }}>
                <div style={{ fontSize: '1.4rem' }}>{sv.icon}</div>
                <div style={{ fontWeight: 600, fontSize: '0.82rem', marginTop: '0.3rem' }}>{sv.label}</div>
                <div style={{ fontSize: '0.68rem', color: '#999' }}>{sv.desc}</div>
              </button>))}
            </div>

            <label style={s.label}>Description détaillée</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)} placeholder="Décrivez ce que vous avez observé avec le maximum de détails..." style={{ ...s.input, minHeight: 120, resize: 'vertical', lineHeight: 1.5 }} />

            <label style={s.label}>Photos / Vidéos <span style={{ fontWeight: 400, color: '#999' }}>(optionnel — max 5)</span></label>
            <PhotoUpload files={photos} setFiles={setPhotos} />

            <label style={s.label}>Date de l'incident</label>
            <input type="date" value={form.date_incident} onChange={e => set('date_incident', e.target.value)} style={s.input} />

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
              <button onClick={() => setStep(1)} style={{ fontFamily: 'var(--font-sans)', padding: '0.8rem 1.5rem', background: 'transparent', border: '1.5px solid rgba(0,0,0,0.12)', borderRadius: 8, fontSize: '0.9rem', cursor: 'pointer' }}>← Retour</button>
              <button onClick={() => canNext2 && setStep(3)} disabled={!canNext2} style={{ fontFamily: 'var(--font-sans)', padding: '0.8rem 2rem', background: canNext2 ? 'var(--red)' : '#ddd', color: canNext2 ? 'white' : '#999', border: 'none', borderRadius: 8, fontSize: '0.9rem', fontWeight: 600, cursor: canNext2 ? 'pointer' : 'not-allowed' }}>Continuer →</button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="fade-in">
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.3rem', letterSpacing: '-0.02em' }}>Confirmer & envoyer</h2>
            <p style={{ fontFamily: 'var(--font-sans)', color: '#999', fontSize: '0.9rem', marginBottom: '2rem' }}>Vérifiez les informations avant envoi</p>

            <div style={{ background: 'white', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#999', marginBottom: '1rem' }}>Récapitulatif</div>
              {[
                { l: 'Établissement', v: `${getEtabInfo(form.type_etablissement).icon} ${form.nom_etablissement}` },
                { l: 'Adresse', v: form.adresse_etablissement || `${form.quartier ? form.quartier + ', ' : ''}${form.region}` },
                { l: 'Incident', v: `${getIncidentInfo(form.type_incident).icon} ${getIncidentInfo(form.type_incident).label}` },
                { l: 'Gravité', v: `${getSeverityInfo(form.severity).icon} ${getSeverityInfo(form.severity).label}` },
                { l: 'Preuves', v: photos.length > 0 ? `📸 ${photos.length} fichier${photos.length > 1 ? 's' : ''}` : 'Aucune' },
                { l: 'Date', v: form.date_incident }
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: i < 5 ? '1px solid rgba(0,0,0,0.04)' : 'none' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: '#999' }}>{row.l}</span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', fontWeight: 500, textAlign: 'right', maxWidth: '60%' }}>{row.v}</span>
                </div>
              ))}
              {photos.length > 0 && (
                <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                  {photos.map((f, i) => (
                    <div key={i} style={{ width: 48, height: 48, borderRadius: 6, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)' }}>
                      {f.type === 'image' ? <img src={f.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" /> : <div style={{ width: '100%', height: '100%', background: '#1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1rem' }}>🎬</div>}
                    </div>
                  ))}
                </div>
              )}
              <div style={{ marginTop: '1rem', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: '#444', lineHeight: 1.6, background: 'rgba(0,0,0,0.02)', padding: '0.75rem', borderRadius: 8 }}>
                "{form.description}"
              </div>
            </div>

            <label style={s.label}>Informations supplémentaires <span style={{ fontWeight: 400, color: '#999' }}>(optionnel)</span></label>
            <textarea value={form.details} onChange={e => set('details', e.target.value)} placeholder="Horaires, fréquence, autre chose à ajouter..." style={{ ...s.input, minHeight: 80, resize: 'vertical', lineHeight: 1.5 }} />

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(45,147,108,0.08)', border: '1px solid rgba(45,147,108,0.15)', color: 'var(--green)', padding: '0.6rem 1rem', borderRadius: 8, fontFamily: 'var(--font-sans)', fontSize: '0.78rem', fontWeight: 600, marginBottom: '1.5rem' }}>🛡️ Aucune donnée personnelle ne sera collectée</div>

            {error && (<div style={{ background: 'rgba(196,30,30,0.08)', border: '1px solid rgba(196,30,30,0.2)', color: 'var(--red)', padding: '0.75rem 1rem', borderRadius: 8, fontFamily: 'var(--font-sans)', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</div>)}

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
              <button onClick={() => setStep(2)} style={{ fontFamily: 'var(--font-sans)', padding: '0.8rem 1.5rem', background: 'transparent', border: '1.5px solid rgba(0,0,0,0.12)', borderRadius: 8, fontSize: '0.9rem', cursor: 'pointer' }}>← Retour</button>
              <button onClick={handleSubmit} disabled={submitting} style={{ fontFamily: 'var(--font-sans)', padding: '0.8rem 2rem', background: 'var(--green)', color: 'white', border: 'none', borderRadius: 8, fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', opacity: submitting ? 0.6 : 1 }}>{submitting ? 'Envoi en cours...' : '✓ Envoyer le signalement'}</button>
            </div>
          </div>
        )}

        {/* SUCCESS */}
        {step === 4 && (
          <div className="fade-in" style={{ textAlign: 'center', padding: '3rem 0' }}>
            <div style={{ margin: '0 auto 1rem' }}><SenegalLogo size={56} /></div>
            <div style={{ width: 72, height: 72, background: 'rgba(45,147,108,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 1.5rem', animation: 'scaleIn 0.5s ease-out' }}>✓</div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Signalement envoyé !</h2>
            <p style={{ fontFamily: 'var(--font-sans)', color: '#999', maxWidth: 400, margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
              Merci pour votre vigilance citoyenne. Votre contribution aide à protéger la santé publique au Sénégal.
            </p>
            <div style={{ fontFamily: 'var(--font-mono)', background: 'rgba(0,0,0,0.04)', display: 'inline-block', padding: '0.6rem 1.5rem', borderRadius: 8, fontSize: '0.9rem', marginBottom: '2rem' }}>{successRef}</div>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/signaler" onClick={resetForm} style={{ fontFamily: 'var(--font-sans)', padding: '0.8rem 1.5rem', background: 'var(--red)', color: 'white', border: 'none', borderRadius: 8, fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>Nouveau signalement</Link>
              <Link to="/alertes" style={{ fontFamily: 'var(--font-sans)', padding: '0.8rem 1.5rem', background: 'transparent', border: '1.5px solid rgba(0,0,0,0.12)', borderRadius: 8, fontSize: '0.9rem', textDecoration: 'none', color: 'inherit' }}>Voir les alertes →</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
