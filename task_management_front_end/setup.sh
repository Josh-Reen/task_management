#!/bin/bash

# Create root directory
mkdir task-management
cd task-management

# Create basic config files
touch README.md
touch index.html
touch package.json
touch vite.config.ts
touch tsconfig.json
touch .env
touch env.d.ts

# Create public directory
mkdir public
touch public/favicon.ico

# Create src directory and its subdirectories
mkdir -p src/{assets,components/{auth,tasks},composables,services,types,styles}

# Create files in src
touch src/App.vue
touch src/main.ts
touch src/assets/logo.svg

# Create component files
touch src/components/auth/LoginForm.vue
touch src/components/auth/RegisterForm.vue
touch src/components/tasks/TaskForm.vue
touch src/components/tasks/TaskList.vue
touch src/components/tasks/TaskCard.vue

# Create composables
touch src/composables/useAuth.ts
touch src/composables/useTasks.ts

# Create service files
touch src/services/api.ts
touch src/services/auth.ts

# Create type definitions
touch src/types/auth.types.ts
touch src/types/task.types.ts

# Create styles
touch src/styles/main.css

echo "TypeScript project structure created successfully!"
tree