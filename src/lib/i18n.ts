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
