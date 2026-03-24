# KubeDex

## FR — Presentation

KubeDex est une plateforme web d'apprentissage gamifie de Docker, Kubernetes et OpenShift.
L'application propose des parcours progressifs par mondes, avec des lecons interactives (theorie + exercice), un systeme de XP, niveaux, badges et suivi de progression.

Objectif: apprendre des concepts DevOps de facon pratique et motivante, directement dans le navigateur.

## FR — Fonctionnalites principales

- Parcours pedagogiques par mondes (`Docker`, `Kubernetes`, `Advanced OpenShift`)
- Lecons interactives avec editeur integre (CLI / YAML / Dockerfile)
- Validation frontend des exercices (sans execution reelle de Docker/kubectl/oc)
- Gamification: XP, niveaux, badges, streak, progression visuelle
- Carte des mondes et deblocage progressif des lecons
- Espace profil avec authentification locale (MVP)
- Interface bilingue francais / anglais

## FR — Comment utiliser l'application

1. Ouvrir la landing page.
2. Aller sur le dashboard et commencer par la premiere lecon.
3. Valider les exercices pour gagner de l'XP et debloquer des badges.
4. Suivre la progression des mondes et acceder au mode Advanced.
5. Changer la langue via le selecteur `FR/EN` dans la navbar.

## FR — Installation locale

Prerequis:
- Node.js 20+ recommande
- npm

Installation:

```bash
npm install
```

Lancement en developpement:

```bash
npm run dev
```

Puis ouvrir:
- [http://localhost:5173](http://localhost:5173)

Build production:

```bash
npm run build
```

Preview du build:

```bash
npm run preview
```

## FR — Stack technique

- React + TypeScript + Vite
- Tailwind CSS
- React Router
- Zustand (persist localStorage)
- Framer Motion
- CodeMirror 6
- canvas-confetti (effets visuels)

## FR — Architecture (resume)

- `src/store`: etat utilisateur, progression, langue, authentification
- `src/data`: metadonnees des mondes, badges, contenus des lecons
- `src/components`: composants UI (layout, gamification, world map, lesson)
- `src/pages`: pages routables (landing, dashboard, world map, lesson, leaderboard, profile, advanced)

---

## EN — Overview

KubeDex is a gamified learning web app for Docker, Kubernetes, and OpenShift.
It provides progressive world-based learning paths with interactive lessons (theory + exercise), XP, levels, badges, and progress tracking.

Goal: learn DevOps concepts in a practical and engaging way, directly in the browser.

## EN — Main features

- World-based learning paths (`Docker`, `Kubernetes`, `Advanced OpenShift`)
- Interactive lessons with integrated editor (CLI / YAML / Dockerfile)
- Frontend-only exercise validation (no real Docker/kubectl/oc execution)
- Gamification: XP, levels, badges, streak, visual progress
- World map with progressive lesson unlock
- Profile area with local authentication (MVP)
- Bilingual interface (French / English)

## EN — How to use

1. Open the landing page.
2. Go to the dashboard and start with the first lesson.
3. Validate exercises to gain XP and unlock badges.
4. Track world progress and access Advanced mode.
5. Switch language using the `FR/EN` selector in the navbar.

## EN — Local setup

Requirements:
- Node.js 20+ recommended
- npm

Install dependencies:

```bash
npm install
```

Run in development:

```bash
npm run dev
```

Then open:
- [http://localhost:5173](http://localhost:5173)

Production build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## EN — Tech stack

- React + TypeScript + Vite
- Tailwind CSS
- React Router
- Zustand (localStorage persistence)
- Framer Motion
- CodeMirror 6
- canvas-confetti (visual effects)

## EN — Architecture (summary)

- `src/store`: user, progress, language, authentication state
- `src/data`: worlds metadata, badges, lesson contents
- `src/components`: UI building blocks (layout, gamification, world map, lesson)
- `src/pages`: route pages (landing, dashboard, world map, lesson, leaderboard, profile, advanced)
