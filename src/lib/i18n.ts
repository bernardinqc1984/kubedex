import { useLanguageStore } from '../store/languageStore'
import type { Level } from '../store/userStore'

const dict = {
  fr: {
    navDashboard: 'Dashboard',
    navLeaderboard: 'Classement',
    navProfile: 'Profil',
    days: 'jours',
    badgeUnlocked: 'Badge debloque',
    continue: 'Continuer',
    startAdventure: "Commencer l'aventure",
    seeCurriculum: 'Voir le curriculum',
    availableSoon: 'Bientot disponible',
    lessons: 'lecons',
    integratedEditor: 'Editeur integre',
    worldProgress: 'Progression par monde',
    lastBadge: 'Dernier badge',
    worldLocked: 'Monde verrouille - bientot disponible.',
    lessonNotFound: 'Lecon introuvable.',
    showHint: 'Afficher un indice',
    validate: 'Valider',
    previous: 'Precedent',
    nextLesson: 'Lecon suivante',
    rank: 'Rang',
    user: 'Utilisateur',
    level: 'Niveau',
    badges: 'Badges',
    completedLessons: 'Lecons terminees',
    completedWorlds: 'Mondes completes',
    globalProgress: 'Progression globale',
    allBadges: 'Tous les badges',
    masteryTitle: 'Maitrise Docker & Kubernetes',
    masterySubtitle: 'Apprends les technologies cloud-native de facon progressive et ludique.',
    featureGamification: 'XP, badges, niveaux',
    featureEditor: 'CLI / YAML dans le navigateur',
    featureProgress: 'Carte RPG interactive',
    login: 'Connexion',
    logout: 'Deconnexion',
    profileTitle: 'Profil',
    authSubtitle: 'Le premier test est public. Connecte-toi pour acceder aux autres tests.',
    register: 'Inscription',
    username: 'Nom utilisateur',
    email: 'Email',
    password: 'Mot de passe',
    signIn: 'Se connecter',
    createAccount: 'Creer un compte',
    authRegisterSuccess: 'Compte cree avec succes.',
    authLoginSuccess: 'Connexion reussie.',
    authInvalidCredentials: 'Email ou mot de passe invalide.',
    authEmailUsed: 'Cet email est deja utilise.',
    advancedBadge: '🔴 MODE ADVANCED',
    advancedTitle: 'OpenShift & Cloud Native',
    advancedSubtitle: 'Pour les ingenieurs qui veulent aller plus loin.',
    advancedPrereqTitle: 'Prerequis recommandes',
    advancedWarning: 'Recommande: terminer les mondes precedents avant de continuer.',
    advancedTrackTitle: 'Parcours OpenShift (Monde 5)',
    advancedStart: "Commencer l'Arene des Maitres",
    advancedReason1Title: 'Enterprise Ready',
    advancedReason1Text: "Plateforme supportee en production, operateurs et outillage standardises.",
    advancedReason2Title: 'Securite renforcee (SCC)',
    advancedReason2Text: 'Controle fin des privileges runtime avec des politiques OpenShift natives.',
    advancedReason3Title: 'Ecosysteme Red Hat',
    advancedReason3Text: "Integration naturelle avec GitOps, CI/CD et outils cloud-native d'entreprise.",
    lockedTestTitle: 'Test verrouille',
    lockedTestBody: 'Le premier test est accessible sans compte. Connecte-toi pour debloquer les autres.',
    goFirstTest: 'Aller au premier test',
    signInCta: 'Se connecter',
    lessonOfWorld: 'Lecon {current} / {total} du monde',
    hintNeedHelp: "💡 Besoin d'un indice ?",
    world5UnlockMsg: 'Monde 5 verrouille: termine le monde 4 pour debloquer OpenShift.',
  },
  en: {
    navDashboard: 'Dashboard',
    navLeaderboard: 'Leaderboard',
    navProfile: 'Profile',
    days: 'days',
    badgeUnlocked: 'Badge unlocked',
    continue: 'Continue',
    startAdventure: 'Start adventure',
    seeCurriculum: 'View curriculum',
    availableSoon: 'Coming soon',
    lessons: 'lessons',
    integratedEditor: 'Integrated editor',
    worldProgress: 'World progress',
    lastBadge: 'Latest badge',
    worldLocked: 'World locked - coming soon.',
    lessonNotFound: 'Lesson not found.',
    showHint: 'Show a hint',
    validate: 'Validate',
    previous: 'Previous',
    nextLesson: 'Next lesson',
    rank: 'Rank',
    user: 'User',
    level: 'Level',
    badges: 'Badges',
    completedLessons: 'Completed lessons',
    completedWorlds: 'Completed worlds',
    globalProgress: 'Global progress',
    allBadges: 'All badges',
    masteryTitle: 'Master Docker & Kubernetes',
    masterySubtitle: 'Learn cloud-native technologies progressively and playfully.',
    featureGamification: 'XP, badges, levels',
    featureEditor: 'CLI / YAML in your browser',
    featureProgress: 'RPG-style visual progression',
    login: 'Login',
    logout: 'Logout',
    profileTitle: 'Profile',
    authSubtitle: 'The first test is public. Sign in to unlock the others.',
    register: 'Register',
    username: 'Username',
    email: 'Email',
    password: 'Password',
    signIn: 'Sign in',
    createAccount: 'Create account',
    authRegisterSuccess: 'Account created successfully.',
    authLoginSuccess: 'Successfully signed in.',
    authInvalidCredentials: 'Invalid email or password.',
    authEmailUsed: 'This email is already used.',
    advancedBadge: '🔴 ADVANCED MODE',
    advancedTitle: 'OpenShift & Cloud Native',
    advancedSubtitle: 'For engineers who want to go further.',
    advancedPrereqTitle: 'Recommended prerequisites',
    advancedWarning: 'Recommended: complete previous worlds before continuing.',
    advancedTrackTitle: 'OpenShift track (World 5)',
    advancedStart: "Start the Master's Arena",
    advancedReason1Title: 'Enterprise Ready',
    advancedReason1Text: 'Production-ready platform with standardized operators and tooling.',
    advancedReason2Title: 'Enhanced security (SCC)',
    advancedReason2Text: 'Fine-grained runtime privilege control with native OpenShift policies.',
    advancedReason3Title: 'Red Hat ecosystem',
    advancedReason3Text: 'Natural integration with GitOps, CI/CD, and enterprise cloud-native tools.',
    lockedTestTitle: 'Locked test',
    lockedTestBody: 'The first test is available without an account. Sign in to unlock the others.',
    goFirstTest: 'Go to first test',
    signInCta: 'Sign in',
    lessonOfWorld: 'Lesson {current} / {total} of world',
    hintNeedHelp: '💡 Need a hint?',
    world5UnlockMsg: 'World 5 is locked: complete world 4 to unlock OpenShift.',
  },
} as const

export const useI18n = () => {
  const language = useLanguageStore((s) => s.language)
  const t = <K extends keyof (typeof dict)['fr']>(key: K) => dict[language][key]
  return { language, t }
}

export const levelLabel = (level: Level, language: 'fr' | 'en') => {
  if (language === 'fr') return level
  const map: Record<Level, string> = {
    Apprenti: 'Apprentice',
    Ingenieur: 'Engineer',
    Architecte: 'Architect',
    'Maitre du Cluster': 'Cluster Master',
  }
  return map[level]
}

export const worldTitleLabel = (worldId: string, fallback: string, language: 'fr' | 'en') => {
  if (language === 'fr') return fallback
  const map: Record<string, string> = {
    world1: 'The Container Forge',
    world2: 'The Origins Cluster',
    world3: 'The Service Guardians',
    world4: "The Alchemist's Vault",
    world5: "The Master's Arena",
  }
  return map[worldId] ?? fallback
}

export const worldSubtitleLabel = (worldId: string, fallback: string, language: 'fr' | 'en') => {
  if (language === 'fr') return fallback
  const map: Record<string, string> = {
    world1: 'The Docker world',
    world2: 'Kubernetes fundamentals',
    world3: 'Networking and Ingress',
    world4: 'Storage and StatefulSets',
    world5: 'OpenShift & Advanced Cloud Native',
  }
  return map[worldId] ?? fallback
}

export const badgeNameLabel = (badgeId: string, fallback: string, language: 'fr' | 'en') => {
  if (language === 'fr') return fallback
  const map: Record<string, string> = {
    first_container: 'First Container',
    image_hunter: 'Image Hunter',
    dockerfile_master: 'Dockerfile Architect',
    compose_wizard: 'Compose Wizard',
    world1_complete: 'Container Forgemaster',
    speed_runner: 'Speed Runner',
    streak_7: '7-Day Flame',
    streak_30: 'Infernal Flame',
    openshift_initiate: 'OpenShift Initiate',
    rbac_master: 'RBAC Master',
    gitops_engineer: 'GitOps Engineer',
    master_of_cluster: 'Cluster Master',
  }
  return map[badgeId] ?? fallback
}

export const lessonTitleLabel = (lessonId: string, fallback: string, language: 'fr' | 'en') => {
  if (language === 'fr') return fallback
  const map: Record<string, string> = {
    'world1-l1': 'What is a container?',
    'world1-l2': 'Images vs Containers',
    'world1-l3': 'Your first Dockerfile',
    'world1-l4': 'docker build & layers',
    'world1-l5': 'Variables & Ports',
    'world1-l6': 'Docker Compose',
    'world1-l7': 'Volumes & Persistence',
    'world1-boss': 'Boss: Full-Stack App',
    'world5-l1': 'OpenShift vs Kubernetes',
    'world5-l2': 'The oc CLI',
    'world5-l3': 'Security Context Constraints',
    'world5-l4': 'Routes & Ingress OCP',
    'world5-l5': 'DeploymentConfig & ImageStreams',
    'world5-l6': 'Helm on OpenShift',
    'world5-l7': 'RBAC & ServiceAccounts',
    'world5-boss': 'BOSS — Full GitOps Pipeline',
  }
  return map[lessonId] ?? fallback
}
