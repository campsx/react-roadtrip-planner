# Roadtrip Planner

Application web SPA permettant de planifier un road trip en parcourant les pays du monde, en consultant leurs détails et en constituant un itinéraire personnalisé.

## Fonctionnalités

- **Authentification** — connexion sécurisée avec redirection automatique vers `/login` pour les routes protégées
- **Liste des pays** — affichage paginé (20 par page) avec recherche en temps réel
- **Détail d'un pays** — drapeau, capitale, région, population, superficie, langues, monnaies et pays voisins
- **Mon Roadtrip** — ajout / suppression de pays pour composer son itinéraire
- **Notifications** — retours visuels sur les actions utilisateur

## Stack technique

| Couche       | Technologie                        | Version |
|--------------|------------------------------------|---------|
| UI           | React                              | 19      |
| Styles       | Tailwind CSS (plugin Vite)         | 4       |
| Routing      | React Router DOM                   | 7       |
| HTTP         | Axios                              | 1.x     |
| Build        | Vite                               | 6       |
| Langage      | TypeScript                         | 6       |
| Lint         | ESLint 9 + typescript-eslint       | 9 / 8   |
| Formatage    | Prettier                           | 3       |

**Prérequis Node :** `>= 24.0.0`

## Installation

```bash
# Cloner le dépôt
git clone <url-du-repo>
cd react-roadtrip-planner

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# puis éditer .env avec vos valeurs
```

## Variables d'environnement

| Variable            | Description                     |
|---------------------|---------------------------------|
| `VITE_API_BASE_URL` | URL de base de l'API REST       |
| `VITE_APP_ENV`      | Environnement (`dev`, `prod`…)  |

> Ne jamais committer le fichier `.env` — utiliser `.env.example` comme modèle.

## Scripts disponibles

| Commande               | Description                              |
|------------------------|------------------------------------------|
| `npm run dev`          | Lance le serveur de développement Vite   |
| `npm run build`        | Compile TypeScript puis bundle avec Vite |
| `npm run preview`      | Prévisualise le build de production      |
| `npm run lint`         | Analyse ESLint                           |
| `npm run lint:fix`     | Correction automatique ESLint            |
| `npm run format`       | Formatage Prettier                       |
| `npm run type-check`   | Vérification TypeScript sans emit        |

## Structure du projet

```
src/
├── app/                  # Bootstrap — App, router, providers, pages proxies
├── components/           # Composants partagés (layout, UI atoms)
├── config/               # Accesseurs de variables d'environnement
├── features/             # Slices verticales par domaine
│   ├── auth/             # Authentification, ProtectedRoute, store
│   ├── countries/        # Liste et détail des pays
│   ├── roadtrip/         # Gestion de l'itinéraire
│   └── notification/     # Système de notifications
├── lib/                  # Client Axios (intercepteurs auth + erreurs)
└── main.tsx
```

Chaque feature suit la convention `api/ · model/ · hooks/ · components/`.

## Routes

| Route                | Accès       | Description              |
|----------------------|-------------|--------------------------|
| `/login`             | Public      | Page de connexion        |
| `/countries`         | Protégé     | Liste des pays           |
| `/countries/:code`   | Protégé     | Détail d'un pays         |
| `/roadtrip`          | Protégé     | Mon itinéraire           |

La route `/` redirige automatiquement vers `/countries`.