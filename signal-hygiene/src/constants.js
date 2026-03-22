export const REGIONS = {
  "Dakar": ["Plateau", "Médina", "Fann", "Ouakam", "Ngor", "Yoff", "Mermoz", "Sacré-Cœur", "Almadies", "Parcelles Assainies", "Grand Dakar", "HLM", "Liberté", "Pikine", "Guédiawaye", "Rufisque", "Keur Massar", "Grand Yoff", "Cambérène", "Dieuppeul", "Colobane"],
  "Thiès": ["Thiès centre", "Mbour", "Saly", "Pout", "Tivaouane", "Joal"],
  "Saint-Louis": ["Saint-Louis centre", "Sor", "Richard Toll", "Dagana"],
  "Ziguinchor": ["Ziguinchor centre", "Cap Skirring", "Oussouye"],
  "Kaolack": ["Kaolack centre", "Nioro du Rip"],
  "Diourbel": ["Diourbel centre", "Touba", "Mbacké", "Bambey"],
  "Fatick": ["Fatick centre", "Foundiougne", "Gossas"],
  "Kolda": ["Kolda centre", "Vélingara"],
  "Tambacounda": ["Tambacounda centre", "Bakel"],
  "Louga": ["Louga centre", "Kébémer", "Linguère"],
  "Matam": ["Matam centre", "Ourossogui", "Ranérou"],
  "Kédougou": ["Kédougou centre", "Saraya", "Salemata"],
  "Sédhiou": ["Sédhiou centre", "Bounkiling", "Goudomp"],
  "Kaffrine": ["Kaffrine centre", "Birkelane", "Koungheul"]
}

export const TYPES_ETAB = [
  { id: "boulangerie", label: "Boulangerie", icon: "🥖" },
  { id: "restaurant", label: "Restaurant", icon: "🍽️" },
  { id: "fast-food", label: "Fast-food", icon: "🍔" },
  { id: "supermarche", label: "Supermarché", icon: "🛒" },
  { id: "marche", label: "Marché", icon: "🏪" },
  { id: "dibiterie", label: "Dibiterie", icon: "🍖" },
  { id: "cafe", label: "Café / Salon de thé", icon: "☕" },
  { id: "tangana", label: "Tangana", icon: "🫖" },
  { id: "autre", label: "Autre", icon: "📍" }
]

export const TYPES_INCIDENT = [
  { id: "nuisibles", label: "Nuisibles (rats, cafards…)", icon: "🐀", color: "#C41E1E" },
  { id: "salubrite", label: "Insalubrité générale", icon: "🦠", color: "#E07B00" },
  { id: "conservation", label: "Mauvaise conservation", icon: "🧊", color: "#2B7A9E" },
  { id: "manipulation", label: "Manipulation non hygiénique", icon: "🧤", color: "#7B5EA7" },
  { id: "peremption", label: "Produits périmés", icon: "📅", color: "#8B6914" },
  { id: "eau", label: "Eau non potable", icon: "💧", color: "#1B6B93" },
  { id: "autre", label: "Autre", icon: "⚠️", color: "#6B6B6B" }
]

export const SEVERITY = [
  { id: "preoccupant", label: "Préoccupant", icon: "⚠️", desc: "À surveiller", color: "#E0A800" },
  { id: "grave", label: "Grave", icon: "🔶", desc: "Risque sanitaire", color: "#E06000" },
  { id: "critique", label: "Critique", icon: "🚨", desc: "Danger immédiat", color: "#C41E1E" }
]

export function getIncidentInfo(id) {
  return TYPES_INCIDENT.find(t => t.id === id) || { icon: "⚠️", label: id, color: "#6B6B6B" }
}

export function getSeverityInfo(id) {
  return SEVERITY.find(s => s.id === id) || { label: id, color: "#999", icon: "⚠️", desc: "" }
}

export function getEtabInfo(id) {
  return TYPES_ETAB.find(t => t.id === id) || { icon: "📍", label: id }
}

export function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "à l'instant"
  if (mins < 60) return `il y a ${mins}min`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `il y a ${hrs}h`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `il y a ${days}j`
  return `il y a ${Math.floor(days / 30)} mois`
}

export function generateRef() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let r = ""
  for (let i = 0; i < 4; i++) r += chars[Math.floor(Math.random() * chars.length)]
  return `SH-2026-${r}`
}
