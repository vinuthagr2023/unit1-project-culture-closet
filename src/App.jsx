import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import LandingPage from './components/LandingPage'
import DonorLogin from './components/DonorLogin'
import UserLogin from './components/UserLogin'
import AboutPage from './components/AboutPage'
import RecentDresses from './components/RecentDresses'
import AddDress from './components/AddDress'
import BrowseDresses from './components/BrowseDresses'
import initialDressList from './data/mockData'


function App() {
  const [dressList, setDressList] = useState([]);

  const[user,setUser]=useState(null); // tracks login username

  // Derived state: automatically true if user exists, false if user is null
  const isLoggedIn = !!user;
 
  const handleLogin = (username)=>{
    setUser(username);
  };

  const handleLogout = ()=>{
    setUser(null);
  };
  const handleAddDress = (newDress) => {
    setDressList((prevList) => [newDress, ...prevList]);
  };

  const [requestedDresses, setRequestedDresses] = useState([]);
  //Handler function to append new requests
  const handleRequestDress = (requestedDress) => {
    setRequestedDresses((prevRequests) => [...prevRequests, requestedDress]);
  };
  
  return (
    <div className='app-container'>
      <header className='main-header'>
      <h1 className='title'>Culture Closet </h1>
        <div className='logo'>Heritage kids </div>
        <div className='nav'>
        <Link to="/">Home</Link>
        <Link to="/about"> About </Link>
        <Link to="#">Notifications </Link>
        </div>
      </header>

    <div>
      {isLoggedIn &&(
        <div>
          <span>Welcome,<strong>{user}</strong>!</span>
          <button onClick={handleLogout} >Logout</button>
        </div>
      )}
    </div>

      <main>
        <Routes>
          <Route path="/" element={<LandingPage isLoggedIn={isLoggedIn} username ={user} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path='/recent-dresses' element={<RecentDresses dresses={dressList}/>}/>
          <Route path="/donor-login" element={<DonorLogin onLogin={handleLogin} />} />
          <Route path="/user-login" element={<UserLogin onLogin={handleLogin} user={user} />} />
          <Route path="/add-dress" element={<AddDress onAddDress={handleAddDress} user={user}/>} />
          <Route path="/browse-dresses" element = {<BrowseDresses dresses = {dressList} user = {user}
          onRequestDress={handleRequestDress}
          />}/>
        </Routes>
      </main>

      <footer className="footer">

        <p>---------Spread tradition to others-------------</p>

      </footer>

    </div>

  )
}

export default App
