import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {  QueryClientProvider } from '@tanstack/react-query'

import { BrowserRouter } from 'react-router-dom'


import { StateProvider } from './Features/Auth/contexts/StateContext.jsx'
import PlayGround from './routes/PlayGround.jsx'
import { queryClient } from './queryClient.jsx'


createRoot(document.getElementById('root')).render(
  <React.StrictMode>


    <QueryClientProvider client={queryClient} >
      <StateProvider>
        <BrowserRouter>
          <PlayGround />
        </BrowserRouter>
      </StateProvider>

    </QueryClientProvider>

  </React.StrictMode>,
)
