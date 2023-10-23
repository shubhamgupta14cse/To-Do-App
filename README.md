# To Do Application

This is a TO Do application built with Next.js, TypeScript, Tailwind CSS, Mobx State Tree, Express and MongoDB.

## Features

- View a list of tasks
- Add a new task
- Edit an existing task
- Delete a task

## Technologies Used

- Next.js: A React framework for building server-side rendered applications.
- TypeScript: A statically-typed superset of JavaScript that improves code maintainability and reliability.
- Tailwind CSS: A utility-first CSS framework for styling and layout.
- Mobx State Tree (MST): A state management library for predictable state management.
- Express.js: A Node.js framework for writing REST API's
- MongoDB: A No-SQL database.

## Getting Started

To run the application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/shubhamgupta14cse/To-Do-App.git
   ```

2. Navigate to the project server directory:

   ```bash
    cd to-do-server
   ```

3. Install the dependencies:

   ```bash
   yarn
   ```

4. Run the development server:

   ```bash
   yarn start
   ```
   - this command will start your Express development server at PORT:4000 of your system

5. Navigate to the project client and server directory:

   ```bash
   cd to-do-client
   ```

6. Install the dependencies:

   ```bash
   yarn
   ```

7. Run the development server:

   ```bash
   yarn run dev
   ```

   - this command will start your NExt.js development server at PORT:3000 of your system

8. Open your browser and visit `http://localhost:3000` to see the application.

## Folder Structure For Client

The project's folder structure is as follows:

```bash
- src
  -app
    - favicon.ico
    - layout.tsx
    - page.tsx
  - components
    - ui
    - AddTask.tsx
    - EditTask.tsx
    - Task.tsx
    - TaskFilter.tsx
    - TaskList.tsx
    ..
  - lib
    - utils.ts
  - stores
    - StroreProvider.tsx
    - TaskStore.ts
  - styles
    - globals.css
```

Explanation:

- `src`: The root directory of the project's source code.
  - `app`: This directory contains the core components and configurations for the Next.js application.
    - `favicon.ico`: The favicon file for the application.
    - `layout.tsx`: The layout component that wraps the pages and provides a consistent structure and styling.
    - `page.tsx`: The main page component representing the home or main view of the application.
  - `components`: Contains reusable components used across different pages or layouts.
    - `ui`: Contains reusable UI components that are not specific to the task management functionality. These components can be used throughout the application.
    - `AddTask.tsx`: Component responsible for adding a new task.
    - `EditTask.tsx`: Component responsible for editing an existing task.
    - `Task.tsx`: Component responsible for displaying a single task.
    - `TaskFilter.tsx`: Component responsible for filtering tasks based on their status.
    - `TaskList.tsx`: Component responsible for displaying a list of tasks.
    - ...
  - `lib`: Contains utility files or modules that provide common functions or helper methods. These utilities can be used across the application to perform common tasks.
    - `utils.ts`: Contains utility functions that can be used for tasks such as date formatting, string manipulation, or other common operations.
    - ...
  - `stores`: Contains files related to state management using Mobx State Tree.
    - `StoreProvider.tsx`: Store Context Provider that provides the store to the application. It wraps the components and enables them to access the store.
    - `TaskStore.ts`: Contains the store definition and actions related to tasks. It manages the state and provides methods for adding, editing, and deleting tasks.
  - `styles`: Contains global stylesheets or CSS files used throughout the application. These stylesheets define the overall styling and appearance of the application.
    - `globals.css`: Contains global CSS styles that are applied to all components in the application.
    - ...
  - `public`: Contains publicly accessible files, such as images or static assets, that can be used in the application.

