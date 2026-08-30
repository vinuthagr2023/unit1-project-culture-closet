import { useState } from 'react'
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import './App.css'
import LandingPage from './components/landingpage/LandingPage'
import LoginPage from './components/login/LoginPage'
import AboutPage from './components/about/AboutPage'
import RecentDresses from './components/recentdresses/RecentDresses'
import AddDress from './components/adddress/AddDress'
import BrowseDresses from './components/browsedress/BrowseDresses'
import initialDressList from './data/mockData'
import Header from './components/header/Header'
import MyRequests from './components/myrequest/MyRequests'
import Footer from './components/footer/Footer'



function App() {
  const [dressList, setDressList] = useState(initialDressList);
  const [user, setUser] = useState(null); // tracks logged in username
  const [requestedDresses, setRequestedDresses] = useState([]);

  const navigate = useNavigate();

  const handleLogin = (userData) => {
    setUser({userData});
  };

  const isLoggedIn = Boolean(user);

  const handleLogout = () => {
    setUser(null);
    setRequestedDresses([]);
    navigate("/");
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

  const handleDeleteDress = (idToDelete) => {
    setDressList((prevDresses) => prevDresses.filter((dress) => Number(dress.id) !== Number(idToDelete)));
  };

  return (
    <div className='app-container'>
      <Header
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={handleLogout}
      />

      <main>
        <Routes>
          <Route path="/" element={<LandingPage isLoggedIn={isLoggedIn} username={user} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={isLoggedIn ? (
            <Navigate to="/" replace />
          ) : (
            <LoginPage onLogin={handleLogin} />
          )
          } />
          <Route path='/recent-dresses' element={<RecentDresses dresses={dressList} />} />
          <Route path="/add-dress" element={<AddDress onAddDress={handleAddDress} user={user} onDeleteDress={handleDeleteDress} dresses={dressList} />} />
          <Route path="/browse-dresses"
            element={<BrowseDresses dresses={dressList} user={user}
              requestedDresses={requestedDresses}
              onRequestDress={handleRequestDress}
            />} />
          <Route
            path="/my-requests"
            element={<MyRequests requestedDresses={requestedDresses} user={user} />}
          />
        </Routes>
      </main>

      <Footer />

    </div>

  )
}

export default App
