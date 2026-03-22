# 🛡️ Plateforme de Signalement Hygiène

Plateforme citoyenne pour signaler anonymement les manquements d'hygiène dans les commerces alimentaires au Sénégal.

**Stack** : React + Vite + Supabase (PostgreSQL)  
**Coût** : 0 FCFA — 100% gratuit  

---

## 🚀 Mise en production en 15 minutes

### Étape 1 : Créer la base de données Supabase (5 min)

1. Allez sur **[supabase.com](https://supabase.com)** et créez un compte gratuit
2. Cliquez **"New Project"**
   - Name : `signal-hygiene`
   - Database Password : choisissez un mot de passe fort
   - Region : **West EU (London)** (le plus proche du Sénégal)
3. Attendez que le projet soit prêt (~2 min)
4. Allez dans **SQL Editor** (menu de gauche)
5. Copiez-collez le contenu du fichier `sql/schema.sql` et cliquez **Run**
6. Allez dans **Settings > API** et notez :
   - `Project URL` → c'est votre `VITE_SUPABASE_URL`
   - `anon public` key → c'est votre `VITE_SUPABASE_ANON_KEY`

### Étape 2 : Pousser le code sur GitHub (3 min)

1. Créez un nouveau repo sur **[github.com](https://github.com)** : `signal-hygiene`
2. Dans votre terminal :

```bash
cd signal-hygiene
git init
git add .
git commit -m "🚀 Plateforme de signalement hygiène"
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/signal-hygiene.git
git push -u origin main
```

### Étape 3 : Déployer sur Vercel (5 min)

1. Allez sur **[vercel.com](https://vercel.com)** et connectez-vous avec GitHub
2. Cliquez **"Add New > Project"**
3. Importez votre repo `signal-hygiene`
4. Dans **Environment Variables**, ajoutez :
   - `VITE_SUPABASE_URL` = votre Project URL Supabase
   - `VITE_SUPABASE_ANON_KEY` = votre clé anon
5. Cliquez **Deploy**
6. ✅ Votre site est en ligne sur `signal-hygiene.vercel.app` !

### Étape 4 (optionnel) : Domaine personnalisé

- Vercel permet d'ajouter un domaine gratuit ou personnalisé
- Pour un `.sn`, vous pouvez contacter NIC Sénégal

---

## 🛠️ Développement local

```bash
# Installer les dépendances
npm install

# Copier et remplir le fichier d'environnement
cp .env.example .env
# Éditez .env avec vos valeurs Supabase

# Lancer le serveur de dev
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

---

## 📁 Structure du projet

```
signal-hygiene/
├── sql/
│   └── schema.sql          # Schéma de la base Supabase
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Barre de navigation
│   │   ├── Footer.jsx       # Pied de page
│   │   └── ReportCard.jsx   # Carte de signalement
│   ├── pages/
│   │   ├── Home.jsx         # Page d'accueil
│   │   ├── Report.jsx       # Formulaire de signalement
│   │   └── Reports.jsx      # Liste des signalements
│   ├── App.jsx              # Routes
│   ├── constants.js         # Données (régions, types, etc.)
│   ├── index.css            # Styles globaux
│   ├── main.jsx             # Point d'entrée
│   └── supabaseClient.js    # Client Supabase
├── index.html
├── package.json
├── vercel.json              # Config Vercel (SPA routing)
├── vite.config.js
└── .env.example
```

---

## 📊 Dashboard admin

Pour consulter et gérer les signalements en tant qu'admin :
- Connectez-vous au **Dashboard Supabase** > **Table Editor** > `signalements`
- Vous pouvez voir, filtrer, exporter en CSV, et supprimer les signalements
- La vue `stats_signalements` donne les statistiques en temps réel

---

## 🔒 Sécurité

- ✅ Aucune donnée personnelle collectée
- ✅ Row Level Security (RLS) activé
- ✅ Seule la lecture et l'insertion sont autorisées publiquement
- ✅ Impossible de modifier ou supprimer via l'API publique
- ✅ Seul l'admin Supabase peut gérer les données

---

## 📱 Partage LinkedIn

Voici un modèle de post pour accompagner le lancement :

> 🚨 J'ai vu un rat se promener sur des pains au lait dans une boulangerie.
>
> Au lieu de fermer les yeux, j'ai créé une plateforme citoyenne pour signaler anonymement ce type d'incident.
>
> 🔗 [lien]
>
> Parce que les manquements d'hygiène ne doivent plus rester invisibles.
>
> #Sénégal #HygièneAlimentaire #SantéPublique #CitoyenEngagé
