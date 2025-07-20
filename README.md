# HR Dashboard

HR Dashboard is a React-based web application built with Vite that provides a comprehensive interface for managing and analyzing employee data. It features employee search and filtering, detailed employee profiles, bookmarking functionality, and performance analytics with interactive charts.

## Features

- Employee Dashboard with search and department filtering
- Detailed Employee Profiles including personal, contact, work, financial info, projects, performance history, and feedback
- Bookmark employees for quick access
- Performance Analytics with charts showing department distribution and performance stats
- User authentication with login and sign-out functionality
- Responsive and modern UI styled with TailwindCSS

## Technologies Used

- React 19
- Vite
- React Router DOM for routing
- TailwindCSS for styling
- Axios for HTTP requests
- Chart.js and react-chartjs-2 for data visualization
- ESLint for code linting


Login Page







## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/DhruvSeth09/HR-Dashboard.git
   cd HR-Dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the URL shown in the terminal).

## Project Structure

- `src/`
  - `components/` - Reusable UI components like EmployeeCard, SearchBar, Tabs, Charts, etc.
  - `context/` - React context for managing bookmarks
  - `hooks/` - Custom hooks for search and bookmarks
  - `pages/` - Main pages including Login, Dashboard, EmployeeDetail, Bookmarks, Analytics
  - `utils/` - Utility functions for ratings and department colors
  - `App.jsx` - Main app component with routing and authentication
  - `main.jsx` - Entry point rendering the app
- `public/` - Static assets
- `package.json` - Project metadata and dependencies
- `vite.config.js` - Vite configuration
- `tailwind.config.js` - TailwindCSS configuration

