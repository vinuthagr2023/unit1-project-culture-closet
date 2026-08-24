import { useState } from "react";
import { Link } from "react-router-dom";
import AddDress from "./AddDress";

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

    const handleLoginClick=(e)=>{
        if(!formData.name || !formData.email){
            e.preventDefault();
            alert("Please fill out both Name and Email!");
        }
    };


    return (
        <div>
            <h2> Donor Login </h2>
            <form onSubmit={handleLoginClick}>
                <label> Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </label><br />
                <label> Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange}/>
                </label><br/>
          
                <Link to="/add-dress" onClick={handleLoginClick} className="Dlogin-button">
                    Login
                </Link>
            </form> 
        </div>
    );
}

export default DonorLogin;