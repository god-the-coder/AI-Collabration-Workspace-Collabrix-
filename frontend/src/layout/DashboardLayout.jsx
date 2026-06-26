import React from 'react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <div className="flex pt-16">
        {/* Sidebar */}
        <Sidebar />

        {/* Content */}
        <main className="flex-1 ml-64 p-8">
          <div className="max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
