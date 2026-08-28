import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AddDress.css";


function AddDress({ onAddDress,onDeleteDress, user }) {
    const [showForm, setShowForm] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [loginWarning, setLoginWarning] = useState("");
    const [addedDresses, setAddedDresses] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [deleteMessage, setDeleteMessage] = useState("");

    const [formData, setFormData] = useState({
        itemName: '',
        traditionStyle: '',
        gender: "",
        age: '',
        size: '',
        condition: '',
        imageUrl: ""
    });

    const isDonor = user?.role === "donor";
    // Clear all local states when the user logs out
    useEffect(() => {
        if (isDonor) {
            setShowForm(false);
            setLoginWarning("");
        }
        else {
            setAddedDresses([]);
            setSuccessMessage("");
            setDeleteMessage("");
            setLoginWarning(user ? "Only registered donors can post dresses." : "");
            setErrorMessage("");
            setShowForm(false);
        }
    }, [user, isDonor]);

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
        const newDress = {
            ...formData,
            id: Date.now(), // Generate unique ID
        };
        onAddDress(newDress);

        setAddedDresses((prevDresses) => [newDress, ...prevDresses]);
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
        const itemToRemove = addedDresses.find((dress) => dress.id === idToDelete);
        const deletedName = itemToRemove ? itemToRemove.itemName : "Dress";

        setAddedDresses((prevDresses) => prevDresses.filter((dress) => dress.id !== idToDelete));
        
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
            <h2> Donor Portal</h2>
            {loginWarning && (
                <p>{loginWarning}
                    <Link to="/donor-login">Click here to Login</Link>
                </p>
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
                    {addedDresses.length > 0 ? "Add another dress" : "Add a Dress"}
                </button>
            )}

            {showForm && (
                <form onSubmit={handleSubmit} className="add-dress-form">
                    <h3>Fill Dress Details</h3>
                    {/* Inline Validation Error Banner */}
                    {errorMessage && (
                        <p style={{ color: "#e74c3c", fontWeight: "bold", marginBottom: "10px" }}>
                            {errorMessage}
                        </p>
                    )}
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

                    <button type="submit" disabled={!isFormValid}>Submit Dress</button>
                    <button type="button" onClick={() => setShowForm(false)}>
                        Cancel
                    </button>
                </form>

            )}
            {addedDresses.length > 0 && (
                <div className="added-dresses-section">
                    <h3>Your Added Dresses ({addedDresses.length})</h3>
                    {addedDresses.map((dress) => (
                        <div className="dress-preview-card" key={dress.id}>
                            {dress.imageUrl && (<img src={dress.imageUrl} alt={dress.itemName} />)}

                            { /*<p><strong>ID:</strong> {dress.id}</p>*/}
                            <p><strong>Name:</strong> {dress.itemName}</p>
                            <p><strong>Style:</strong>{dress.traditionStyle}</p>
                            <p><strong>Gender:</strong>{dress.gender}</p>
                            <p><strong>Age:</strong>{dress.age}</p>
                            <p><strong>Size:</strong>{dress.size}</p>
                            <button
                                className="delete-card-btn"
                                onClick={() => handleDeleteDress(dress.id)}
                            >
                                Delete
                            </button>

                        </div>

                    ))}
                </div>

            )}
        </div>
    );
}

export default AddDress;