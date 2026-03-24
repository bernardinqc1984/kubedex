export interface BadgeMeta {
  id: string
  name: string
  emoji: string
  description: string
  rarity: 'Commun' | 'Rare' | 'Epique' | 'Legendaire'
  color: string
}

export const badges: BadgeMeta[] = [
  { id: 'first_container', name: 'Premier Conteneur', emoji: '🐳', description: 'Terminer la lecon 1.1', rarity: 'Commun', color: '#00d4ff' },
  { id: 'image_hunter', name: "Chasseur d'Images", emoji: '📦', description: 'Terminer la lecon 1.2', rarity: 'Commun', color: '#00d4ff' },
  { id: 'dockerfile_master', name: 'Architecte Dockerfile', emoji: '📄', description: 'Terminer la lecon 1.3', rarity: 'Rare', color: '#7c3aed' },
  { id: 'compose_wizard', name: 'Sorcier Compose', emoji: '🧙', description: 'Terminer la lecon 1.6', rarity: 'Rare', color: '#7c3aed' },
  { id: 'world1_complete', name: 'Forgeron de Conteneurs', emoji: '🏆', description: 'Finir le monde 1', rarity: 'Epique', color: '#22c55e' },
  { id: 'speed_runner', name: 'Speed Runner', emoji: '⚡', description: 'Terminer une lecon en moins de 2 minutes', rarity: 'Rare', color: '#f59e0b' },
  { id: 'streak_7', name: 'Flamme de 7 jours', emoji: '🔥', description: 'Atteindre 7 jours de streak', rarity: 'Rare', color: '#f59e0b' },
  { id: 'streak_30', name: 'Flamme Infernale', emoji: '🌋', description: 'Atteindre 30 jours de streak', rarity: 'Legendaire', color: '#ef4444' },
  { id: 'openshift_initiate', name: 'Initie OpenShift', emoji: '🔴', description: 'Comprendre les SCC et creer ton premier ServiceAccount OCP', rarity: 'Epique', color: '#ef4444' },
  { id: 'rbac_master', name: 'Maitre du RBAC', emoji: '🔐', description: 'Maitriser les Roles, ClusterRoles et RoleBindings', rarity: 'Epique', color: '#7c3aed' },
  { id: 'gitops_engineer', name: 'Ingenieur GitOps', emoji: '🔄', description: 'Deployer un pipeline ArgoCD complet sur OpenShift', rarity: 'Legendaire', color: '#22c55e' },
  { id: 'master_of_cluster', name: 'Maitre du Cluster', emoji: '👑', description: 'Terminer tous les mondes de KubeDex', rarity: 'Legendaire', color: '#f59e0b' },
]

export const badgeById = Object.fromEntries(badges.map((b) => [b.id, b]))
