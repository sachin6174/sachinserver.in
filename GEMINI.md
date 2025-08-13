
# Project Overview

This project is a React-based web application bootstrapped with `create-react-app`. It appears to be a personal portfolio or a tool hub, featuring a tab-based navigation system. The application includes components for error handling, performance monitoring, and various tools.

**Key Technologies:**

*   **Frontend:** React
*   **Build Tool:** Create React App (react-scripts)
*   **Dependencies:**
    *   `marked`: For rendering Markdown content.
    *   `pdf-lib`: For creating and modifying PDF documents.
    *   `qr-scanner`: For scanning QR codes.
    *   `qrcode`: For generating QR codes.

# Building and Running

*   **Development Server:** `npm start`
    *   Runs the app in development mode.
    *   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
*   **Production Build:** `npm run build`
    *   Builds the app for production to the `build` folder.
*   **Run Tests:** `npm test`
    *   Launches the test runner in interactive watch mode.

# Development Conventions

*   **Component-Based Architecture:** The application is structured around React components, with a clear separation of concerns.
*   **Styling:** CSS files are co-located with their respective components.
*   **Error Handling:** The application uses an `ErrorBoundary` component to catch and handle runtime errors.
*   **Performance Monitoring:** A `PerformanceProvider` context is used to monitor application performance, likely during development.
*   **Code Splitting:** The project is configured for code splitting, which can help improve initial load times.
