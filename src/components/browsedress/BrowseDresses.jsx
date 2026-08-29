import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import "./BrowseDresses.css";

function BrowseDresses({ dresses = [], user, requestedDresses = [], onRequestDress }) {
    const isUserLoggedIn = user?.role === "user";
    const isDonorLoggedIn = user?.role === "donor";

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGender, setSelectedGender] = useState("all");
    const [selectedAge, setSelectedAge] = useState("all");
    const [loginWarning, setLoginWarning] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [requestedIds, setRequestedIds] = useState([]);

    // Automatically clear warning whenever user logs in
    useEffect(() => {
        if (user) {
            setLoginWarning("");
        }
    }, [user]);

    const handleRequestClick = (dress) => {
        // Optional check: ensure user is logged in
        if (!user) {
            setSuccessMessage("");
            setLoginWarning("Please log in first to request a dress!");
            return;
        }
        setLoginWarning("");
        setRequestedIds((prev) => [...prev, dress.id]);

        // Call parent handler if passed
        if (typeof onRequestDress === "function") {
            onRequestDress(dress);
        }
        
        setSuccessMessage(`Request sent for: ${dress.itemName || dress.name || "this dress"}`);
    };

   
    const safeDresses = Array.isArray(dresses) ? dresses : [];

    const filteredDresses = safeDresses.filter((dress) => {
        if (!dress) return false;
        const name = dress.itemName ? dress.itemName.toLowerCase() : "";
        const style = dress.traditionStyle ? dress.traditionStyle.toLowerCase() : "";
        const gender = dress.gender ? dress.gender.toLowerCase() : "";
        const age = dress.age ? dress.age.toString().toLowerCase() : "";
        const search = searchTerm.toLowerCase().trim();

        // Text search matches Name, Style, or Age string
        const matchesSearch = name.includes(search) || style.includes(search);
        // Gender dropdown match
        const matchesGender = selectedGender === "all" || gender === selectedGender.toLowerCase();
        //Age Match
        const matchesAge = selectedAge === "all" || age === selectedAge.toLowerCase();

        return matchesSearch && matchesGender && matchesAge;
    });

    return (
        <div className="browse-container">
            <h2> Browse Cultural Outfits </h2>
            {/* Render Login Warning Banner */}
            {!user && loginWarning && (
                <div className="warning-banner" >
                    <span>{loginWarning} </span>
                    <Link
                        to="/user-login"
                        style={{ fontWeight: "bold", color: "#721c24", textDecoration: "underline" }}
                    >
                        Click here for User Login
                    </Link>
                </div>
            )}

            {/* Render Success Notification Banner */}
            {successMessage && (
                <div className="success-banner">
                    {successMessage}
                </div>
            )}

            {user?.role === "user" && (
                <div className="req-link" style={{ marginBottom: "15px" }}>
                    <Link to="/my-requests">
                        View My Requested dresses
                    </Link>
                </div>
            )}

            {/* Filter Section */}
            <div className="filter-controls">
                <input
                    type="text"
                    placeholder="Search by name, stylee..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select value={selectedGender}
                    onChange={(e) => setSelectedGender(e.target.value)}
                >
                    <option value="all">All Genders</option>
                    <option value="girl">Girl</option>
                    <option value="boy">Boy</option>
                </select>
                <select value={selectedAge} onChange={(e) => setSelectedAge(e.target.value)}>
                    <option value="all">All Ages</option>
                    <option value="0-2 years">0-2 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="6-8 years">6-8 years</option>
                    <option value="9-12 years">9-12 years</option>
                </select>
            </div>

            {filteredDresses.length === 0 ? (
                <p>No dresses match your search criteria.</p>
            ) : (
                <div className="dresses-container">
                    {filteredDresses.map((dress, index) => {

                        // Check if item is already in requestedDresses
                        const isRequested = requestedDresses.some(
                            (item) => item && dress.id && item.id === dress.id
                        );
                        return (
                            <div key={dress.id}>
                                {dress.imageUrl ? (
                                    <img src={dress.imageUrl}
                                        alt={dress.itemName} />
                                ) : (<span>No Image Provided</span>

                                )}
                                <h3>{dress.itemName}</h3>
                                <p><strong>Style:</strong>{dress.traditionStyle}</p>
                                <p> <strong>Gender:</strong>{dress.gender}</p>
                                <p> <strong>Age:</strong>{dress.age}</p>
                                <p> <strong>Size:</strong>{dress.size}</p>
                                <p> <strong>Condition:</strong>{dress.condition}</p>
                                {isUserLoggedIn ? (
                                    <Button
                                        type="button"
                                        onClick={() => handleRequestClick(dress)}
                                        disabled={isRequested || dress.status === "Pending Pickup"} // Disables button when requested
                                    >
                                        {isRequested || dress.status === "Pending Pickup"
                                            ? "Requested"
                                            : "Request Dress"}
                                    </Button>
                                ) : isDonorLoggedIn ? (
                                    <p className="role-note">Switch to a recipient account to request items.</p>
                                ) : (
                                    <Link to="/user-login" className="login-link">
                                        Login to Request
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default BrowseDresses;