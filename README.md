# Waypoint frontend react app

## Overview/Welcome

Welcome to waypoint the frontend. This is a React-based single-page application that provides the user interface for our web application.

The landingpoint is a public page with a login option

Once logged in their are additional private routes the user can access

### File Structure

```
frontend/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   ├── App.js
│   └── index.js
├── package.json
├── Dockerfile
└── README.md
```

### Main Files and Folders

- `public/`: Contains the HTML template and other static assets
- `src/`: Contains the React application source code
  - `components/`: Reusable React components
  - `pages/`: Components that represent entire pages
  - `utils/`: Utility functions and helpers
  - `App.js`: Main React component
  - `index.js`: Entry point of the React application
- `package.json`: Node.js dependencies and scripts
- `Dockerfile`: Used to build the Docker image for this service

## First-time here

### Prerequisites

- Miniconda (env manager)
- Node.js (version 14+)
- npm or yarn
- Docker (for containerized development and deployment)

### Setup Instructions

0. Create a conda environment
    ```
    conda create -n waypoint nodejs
    ```

1. Activate the conda env
   ```
   conda activate waypoint
   ```

1. Install dependencies into conda env:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm start
   ```

The application will be available at `http://localhost:3000`.

### Basic Usage

- The main application interface will be visible at `http://localhost:3000`
- Any API calls will be proxied to the backend service (ensure the backend is running for real response using the harbormaster devops repo)


## Experienced user

### Development Workflow

1. Make changes to the React components or other frontend code
2. The development server will automatically reload with your changes
3. Run tests to ensure everything is working correctly

### Available npm Scripts

> remember to activate the conda env first.
>   ```
>   conda activate waypoint
>   ```

- `npm start` : Starts the development server
- `npm test` : Runs the test suite
- `npm run build` : Builds the app for production
- `npm run eject` : Ejects from Create React App (use with caution)

### Best Practices for Adding New Components or Features

1. Create new components in the `src/components/` directory
2. Use functional components with hooks instead of class components
3. Keep components small and focused on a single responsibility
4. Use prop-types for type checking
5. Write unit tests for each new component

### State Management

This project uses React's built-in state management with hooks.

### Styling

[ ... TODO more coming ] 

### Environment Variables

Create React App supports environment variables out of the box. You can create a `.env` file in the root of the `frontend/` directory to set environment-specific variables.

- `REACT_APP_API_URL`: The URL of the backend API

### Deployment for Production

The frontend is deployed as a Docker container.
- The build call `npm build` occurs inside the container

