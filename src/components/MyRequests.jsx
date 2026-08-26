function MyRequests({ requestedDresses = [] }) {
    return (
        <div className="my-request-container">
            <h2>My Requested Dress Details</h2>
            {requestedDresses.length === 0 ? (
                <p>You have not requested any dresses</p>
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
                            <p><strong>Status:</strong> <span style={{ color: "#e67e22", fontWeight: "bold" }}>Pending Pickup</span></p>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
}

    
    export default MyRequests;