import React, { useState } from "react";
import { Link } from "react-router-dom";
import dress11 from '../images/kids-dress-image11.jpg';
import dress22 from '../images/kids-dress-imame22.jpg';
import dress4 from '../images/kids-dress-image4.jpg';
import dress6 from '../images/kids-dress-image6.jpg';
import DressCard from "./DressCard";
import initialDressList from "../data/mockData";
import DonorLogin from "./DonorLogin";
import UserLogin from "./UserLogin";
import RecentDresses from "./RecentDresses";


function LandingPage({isLoggedIn}) {
    
    const [dresses, setDresses] = useState(initialDressList);

    const [isOpen, setIsOpen] = useState(false);

  
    return (
        <div>
             <div className="recentItem">
                <Link to="/recent-dresses" className="recent-item">Recent Dresses</Link>
            </div>
            <div className="Categery">
                <button className="dropdown"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    Login Option {isOpen ? '▲' : '▼'}</button>
                {!isOpen &&
                    <div className="dropDownMenu">
                        <Link to="/donor-login" className="dropdown-item">
                            Donor Login
                        </Link><br></br>
                        <Link to="/user-login" className="dropdown-item">
                            User Login
                        </Link>
                    </div>}

            </div>

            <section>
                <div className="slogan">
                    <h2>Share your heritage</h2>
                    <p>Connect families to pass down and share traditional children cloths</p>
                </div>

                <div className="images">
                    <img src={dress11} />
                    <img src={dress22} />
                    <img src={dress4} />
                    <img src={dress6} />
                </div><br></br>

                <div className="categery_buttons">
                    <Link to={isLoggedIn ? "/add-dress" : "/donor-login"}>
                    <button type="click" className="donate"> Donate dresses</button>
                    </Link>
                    <Link to="/browse-dresses">
                    <button className="find">Find dresses</button>
                    </Link>
                </div>
            </section>
         


        </div>

    );
}

export default LandingPage;