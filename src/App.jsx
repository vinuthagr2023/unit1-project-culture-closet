import { useState } from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './components/LandingPage'
import DonorLogin from './components/DonorLogin'
import UserLogin from './components/UserLogin'


function App() {
   return (

    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/donor-login" element={<DonorLogin />} />
        <Route path="/user-login" element={<UserLogin />} />
    </Routes>
   
     

  )
}

export default App
