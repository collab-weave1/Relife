import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from './auth/AuthProvider';

import { UserDashboard } from './pages/UserDashboard';
import { RecyclerDashboard } from './pages/RecyclerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { Login } from './pages/Login';
import { PickupRequest } from './pages/PickupRequest';
import { PickupStatus } from './pages/PickupStatus';
import { RecyclerStatus } from './pages/RecyclerStatus';
import { Marketplace } from './pages/Marketplace';
import { Home } from './pages/Home';
import {SignUp} from './pages/SignUp';
import { About } from './pages/About';
import { Donate } from './pages/Donate';

import { Footer } from './components/Footer';
import Navbar from './components/Navbar';

const PrivateRoute = ({ children, role, currentUser }) => {
  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.role !== role) return <Navigate to={`/${currentUser.role}`} replace />;
  return children;
};

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = (role) => {
    setCurrentUser({ role });
    setSidebarOpen(true)
  }
  const handleLogout = () => {
    setCurrentUser(null);
    setSidebarOpen(false);
  }

  return (
    <div className={`flex flex-col min-h-screen ${isDark ? 'dark' : ''}`}>
      <Router>
        <Navbar
          role={currentUser?.role}
          isDark={isDark}
          onDarkToggle={() => setIsDark(!isDark)}
          onLogout={handleLogout}
        />

        <div className="flex-1 text-gray-900 dark:text-gray-100 pt-16">
          <Routes>
            <Route path="/" element={<Home onDarkToggle={() => setIsDark(!isDark)} isDark={isDark} />} />
            <Route path="/about" element={<About isDark={isDark} onDarkToggle={() => setIsDark(!isDark)} />} />
            <Route path="/donate" element={<Donate isDark={isDark} onDarkToggle={() => setIsDark(!isDark)} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} isDark={isDark} onDarkToggle={() => setIsDark(!isDark)} />} />
            <Route path="/signup" element={<SignUp onLogin={handleLogin} isDark={isDark} onDarkToggle={() => setIsDark(!isDark)} />} />

            <Route
              path="/user"
              element={
                // <PrivateRoute role="user" currentUser={currentUser}>
                  <UserDashboard onLogout={handleLogout} />
                // </PrivateRoute>
              }
            />
            <Route
              path="/recycler"
              element={
                // <PrivateRoute role="recycler" currentUser={currentUser}>
                  <RecyclerDashboard onLogout={handleLogout} />
                // </PrivateRoute>
              }
            />
            <Route
              path="/producer"
              element={
                // <PrivateRoute role="producer" currentUser={currentUser}>
                  <AdminDashboard onLogout={handleLogout} />
                // </PrivateRoute>
              }
            />
            <Route
              path="/pickup-request"
              element={<PickupRequest onLogout={handleLogout} />} />
            <Route
              path="/pickup-status"
              element={<PickupStatus onLogout={handleLogout} />} />
            <Route
              path="/recycler-status"
              element={<RecyclerStatus onLogout={handleLogout} />} />
            <Route
              path="/marketplace"
              element={<Marketplace onLogout={handleLogout} role={currentUser?.role} />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        <Footer />
      </Router>
    </div>
  );
};

export default App;