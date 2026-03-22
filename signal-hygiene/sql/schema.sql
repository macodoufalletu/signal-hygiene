-- =============================================================
-- PLATEFORME DE SIGNALEMENT HYGIÈNE — Schéma Supabase
-- =============================================================
-- Exécuter ce script dans l'éditeur SQL de Supabase (Dashboard > SQL Editor)

-- 1. Table des signalements
CREATE TABLE signalements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ref VARCHAR(20) NOT NULL UNIQUE,
  type_etablissement VARCHAR(50) NOT NULL,
  nom_etablissement VARCHAR(255) NOT NULL,
  adresse_etablissement VARCHAR(500),
  place_id VARCHAR(300),
  region VARCHAR(100) NOT NULL,
  quartier VARCHAR(100),
  type_incident VARCHAR(50) NOT NULL,
  severity VARCHAR(20) NOT NULL,
  description TEXT NOT NULL,
  details TEXT,
  photo_count INTEGER DEFAULT 0,
  date_incident DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Index pour les requêtes fréquentes
CREATE INDEX idx_signalements_created_at ON signalements(created_at DESC);
CREATE INDEX idx_signalements_region ON signalements(region);
CREATE INDEX idx_signalements_type_incident ON signalements(type_incident);

-- 3. Row Level Security (RLS) — tout le monde peut lire et insérer, personne ne peut modifier/supprimer
ALTER TABLE signalements ENABLE ROW LEVEL SECURITY;

-- Lecture publique (tout le monde peut voir les signalements)
CREATE POLICY "Lecture publique des signalements"
  ON signalements FOR SELECT
  USING (true);

-- Insertion publique (tout le monde peut signaler, anonymement)
CREATE POLICY "Insertion publique des signalements"
  ON signalements FOR INSERT
  WITH CHECK (true);

-- Pas de politique UPDATE ni DELETE = personne ne peut modifier/supprimer
-- (sauf toi via le dashboard Supabase en tant qu'admin)

-- 4. Vue pour les stats (optionnel, utile pour ton dashboard futur)
CREATE VIEW stats_signalements AS
SELECT
  COUNT(*) AS total,
  COUNT(*) FILTER (WHERE created_at >= date_trunc('month', NOW())) AS ce_mois,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') AS cette_semaine,
  COUNT(DISTINCT region) AS regions_touchees
FROM signalements;
