// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   Link,
// } from "react-router-dom";
// import { BookmarkProvider } from "./context/BookmarkContext";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import EmployeeDetail from "./pages/EmployeeDetail";
// import Bookmarks from "./pages/Bookmarks";
// import Analytics from "./pages/Analytics";

// export default function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(
//     localStorage.getItem("isAuthenticated") === "true"
//   );

//   useEffect(() => {
//     localStorage.setItem("isAuthenticated", isAuthenticated);
//   }, [isAuthenticated]);

//   return (
//     <BookmarkProvider>
//       <Router>
//         {isAuthenticated && (
//           <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//               <div className="flex items-center justify-between h-16">
              
//                 <div className="flex-shrink-0 flex items-center">
//                   <Link to="/" className="flex items-center">
//                     <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
//                       HR
//                       <span className="text-gray-800 dark:text-gray-100">
//                         Dash
//                       </span>
//                     </div>
//                   </Link>
//                 </div>

           
//                 <div className="hidden md:flex items-center space-x-8">
//                   <Link
//                     to="/"
//                     className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 relative group"
//                   >
//                     Dashboard
//                     <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
//                   </Link>
//                   <Link
//                     to="/bookmarks"
//                     className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 relative group"
//                   >
//                     Bookmarks
//                     <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
//                   </Link>
//                   <Link
//                     to="/analytics"
//                     className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 relative group"
//                   >
//                     Analytics
//                     <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
//                   </Link>
//                 </div>

                
//                 <div className="ml-4 flex items-center">
//                   <button
//                     onClick={() => setIsAuthenticated(false)}
//                     className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
//                   >
//                     <svg
//                       className="-ml-1 mr-2 h-5 w-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//                       />
//                     </svg>
//                     Sign Out
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </nav>
//         )}

//         <div className="container mx-auto p-4">
//           <Routes>
//             <Route
//               path="/login"
//               element={<Login setIsAuthenticated={setIsAuthenticated} />}
//             />
//             <Route
//               path="/"
//               element={
//                 isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
//               }
//             />
//             <Route
//               path="/employee/:id"
//               element={
//                 isAuthenticated ? <EmployeeDetail /> : <Navigate to="/login" />
//               }
//             />
//             <Route
//               path="/bookmarks"
//               element={
//                 isAuthenticated ? <Bookmarks /> : <Navigate to="/login" />
//               }
//             />
//             <Route
//               path="/analytics"
//               element={
//                 isAuthenticated ? <Analytics /> : <Navigate to="/login" />
//               }
//             />
//           </Routes>
//         </div>
//       </Router>
//     </BookmarkProvider>
//   );
// }


import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  NavLink,
} from "react-router-dom";
import { BookmarkProvider } from "./context/BookmarkContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EmployeeDetail from "./pages/EmployeeDetail";
import Bookmarks from "./pages/Bookmarks";
import Analytics from "./pages/Analytics";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <BookmarkProvider>
      <Router>
        {isAuthenticated && (
          <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-md backdrop-blur-sm bg-opacity-95">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <div className="flex items-center">
                  <NavLink to="/" className="flex items-center transition-transform hover:scale-105">
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      HR<span className="text-gray-800">Dash</span>
                    </div>
                  </NavLink>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center space-x-8">
                  <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                      `relative font-medium transition-colors px-3 py-2 ${
                        isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                      }`
                    }
                  >
                    Dashboard
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-4/5" />
                  </NavLink>
                  <NavLink
                    to="/bookmarks"
                    className={({ isActive }) =>
                      `relative font-medium transition-colors px-3 py-2 ${
                        isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                      }`
                    }
                  >
                    Bookmarks
                  </NavLink>
                  <NavLink
                    to="/analytics"
                    className={({ isActive }) =>
                      `relative font-medium transition-colors px-3 py-2 ${
                        isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                      }`
                    }
                  >
                    Analytics
                  </NavLink>
                </div>

                {/* Sign Out Button */}
                <div className="ml-4 flex items-center">
                  <button
                    onClick={() => setIsAuthenticated(false)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 transform hover:scale-105 active:scale-95"
                  >
                    <svg
                      className="-ml-1 mr-2 h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </nav>
        )}

        <div className="container mx-auto p-4 sm:p-6 lg:p-8 transition-all duration-200">
          <Routes>
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/"
              element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/employee/:id"
              element={
                isAuthenticated ? <EmployeeDetail /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/bookmarks"
              element={
                isAuthenticated ? <Bookmarks /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/analytics"
              element={
                isAuthenticated ? <Analytics /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </div>
      </Router>
    </BookmarkProvider>
  );
}
