import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './component/navbar'
import Dashboard from './component/dashboard'
import Tentang from './component/about'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Navbar />
    <Dashboard />
    <Tentang />
  </StrictMode>,
)
