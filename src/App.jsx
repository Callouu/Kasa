import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { Navigate } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'
import Error from './components/Error'
import Home from './pages/Home'
import About from './pages/About'
import Rental from './pages/Logements'
import './style.css'



function App() {
  return (
    <BrowserRouter basename="/Kasa">
      <Header />
      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/logement/:rentalId" element={<Rental />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/404" element={<Error />} />
          <Route path="*" element={<Navigate to="/404" replace />}
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
