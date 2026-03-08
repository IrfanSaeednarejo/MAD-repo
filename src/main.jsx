import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import IntroTOJetpack from './IntroTOJetpack.jsx'
import StateManagement from './StateManagement.jsx'
import Navigation from './Navigation.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <IntroTOJetpack />
    <StateManagement />
    <Navigation />

    
  </StrictMode>,
)
