import { Link } from "react-router-dom";
import "./MyRequests.css";

function MyRequests({ requestedDresses = [], user, dresses = [] }) {
       if (!user) {
        return (
            <div className="my-request-container">
                <h2>My Requested Outfits</h2>
                <p id="log-req" >Please log in to view your requested dresses.</p>
                <Link to="/login">
                    Click here for User Login
                </Link>

            </div>
        )
    }
    return (
      <div className="my-request-container">
    <h2>My Requested Dress Details</h2>
    {requestedDresses.length === 0 ? (
        <div className="not-req">
            <p>You have not requested any dresses yet.</p>
            <Link 
                to="/browse-dresses" 
                style={{ fontWeight: "bold", color: "#0d6efd", textDecoration: "underline" }}
            >
                Browse Dresses
            </Link>
        </div>
    ) : (
        <div className="dress-container">
            {requestedDresses.map((item, index) => {
                // 1. Handle if requestedDresses stores raw IDs or full objects
                const itemId = typeof item === "object" && item !== null ? (item.id || item._id) : item;
                
                // 2. Find live version from master list, or fallback to the item itself
                const liveDress = (Array.isArray(dresses) ? dresses.find(d => String(d.id) === String(itemId)) : null) 
                    || (typeof item === "object" ? item : {});

                return (
                    <div key={itemId || index} className="dress-card">
                        {(liveDress.imageUrl || liveDress.image) ? (
                            <img src={liveDress.imageUrl || liveDress.image} alt={liveDress.itemName || liveDress.name || "Dress"} />
                        ) : (
                            <span>No Image Provided</span>
                        )}
                        
                        <h3>{liveDress.itemName || liveDress.name || liveDress.title || "Unnamed Item"}</h3>
                        <p><strong>Style:</strong> {liveDress.traditionStyle || liveDress.style || liveDress.tradition || "N/A"}</p>
                        <p><strong>Gender:</strong> {liveDress.gender || "N/A"}</p>
                        <p><strong>Age:</strong> {liveDress.age || liveDress.ageGroup || "N/A"}</p>
                        <p><strong>Size:</strong> {liveDress.size || "N/A"}</p>
                        <p><strong>Condition:</strong> {liveDress.condition || "N/A"}</p>
                        
                        <p>
                            <strong>Status:</strong>{" "}
                            {liveDress.status === "Not Available" ? (
                                <span style={{ color: "#d9534f", fontWeight: "bold" }}>
                                    ❌ Not Available
                                </span>
                            ) : liveDress.isClaimed ? (
                                <span style={{ color: "#d9534f", fontWeight: "bold" }}>
                                    🔒 Claimed / Not Available
                                </span>
                            ) : (
                                <span style={{ color: "#ffc107", fontWeight: "bold" }}>
                                    Pending Pickup
                                </span>
                            )}
                        </p>
                    </div>
                );
            })}
        </div>
    )}
</div>
    );
}


export default MyRequests;