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

const lessons: LessonContent[] = [
  {
    id: 'world1-l1',
    theory: `## VM vs conteneur\nUne VM embarque un OS complet. Un conteneur partage le kernel, il est plus leger et plus rapide.\n\n### Sous le capot\n- **Namespaces**: isolation reseau/process\n- **cgroups**: limites CPU/RAM\n\n### Analogie\nUn immeuble = machine hote. Chaque appartement = conteneur isole mais dans le meme batiment.\n\n\`\`\`text\nVM: [App + Libs + OS] x N\nContainer: [App + Libs] x N sur le meme kernel\n\`\`\``,
    exerciseInstructions: 'Lance ton premier conteneur.',
    exerciseType: 'cli',
    initialCode: 'docker run hello-world',
    validate: (code) => (/docker\s+run\s+hello-world/i.test(code) ? ok('Parfait.') : fail('La commande doit etre: docker run hello-world')),
    simulatedOutput: `Unable to find image 'hello-world:latest' locally\nlatest: Pulling from library/hello-world\nDigest: sha256:...\nStatus: Downloaded newer image for hello-world:latest\n\nHello from Docker!\nThis message shows that your installation appears to be working correctly.`,
    hints: ['Utilise la commande docker run', "L'image attendue est hello-world", "Commande complete: docker run hello-world"],
    successMessage: 'Bravo, ton premier conteneur a ete lance.',
  },
  {
    id: 'world1-l2',
    theory: `## Image vs conteneur\nUne image est un blueprint immutable, le conteneur est son instance en execution.\n\n### Layers\nChaque instruction Dockerfile cree un layer cacheable.\n\n### Commandes utiles\n- \`docker images\`\n- \`docker ps -a\``,
    exerciseInstructions: 'Liste les images disponibles localement.',
    exerciseType: 'cli',
    initialCode: 'docker images',
    validate: (code) => (/docker\s+(images|image\s+ls)/i.test(code) ? ok('Exact.') : fail('Utilise docker images ou docker image ls.')),
    simulatedOutput: `REPOSITORY    TAG       IMAGE ID       CREATED         SIZE\nhello-world   latest    feb5d9fea6a5   2 months ago    13.3kB\nnginx         latest    5ef79149e0ec   3 weeks ago     188MB`,
    hints: ['Commande docker pour les images', 'Sous commande: images', 'Essayez docker images'],
    successMessage: 'Top, tu sais distinguer image et conteneur.',
  },
  {
    id: 'world1-l3',
    theory: `## Dockerfile essentiel\n| Instruction | Role |\n|---|---|\n| FROM | image de base |\n| WORKDIR | dossier de travail |\n| COPY | copier fichiers |\n| RUN | execute a la build |\n| CMD | commande au runtime |\n| EXPOSE | port documente |\n| ENV | variable env |\n\n### RUN vs CMD\nRUN construit l'image. CMD demarre le conteneur.`,
    exerciseInstructions: 'Complete ce Dockerfile Node.js.',
    exerciseType: 'dockerfile',
    initialCode: `FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN ___\nCOPY . .\nEXPOSE 3000\nCMD ["node", "___"]`,
    validate: (code) =>
      includesAll(code, ['from node', 'run npm install', 'cmd ["node"']) ? ok('Dockerfile valide.') : fail('Verifie FROM node, RUN npm install et CMD node.'),
    simulatedOutput: `#1 [internal] load build definition from Dockerfile\n#5 RUN npm install\n#8 exporting to image\nSuccessfully tagged kubedex-node:latest`,
    hints: ['RUN doit installer les dependances', 'npm install est attendu', 'Le CMD execute node app.js'],
    successMessage: 'Excellent, tu viens de creer ton premier Dockerfile.',
  },
  {
    id: 'world1-l4',
    theory: `## Build et cache\nLe 1er build est plus long. Les suivants reutilisent les layers inchanges.\n\n### Flags\n- \`--no-cache\`\n- \`-f Dockerfile.dev\`\n- \`--platform linux/amd64\`\n\nMulti-stage build: reduit la taille finale.`,
    exerciseInstructions: 'Build l image avec tag v1.0.',
    exerciseType: 'cli',
    initialCode: 'docker build -t kubedex-app:v1.0 .',
    validate: (code) =>
      (/docker\s+build/i.test(code) && /-t\s+\S+:\S+/.test(code) && /\.\s*$/.test(code.trim())) ? ok('Build correct.') : fail('Format attendu: docker build -t nom:tag .'),
    simulatedOutput: `Sending build context to Docker daemon\nStep 1/8 : FROM node:20-alpine\nSuccessfully built 1c23ab4f\nSuccessfully tagged kubedex-app:v1.0`,
    hints: ['Commande de base: docker build', 'Ajoute un tag avec -t', "N'oublie pas le point final"],
    successMessage: 'Bien joue, tu maitrises docker build.',
  },
  {
    id: 'world1-l5',
    theory: `## Variables et ports\n- \`-e KEY=VALUE\`\n- \`--env-file .env\`\n- \`-p hote:conteneur\`\n- \`-P\` mappe automatiquement tous les ports exposes`,
    exerciseInstructions: 'Lance nginx en detache avec variable et mapping de port.',
    exerciseType: 'cli',
    initialCode: 'docker run -d -p 8080:80 -e NGINX_HOST=kubedex.local nginx',
    validate: (code) =>
      includesAll(code, ['docker run', '-d', '-p 8080:80', '-e NGINX_HOST=kubedex.local', 'nginx']) ? ok('Commande valide.') : fail('Tous les flags demandes doivent etre presents.'),
    simulatedOutput: `1f7af2f3290f39d...\nContainer started in detached mode.`,
    hints: ['Il faut docker run et -d', 'Mapping attendu: -p 8080:80', 'Ajoute -e NGINX_HOST=kubedex.local'],
    successMessage: 'Parfait, variables et ports sont OK.',
  },
  {
    id: 'world1-l6',
    theory: `## Docker Compose\nSections courantes: \`services\`, \`ports\`, \`environment\`, \`depends_on\`, \`volumes\`.\n\nCommandes utiles: \`up -d\`, \`down\`, \`logs -f\`, \`exec\`, \`ps\`.`,
    exerciseInstructions: 'Ecris un compose avec web nginx et db postgres.',
    exerciseType: 'yaml',
    initialCode: `services:\n  web:\n    image: nginx:latest\n    ports:\n      - "80:80"\n  db:\n    image: postgres:15\n    environment:\n      POSTGRES_DB: kubedex\n      POSTGRES_USER: kubedex\n      POSTGRES_PASSWORD: secret`,
    validate: (code) =>
      includesAll(code, ['web:', 'nginx', '80:80', 'db:', 'postgres:15', 'POSTGRES_DB', 'POSTGRES_USER', 'POSTGRES_PASSWORD'])
        ? ok('Compose valide.')
        : fail('Ton YAML doit contenir web nginx + db postgres et variables POSTGRES_*'),
    simulatedOutput: `[+] Running 3/3\n ✔ Network default      Created\n ✔ Container web-1      Started\n ✔ Container db-1       Started`,
    hints: ['Deux services: web et db', 'web utilise nginx et le port 80:80', 'db utilise postgres:15 avec POSTGRES_DB/USER/PASSWORD'],
    successMessage: 'Super, ton stack compose est en place.',
  },
  {
    id: 'world1-l7',
    theory: `## Volumes Docker\n- Named volumes: geres par Docker\n- Bind mounts: dossier hote\n- tmpfs: memoire volatile\n\n\`docker volume ls\`, \`docker volume inspect\`, \`docker volume rm\`.`,
    exerciseInstructions: 'Cree un volume nomme postgres-data.',
    exerciseType: 'cli',
    initialCode: 'docker volume create postgres-data',
    validate: (code) => (/^docker\s+volume\s+create\s+postgres-data\s*$/i.test(code.trim()) ? ok('Volume cree.') : fail('Commande exacte attendue: docker volume create postgres-data')),
    simulatedOutput: `postgres-data`,
    hints: ['Sous commande volume', 'Action: create', 'Nom attendu: postgres-data'],
    successMessage: 'Bien vu, la persistance est prete.',
  },
  {
    id: 'world1-boss',
    theory: `## Boss: app full-stack\nArchitecture cible:\n\`\`\`text\n[nginx] -> [node app] -> [postgres]\n\`\`\`\nUtilise \`depends_on\` et un volume \`pgdata\` pour la base.`,
    exerciseInstructions: 'Compose final avec nginx, app Node build local, postgres et volume pgdata.',
    exerciseType: 'yaml',
    initialCode: `services:\n  web:\n    image: nginx:latest\n    ports:\n      - "80:80"\n    depends_on:\n      - app\n  app:\n    build: .\n    depends_on:\n      - db\n  db:\n    image: postgres:15\n    environment:\n      POSTGRES_DB: kubedex\n      POSTGRES_USER: kubedex\n      POSTGRES_PASSWORD: secret\n    volumes:\n      - pgdata:/var/lib/postgresql/data\nvolumes:\n  pgdata: {}`,
    validate: (code) =>
      includesAll(code, ['build: .', 'postgres:15', 'pgdata', 'depends_on', 'POSTGRES_DB']) ? ok('Boss valide!') : fail('Verifie build: ., postgres:15, pgdata, depends_on et POSTGRES_DB.'),
    simulatedOutput: `[+] Running 4/4\n ✔ Network app_default    Created\n ✔ Container db-1         Healthy\n ✔ Container app-1        Started\n ✔ Container web-1        Started`,
    hints: ['Service app doit avoir build: .', 'Service db en postgres:15 et volume pgdata', 'Ajoute depends_on entre web -> app -> db'],
    successMessage: 'Boss vaincu! Tu maitrises le Monde 1.',
  },
]

export const lessonContentById = Object.fromEntries(lessons.map((lesson) => [lesson.id, lesson]))
