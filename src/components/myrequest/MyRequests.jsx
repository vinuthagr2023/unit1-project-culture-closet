import { Link } from "react-router-dom";
import "./MyRequests.css";

function MyRequests({ requestedDresses = [],user }) {
    // Display link to login if user is logged out
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
        <div className="not-req" >
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
                    {requestedDresses.map((dress, index) =>
                    (
                        <div key={dress.id || index} className="dress-card">
                            {dress.imageUrl ? (
                                <img src={dress.imageUrl} alt={dress.itemName} />
                            ) : (
                                <span>No Image Provided</span>
                            )}
                            <h3>{dress.itemName}</h3>
                            <p><strong>Style:</strong> {dress.traditionStyle}</p>
                            <p><strong>Gender:</strong> {dress.gender}</p>
                            <p><strong>Age:</strong> {dress.age}</p>
                            <p><strong>Size:</strong> {dress.size}</p>
                            <p><strong>Condition:</strong> {dress.condition}</p>
                            <p><strong>Status:</strong> <span>Pending Pickup</span></p>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
}


export default MyRequests;