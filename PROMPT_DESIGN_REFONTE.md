# Prompt Claude Code — Refonte Design KubeDex

> Améliore le design de KubeDex sur tous les points identifiés :
> landing page, world map, micro-interactions, responsive, empty states, navbar.
> Ne touche pas à la logique métier (stores, validation, contenu des leçons).

---

## 1. LANDING PAGE — Refonte complète (`src/pages/Landing.tsx`)

C'est la priorité absolue. Recrée entièrement cette page avec ce niveau de qualité :

### Hero Section

```
┌─────────────────────────────────────────────────────────┐
│  [Particules flottantes en background — pods, conteneurs]│
│                                                          │
│         ⎈  MODE ADVANCED  🔴  [badge animé]             │
│                                                          │
│    Maîtrise Docker &                                     │
│    Kubernetes                   ┌──────────────────┐    │
│    [gradient text cyan→violet]  │  TERMINAL ANIMÉ  │    │
│                                 │  $ docker run... │    │
│    Apprends les technos         │  $ kubectl get.. │    │
│    cloud-native de façon        │  $ oc login...   │    │
│    progressive et ludique       └──────────────────┘    │
│                                                          │
│  [Commencer →]    [Voir le curriculum ↓]                 │
│                                                          │
│  ──── 500+ apprenants · 5 mondes · 40+ leçons ────       │
└─────────────────────────────────────────────────────────┘
```

**Implémentation détaillée du Hero :**

- **Background** : fond `#0a0a0f` avec :
  - Grid pattern SVG subtil (lignes `#1e1e2e` espacées de 40px)
  - Gradient radial cyan en haut à gauche, violet en bas à droite (opacity 0.06)
  - 15-20 particules flottantes (icônes ⎈ 🐳 📦 en petit, opacity 0.08, animation float aléatoire)

- **Badge animé** en haut du titre :
  ```
  ✦ Plateforme Cloud Native Française ✦
  ```
  Style : border cyan/30, bg cyan/5, texte cyan, animation shimmer de gauche à droite

- **Titre** : `text-5xl md:text-7xl font-bold`
  - "Maîtrise" en blanc
  - "Docker &" en gradient `from-cyan to-cyan/70`
  - "Kubernetes" en gradient `from-violet to-violet/70`
  - Animation : chaque mot apparaît avec un stagger delay (Framer Motion)

- **Terminal animé** à droite (desktop) / en dessous (mobile) :
  - Composant `AnimatedTerminal` : simule la frappe de commandes en boucle
  - Séquence : `docker run hello-world` → output → `kubectl get pods` → output → `oc login` → output → recommence
  - Fond `#000010`, border `#1e1e2e`, header avec dots rouge/jaune/vert
  - Curseur clignotant, effet typewriter caractère par caractère via `setInterval`
  - Hauteur fixe 280px, overflow hidden

- **CTAs** :
  - Primaire : "Commencer l'aventure →" — bg cyan, text dark, hover scale+glow
  - Secondaire : "Voir le curriculum ↓" — border cyan/30, text cyan, hover bg cyan/10
  - Les deux avec `whileHover` et `whileTap` Framer Motion

- **Stats bar** sous les CTAs :
  ```
  500+ Apprenants  ·  5 Mondes  ·  40+ Leçons  ·  100% Gratuit
  ```
  Chaque stat avec un compteur animé (0 → valeur finale en 1.5s au mount)

---

### Section "Ton Parcours" — Les 5 Mondes

Layout : grille 2-3 colonnes, cards interactives

Chaque card de monde :
- Fond `#12121a` avec border `#1e1e2e`
- Hover : `translateY(-4px)` + border colorée (couleur du monde) + glow subtil
- En-tête : emoji grand (text-4xl) + gradient background (couleur du monde à 8% opacity)
- Titre + subtitle
- Progress bar (si progression existante) ou "0 / N leçons"
- XP total du monde
- Badge "VERROUILLÉ 🔒" pour les mondes non disponibles (mondes 2-5 en MVP)
- Badge "NOUVEAU 🔴" sur le monde Advanced

Animation : les cards apparaissent en stagger (0.1s de délai entre chaque) au scroll (Intersection Observer ou Framer Motion `whileInView`)

---

### Section Features — Pourquoi KubeDex ?

3 colonnes avec icônes Lucide + titre + description :

```
🎮 Apprentissage Gamifié
XP, badges, niveaux et streaks
pour rester motivé chaque jour.

⌨️ Éditeur Intégré  
Écris du YAML et des commandes
directement dans le navigateur.

🗺️ Progression Visuelle
Une world map style RPG pour
visualiser ton parcours.
```

Style : cards avec border subtile, icône dans un carré coloré arrondi, hover effect.
Animation `whileInView` stagger.

---

### Section "Comment ça marche ?" — Timeline

Timeline horizontale (desktop) / verticale (mobile) en 4 étapes :

```
[1] Choisis un monde  →  [2] Lis la théorie  →  [3] Pratique  →  [4] Gagne des récompenses
    🗺️                      📖                      ⌨️                  🏆
```

Ligne de connexion animée qui se "remplit" de gauche à droite au scroll.

---

### Section Social Proof — Témoignages (mockés)

3 cards de témoignages :
```
"J'ai enfin compris Docker après des mois d'échec sur d'autres plateformes."
— Marie L., DevOps Engineer

"Le système de badges m'a gardé motivé pendant tout le parcours K8s."  
— Thomas B., Développeur Full-Stack

"La world map rend l'apprentissage addictif. Je revenais tous les jours."
— Ahmed K., Étudiant en informatique
```

Style : guillemets décoratifs en grand (text-6xl, opacity 0.1), fond card légèrement différent.

---

### Footer

```
⎈ KubeDex                    Apprendre        Communauté      
Maîtrise le Cloud Native      Dashboard        Discord (bientôt)
de façon ludique.             Curriculum       GitHub
                              Leaderboard      Changelog

© 2025 KubeDex · Fait avec ❤️ pour la communauté DevOps francophone
```

---

## 2. NAVBAR — Amélioration (`src/components/layout/Navbar.tsx`)

### Modifications :

**Logo avec glow :**
```tsx
// Le ⎈ doit avoir un glow cyan au hover
<span className="text-2xl transition-all group-hover:drop-shadow-[0_0_8px_#00d4ff]">⎈</span>
```

**Mini XP bar intégrée :**
- Entre les liens nav et le profil utilisateur
- Affiche : niveau actuel + mini barre de progression + XP
- Largeur 140px max
- Tooltip au hover : "X XP · Prochain niveau dans Y XP"

```
[Apprenti ████░░░░ 100/500 XP]
```

**Lien Advanced avec badge :**
```tsx
{ to: '/advanced', icon: Flame, label: 'Advanced' }
// Avec un badge rouge "NEW" en superposition
```

**Streak avec animation pulse :**
```tsx
// Le 🔥 doit pulser si streak > 0
<motion.span animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
  🔥
</motion.span>
```

**Scroll effect :**
- Par défaut : `bg-surface/90 backdrop-blur`
- Au scroll > 20px : ajouter `border-b border-border shadow-lg`
- Transition smooth via `useScroll` ou `addEventListener('scroll')`

---

## 3. WORLD MAP — Fond et animations (`src/components/world/WorldMap.tsx`)

### Améliorations visuelles :

**Fond enrichi :**
```tsx
// Background avec grid + glow + noise
background: `
  radial-gradient(ellipse at 15% 85%, ${world.color}10 0%, transparent 50%),
  radial-gradient(ellipse at 85% 15%, ${world.color}07 0%, transparent 50%),
  repeating-linear-gradient(0deg, transparent, transparent 39px, ${world.color}08 39px, ${world.color}08 40px),
  repeating-linear-gradient(90deg, transparent, transparent 39px, ${world.color}08 39px, ${world.color}08 40px)
`
```

**Chemins SVG animés entre nœuds :**
```tsx
// Remplacer les <line> statiques par des chemins avec animation
<motion.line
  x1={prev.position.x} y1={prev.position.y}
  x2={lesson.position.x} y2={lesson.position.y}
  stroke={isActive ? `${world.color}50` : '#1e1e2e'}
  strokeWidth="0.8"
  strokeDasharray="100"
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
  transition={{ duration: 1.5, delay: index * 0.2, ease: 'easeInOut' }}
/>
```

**Nœuds améliorés :**
- Available : ring pulsant + icône qui bounce légèrement
- Completed : animation checkmark qui se dessine (SVG path animation)
- Boss : effet glow rouge plus intense, légère rotation de l'icône épée au hover
- Locked : effet "brume" avec pseudo-element overlay opacity 60%

**Particules flottantes :**
- 5-8 petits éléments (⎈ 🐳 📦) qui flottent lentement dans le fond de la map
- `position: absolute`, animation `float` aléatoire, opacity très basse (0.05-0.08)

---

## 4. DASHBOARD — Améliorations (`src/pages/Dashboard.tsx`)

### Espacement & typographie :

- Augmenter le padding interne de toutes les cards : `p-4` → `p-6`
- Titres de section (`Badges`, `Progression par monde`) :
  ```tsx
  <h2 className="text-lg font-bold text-primary flex items-center gap-3 mb-5">
    <span>Badges</span>
    <span className="flex-1 h-px bg-gradient-to-r from-cyan/30 to-transparent" />
  </h2>
  ```
  Ligne décorative gradient qui part du titre vers la droite.

### Badges — Empty states & tooltips :

**Tooltip au hover sur chaque badge :**
```tsx
// Au hover sur un badge non obtenu :
<div className="tooltip">
  <div className="font-bold">{badge.name}</div>
  <div className="text-muted text-xs">{badge.description}</div>
  <div className="text-xs mt-1" style={{ color: rarityColor }}>
    {badge.rarity} · Non obtenu
  </div>
</div>
```

**Badge non obtenu :** grayscale + opacity 35% + petit cadenas en overlay

**Si aucun badge obtenu (empty state) :**
```
🏅
Tes badges apparaîtront ici
Termine ta première leçon pour débloquer ton premier badge !
[Commencer →]
```

### Cards de progression des mondes :

- Hover : `translateY(-2px)` + border colorée selon le monde
- Clic sur une card → navigate vers `/world/:id`
- Ajouter le nombre de leçons restantes : "6 / 8 leçons · 2 restantes"
- Mini icônes des leçons complétées (petits cercles verts) vs restantes (gris)

### Bouton "Continuer" :

- Afficher le titre de la prochaine leçon + monde
- Ajouter une estimation de temps : "~10 min"
- Pulse animation sur le bouton si l'utilisateur n'a pas joué depuis > 24h

---

## 5. LESSON PAGE — Améliorations (`src/pages/LessonPage.tsx`)

### Hints — Accordéon amélioré :

```tsx
// 3 hints révélés UN PAR UN (pas tous d'un coup)
// Bouton "💡 Besoin d'un indice ?" → révèle le hint 1
// Bouton réapparaît → révèle le hint 2
// etc.
// Chaque révélation coûte symboliquement "du temps" (pas de pénalité XP)
```

### Feedback d'erreur amélioré :

- Erreur : shake animation sur l'éditeur (`translateX(-4px 4px -4px 4px 0)`)
- Message d'erreur avec icône ❌ et suggestion contextuelle
- Border rouge sur l'éditeur pendant 1.5s puis revient à la normale

### Succès — Séquence complète :

1. Éditeur → border verte + glow success (0.3s)
2. XPPopup apparaît en bas à droite (+X XP) (0.5s)
3. Si badge → BadgeUnlock modal (après 0.8s)
4. Confetti léger (20-30 particules colorées, bibliothèque `canvas-confetti`)
5. Bouton "Leçon suivante →" slide in depuis le bas

### Navigation entre leçons :

- Barre de progression en haut : "Leçon 3 / 8 du Monde 1"
- Dots cliquables pour naviguer (si leçon complétée)
- Breadcrumb : `La Forge des Conteneurs > Ton premier Dockerfile`

---

## 6. TRANSITIONS DE PAGES (`src/App.tsx`)

Ajouter `AnimatePresence` sur les routes pour des transitions fluides :

```tsx
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

// Wrapper pour chaque page :
<motion.div
  variants={pageVariants}
  initial="initial"
  animate="animate"
  exit="exit"
  transition={{ duration: 0.2, ease: 'easeOut' }}
>
  {/* contenu de la page */}
</motion.div>
```

---

## 7. RESPONSIVE MOBILE

### Navbar mobile :
- Menu hamburger sur mobile (`< 768px`)
- Drawer qui slide depuis la gauche
- Fermeture au clic en dehors

### Lesson Page mobile :
- Split-screen → layout vertical (flex-col)
- TheoryPanel en haut, scrollable, hauteur max 50vh
- Éditeur en bas, hauteur min 300px
- Bouton "Voir la théorie / Voir l'éditeur" pour switcher en vue pleine hauteur

### World Map mobile :
- Zoomer sur la zone active (scroll horizontal autorisé)
- Touch-friendly : nœuds au minimum 44x44px (standard Apple HIG)

---

## 8. MICRO-INTERACTIONS GLOBALES

Ajoute ces interactions dans `src/index.css` ou en Framer Motion :

```css
/* Hover lift sur toutes les cards */
.card-hover {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.card-hover:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

/* Focus visible amélioré */
*:focus-visible {
  outline: 2px solid #00d4ff;
  outline-offset: 2px;
  border-radius: 4px;
}

/* Sélection de texte branded */
::selection {
  background: #00d4ff25;
  color: #00d4ff;
}
```

**Boutons — états complets :**
```tsx
// Tous les boutons primaires avec :
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.97 }}
// + transition sur background-color 0.15s
```

---

## 9. CONFETTI au déblocage de badge

Installer et utiliser `canvas-confetti` :
```bash
npm install canvas-confetti
npm install @types/canvas-confetti
```

```tsx
import confetti from 'canvas-confetti'

// Déclencher lors d'un badge épique/légendaire :
confetti({
  particleCount: 80,
  spread: 70,
  origin: { y: 0.6 },
  colors: ['#00d4ff', '#7c3aed', '#22c55e', '#f59e0b'],
})
```

---

## 10. LEADERBOARD — Page complète (`src/pages/Leaderboard.tsx`)

Si pas encore implémentée, crée une page avec :

**Podium Top 3 :**
```
        🥇
    ┌────────┐
    │ Avatar │  ← 1er place, plus grand
    └────────┘
🥈              🥉
┌──────┐    ┌──────┐
│      │    │      │
└──────┘    └──────┘
```

**Tableau des 10 premiers :**
- Colonnes : Rang · Avatar · Username · Niveau · XP · Badges · Streak
- La ligne de l'utilisateur courant surlignée en cyan/10
- Animation : les lignes apparaissent en stagger (0.05s chacune)

Données mockées réalistes :
```typescript
const MOCK_LEADERBOARD = [
  { rank: 1, username: 'k8s_wizard', level: 'Maître du Cluster', xp: 3850, badges: 12, streak: 45 },
  { rank: 2, username: 'docker_ninja', level: 'Architecte', xp: 2340, badges: 9, streak: 22 },
  { rank: 3, username: 'cloud_native', level: 'Architecte', xp: 1980, badges: 7, streak: 15 },
  // ... 7 autres
  { rank: 8, username: 'KubeHero', level: 'Apprenti', xp: 100, badges: 2, streak: 1, isCurrentUser: true },
]
```

---

## Ordre d'implémentation recommandé

1. **Landing page** (impact acquisition maximal)
2. **Navbar** scroll effect + mini XP bar
3. **Transitions de pages** (AnimatePresence)
4. **Dashboard** espacement + tooltips badges + empty states
5. **World Map** fond + animations chemins
6. **Lesson Page** hints accordéon + shake error + confetti
7. **Responsive mobile**
8. **Leaderboard** complet
9. **Micro-interactions** globales CSS

---

## Contraintes

- Ne pas modifier la logique des stores Zustand
- Ne pas modifier le contenu des leçons
- Tout texte en français
- `canvas-confetti` est la seule nouvelle dépendance autorisée
- Tester le rendu sur mobile (375px) et desktop (1280px+)
- Garder les performances : pas d'animations sur des listes longues sans `will-change`
