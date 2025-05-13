import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { Navigate } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'
import Error from './components/Error'
import Home from './pages/Home'
import AboutKasa from './pages/About'
import Rental from './pages/Logements'
import './style.css'



function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/logement/:rentalId" element={<Rental />} />
          <Route path="/a-propos" element={<AboutKasa />} />
          <Route path="/adresse-introuvable" element={<Error />} />
          <Route path="*" element={<Navigate to="/adresse-introuvable" replace />}
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
