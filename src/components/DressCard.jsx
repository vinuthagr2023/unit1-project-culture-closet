import React from "react";
function DressCard({dress}){
    return(
        <div className="item-card">
            <h4>Dress{dress.id} Details</h4>
            <p><strong>ItemName:</strong>{dress.itemName}</p>
            <p><strong>Gender:</strong>{dress.gender}</p>
            <p><strong>Age:</strong> {dress.age}</p>

        </div>
    );
}

export default DressCard;