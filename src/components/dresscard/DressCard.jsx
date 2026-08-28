import React from "react";

function DressCard({ dress }) {
    if(!dress)return null;
    return (
        <div className="item-card">
            {dress.imageUrl ? (
                <img
                    src={dress.imageUrl}
                    alt={dress.itemName || "Traditional Dress"}
                    className="item-card-image"
                />
            ) : (
                <div className="no-image-box">No Image Available</div>
            )}

            {/* Display Dress Information */}
            <h4>{dress.itemName || `Dress #${dress.id}`}</h4>
            <p><strong>Style:</strong> {dress.traditionStyle || "N/A"}</p>
            <p><strong>Gender:</strong> {dress.gender || "N/A"}</p>
            <p><strong>Age:</strong> {dress.age || "N/A"}</p>
            <p><strong>Size:</strong> {dress.size || "N/A"}</p>
            {dress.condition && (
                <p><strong>Condition:</strong> {dress.condition}</p>
            )}
        </div>
    );
}

export default DressCard;