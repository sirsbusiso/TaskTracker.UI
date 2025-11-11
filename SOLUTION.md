# TaskTracker.UI

The UI for LexisNexis Task Tracker to track the tasks.

Angular

UI-Project/
│
├── angular.json
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
├── README.md
├── .gitignore
│
├── src/
│ ├── index.html
│ ├── main.ts
│ ├── polyfills.ts
│ ├── styles.scss
│ ├── test.ts
│ ├── favicon.ico
│ │
│ ├── app/
│ │ ├── app-routing.module.ts
│ │ ├── app.component.ts
│ │ ├── app.component.html
│ │ ├── app.component.scss
│ │ ├── app.module.ts
│ │ │
│ │ ├── core/
│ │ │ ├── configs/
│ │ │ ├── interceptors/
│ │ │ ├── services/
│ │ │ └── guards/
│ │ │
│ │ ├── shared/
│ │ │ ├── components/
│ │ │ ├── directives/
│ │ │ ├── pipes/
│ │ │ └── models/
│ │ │
│ │ ├── features-components
| | | |** nav
| | | |** task(task-add, task-update-task-delete)
│ │ │
│ │ │
│ │ └── components/
│ │ └── nav/
│ │ ├── nav.component.ts
│ │ ├── nav.component.html
│ │ └── nav.component.scss
│ │
│ └── assets/
│ ├── images/
│ ├── icons/
│ └── styles/
│
├── e2e/
│ ├── src/
│ ├── protractor.conf.js
│ └── tsconfig.e2e.json
│
└── node_modules/

Notes:

Core module: For services, interceptors, guards, and app-wide configurations.

Shared module: For reusable components, directives, pipes, and models.

Features module: Each feature (Home, About, Contact) in its own folder.

Components: Generic reusable components like nav, footer, etc.

Assets: All images, icons, and global styles.

Node & Angular versions:

Node: 18.19.1

Angular: 18.\*
