import { useState } from 'react'
import './App.css'
import AppRoutes from './routes/AppRoute'
import { Route, Routes } from 'react-router-dom'
import useAuthStore from './store/authStore'
// import useUIStore from './store/uiStore'
import { getProfile } from './services/auth/authService'



function App() {

  // return <AppRoutes />;
  // const user = useAuthStore((state) => state.user);
  // const setUser = useAuthStore((state) => state.setUser);
  // const logout = useAuthStore((state) => state.logout);

  // const testAPI = async () => {
  //   try {
  //     const response = await getProfile();

  //     console.log(response.data);
  //   }
  //   catch (error) {
  //     console.log(error);
  //   }
  // }

  return <AppRoutes/>;
}

export default App
