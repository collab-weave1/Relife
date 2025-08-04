import React, { useEffect, useMemo, useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { UserDashboard } from './pages/UserDashboard';
import { RecyclerDashboard } from './pages/RecyclerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { Login } from './pages/Login';
import { PickupRequest } from './pages/PickupRequest';
import { PickupStatus } from './pages/PickupStatus';
import { RecyclerStatus } from './pages/RecyclerStatus';
import { Marketplace } from './pages/Marketplace';
import { Home } from './pages/Home';
import { Footer } from './components/Footer';
import {SignUp} from './pages/SignUp';
import Navbar from './components/Navbar';
import { About } from './pages/About';
import { Donate } from './pages/Donate';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [isDark, setIsDark] = useState(false);

  const handleLogin = (role) => {
    setCurrentUser({ role });
    setCurrentPage(`${role}-dashboard`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleBack = () => {
    if (currentUser) {
      setCurrentPage(`${currentUser.role}-dashboard`);
    } else {
      setCurrentPage('login');
    }
  };

  const renderPage = () => {
    switch (currentPage) {

      case 'home':
        return <Home onNavigate={handleNavigate} onDarkToggle={() => setIsDark(!isDark)} isDark={isDark}/>;
      case 'about':
        return <About isDark={isDark} onDarkToggle={() => setIsDark(!isDark)} onNavigate={handleNavigate}/>
      case 'donate':
          return <Donate isDark={isDark} onDarkToggle={() => setIsDark(!isDark)} onNavigate={handleNavigate}/>
      case 'login':
        return <Login onLogin={handleLogin} isDark={isDark} onDarkToggle={() => setIsDark(!isDark)} onNavigate={handleNavigate}/>;
      case 'signup':
        return <SignUp onLogin={handleLogin} isDark={isDark} onDarkToggle={() => setIsDark(!isDark)} onNavigate={handleNavigate}/>;
      case 'user-dashboard':
        return <UserDashboard onLogout={handleLogout} onNavigate={handleNavigate} />;
      case 'recycler-dashboard':
        return <RecyclerDashboard onLogout={handleLogout} onNavigate={handleNavigate} />;
      case 'admin-dashboard':
        return <AdminDashboard onLogout={handleLogout} onNavigate={handleNavigate} />;
      case 'pickup-request':
        return <PickupRequest onLogout={handleLogout} onBack={handleBack} onNavigate={handleNavigate} />;
      case 'pickup-route':
        return <PickupStatus onBack={handleBack} onLogout={handleLogout} />;
      case 'recycler-route':
        return <RecyclerStatus onBack={handleBack} onLogout={handleLogout} />;
      case 'marketplace':
        return (
          <Marketplace
            onLogout={handleLogout}
            onBack={handleBack}
            currentUser={currentUser}
          />
        );
      default:
        return <Login onLogin={handleLogin} />;
    }
  };

  return (
    <div className={`flex flex-col min-h-screen ${isDark ? 'dark' : ''}`}>
      (
      <Navbar
        role={currentUser?.role}
        isDark={isDark}
        onDarkToggle={() => setIsDark(!isDark)}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
      />
      )
      <div className="flex-1 text-gray-900 dark:text-gray-100">
        {renderPage()}
      </div>
      <Footer />
    </div>
  );
};

export default App;