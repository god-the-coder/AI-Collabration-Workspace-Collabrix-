import { useState, useEffect } from 'react'
import './App.css'
import AppRoutes from './routes/AppRoute'
import { Route, Routes } from 'react-router-dom'
import useAuthStore from './store/authStore'
// import useUIStore from './store/uiStore'
import { getProfile } from './services/auth/authService'




function App() {

  const fetchCurrentUser = useAuthStore((state) => state.fetchCurrentUser);
  
  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  return <AppRoutes/>;
}

export default App
