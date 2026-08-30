import { useState } from "react";

import "./AboutPage.css";

function AboutPage() {
    return (
        <div className="about-container">
            <h2 className="about-title">About Culture Closet</h2>

            <p className="about-text">
                Culture Closet connects generous donors with local families to give gently used
                children's dresses and traditional garments a beautiful second life. We make
                the clothing donation process seamless, transparent, and impactful—ensuring
                every piece helps a child feel confident, valued, and celebrated.
            </p>

            <h3 className="about-subtitle">Why I Built This</h3>

            <p className="about-text">
                I created Culture Closet to solve a common problem: beautiful, high-quality,
                and culturally rich children's dresses being outgrown long before their time.
                This platform is designed to make giving back effortless. By providing secure,
                tailored login options for community donors, users, and administrative teams,
                we streamline the process of matching premium children's garments with the
                families and organizations that need them most.
            </p>
        </div>

    )
}

export default AboutPage;