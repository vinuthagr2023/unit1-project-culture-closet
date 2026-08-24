import { useState } from "react";
import { Link } from "react-router-dom";

function BrowseDresses({ dresses }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGender, setSelectedGender] = useState("all");

    const filteredDresses = dresses.filter((dress) => {
        const matchesSearch =
            dress.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dress.traditionStyle.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesGender =
            selectedGender === "all" || dress.gender.toLowerCase === selectedGender.toLowerCase();
        return matchesSearch && matchesGender;
    });

    return (
        <div>
            <h2> Browse Cultural outfits </h2>
            <div>
                <input type="text" placeholder="Search by dress name or cultural style..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} />

                <select value={selectedGender}
                    onChange={(e) => setSelectedGender(e.target.value)}
                >
                    <option value="all">All Genders</option>
                    <option value="girl">Girl</option>
                    <option value="boy">Boy</option>
                </select>
            </div>

            {filteredDresses.length === 0 ? (
                <p>No dresses match your search criteria.</p>
            ) : (
                <div className="dresses-container">
                    {filteredDresses.map((dress) => (
                        <div key={dress.id}>
                            <h3>{dress.itemNname}</h3>
                            <p><strong>Style:</strong>{dress.traditionStyle}</p>
                            <p> <strong>Gender:</strong>{dress.gender}</p>
                            <p> <strong>Age:</strong>{dress.age}</p>
                            <p> <strong>Size:</strong>{dress.size}</p>
                            <p> <strong>Condition:</strong>{dress.condition}</p>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}

export default BrowseDresses;