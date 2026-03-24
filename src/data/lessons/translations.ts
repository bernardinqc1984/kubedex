import type { LessonContent } from './index'

type LessonContentOverride = Partial<
  Pick<LessonContent, 'theory' | 'exerciseInstructions' | 'hints' | 'successMessage'>
>

export const EN_LESSON_OVERRIDES: Record<string, LessonContentOverride> = {
  'world1-l1': {
    theory: `## VM vs container
A VM includes a full OS. A container shares the host kernel, so it is lighter and starts faster.

### Under the hood
- **Namespaces**: process/network isolation
- **cgroups**: CPU/RAM limits

### Analogy
A building = host machine. Each apartment = isolated container in the same building.

\`\`\`text
VM: [App + Libs + OS] x N
Container: [App + Libs] x N on the same kernel
\`\`\``,
    exerciseInstructions: 'Run your first container.',
    hints: ['Use the docker run command', 'The expected image is hello-world', 'Full command: docker run hello-world'],
    successMessage: 'Great job, your first container has started.',
  },
  'world1-l2': {
    theory: `## Image vs container
An image is an immutable blueprint, while a container is the running instance.

### Layers
Each Dockerfile instruction creates a cacheable layer.

### Useful commands
- \`docker images\`
- \`docker ps -a\``,
    exerciseInstructions: 'List local images.',
    hints: ['Use a docker command for images', 'Subcommand: images', 'Try docker images'],
    successMessage: 'Nice, you now understand image vs container.',
  },
  'world1-l3': {
    theory: `## Core Dockerfile instructions
| Instruction | Purpose |
|---|---|
| FROM | base image |
| WORKDIR | working directory |
| COPY | copy files |
| RUN | executes at build time |
| CMD | default runtime command |
| EXPOSE | documents a port |
| ENV | environment variables |

### RUN vs CMD
RUN builds the image. CMD runs when the container starts.`,
    exerciseInstructions: 'Complete this Node.js Dockerfile.',
    hints: ['RUN should install dependencies', 'Expected command is npm install', 'CMD should run node app.js'],
    successMessage: 'Excellent, you built your first Dockerfile.',
  },
  'world1-l4': {
    theory: `## Build and layers
The first build is slower. Next builds reuse unchanged layers from cache.

### Useful flags
- \`--no-cache\`
- \`-f Dockerfile.dev\`
- \`--platform linux/amd64\`

Multi-stage builds help reduce final image size.`,
    exerciseInstructions: 'Build the image with tag v1.0.',
    hints: ['Base command: docker build', 'Add a tag with -t', 'Do not forget the trailing dot'],
    successMessage: 'Well done, docker build is under control.',
  },
  'world1-l5': {
    theory: `## Variables and ports
- \`-e KEY=VALUE\`
- \`--env-file .env\`
- \`-p host:container\`
- \`-P\` maps all exposed ports automatically`,
    exerciseInstructions: 'Run nginx detached with env variable and port mapping.',
    hints: ['Use docker run with -d', 'Expected mapping: -p 8080:80', 'Add -e NGINX_HOST=kubedex.local'],
    successMessage: 'Great, env vars and ports are configured.',
  },
  'world1-l6': {
    theory: `## Docker Compose
Common sections: \`services\`, \`ports\`, \`environment\`, \`depends_on\`, \`volumes\`.

Useful commands: \`up -d\`, \`down\`, \`logs -f\`, \`exec\`, \`ps\`.`,
    exerciseInstructions: 'Write a compose file with web nginx and db postgres.',
    hints: ['Two services: web and db', 'web uses nginx with port 80:80', 'db uses postgres:15 with POSTGRES_DB/USER/PASSWORD'],
    successMessage: 'Awesome, your compose stack is ready.',
  },
  'world1-l7': {
    theory: `## Docker volumes
- Named volumes: managed by Docker
- Bind mounts: host path mapping
- tmpfs: in-memory temporary storage

\`docker volume ls\`, \`docker volume inspect\`, \`docker volume rm\`.`,
    exerciseInstructions: 'Create a named volume postgres-data.',
    hints: ['Use docker volume', 'Action: create', 'Expected name: postgres-data'],
    successMessage: 'Nice, persistence is configured.',
  },
  'world1-boss': {
    theory: `## Boss: full-stack app
Target architecture:
\`\`\`text
[nginx] -> [node app] -> [postgres]
\`\`\`
Use \`depends_on\` and a \`pgdata\` volume for database persistence.`,
    exerciseInstructions: 'Final compose with nginx, local Node build, postgres and pgdata volume.',
    hints: ['app service must include build: .', 'db uses postgres:15 and pgdata volume', 'Add depends_on between web -> app -> db'],
    successMessage: 'Boss cleared! You mastered World 1.',
  },
  'world5-l1': {
    exerciseInstructions: 'Display OpenShift version.',
    hints: ["OpenShift CLI is called 'oc'", "Try 'oc version'", "Or 'oc get clusterversion' for details"],
    successMessage: 'Great, you can now verify OpenShift cluster version.',
  },
  'world5-l2': {
    theory: `## The oc CLI
\`oc\` is a superset of \`kubectl\`: kubectl commands still work.

### Practical commands
\`\`\`bash
oc login https://api.cluster.example.com:6443
oc whoami
oc project
oc new-project my-project
oc expose svc/my-service
oc get route
oc status
\`\`\`
\`oc new-project\` creates the namespace and updates context automatically.`,
    exerciseInstructions: 'List cluster projects.',
    hints: ['Command starts with oc', "Resource to list is 'projects'", "You can run 'oc projects' directly"],
    successMessage: 'Connection and project context are now clear.',
  },
  'world5-l3': {
    exerciseInstructions: 'Complete the ServiceAccount with the right SCC.',
    hints: ['Expected kind is ServiceAccount', 'SCC annotation key is openshift.io/scc', 'Expected value is anyuid'],
    successMessage: 'Excellent, SCC is explicitly configured.',
  },
  'world5-l4': {
    exerciseInstructions: 'Complete an HTTPS edge Route to a Service.',
    hints: ['Resource kind is Route', "TLS mode should be 'edge'", 'Target resource must be a Service'],
    successMessage: 'Perfect, HTTPS Route exposure is configured.',
  },
  'world5-l5': {
    exerciseInstructions: 'Trigger a manual DeploymentConfig rollout.',
    hints: ['Use rollout latest', 'Target is dc/mon-app', 'Full command: oc rollout latest dc/mon-app'],
    successMessage: 'Great, you can manage DeploymentConfig rollouts.',
  },
  'world5-l6': {
    exerciseInstructions: 'Write an OpenShift-compatible PostgreSQL values.yaml.',
    hints: ['Set auth.postgresPassword', 'Set auth.database too', 'For SCC compatibility, set enabled: false'],
    successMessage: 'Nice, Helm chart tuned for OpenShift.',
  },
  'world5-l7': {
    exerciseInstructions: 'Complete a RoleBinding for a ServiceAccount.',
    hints: ['Main resource must be RoleBinding', 'Subject kind should be ServiceAccount', 'roleRef must target a Role'],
    successMessage: 'Excellent, RBAC is correctly configured.',
  },
  'world5-boss': {
    exerciseInstructions: 'Write a full ArgoCD Application for production.',
    hints: ['Expected kind is Application', 'Destination server should be https://kubernetes.default.svc', 'Add syncPolicy.automated with prune and selfHeal'],
    successMessage: 'Boss validated: your OpenShift GitOps pipeline is ready.',
  },
}

