# Rapport TP DevOps CI/CD

## 1. Objectifs du TP

L'objectif est de mettre en place un cycle DevOps complet:

- developpement d'une application simple frontend + backend,
- ajout de tests automatiques,
- conteneurisation Docker,
- orchestration Docker Compose,
- integration et deploiement continus avec GitHub Actions,
- deploiement sur AWS EC2.

## 2. Stack technique

- **Frontend**: React
- **Backend**: Flask (Python)
- **Tests frontend**: react-scripts + testing-library
- **Tests backend**: pytest
- **Conteneurs**: Docker
- **Orchestration locale/prod**: Docker Compose
- **CI/CD**: GitHub Actions
- **Cloud**: AWS EC2 (Ubuntu)
- **Registry images**: GHCR (GitHub Container Registry)

## 3. Structure finale du projet

```text
tp-devops/
|- backend/
|  |- app.py
|  |- requirements.txt
|  `- tests/
|     |- __init__.py
|     `- test_app.py
|- frontend/
|  |- Dockerfile
|  |- package.json
|  |- package-lock.json
|  |- public/index.html
|  `- src/
|     |- App.js
|     |- App.test.js
|     |- index.js
|     `- setupTests.js
|- .github/workflows/ci-cd.yml
|- docker-compose.yml
|- Dockerfile
|- .gitignore
|- README.md
`- RAPPORT_TP_DEVOPS.md
```

## 4. Fonctionnalites implementees

### 4.1 Backend Flask

Routes exposees:

- `GET /` -> message API + statut `ok`
- `GET /health` -> statut `healthy`

Tests unitaires backend:

- verification code HTTP 200 sur `/`
- verification du JSON de statut sur `/` et `/health`

Resultat: **2 tests backend passes**.

### 4.2 Frontend React

Le frontend:

- affiche une page de statut du projet,
- interroge le backend via `/health`,
- affiche un etat visuel `Connecte` ou `Erreur de connexion`.

Correction importante realisee:

- l'URL backend a ete corrigee pour utiliser l'hote courant (AWS) au lieu de `localhost`, ce qui a resolu le probleme de connectivite navigateur -> backend en production.

Tests frontend:

- test de rendu du titre principal,
- configuration Jest DOM (`setupTests.js`) pour activer `toBeInTheDocument`.

## 5. Conteneurisation

### 5.1 Docker backend

- image Python slim,
- installation des dependances via `requirements.txt`,
- exposition du port `5000`.

### 5.2 Docker frontend

- build React (Node),
- serveur Nginx pour servir le build statique,
- exposition interne du port `80`.

### 5.3 Docker Compose

Services:

- `frontend`
- `backend`
- `db` (PostgreSQL local pour environnement compose)

Mapping final frontend:

- `80:80` (acces public sans `:3000`)

## 6. CI/CD GitHub Actions

Fichier: `.github/workflows/ci-cd.yml`

Pipeline en 3 jobs:

1. `test`
- install et tests frontend
- build frontend
- install et tests backend

2. `docker` (branche `main`)
- login GHCR
- build images frontend/backend
- push images vers GHCR

3. `deploy` (branche `main`)
- connexion SSH EC2 via secrets GitHub
- `docker compose pull`
- `docker compose up -d --remove-orphans`

Secrets utilises:

- `SSH_HOST`
- `SSH_USER`
- `SSH_KEY`

## 7. Deploiement AWS EC2

Instance lancee:

- type `t3.micro`
- OS Ubuntu
- IP publique: `13.51.85.8`

Actions realisees:

- installation Docker/Docker Compose,
- clonage du repo dans `/opt/tp-devops`,
- lancement `docker compose up -d --build`,
- verification des endpoints.

Verification fonctionnelle finale:

- Frontend accessible via `http://13.51.85.8`
- Backend health accessible via `http://13.51.85.8:5000/health`
- Frontend affiche `Backend : Connecte`.

## 8. Resultats obtenus

- Application fonctionnelle de bout en bout
- Tests backend et frontend operationnels
- Build Docker OK
- Pipeline CI/CD en place
- Deploiement AWS EC2 valide et accessible

## 9. Limites et ameliorations

- Ajouter HTTPS (Nginx + Certbot)
- Cacher le backend derriere reverse proxy (eviter exposition directe `:5000`)
- Ajouter surveillance/logs centralises
- Ajouter tests d'integration end-to-end
- Finaliser une vraie couche base de donnees applicative (si exigee par l'enonce)

## 10. Conclusion

Le projet a permis de mettre en pratique une chaine DevOps complete: code, test, conteneurisation, CI/CD et deploiement cloud. Les principaux incidents reels de production (erreurs de configuration, reseau, pipeline) ont ete identifies puis resolus de maniere methodique. Le resultat final est stable, reproductible, et constitue une base solide pour une industrialisation plus avancee.

