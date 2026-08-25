import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LandingPage from "./LandingPage";
import dress11 from '../images/kids-dress-image11.jpg';

function AddDress({ onAddDress, user }) {
    const [showForm, setShowForm] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [loginWarning, setLoginWarning] = useState("");
    const [addedDresses, setAddedDresses] = useState([]);

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
        if (!user) {
            setAddedDresses([]);
            setSuccessMessage("");
            setLoginWarning("");
            setShowForm(false);
        }
    }, [user]);

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
        setLastAddedDress(null);

    };
    const handleSubmit = (e) => {
        e.preventDefault();
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

            {!showForm && (
                <button onClick={handleShowForm} className="add-btn">
                    {addedDresses.length > 0 ? "Add another dress" : "Add a Dress"}
                </button>
            )}

            {showForm && (
                <form onSubmit={handleSubmit} className="add-dress-form">
                    <h3>Fill Dress Details</h3>
                    <label>Item Name:
                        <input type="text" name="itemName" value={formData.itemName} onChange={handleChange}
                            required />
                    </label><br />
                    <label>Culture Style:
                        <input type="text" name="traditionStyle" value={formData.traditionStyle} onChange={handleChange}
                            required />
                    </label><br />
                    <label>Gender:
                        <select name="gender" value={formData.gender} onChange={handleChange}>
                            <option value="" disabled>Select Gender</option>
                            <option value="girl">Girl</option>
                            <option value="boy">Boy</option>
                        </select><br />
                    </label>
                    <label>Age:
                        <input type="number" name="age" value={formData.age} onChange={handleChange}
                            required /><br />
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
                        <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange}
                        />

                    </label>

                    <button type="submit">Submit Dress</button>
                    <button type="button" onClick={() => setShowForm(false)}>
                        Cancel
                    </button>
                </form>

            )}
            {addedDresses.length > 0 && (
                <div>
                    <h3>Your Added Dresses ({addedDresses.length})</h3>
                    {addedDresses.map((dress) => (
                        <div
                            key={dress.id}>
                            {dress.imageUrl && (<img src={dress.imageUrl} alt={dress.itemName} />)}

                            <p><strong>ID:</strong> {dress.id}</p>
                            <p><strong>Name:</strong> {dress.itemName}</p>
                            <p><strong>Style:</strong>{dress.traditionStyle}</p>
                            <p><strong>Gender:</strong>{dress.gender}</p>
                            <p><strong>Age:</strong>{dress.age}</p>
                            <p><strong>Size:</strong>{dress.size}</p>

                        </div>

                    ))}
                </div>

            )}
        </div>
    );
}

export default AddDress;