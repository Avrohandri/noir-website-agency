import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './component/navbar'
import Dashboard from './component/dashboard'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Navbar />
    <Dashboard />
  </StrictMode>,
)
