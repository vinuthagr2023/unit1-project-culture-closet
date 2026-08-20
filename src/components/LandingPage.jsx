import React, { useState } from "react";
import { Link } from "react-router-dom";
import dress11 from '../images/kids-dress-image11.jpg';
import dress22 from '../images/kids-dress-imame22.jpg';
import dress4 from '../images/kids-dress-image4.jpg';
import dress6 from '../images/kids-dress-image6.jpg';
import DressCard from "./DressCard";
import dressList from "../data/mockData";
import DonorLogin from "./DonorLogin";
import UserLogin from "./UserLogin";


function LandingPage() {

    const [dresses, setDresses] = useState(dressList);

    const [selectedValue, setSelectedValue] = useState(false);

    return (
        <div className="landingPage">
             <h1> Culture Closet </h1>
            <div className="logo">Heritage kids</div>
            <header>
                <nav className="nav-links">
                    <a href="#home">Home</a><br></br>
                    <a href="#notification">notification</a><br></br>
                    <a href="#profile">Profile</a>
                </nav>
            </header>

            <div className="dropDownOptions">

                <button className="dropdown"
                    onClick={() => setSelectedValue(selectedValue)}
                >Login Option</button>
                {!selectedValue &&
                    <div className="dropDownMenu">
                        <Link to="/donor-login" className="dropdown-item">
                            Donor Login
                        </Link>
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
                    <button className="donate">Donate dresses</button>
                    <button className="find">Find dresses</button>
                </div>
            </section>


            <section className="recentItem">
                <h3>Receently added items</h3>
                <div className="previewGrid">
                    {dresses.map((item) => (
                        <DressCard key={item.id} dress={item} />
                    ))}
                </div>
            </section>

            <footer className="footer">
                <p>---------Spread tradition to others-------------</p>

            </footer>
        </div>

    );
}

export default LandingPage;