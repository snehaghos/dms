import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Router from './routes/router.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StateProvider } from './Features/Login/contexts/StateContext.jsx'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StateProvider>
      <QueryClientProvider  client={queryClient} >

            <Router/>
      </QueryClientProvider>
    </StateProvider>
  </React.StrictMode>,
)
