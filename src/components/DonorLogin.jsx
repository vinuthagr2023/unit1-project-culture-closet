import { useState } from "react";

function DonorLogin() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    return (
        <div>
            <form>
                <label> Name:
                    <input type="text" name="name" // Matches formData key
                        value={formData.name}
                        onChange={handleChange}
                    />
                </label><br />
                <label> Email:
                    <input type="email" name="email" // Matches formData key
                        value={formData.email}
                        onChange={handleChange}
                    />
                </label>
            </form>
        </div>
    )
}

export default DonorLogin;