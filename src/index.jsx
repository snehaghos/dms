import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Router from './routes/router.jsx'
import { QueryClientProvider } from '@tanstack/react-query'


createRoot(document.getElementById('root')).render(
  <React.StrictMode>

       <Router/>

  </React.StrictMode>,
)
