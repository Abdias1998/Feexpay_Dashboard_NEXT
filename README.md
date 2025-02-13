# Installation et Configuration 

## 1.Prérequis
Assurez-vous d'avoir installé les outils suivants :
- [Node.js](https://nodejs.org/) (version LTS recommandée)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

##  2.Étapes d'installation

### 3. Installer les dépendances 
npm install --legacy-peer-deps


### 4.Ajouter les variables d'environnement 
Dans un fichier `.env.local` :
```env

```

### 5. Lancer l'application
Démarrez votre application en mode développement :
```bash
npm run dev
```
### 6.Connexion partiel
Veuillez vous connecter avec un compte valide de Feexpay pour accéder au tableau de bord.

### 7.Architecture du projet

Project-root/
│
├── public/                     # Fichiers statiques (images, logos, icônes, etc.)
│   ├── assets/                 # Ressources organisées
│       ├── fonts/              # Polices
│       ├── icons/              # Icônes
│       └── images/             # Images
│           └── svg/            # Images vectorielles SVG
│
├── src/                        # Source principale de l'application
│   ├── components/             # Composants réutilisables
│   │   ├── common/             # Header, Footer, Button, etc.
│   │   ├── layouts/            # Layouts (AdminLayout, UserLayout, etc.)
│   │   └── dashboard/          # Composants spécifiques au dashboard
│   │
│   ├── features/               # Répertoires pour Redux Toolkit
│   │   ├── auth/               # État lié à l'authentification
│   │       └── authSlice.js    # Slice Redux pour l'authentification
│   │
│   ├── hooks/                  # Hooks personnalisés
│   │   ├── useAuth.js          # Hook pour gérer l'authentification
│   │   └── useChatMessages.js  # Hook pour gérer les messages du chatbot
│   │
│   ├── lib/                    # Bibliothèques partagées
│   │   ├── axiosInstance.js    # Configuration Axios
│   │
│   ├── pages/                  # Pages Next.js (routes automatiques)
│   │   ├── api/                # API côté serveur
│   │   │   ├── auth/           # Routes pour NextAuth
│   │   │       └── [...nextauth].js
│   │   │── transactions/       # Page transactions
│   │   │       └── index.js
│   │   │── refunds/            # Page remboursements
│   │   │       └── index.js
│   │   │── payouts_api/        # Page remboursements
│   │   │       └── index.js
│   │   ├── dashboard/          # Pages du tableau de bord
│   │   │   └── index.js
│   │   └── index.js            # Page d'accueil
│   │   └── _app.js             # Fichier de configuration global de Next.js
│   │   └── 404.js              # Page pour les erreurs 404
│   │
│   ├── services/               # Services et configuration Redux
│   │   ├── chatbotService.js   # Gestion du chatbot
│   │   └── rootReducer.js      # Combine les reducers
│   │
│   ├── styles/                 # Fichiers de styles
│   │   └── globals.css         # Styles globaux
│   │
│   ├── utils/                  # Fonctions utilitaires
│   │   ├── metadata.js         # Métadonnées générales
│   │   └── constants.js        # Constantes globales
│
├── .env.local                  # Variables d'environnement
├── next.config.js              # Configuration Next.js
├── tailwind.config.js          # Configuration Tailwind CSS
├── package.json                # Dépendances et scripts
└── jsconfig.json               # Configuration JavaScript
