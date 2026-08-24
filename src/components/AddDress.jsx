import { useState } from "react";

function AddDress({onAddDress}) {
    const [showForm, setShowForm] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [formData, setFormData] = useState({
        itemName: '',
        traditionStyle: '',
        gender: "",
        age: '',
        size: '',
        condition: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleShowForm = ()=>{
        setShowForm(true);
        setSuccessMessage("");

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
        console.log('New dress submitted:', newDress);
        setSuccessMessage('Dress added successfully!');
        setFormData({
            itemName: "",
            traditionStyle: "",
            gender: "",
            age: "",
            size:"",
            condition: ''
        });

        setShowForm(false);
    }

    return (
        <div>
            <h2> Donor Portal</h2>
            {successMessage && (
                <p style={{ color: "green", fontWeight: "bold" }}>{successMessage}</p>
            )}
            {!showForm && (
                <button onClick={handleShowForm} className="add-btn">
                    Add a Dress
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
                    
                    <button type="submit">Submit Dress</button>
                    <button type="button" onClick={() => setShowForm(false)}>
                        Cancel
                    </button>
                </form>

            )}

        </div>
    )
}

export default AddDress;