import { useState } from "react";
import { Link } from "react-router-dom";

function BrowseDresses({ dresses = [], onRequestDress, user }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGender, setSelectedGender] = useState("all");
    const [selectedAge, setSelectedAge] = useState("all");

    const handleRequestClick = (dress) => {
        // Optional check: ensure user is logged in
        if (!user) {
            alert("Please login first to request a dress!");
            return;
        }

        // Call parent handler if passed
        if (typeof onRequestDress === "function") {
            onRequestDress(dress);
        }

        alert(`Request sent for: ${dress.itemName || dress.name || "this dress"}`);
    };

   // Safely guard against non-array values
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
        <div>
            <h2> Browse Cultural outfits </h2>
            <div>
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
                    {filteredDresses.map((dress) => (
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
                            <button onClick={handleRequestClick}>Request for dress</button>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}

export default BrowseDresses;