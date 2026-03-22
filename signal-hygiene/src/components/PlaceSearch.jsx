import { useState, useEffect, useRef, useCallback } from 'react'

const TYPE_TO_OSM = {
  boulangerie: 'boulangerie bakery', restaurant: 'restaurant',
  'fast-food': 'fast food', supermarche: 'supermarché supermarket',
  marche: 'marché market', dibiterie: 'dibiterie grillade',
  cafe: 'café coffee', tangana: 'tangana café', autre: 'shop food'
}

const COORDS = {
  "Dakar":[14.7167,-17.4677],"Plateau":[14.6697,-17.4378],"Médina":[14.68,-17.45],
  "Fann":[14.693,-17.468],"Ouakam":[14.72,-17.485],"Ngor":[14.745,-17.515],
  "Yoff":[14.755,-17.49],"Mermoz":[14.705,-17.475],"Sacré-Cœur":[14.715,-17.46],
  "Almadies":[14.735,-17.505],"Parcelles Assainies":[14.765,-17.435],
  "Grand Dakar":[14.685,-17.445],"HLM":[14.695,-17.44],"Liberté":[14.698,-17.455],
  "Pikine":[14.77,-17.39],"Guédiawaye":[14.785,-17.395],"Rufisque":[14.715,-17.27],
  "Keur Massar":[14.775,-17.31],"Grand Yoff":[14.74,-17.45],
  "Thiès":[14.7886,-16.926],"Thiès centre":[14.7886,-16.926],
  "Mbour":[14.4167,-16.9667],"Saly":[14.45,-17.0167],
  "Saint-Louis":[16.02,-16.49],"Saint-Louis centre":[16.02,-16.49],
  "Ziguinchor":[12.5833,-16.2719],"Ziguinchor centre":[12.5833,-16.2719],
  "Kaolack":[14.15,-16.0667],"Kaolack centre":[14.15,-16.0667],
  "Touba":[14.85,-15.8833],
}

function getCoords(region, quartier) {
  if (quartier && COORDS[quartier]) return COORDS[quartier]
  if (COORDS[region]) return COORDS[region]
  return COORDS["Dakar"]
}

const ETABS = {
  boulangerie: {
    "Plateau":[{name:"Boulangerie Jaune",address:"Rue Vincens, Plateau"},{name:"Boulangerie Maison Peyroux",address:"Av. Léopold Sédar Senghor, Plateau"},{name:"Ange Boulangerie Pâtisserie",address:"Rue Moussé Diop, Plateau"}],
    "Médina":[{name:"Boulangerie Chez Fatou",address:"Rue 22, Médina"},{name:"Boulangerie de la Médina",address:"Av. Blaise Diagne, Médina"},{name:"Boulangerie Keur Mame Astou",address:"Rue 18, Médina"}],
    "Mermoz":[{name:"Boulangerie La Parisienne",address:"Route de Ouakam, Mermoz"},{name:"Boulangerie Mermoz",address:"Av. Cheikh Anta Diop, Mermoz"},{name:"Le Pain Doré",address:"Mermoz Pyrotechnie"}],
    "Almadies":[{name:"Boulangerie Le Fournil",address:"Route des Almadies"},{name:"Boulangerie du Baobab",address:"Almadies Zone 4"},{name:"La Baguette Magique",address:"Almadies Ngor"}],
    "Sacré-Cœur":[{name:"Boulangerie Le Chantilly",address:"Sacré-Cœur 3"},{name:"Boulangerie Sacré-Cœur",address:"Av. Sacré-Cœur"},{name:"Al Fourna Boulangerie",address:"Sacré-Cœur 2"}],
    "Parcelles Assainies":[{name:"Boulangerie Ndéné",address:"Unité 17, Parcelles"},{name:"Boulangerie Al Baraka",address:"Unité 14, Parcelles"},{name:"Boulangerie Parcelles",address:"Unité 25, Parcelles"}],
    "Grand Dakar":[{name:"Boulangerie Grand Dakar",address:"Av. Bourguiba, Grand Dakar"},{name:"Boulangerie Al Amine",address:"Grand Dakar"}],
    "HLM":[{name:"Boulangerie Espace Pain",address:"HLM Grand Yoff"},{name:"Boulangerie HLM",address:"HLM 5"},{name:"Boulangerie Keur Jaraaf",address:"HLM Las Palmas"}],
    "Liberté":[{name:"Boulangerie La Galette",address:"Liberté 6"},{name:"Boulangerie Le Viennois",address:"Liberté 5 / Point E"}],
    "Ouakam":[{name:"Boulangerie de Ouakam",address:"Route de Ouakam"},{name:"Boulangerie Keur Serigne Ouakam",address:"Ouakam Village"}],
    "Pikine":[{name:"Boulangerie Pikine",address:"Pikine Icotaf"},{name:"Boulangerie Tally Boumak",address:"Pikine Tally Boumak"},{name:"Boulangerie Diamaguène",address:"Pikine Diamaguène"}],
    "Guédiawaye":[{name:"Boulangerie Sam",address:"Guédiawaye Sam Notaire"},{name:"Boulangerie Ndiarème",address:"Guédiawaye Ndiarème"}],
    "Rufisque":[{name:"Boulangerie de Rufisque",address:"Centre-ville, Rufisque"}],
    "Keur Massar":[{name:"Boulangerie Keur Massar",address:"Keur Massar centre"},{name:"Boulangerie Al Houda",address:"Keur Massar"}],
    "Yoff":[{name:"Boulangerie de Yoff",address:"Yoff Village"},{name:"Boulangerie Tonghor",address:"Yoff Tonghor"}],
    "Grand Yoff":[{name:"Boulangerie Grand Yoff",address:"Grand Yoff"},{name:"Boulangerie Arafat",address:"Grand Yoff Arafat"}],
    "Thiès centre":[{name:"Boulangerie de Thiès",address:"Centre-ville, Thiès"},{name:"Boulangerie Nguinth",address:"Nguinth, Thiès"}],
    "Mbour":[{name:"Boulangerie de Mbour",address:"Centre-ville, Mbour"}],
    "Saint-Louis centre":[{name:"Boulangerie de Saint-Louis",address:"Île de Saint-Louis"}],
    "Touba":[{name:"Boulangerie Touba",address:"Centre-ville, Touba"}],
    "Kaolack centre":[{name:"Boulangerie de Kaolack",address:"Centre-ville, Kaolack"}],
    "Ziguinchor centre":[{name:"Boulangerie de Ziguinchor",address:"Centre-ville, Ziguinchor"}],
  },
  restaurant: {
    "Plateau":[{name:"Restaurant Chez Loutcha",address:"Rue St-Michel, Plateau"},{name:"Restaurant Le Pontty",address:"Rue de Thann, Plateau"},{name:"Restaurant Farid",address:"Rue Vincens, Plateau"},{name:"Le Teranga",address:"Place de l'Indépendance"}],
    "Almadies":[{name:"Restaurant Le Lagon",address:"Route des Almadies"},{name:"Restaurant La Braise",address:"Almadies Zone 3"},{name:"Le Cala",address:"Almadies plage"}],
    "Ngor":[{name:"Restaurant Le Ngor",address:"Plage de Ngor"},{name:"Chez Carla",address:"Île de Ngor"}],
    "Mermoz":[{name:"Restaurant La Calebasse",address:"Mermoz Pyrotechnie"},{name:"Le Jardin Thaïlandais",address:"Mermoz"}],
    "Médina":[{name:"Restaurant Le Dakarois",address:"Av. Blaise Diagne, Médina"},{name:"Chez Aminata",address:"Rue 25, Médina"}],
    "Sacré-Cœur":[{name:"La Bonne Fourchette",address:"Sacré-Cœur 3"},{name:"Restaurant Sacré-Cœur",address:"VDN"}],
    "Pikine":[{name:"Restaurant Pikine",address:"Pikine centre"}],
    "Saint-Louis centre":[{name:"Restaurant La Linguère",address:"Île de Saint-Louis"},{name:"Flamingo",address:"Quai Henry Jay"}],
  },
  "fast-food": {
    "Plateau":[{name:"Brioche Dorée Sea Plaza",address:"Sea Plaza, Plateau"},{name:"KFC Dakar",address:"Sea Plaza, Plateau"}],
    "Almadies":[{name:"Burger King Almadies",address:"Route des Almadies"},{name:"Foodie's Almadies",address:"Zone 4, Almadies"}],
    "Sacré-Cœur":[{name:"Chicken DK",address:"Sacré-Cœur VDN"},{name:"Istanbul Kebab",address:"Sacré-Cœur 3"}],
    "Mermoz":[{name:"Planète Burger",address:"Av. Cheikh Anta Diop, Mermoz"}],
    "Médina":[{name:"Istanbul Kebab Médina",address:"Av. Blaise Diagne, Médina"}],
    "Parcelles Assainies":[{name:"Jaël Fast Food",address:"Unité 17, Parcelles"}],
  },
  supermarche: {
    "Sacré-Cœur":[{name:"Auchan Sacré-Cœur",address:"Sacré-Cœur VDN"}],
    "Liberté":[{name:"Auchan Liberté 6",address:"Liberté 6"}],
    "Plateau":[{name:"Casino Supermarché",address:"Rue Carnot, Plateau"}],
    "Mermoz":[{name:"Exclusive Supermarché",address:"Mermoz"}],
    "Almadies":[{name:"Sahm Almadies",address:"Route des Almadies"}],
    "Pikine":[{name:"Auchan Pikine",address:"Pikine Icotaf"}],
    "Grand Yoff":[{name:"Auchan Grand Yoff",address:"Grand Yoff"}],
  },
  marche: {
    "Plateau":[{name:"Marché Sandaga",address:"Av. Émile Badiane, Plateau"},{name:"Marché Kermel",address:"Rue Félix Faure, Plateau"}],
    "Médina":[{name:"Marché Tilène",address:"Rue 22, Médina"},{name:"Marché Castor",address:"Castor, Médina"}],
    "HLM":[{name:"Marché HLM",address:"HLM 5"}],
    "Colobane":[{name:"Marché Colobane",address:"Colobane"}],
    "Pikine":[{name:"Marché Pikine",address:"Pikine centre"}],
    "Guédiawaye":[{name:"Marché Guédiawaye",address:"Guédiawaye centre"}],
    "Mbour":[{name:"Marché central de Mbour",address:"Centre-ville, Mbour"},{name:"Marché aux poissons",address:"Plage de Mbour"}],
    "Touba":[{name:"Marché Ocass",address:"Touba"}],
    "Kaolack centre":[{name:"Marché central de Kaolack",address:"Centre-ville, Kaolack"}],
    "Thiès centre":[{name:"Marché central de Thiès",address:"Centre-ville, Thiès"}],
  },
  dibiterie: {
    "Grand Dakar":[{name:"Dibiterie Serigne Fallou",address:"Grand Dakar"},{name:"Dibiterie Chez Moussa",address:"Grand Dakar"}],
    "Médina":[{name:"Dibiterie Chez Ibra",address:"Médina"},{name:"Dibiterie Keur Serigne Touba",address:"Médina"}],
    "Parcelles Assainies":[{name:"Dibiterie Le Sahélien",address:"Unité 14, Parcelles"}],
    "HLM":[{name:"Dibiterie Chez Modou",address:"HLM"}],
    "Pikine":[{name:"Dibiterie Pikine",address:"Pikine centre"}],
    "Ouakam":[{name:"Dibiterie Ouakam",address:"Ouakam Village"}],
  },
  cafe: {
    "Plateau":[{name:"Café de Rome",address:"Place de l'Indépendance, Plateau"}],
    "Almadies":[{name:"Café des Arts",address:"Almadies"}],
    "Médina":[{name:"Salon de thé Al Jazira",address:"Médina"}],
  },
  tangana: {
    "Médina":[{name:"Tangana Keur Mame Cheikh",address:"Rue 18, Médina"},{name:"Tangana Chez Fallou",address:"Médina"}],
    "Grand Dakar":[{name:"Tangana Chez Pape",address:"Grand Dakar"}],
    "Parcelles Assainies":[{name:"Tangana Keur Serigne",address:"Unité 25, Parcelles"}],
    "Pikine":[{name:"Tangana Pikine",address:"Pikine centre"}],
    "HLM":[{name:"Tangana HLM",address:"HLM 5"}],
  },
}

const REGION_QUARTIERS = {
  "Dakar":["Plateau","Médina","Fann","Ouakam","Ngor","Yoff","Mermoz","Sacré-Cœur","Almadies","Parcelles Assainies","Grand Dakar","HLM","Liberté","Pikine","Guédiawaye","Rufisque","Keur Massar","Grand Yoff","Cambérène","Dieuppeul","Colobane"],
  "Thiès":["Thiès centre","Mbour","Saly"],"Saint-Louis":["Saint-Louis centre","Sor"],
  "Ziguinchor":["Ziguinchor centre"],"Kaolack":["Kaolack centre"],"Diourbel":["Diourbel centre","Touba"],
}

function getLocalPlaces(typeEtab, region, quartier) {
  const td = ETABS[typeEtab] || {}
  if (quartier && td[quartier]) return td[quartier]
  const qs = REGION_QUARTIERS[region] || []
  const all = []
  for (const q of qs) if (td[q]) all.push(...td[q])
  if (all.length > 0) return all
  const loc = quartier || region || 'Dakar'
  const labels = { boulangerie:'Boulangerie', restaurant:'Restaurant', 'fast-food':'Fast-food', supermarche:'Supermarché', marche:'Marché', dibiterie:'Dibiterie', cafe:'Café', tangana:'Tangana', autre:'Commerce' }
  const lb = labels[typeEtab] || 'Commerce'
  return [{ name: `${lb} de ${loc}`, address: `Centre, ${loc}` }, { name: `${lb} Central`, address: loc }]
}

export default function PlaceSearch({ typeEtab, region, quartier, value, onChange }) {
  const [query, setQuery] = useState(value || '')
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [searching, setSearching] = useState(false)
  const [source, setSource] = useState('')
  const wrapperRef = useRef(null)
  const debounceRef = useRef(null)
  const abortRef = useRef(null)

  useEffect(() => {
    const h = e => { if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setShowResults(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  useEffect(() => { setQuery(value || '') }, [value])

  // OSM Nominatim search (3+ chars)
  const searchOSM = useCallback(async (q) => {
    if (!q || q.length < 3 || !typeEtab) return
    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller
    setSearching(true)
    const [lat, lon] = getCoords(region, quartier)
    const typeQ = TYPE_TO_OSM[typeEtab] || 'food'
    try {
      const url = `https://nominatim.openstreetmap.org/search?` + new URLSearchParams({
        q: `${q} ${typeQ} ${quartier || region || 'Dakar'} Senegal`,
        format: 'json', addressdetails: '1', limit: '8',
        viewbox: `${lon - 0.05},${lat + 0.05},${lon + 0.05},${lat - 0.05}`,
        bounded: '0', countrycodes: 'sn',
      })
      const res = await fetch(url, { signal: controller.signal, headers: { 'Accept-Language': 'fr' } })
      if (!res.ok) throw new Error('err')
      const data = await res.json()
      if (data.length > 0) {
        setResults(data.filter(p => p.display_name).map(p => {
          const parts = p.display_name.split(', ')
          return { name: parts[0], address: parts.slice(1, 4).join(', '), source: 'osm' }
        }))
        setSource('osm')
        setShowResults(true)
        setSearching(false)
        return
      }
    } catch (err) { if (err.name === 'AbortError') { setSearching(false); return } }
    fallbackLocal(q)
    setSearching(false)
  }, [typeEtab, region, quartier])

  const fallbackLocal = (q) => {
    const places = getLocalPlaces(typeEtab, region, quartier)
    const lower = q.toLowerCase()
    const filtered = places.filter(p => p.name.toLowerCase().includes(lower) || p.address.toLowerCase().includes(lower))
    setResults(filtered.length > 0 ? filtered : places)
    setSource('local')
    setShowResults(true)
  }

  const handleInput = (val) => {
    setQuery(val)
    onChange(val)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (val.length < 3) {
      if (typeEtab && (region || quartier)) {
        const places = getLocalPlaces(typeEtab, region, quartier)
        const lower = val.toLowerCase()
        setResults(val.length >= 1 ? places.filter(p => p.name.toLowerCase().includes(lower)) : places)
        setSource('local')
        setShowResults(true)
      }
      return
    }
    debounceRef.current = setTimeout(() => searchOSM(val), 600)
  }

  const handleFocus = () => {
    if (typeEtab && (region || quartier)) {
      setResults(getLocalPlaces(typeEtab, region, quartier))
      setSource('local')
      setShowResults(true)
    }
  }

  const selectPlace = (place) => {
    setQuery(place.name)
    onChange(place.name, place.address)
    setShowResults(false)
  }

  const etabLabel = ({ boulangerie:'boulangerie', restaurant:'restaurant', 'fast-food':'fast-food', supermarche:'supermarché', marche:'marché', dibiterie:'dibiterie', cafe:'café', tangana:'tangana' })[typeEtab] || 'établissement'

  return (
    <div ref={wrapperRef} style={{ position: 'relative', marginBottom: '1.5rem' }}>
      <div style={{ position: 'relative' }}>
        <input value={query} onChange={e => handleInput(e.target.value)} onFocus={handleFocus}
          placeholder={typeEtab && (region || quartier) ? `Rechercher une ${etabLabel} à ${quartier || region}...` : "Sélectionnez d'abord un type et une zone ci-dessus"}
          style={{ fontFamily: 'var(--font-sans)', width: '100%', padding: '0.8rem 1rem', paddingRight: searching ? '2.8rem' : '1rem', border: '1.5px solid rgba(0,0,0,0.1)', borderRadius: showResults && results.length > 0 ? '10px 10px 0 0' : 10, fontSize: '0.92rem', outline: 'none', boxSizing: 'border-box', background: 'white' }} />
        {searching && <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, border: '2px solid rgba(0,0,0,0.08)', borderTopColor: 'var(--red)', borderRadius: '50%', animation: 'plspin 0.6s linear infinite' }} />}
      </div>
      {showResults && results.length > 0 && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 20, background: 'white', border: '1.5px solid rgba(0,0,0,0.1)', borderTop: 'none', borderRadius: '0 0 10px 10px', maxHeight: 280, overflowY: 'auto', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
          <div style={{ padding: '0.4rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid rgba(0,0,0,0.04)', background: 'rgba(0,0,0,0.01)' }}>
            {source === 'osm' ? '🌍 Résultats OpenStreetMap' : `📋 ${quartier || region}`} — {results.length} trouvé{results.length > 1 ? 's' : ''}
          </div>
          {results.map((p, i) => (
            <div key={i} onClick={() => selectPlace(p)} style={{ padding: '0.7rem 1rem', cursor: 'pointer', borderBottom: i < results.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--cream)'}
              onMouseLeave={e => e.currentTarget.style.background = 'white'}>
              <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.88rem' }}>📍 {p.name}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', color: '#999', marginTop: '0.15rem' }}>{p.address}</div>
            </div>
          ))}
          <div style={{ padding: '0.5rem 1rem', background: 'rgba(0,0,0,0.02)', fontFamily: 'var(--font-sans)', fontSize: '0.7rem', color: '#bbb', textAlign: 'center' }}>
            Pas trouvé ? Tapez le nom exact et continuez
          </div>
        </div>
      )}
      {typeEtab && (region || quartier) && !showResults && (
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', color: '#bbb', marginTop: '0.35rem' }}>
          💡 Cliquez pour voir les établissements de {quartier || region}
        </div>
      )}
      <style>{`@keyframes plspin { to { transform: translateY(-50%) rotate(360deg) } }`}</style>
    </div>
  )
}
