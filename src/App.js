import './App.scss';
import AllRoutes from "./routes";
import { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { initializeFirebase } from './firebase.config';
import { EXIST_LOCAL_STORAGE } from './services/constants'
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { ThemeModeProvider } from './components/common';

initializeFirebase()
function App() {



  return (
    <ThemeModeProvider>
      <ReactNotifications />
      <AllRoutes />
    </ThemeModeProvider>


  );
}

export default App;
