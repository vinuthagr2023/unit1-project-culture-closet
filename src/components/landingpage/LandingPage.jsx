import React, { useState } from "react";
import { Link } from "react-router-dom";
//import initialDressList from "../../data/mockData";
import "./LandingPage.css";

function LandingPage({ isDonorLoggedIn = false, isUserLoggedIn = false, username = ""}) {
    // isDonorLoggedIn = user?.role === "donor";
   //  isUserLoggedIn = user?.role === "user";
    const [isOpen, setIsOpen] = useState(false);

    //const [dresses, setDresses] = useState(initialDressList);

    return (
        <div>
            <div className="recentItem">
                <Link to="/recent-dresses" className="recent-item">
                    Recent Dresses
                </Link>
                <div className="login-options">
                    <button className="dropdown" onClick={() => setIsOpen(!isOpen)}>
                        Login Option {isOpen ? '▲' : '▼'}
                    </button>

                    {isOpen && (
                        <div className="dropDownMenu">
                            <Link to="/donor-login" className="dropdown-item-donor">
                                Donor Login
                            </Link>
                            <Link to="/user-login" className="dropdown-item-user">
                                User Login
                            </Link>
                        </div>
                    )}
                </div>

            </div>

            <section>
                <div className="slogan">
                    <h2>----- Share your heritage ------ </h2>

                </div>


                <div className="categeries">
                    <Link to={isDonorLoggedIn ? "/add-dress" : "/donor-login"} className="donate">
                        Donate dresses
                    </Link>
                    <Link to={isUserLoggedIn ? "/browse-dresses" : "/user-login"} className="find">
                        Find and Request Dress
                    </Link>
                </div><br></br>

                <div className="images">

                    <img src="/closet_dress1.jpg" alt="closet_dress" />
                    <img src="/closet.jpg" alt="closet" />
                    <img src="/closet_dress2.jpg" alt="closet_dress" />

                </div><br></br>
            </section>
            <div>
                <p className="connect-family">Connect families to pass down and share traditional children cloths</p><br />
            </div>


        </div>

    );
}

export default LandingPage;