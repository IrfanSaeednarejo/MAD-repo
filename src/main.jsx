import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './index.css'
import IntroTOJetpack from './IntroTOJetpack.jsx'
import StateManagement from './StateManagement.jsx'
import Navigation from './Navigation.jsx'
import LandingPage from './LandingPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Lecture02" element={<IntroTOJetpack />} />
        <Route path="/Lecture03" element={<StateManagement />} />
        <Route path="/Lecture04" element={<Navigation />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
