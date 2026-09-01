import { useState } from 'react'
import { useEffect } from "react";
import { Routes, Route, Link, Navigate, useNavigate,useLocation } from 'react-router-dom'
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
  const location = useLocation();
  //handle on refresh , navigate to homepage
  useEffect(() => {
       if (!user && location.pathname !== "/") {
      navigate("/");
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const isLoggedIn = Boolean(user);

  const handleLogout = () => {
    setUser(null);
    setRequestedDresses([]);
    setDressList(initialDressList);
    navigate("/");
  };
  const handleAddDress = (newDress) => {
    const dressWithDonor = {
      ...newDress,
      donor: user?.username || user?.name, // <-- Ensures the current user owns it!
      isRequested: false
    };
    
    setDressList((prevList) => [dressWithDonor, ...prevList]);
  };

  //Handler function to append new requests
  const handleRequestDress = (dressId, currentUser) => {
  setDressList((prevDresses) =>
      prevDresses.map((dress) =>
        dress.id === dressId
          ? { ...dress, isRequested: true, status: "Pending Pickup", requestedBy: currentUser?.name }
          : dress
      )
    );

    const targetDress = dressList.find((dress) => dress.id === dressId);
    if (targetDress) {
      setRequestedDresses((prevRequests) => {
        if (prevRequests.some((item) => item.id === dressId)) return prevRequests;
        return [...prevRequests, { ...targetDress, status: "Pending Pickup", requestedBy: currentUser?.name }];
      });
    }
};

  const handleDeleteDress = (idToDelete) => {
    setDressList((prevDresses) => prevDresses.filter((dress) => Number(dress.id) !== Number(idToDelete)));
  };

  const handleUpdateDressStatus = (id, updates) => {
    setDressList((prevList) =>
      prevList.map((dress) =>
        dress.id === id ? { ...dress, ...updates } : dress
      )
    );
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
          <Route path="/add-dress" element={<AddDress
           onAddDress={handleAddDress} 
          user={user} 
          onDeleteDress={handleDeleteDress} 
          dresses={dressList} 
          onUpdateDress={handleUpdateDressStatus} />} />
          <Route path="/browse-dresses"
            element={<BrowseDresses dresses={dressList} user={user}
              requestedDresses={requestedDresses}
              onRequestDress={handleRequestDress}
            />} />
          <Route
            path="/my-requests"
            element={<MyRequests requestedDresses={requestedDresses} user={user} dresses={dressList} />}
          />
        </Routes>
      </main>

      <Footer />

    </div>

  )
}

export default App
