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

const PrivateRoute = ({ children, requiredRole }) => {

  const { user, role, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && role && role !== requiredRole) {
    return <Navigate to={`/${role}`} replace />;
  }
  
  return children;
};

const App = () => {
  const { role, signOut } = useAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = (role) => {
    setCurrentUser({ role });
    setSidebarOpen(true)
  }
  const handleLogout = async () => {
    setCurrentUser(null);
    setSidebarOpen(false);
    await signOut();
  }

  return (
    <div className={`flex flex-col min-h-screen ${isDark ? 'dark' : ''}`}>
      <Router>
        <Navbar
          // role={currentUser?.role}
          sidebarOpen={sidebarOpen}
          role={role}
          isDark={isDark}
          onDarkToggle={() => setIsDark(!isDark)}
          onLogout={handleLogout}
        />

        <div className="flex-1 text-gray-900 dark:text-gray-100 pt-16">
          <Routes>
            <Route path="/" element={<Home isDark={isDark} />} />
            <Route path="/about" element={<About isDark={isDark} />} />
            <Route path="/donate" element={<Donate isDark={isDark} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} isDark={isDark} />} />
            <Route path="/signup" element={<SignUp isDark={isDark} />} />

            <Route path="/user" element={
              <PrivateRoute requiredRole="user">
                <UserDashboard onLogout={handleLogout} />
              </PrivateRoute>
            } />

            <Route path="/recycler" element={
              <PrivateRoute requiredRole="recycler">
                <RecyclerDashboard onLogout={handleLogout} />
              </PrivateRoute>
            } />

            <Route path="/producer" element={
              <PrivateRoute requiredRole="producer">
                <AdminDashboard onLogout={handleLogout} />
              </PrivateRoute>
            } />

            <Route
              path="/pickup-request"
              element={<PickupRequest onLogout={handleLogout}/>} />
            <Route
              path="/pickup-status"
              element={<PickupStatus onLogout={handleLogout} isDark={isDark} />} />
            <Route
              path="/recycler-status"
              element={<RecyclerStatus onLogout={handleLogout}/>} />
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