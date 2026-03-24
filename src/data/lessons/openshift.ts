import { fail, includesAll, ok } from '../../lib/validators'

export interface LessonContent {
  id: string
  theory: string
  exerciseInstructions: string
  exerciseType: 'cli' | 'yaml' | 'dockerfile'
  initialCode: string
  validate: (code: string) => { ok: boolean; message: string }
  simulatedOutput: string
  hints: string[]
  successMessage: string
}

export const OPENSHIFT_LESSONS: Record<string, LessonContent> = {
  'world5-l1': {
    id: 'world5-l1',
    theory: `## OpenShift vs Kubernetes\nOpenShift est une distribution Kubernetes enterprise de Red Hat.\n\n### Comparatif rapide\n- SCC (OpenShift) vs PodSecurityPolicy/PodSecurity (K8s)\n- Routes (OpenShift) vs Ingress (K8s)\n- ImageStreams vs images Docker directes\n- DeploymentConfig vs Deployment\n- \`oc\` vs \`kubectl\`\n\nOpenShift ajoute aussi: console web, OAuth, registry interne et pipelines CI/CD (Tekton).\n\n\`\`\`text\n┌─────────────────────────────────────────┐\n│              OpenShift                  │\n│  Console Web  │  OAuth  │  Registry     │\n│  Routes       │  SCC    │  ImageStreams  │\n├─────────────────────────────────────────┤\n│              Kubernetes                 │\n│  Pods  │  Services  │  Deployments      │\n│  RBAC  │  Namespaces │  ConfigMaps      │\n├─────────────────────────────────────────┤\n│         Container Runtime (CRI-O)       │\n└─────────────────────────────────────────┘\n\`\`\`\nVersions courantes: OCP, OKD, CRC.`,
    exerciseInstructions: "Affiche la version d'OpenShift.",
    exerciseType: 'cli',
    initialCode: '$ ',
    validate: (code) =>
      /oc\s+version/i.test(code) || /oc\s+get\s+clusterversion/i.test(code)
        ? ok('Commande valide.')
        : fail("Utilise 'oc version' ou 'oc get clusterversion'."),
    simulatedOutput: `Client Version: 4.14.6\nServer Version: 4.14.6\nKubernetes Version: v1.27.7+`,
    hints: ["La CLI OpenShift s'appelle 'oc'", "Essaie 'oc version'", "Ou 'oc get clusterversion' pour plus de details"],
    successMessage: "Parfait, tu sais verifier la version d'un cluster OpenShift.",
  },
  'world5-l2': {
    id: 'world5-l2',
    theory: `## La CLI oc\n\`oc\` est un superset de \`kubectl\`: les commandes kubectl fonctionnent aussi.\n\n### Commandes pratiques\n\`\`\`bash\noc login https://api.cluster.example.com:6443\noc whoami\noc project\noc new-project mon-projet\noc expose svc/mon-service\noc get route\noc status\n\`\`\`\n\`oc new-project\` cree le namespace et met le contexte a jour automatiquement.`,
    exerciseInstructions: 'Liste les projets du cluster.',
    exerciseType: 'cli',
    initialCode: '$ ',
    validate: (code) =>
      /oc\s+get\s+projects/i.test(code) || /^.*oc\s+projects.*$/im.test(code)
        ? ok('Bien joue.')
        : fail("Utilise 'oc get projects' ou 'oc projects'."),
    simulatedOutput: `NAME                DISPLAY NAME\ndefault\nkube-system\nopenshift\nopenshift-gitops\nmon-projet`,
    hints: ['La commande commence par oc', "La ressource a lister est 'projects'", "Tu peux faire 'oc projects' directement"],
    successMessage: 'Connexion et contexte projet maitrises.',
  },
  'world5-l3': {
    id: 'world5-l3',
    theory: `## Security Context Constraints (SCC)\nOpenShift bloque par defaut les conteneurs root.\nLes SCC definissent UID, capabilities, volumes et acces reseau.\n\n### Niveaux SCC\n- restricted / restricted-v2\n- nonroot\n- anyuid\n- privileged\n\n\`\`\`bash\noc get scc\noc adm policy add-scc-to-user anyuid -z mon-serviceaccount -n mon-projet\n\`\`\`\nEn production, evite \`anyuid\` et \`privileged\` sans justification.`,
    exerciseInstructions: 'Complete le ServiceAccount avec la bonne SCC.',
    exerciseType: 'yaml',
    initialCode: `apiVersion: v1\nkind: ___\nmetadata:\n  name: mon-app-sa\n  namespace: mon-projet\n  annotations:\n    openshift.io/scc: ___`,
    validate: (code) =>
      includesAll(code, ['kind: ServiceAccount', 'openshift.io/scc: anyuid'])
        ? ok('Manifest valide.')
        : fail('Il faut kind: ServiceAccount et openshift.io/scc: anyuid.'),
    simulatedOutput: `serviceaccount/mon-app-sa created`,
    hints: ['Le kind attendu est ServiceAccount', "L'annotation SCC est openshift.io/scc", "La valeur demandee est anyuid"],
    successMessage: 'Excellent, tu as configure une SCC de maniere explicite.',
  },
  'world5-l4': {
    id: 'world5-l4',
    theory: `## Routes OpenShift\nLa Route est l'equivalent OpenShift de l'Ingress Kubernetes, souvent plus simple.\n\n### TLS\n- edge\n- passthrough\n- reencrypt\n\n\`\`\`yaml\napiVersion: route.openshift.io/v1\nkind: Route\nspec:\n  tls:\n    termination: edge\n\`\`\`\n\`oc expose svc/mon-service\` cree une route rapidement.`,
    exerciseInstructions: 'Complete une Route HTTPS edge vers un Service.',
    exerciseType: 'yaml',
    initialCode: `apiVersion: route.openshift.io/v1\nkind: Route\nmetadata:\n  name: mon-app-https\nspec:\n  host: mon-app.apps.cluster.example.com\n  tls:\n    termination: edge\n  to:\n    kind: Service\n    name: mon-service\n  port:\n    targetPort: 8080`,
    validate: (code) =>
      includesAll(code, ['kind: Route', 'termination: edge', 'kind: Service'])
        ? ok('Route valide.')
        : fail('Verifie kind: Route, tls.termination: edge et to.kind: Service.'),
    simulatedOutput: `route.route.openshift.io/mon-app-https created`,
    hints: ['La ressource est kind: Route', "Le TLS demande est 'edge'", "La cible doit etre un Service"],
    successMessage: 'Parfait, exposition HTTPS via Route configuree.',
  },
  'world5-l5': {
    id: 'world5-l5',
    theory: `## DeploymentConfig & ImageStreams\nDeploymentConfig est l'objet historique OpenShift avec des triggers.\nImageStream sert de pointeur d'image et peut declencher des redeploiements.\n\n\`\`\`bash\noc rollout latest dc/mon-app\n\`\`\`\nEn OCP 4.x, Deployment standard + GitOps est souvent recommande.`,
    exerciseInstructions: "Declenche un redeploiement manuel d'un DeploymentConfig.",
    exerciseType: 'cli',
    initialCode: '$ ',
    validate: (code) =>
      /oc\s+rollout\s+latest\s+dc\/mon-app/i.test(code)
        ? ok('Commande valide.')
        : fail("Commande attendue: oc rollout latest dc/mon-app"),
    simulatedOutput: `deploymentconfig.apps.openshift.io/mon-app rolled out`,
    hints: ['Sous-commande: rollout latest', "La cible est dc/mon-app", "Commande complete: oc rollout latest dc/mon-app"],
    successMessage: 'Top, tu sais piloter un DeploymentConfig.',
  },
  'world5-l6': {
    id: 'world5-l6',
    theory: `## Helm sur OpenShift\nHelm fonctionne comme sur Kubernetes vanilla.\nSur OpenShift, certains charts demandent des ajustements SCC.\n\n\`\`\`bash\nhelm install mon-postgres bitnami/postgresql \\\n  --set primary.podSecurityContext.enabled=false\n\`\`\`\nTu peux aussi surcharger avec \`values.yaml\`.`,
    exerciseInstructions: 'Ecris un values.yaml compatible OpenShift pour PostgreSQL.',
    exerciseType: 'yaml',
    initialCode: `auth:\n  postgresPassword: ___\n  database: ___\nprimary:\n  podSecurityContext:\n    enabled: ___`,
    validate: (code) =>
      includesAll(code, ['postgresPassword:', 'database:', 'enabled: false'])
        ? ok('values.yaml valide.')
        : fail('Il faut postgresPassword, database, et enabled: false.'),
    simulatedOutput: `Release "mon-postgres" has been upgraded. Happy Helming!`,
    hints: ['Renseigne auth.postgresPassword', 'Renseigne aussi auth.database', 'Pour SCC, mets enabled: false'],
    successMessage: 'Bien joue, chart Helm adapte a OpenShift.',
  },
  'world5-l7': {
    id: 'world5-l7',
    theory: `## RBAC & ServiceAccounts\nOpenShift reprend RBAC Kubernetes avec des roles standards: view, edit, admin, cluster-admin.\n\n\`\`\`yaml\nkind: RoleBinding\nsubjects:\n- kind: ServiceAccount\nroleRef:\n  kind: Role\n\`\`\`\nToujours verifier avec \`oc auth can-i\`.`,
    exerciseInstructions: 'Complete un RoleBinding pour un ServiceAccount.',
    exerciseType: 'yaml',
    initialCode: `apiVersion: rbac.authorization.k8s.io/v1\nkind: RoleBinding\nmetadata:\n  name: pod-reader-binding\n  namespace: mon-projet\nsubjects:\n- kind: ServiceAccount\n  name: mon-app-sa\n  namespace: mon-projet\nroleRef:\n  kind: Role\n  name: pod-reader\n  apiGroup: rbac.authorization.k8s.io`,
    validate: (code) =>
      includesAll(code, ['kind: RoleBinding', 'kind: ServiceAccount', 'roleRef:', 'kind: Role'])
        ? ok('RoleBinding valide.')
        : fail('Verifie kind: RoleBinding, subjects ServiceAccount et roleRef.kind: Role.'),
    simulatedOutput: `rolebinding.rbac.authorization.k8s.io/pod-reader-binding created`,
    hints: ['La ressource principale est RoleBinding', 'Le subject doit etre ServiceAccount', 'roleRef doit cibler un Role'],
    successMessage: 'Excellent, RBAC applique proprement.',
  },
  'world5-boss': {
    id: 'world5-boss',
    theory: `## BOSS - Pipeline GitOps complet\nArgoCD sur OpenShift surveille Git (source of truth) et applique les manifests vers le cluster.\nRollback = git revert + sync.\n\n\`\`\`text\nDeveloper -> GitHub -> ArgoCD -> OpenShift\n\`\`\`\nLa destination cluster interne est souvent \`https://kubernetes.default.svc\`.`,
    exerciseInstructions: 'Ecris une Application ArgoCD complete pour la production.',
    exerciseType: 'yaml',
    initialCode: `apiVersion: argoproj.io/v1alpha1\nkind: Application\nmetadata:\n  name: kubedex-prod\n  namespace: openshift-gitops\nspec:\n  project: default\n  source:\n    repoURL: ___\n    targetRevision: main\n    path: ___\n  destination:\n    server: https://kubernetes.default.svc\n    namespace: ___\n  syncPolicy:\n    automated:\n      prune: true\n      selfHeal: true`,
    validate: (code) =>
      includesAll(code, ['kind: Application', 'repoURL:', 'targetRevision:', 'https://kubernetes.default.svc', 'syncPolicy:', 'automated:'])
        ? ok('Application ArgoCD valide.')
        : fail('Il faut repoURL, targetRevision, destination.server et syncPolicy.automated.'),
    simulatedOutput: `application.argoproj.io/kubedex-prod created\nSync Status: Synced\nHealth Status: Healthy`,
    hints: ['Le kind attendu est Application', 'Destination server doit etre https://kubernetes.default.svc', 'Ajoute syncPolicy.automated avec prune et selfHeal'],
    successMessage: 'Boss valide: ton pipeline GitOps OpenShift est pret.',
  },
}
