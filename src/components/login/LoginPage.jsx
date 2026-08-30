import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage({ onLogin }) {
    // const [usernameInput,setUsernameInput] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLoginClick = (e) => {
        e.preventDefault();
        const name = formData.name.trim();
        const email = formData.email.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address containing '@' and a domain (e.g. name@example.com).");
            return;
        }

        if (!name || !email) {
            alert("Please fill out both Name and Email!");
            return;
        }
        // Pass validated name to parent state
        if (typeof onLogin === "function") {
            onLogin({ name, email });
        }
        navigate("/");
    };


    return (
        <div className="login-container">
            <h2> User Login </h2>
            <form onSubmit={handleLoginClick}>
                <label> Usename:
                    <input type="text" name="name" value={formData.name} onChange={handleChange}
                        placeholder="Enter your name"
                        required />
                </label><br />
                <label> Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange}
                        placeholder="Enter your email"
                        required />
                </label><br />
                <button type="submit" className="Dlogin-button">
                    Login
                </button>

            </form>
        </div>
    );
}

export default LoginPage;