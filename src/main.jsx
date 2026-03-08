import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import IntroTOJetpack from './IntroTOJetpack.jsx'
import StateManagement from './StateManagement.jsx'
import Navigation from './Navigation.jsx'
import New from './Newss.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <New/>
    <IntroTOJetpack/>
    <StateManagement/>
    <Navigation/>
    
  </StrictMode>,
)
