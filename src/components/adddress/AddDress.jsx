import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./AddDress.css";


function AddDress({ onAddDress, onDeleteDress, onUpdateDress, user, dresses }) {
    console.log("Current user value:", user, "Type:", typeof user);
    const [showForm, setShowForm] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [loginWarning, setLoginWarning] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [deleteMessage, setDeleteMessage] = useState("");

    const currentUsername = user?.username || user?.name || user?.email || (typeof user === 'string' ? user : null);
    const useDresses = dresses.filter(dress =>
        dress.donor === currentUsername ||
        dress.donor === user?.username ||
        dress.donor === user?.name ||
        !dress.donor
    );

    console.log("Logged-in User Object:", user);
    console.log("All Dresses in App:", dresses);

    const [formData, setFormData] = useState({
        itemName: '',
        traditionStyle: '',
        gender: "",
        age: '',
        size: '',
        condition: '',
        imageUrl: ""
    });


    // Clear all local states when the user logs out
    useEffect(() => {
        if (user) {
            setShowForm(false);
            setLoginWarning("");
        }
        else {
            setSuccessMessage("");
            setDeleteMessage("");
            setLoginWarning(user ? "Only registered donors can post dresses." : "");
            setErrorMessage("");
            setShowForm(false);
        }
    }, [user]);

    const isFormValid = Boolean(
        formData.itemName.trim() &&
        formData.traditionStyle.trim() &&
        formData.gender.trim() &&
        formData.age.trim() &&
        formData.size.trim() &&
        formData.condition.trim() &&
        formData.imageUrl.trim()
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleShowForm = () => {
        if (!user) {
            setLoginWarning("Please login to add a dress!");
            return;
        }
        setLoginWarning("");
        setShowForm(true);
        setSuccessMessage("");
        setErrorMessage("");
        setDeleteMessage("");
        //setLastAddedDress(null);

    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid) {
            setErrorMessage("Please fill out all fields and select a photo before submitting.");
            return;
        }
        if (typeof onAddDress !== "function") {
            console.error("onAddDress prop was not passed correctly to AddDress component.");
            return;
        }
        const assignedDonor = user?.username || user?.name || user?.email || (typeof user === 'string' ? user : "User");

        const newDress = {
            ...formData,
            id: Date.now(),
            donor: assignedDonor,
            isRequested: false,
        };
        onAddDress(newDress);


        console.log('New dress submitted:', newDress);
        setSuccessMessage('Dress added successfully!');
        setErrorMessage("");
        setDeleteMessage("");

        //Reset form
        setFormData({
            itemName: "",
            traditionStyle: "",
            gender: "",
            age: "",
            size: "",
            condition: '',
            imageUrl: "",
        });

        setShowForm(false);
    }

    const handleDeleteDress = (idToDelete) => {
        const itemToRemove = dresses.find((dress) => dress.id === idToDelete);
        const deletedName = itemToRemove ? itemToRemove.itemName : "Dress";

        // Show deletion message and clear other status messages
        setDeleteMessage(`"${deletedName}" deleted successfully.`);
        setSuccessMessage("");
        setErrorMessage("");

        if (typeof onDeleteDress === "function") {
            onDeleteDress(idToDelete);
        }
    };

    return (
        <div className="add-dress-container">
            <h2> Donate Dresses </h2>
            {loginWarning && (
                <p>{loginWarning}
                    <Link to="/login">Click here to Login</Link>
                </p>
            )}
            {errorMessage && (
                <p className="error-banner">{errorMessage}</p>
            )}
            {successMessage && (
                <p style={{ color: "green", fontWeight: "bold" }}>{successMessage}</p>
            )}
            {deleteMessage && (
                <p className="delete-banner">
                    {deleteMessage}
                </p>
            )}
            {!showForm && (
                <button onClick={handleShowForm} className="add-btn">
                    {dresses.length > 0 ? "Add more dress" : "Add Dress"}
                </button>
            )}

            {showForm && (
                <form onSubmit={handleSubmit} className="add-dress-form">
                    <h3>Fill Dress Details</h3>
                    {/* Inline Validation Error Banner */}

                    <label>Item Name:
                        <input type="text" name="itemName" value={formData.itemName} onChange={handleChange}
                            required />
                    </label><br />
                    <label>Culture Style:
                        <input type="text" name="traditionStyle" value={formData.traditionStyle} onChange={handleChange}
                            required />
                    </label><br />
                    <label>Gender:
                        <select name="gender" value={formData.gender} onChange={handleChange} required>
                            <option value="" disabled>Select Gender</option>
                            <option value="girl">Girl</option>
                            <option value="boy">Boy</option>
                        </select><br />
                    </label>
                    <label>Age:
                        <select name="age" value={formData.age} onChange={handleChange} required>
                            <option value="all">All Ages</option>
                            <option value="0-2 years">0-2 years</option>
                            <option value="3-5 years">3-5 years</option>
                            <option value="6-8 years">6-8 years</option>
                            <option value="9-12 years">9-12 years</option>
                        </select><br />
                    </label>
                    <label>Size:
                        <input type="text" name="size" value={formData.size} onChange={handleChange}
                            required /><br />
                    </label>
                    <label>Codition:
                        <input type="text" name="condition" value={formData.condition} onChange={handleChange}
                            required /><br />
                    </label>
                    <label>Photo:
                        <input type="file" accept="image/*" onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                // Converts local computer file into a viewable browser URL
                                const localImageUrl = URL.createObjectURL(file);
                                setFormData((prev) => ({
                                    ...prev,
                                    imageUrl: localImageUrl,
                                }));
                                setErrorMessage("");
                            }
                        }}
                        />

                    </label><br />

                    <button type="submit" >Submit Dress</button>
                    <button type="button" onClick={() => setShowForm(false)}>
                        Cancel
                    </button>
                </form>

            )}
            {useDresses.length > 0 && (
                <div className="added-dresses-section">
                    <h3>Your Added Dresses ({useDresses.length})</h3>
                    {useDresses.map((dress) => (
                        <div className="dress-preview-card" key={dress.id}>
                            {dress.imageUrl && (<img src={dress.imageUrl} alt={dress.itemName} />)}

                            <p><strong>Name:</strong> {dress.itemName}</p>
                            <p><strong>Style:</strong>{dress.traditionStyle}</p>
                            <p><strong>Gender:</strong>{dress.gender}</p>
                            <p><strong>Age:</strong>{dress.age}</p>
                            <p><strong>Size:</strong>{dress.size}</p>
                            {dress.status === "Not Available" ? (
                                <div style={{ color: "#d9534f", fontWeight: "bold", margin: "10px 0" }}>
                                    ❌ Marked as Not Available
                                </div>
                            ) : dress.isRequested ? (
                                        <div style={{ margin: "10px 0" }}>
                                            <div style={{ color: "#d9534f", fontWeight: "bold", marginBottom: "8px" }}>
                                                🔔 Requested by {dress.requestedBy || "a user"}!
                                            </div>

                                            {!dress.isClaimed ? (
                                                <div style={{ display: "flex", gap: "8px" }}>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            if (typeof onUpdateDress === "function") {
                                                                onUpdateDress(dress.id, { isClaimed: true });
                                                            }
                                                        }}
                                                        style={{ backgroundColor: "#28a745", color: "white", padding: "6px 12px", border: "none", borderRadius: "4px", cursor: "pointer" }}
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            if (typeof onUpdateDress === "function") {
                                                                // Clears the request and makes it available again
                                                                onUpdateDress(dress.id, {
                                                                    isRequested: false,
                                                                    requestedBy: null,
                                                                    isClaimed: false,
                                                                    status: "Not Available" // Explicit status flag
                                                                });
                                                            }
                                                        }}
                                                        style={{ backgroundColor: "#d9534f", color: "white", padding: "6px 12px", border: "none", borderRadius: "4px", cursor: "pointer" }}
                                                    >
                                                        Not Available
                                                    </button>
                                                </div>
                                            ) : (
                                                <div style={{ color: "#007bff", fontWeight: "bold", marginTop: "5px" }}>
                                                    🎉 Donated / Claimed Successfully
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div style={{ color: "#28a745", fontWeight: "bold", margin: "10px 0" }}>
                                            ✔ Available
                                        </div>
                                    )
                                }
                                < button
                                className="delete-card-btn"
                            onClick={() => handleDeleteDress(dress.id)}
                            >
                            Delete
                        </button>

                        </div>

            ))}
        </div>

    )
}
        </div >
    );
}

export default AddDress;