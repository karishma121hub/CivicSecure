import React from "react";
import { FaHome, FaFileAlt, FaUser, FaIdCard, FaSearch, FaInfoCircle, FaUsers, FaSignOutAlt } from "react-icons/fa";

const Sidebar = ({ currentPage, setCurrentPage, sidebarOpen, setSidebarOpen, user, onLogout }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: FaHome },
    { id: "file-complaint", label: "File Complaint", icon: FaFileAlt },
    { id: "track-status", label: "Track Status", icon: FaSearch },
    { id: "profile", label: "Profile", icon: FaUser },
    { id: "aadhaar-verify", label: "Verify Aadhaar", icon: FaIdCard },
    { id: "info-hub", label: "Info Hub", icon: FaInfoCircle },
    { id: "community", label: "Community", icon: FaUsers },
  ];

  const handleMenuClick = (pageId) => {
    setCurrentPage(pageId);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`sidebar fixed sm:relative z-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 transition-transform duration-300 ease-in-out`}>
        {/* Header */}
        <div className="p-6 border-b border-green-200 dark:border-green-800">
          <h2 className="text-2xl font-bold text-green-800 dark:text-green-400">
            CiciSecure
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Civic Management System
          </p>
        </div>

        {/* User info */}
        <div className="p-4 border-b border-green-200 dark:border-green-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-white font-semibold">
                {user?.name?.charAt(0) || user?.phone?.slice(-2) || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                +91 {user?.phone || 'Phone'}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleMenuClick(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-green-500 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout button */}
        <div className="p-4 border-t border-green-200 dark:border-green-800">
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <FaSignOutAlt className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
