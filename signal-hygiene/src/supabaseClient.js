import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    '⚠️ Variables Supabase manquantes.\n' +
    'Créez un fichier .env à la racine avec :\n' +
    'VITE_SUPABASE_URL=https://votre-projet.supabase.co\n' +
    'VITE_SUPABASE_ANON_KEY=votre-clé-anon'
  )
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
)
