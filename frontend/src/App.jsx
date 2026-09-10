import { useState, useEffect } from 'react'
import './App.css'
import AppRoutes from './routes/AppRoute'
import { Route, Routes } from 'react-router-dom'
import useAuthStore from './store/authStore'
import useSettingsStore from './store/settingsStore'
// import useUIStore from './store/uiStore'
import { getProfile } from './services/auth/authService'




function App() {

  const fetchCurrentUser = useAuthStore((state) => state.fetchCurrentUser);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const fetchSettings = useSettingsStore((state) => state.fetchSettings);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchSettings().catch(() => {});
    }
  }, [isAuthenticated, fetchSettings]);

  return <AppRoutes/>;
}

export default App
