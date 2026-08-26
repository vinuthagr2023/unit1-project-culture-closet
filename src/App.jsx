import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import LandingPage from './components/LandingPage'
import DonorLogin from './components/DonorLogin'
import UserLogin from './components/UserLogin'
import AboutPage from './components/AboutPage'
import RecentDresses from './components/RecentDresses'
import AddDress from './components/AddDress'
import BrowseDresses from './components/BrowseDresses'
import initialDressList from './data/mockData'
import Header from './components/Header'
import MyRequests from './components/MyRequests'



function App() {
  const [dressList, setDressList] = useState(initialDressList);
  const [user, setUser] = useState(null); // tracks logged in username
  const [requestedDresses, setRequestedDresses] = useState([]);

  // Derived state: automatically true if user exists, false if user is null
  const isLoggedIn = !!user;

  const handleLogin = (username) => {
    setUser(username);
    setRequestedDresses([]);
  };

  const handleLogout = () => {
    setUser(null);
  };
  const handleAddDress = (newDress) => {
    setDressList((prevList) => [newDress, ...prevList]);
  };
  //Handler function to append new requests
  const handleRequestDress = (dress) => {
    setRequestedDresses((prevRequests) => {
      const alreadyRequested = prevRequests.some((item) => item.id === dress.id);
      if (!alreadyRequested) {
        return [...prevRequests, dress];
      }
      return prevRequests;
    });
  };

  return (
    <div className='app-container'>
      <Header isLoggedIn={isLoggedIn}
        user={user}
        onLogout={handleLogout} />

      <main>
        <Routes>
          <Route path="/" element={<LandingPage isLoggedIn={isLoggedIn} username={user} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path='/recent-dresses' element={<RecentDresses dresses={dressList} />} />
          <Route path="/donor-login" element={<DonorLogin onLogin={handleLogin} />} />
          <Route path="/user-login" element={<UserLogin onLogin={handleLogin} user={user} />} />
          <Route path="/add-dress" element={<AddDress onAddDress={handleAddDress} user={user} />} />
          <Route path="/browse-dresses"
            element={<BrowseDresses dresses={dressList} user={user}
              onRequestDress={handleRequestDress}
            />} />
          <Route
            path="/my-requests"
            element={<MyRequests requestedDresses={requestedDresses} user={user} />}
          />
        </Routes>
      </main>

      <footer className="footer">

        <p>---------Spread tradition to others-------------</p>

      </footer>

    </div>

  )
}

export default App
