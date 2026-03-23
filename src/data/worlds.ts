export type LessonType = 'cli' | 'yaml' | 'theory' | 'boss'

export interface LessonMeta {
  id: string
  worldId: string
  title: string
  subtitle: string
  type: LessonType
  xpReward: number
  badgeOnComplete?: string
  estimatedMinutes: number
  position: { x: number; y: number }
  prerequisite?: string
}

export interface WorldMeta {
  id: string
  title: string
  subtitle: string
  emoji: string
  color: string
  lessons: LessonMeta[]
  badgeOnComplete: string
}

const world1Lessons: LessonMeta[] = [
  { id: 'world1-l1', worldId: 'world1', title: "Qu'est-ce qu'un conteneur ?", subtitle: 'VM vs conteneur', type: 'cli', xpReward: 50, badgeOnComplete: 'first_container', estimatedMinutes: 6, position: { x: 12, y: 55 } },
  { id: 'world1-l2', worldId: 'world1', title: 'Images vs Conteneurs', subtitle: 'Classe vs instance', type: 'cli', xpReward: 50, badgeOnComplete: 'image_hunter', estimatedMinutes: 6, position: { x: 24, y: 35 }, prerequisite: 'world1-l1' },
  { id: 'world1-l3', worldId: 'world1', title: 'Ton premier Dockerfile', subtitle: 'FROM, RUN, CMD', type: 'yaml', xpReward: 75, badgeOnComplete: 'dockerfile_master', estimatedMinutes: 10, position: { x: 36, y: 48 }, prerequisite: 'world1-l2' },
  { id: 'world1-l4', worldId: 'world1', title: 'docker build & layers', subtitle: 'Cache et optimisation', type: 'cli', xpReward: 75, estimatedMinutes: 8, position: { x: 50, y: 30 }, prerequisite: 'world1-l3' },
  { id: 'world1-l5', worldId: 'world1', title: 'Variables & Ports', subtitle: 'Flags run essentiels', type: 'cli', xpReward: 50, estimatedMinutes: 7, position: { x: 62, y: 50 }, prerequisite: 'world1-l4' },
  { id: 'world1-l6', worldId: 'world1', title: 'Docker Compose', subtitle: 'Orchestration locale', type: 'yaml', xpReward: 100, badgeOnComplete: 'compose_wizard', estimatedMinutes: 10, position: { x: 75, y: 38 }, prerequisite: 'world1-l5' },
  { id: 'world1-l7', worldId: 'world1', title: 'Volumes & Persistance', subtitle: 'Donnees durables', type: 'cli', xpReward: 75, estimatedMinutes: 8, position: { x: 86, y: 56 }, prerequisite: 'world1-l6' },
  { id: 'world1-boss', worldId: 'world1', title: 'Boss: App Full-Stack', subtitle: 'Compose complet 3 services', type: 'boss', xpReward: 200, badgeOnComplete: 'world1_complete', estimatedMinutes: 15, position: { x: 93, y: 24 }, prerequisite: 'world1-l7' },
]

const w = (id: string, title: string, subtitle: string, emoji: string, color: string, lessonCount: number, badgeOnComplete: string): WorldMeta => ({
  id,
  title,
  subtitle,
  emoji,
  color,
  badgeOnComplete,
  lessons: Array.from({ length: lessonCount }, (_, i) => ({
    id: `${id}-l${i + 1}`,
    worldId: id,
    title: `Lecon ${i + 1}`,
    subtitle: 'Bientot disponible',
    type: 'theory',
    xpReward: 75,
    estimatedMinutes: 8,
    position: { x: 12 + i * 12, y: i % 2 === 0 ? 35 : 58 },
    prerequisite: i === 0 ? undefined : `${id}-l${i}`,
  })),
})

export const worlds: WorldMeta[] = [
  { id: 'world1', title: 'La Forge des Conteneurs', subtitle: 'Le monde Docker', emoji: '🐳', color: '#00d4ff', lessons: world1Lessons, badgeOnComplete: 'world1_complete' },
  w('world2', 'Le Cluster des Origines', 'Bases Kubernetes', '⎈', '#7c3aed', 7, 'world2_complete'),
  w('world3', 'Les Gardiens du Service', 'Networking et Ingress', '🌐', '#22c55e', 5, 'world3_complete'),
  w('world4', "Le Coffre de l'Alchimiste", 'Storage et StatefulSets', '💾', '#f59e0b', 5, 'world4_complete'),
  w('world5', "L'Arene des Maitres", 'Helm, RBAC, GitOps', '🔴', '#ef4444', 6, 'master_of_cluster'),
]

export const allLessons = worlds.flatMap((world) => world.lessons)
export const lessonById = Object.fromEntries(allLessons.map((lesson) => [lesson.id, lesson]))
