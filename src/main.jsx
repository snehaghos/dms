import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import Router from './routes/router.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StateProvider } from './Features/Auth/contexts/StateContext.jsx'
import PlayGround from './routes/PlayGround.jsx'
import { queryClient } from './queryClient.jsx'
import { BrowserRouter } from 'react-router-dom'
import { DocumentProvider } from './Features/Auth/contexts/DocumentContext.jsx'


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} >
      <StateProvider>
        <DocumentProvider>
        <BrowserRouter>
          <PlayGround />
        </BrowserRouter>
        </DocumentProvider>
      </StateProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
