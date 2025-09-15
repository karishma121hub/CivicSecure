import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import ComplaintForm from "./components/ComplaintForm";
import Profile from "./components/Profile";
import VerifyAadhaar from "./components/VerifyAadhaar";
import TrackStatus from "./components/Tracking"; // <-- Import your tracking page
import { FaBars } from "react-icons/fa";

function App() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  
  // App state
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  // Check authentication on app load
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    checkAuthenticationStatus();
  }, [theme]);

  const checkAuthenticationStatus = async () => {
    setAuthLoading(true);
    const token = localStorage.getItem('authToken');
    const userPhone = localStorage.getItem('userPhone');

    if (!token || !userPhone) {
      setAuthLoading(false);
      return;
    }

    try {
      // Validate token with your backend
      const response = await fetch('/api/validate-token', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        // Token invalid, clear storage
        localStorage.removeItem('authToken');
        localStorage.removeItem('userPhone');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
      // Clear storage on error
      localStorage.removeItem('authToken');
      localStorage.removeItem('userPhone');
      setIsAuthenticated(false);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setCurrentPage("dashboard"); // Redirect to dashboard after login
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userPhone');
    setUser(null);
    setIsAuthenticated(false);
    setCurrentPage("dashboard");
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <Dashboard 
            toggleTheme={toggleTheme} 
            theme={theme} 
            setCurrentPage={setCurrentPage}
            user={user}
            onLogout={handleLogout}
          />
        );
      case "file-complaint":
        return <ComplaintForm user={user} />;
      case "profile":
        return (
          <Profile 
            setCurrentPage={setCurrentPage} 
            theme={theme}
            user={user}
            onLogout={handleLogout}
          />
        );
      case "aadhaar-verify":
        return <VerifyAadhaar setCurrentPage={setCurrentPage} theme={theme} />;
      case "track-status":
        return <TrackStatus />; // <-- Show tracking page here
      case "info-hub":
      case "community":
      default:
        return (
          <div className="p-10 text-center text-gray-600 dark:text-gray-300 text-lg font-semibold">
            <div className="max-w-md mx-auto">
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p>This page is under construction and will be available soon.</p>
            </div>
          </div>
        );
    }
  };

  // Show loading spinner while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-green-500"></span>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading CiciSecure...</p>
        </div>
      </div>
    );
  }

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // Show main app if authenticated
  return (
    <div className="flex min-h-screen bg-base-100 text-base-content">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        user={user}
        onLogout={handleLogout}
      />

      <div className="flex flex-col flex-1">
        {/* Mobile Navigation Header */}
        <div className="navbar bg-white dark:bg-gray-900 shadow-sm px-4 sm:hidden">
          <div className="flex-1">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="btn btn-square btn-ghost"
              aria-label="Toggle sidebar"
            >
              <FaBars className="text-xl" />
            </button>
            <h1 className="text-xl font-bold text-green-800 dark:text-green-400 ml-3">
              CiciSecure
            </h1>
          </div>
          
          {/* User info for mobile */}
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-8 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user?.name?.charAt(0) || user?.phone?.slice(-2) || 'U'}
                  </span>
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <button onClick={() => setCurrentPage('profile')}>
                    Profile
                  </button>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-red-600">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <main className="flex-grow p-8 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;