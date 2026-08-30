import React, { useState } from "react";
import { Link } from "react-router-dom";
//import initialDressList from "../../data/mockData";
import "./LandingPage.css";

function LandingPage({ isLoggedIn = false, username = "" }) {

      return (
        <div>
           

            <section>
                <div className="slogan">
                    <h2>----- Share your heritage ------ </h2>

                </div>


                <div className="categeries">
                    <Link to={isLoggedIn ? "/add-dress" : "/login"} className="donate">
                        Donate dresses
                    </Link>
                    <Link to={isLoggedIn ? "/browse-dresses" : "/login"} className="find">
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