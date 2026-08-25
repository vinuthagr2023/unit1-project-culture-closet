import { useState } from "react";
import { Link } from "react-router-dom";
import AddDress from "./AddDress";

function DonorLogin({onLogin}) {
    const [usernameInput,setUsernameInput] = useState("");
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
        const name = formData.name?formData.name.trim():"";
        const email = formData.email?formData.email.trim():"";

        if(!name || !email){
            if(e&& typeof e.preventDefault==="function"){
                 e.preventDefault();
            }
           alert("Please fill out both Name and Email!");
            return;
        }
        // Pass validated name to parent state
        if(typeof onLogin==="function"){
            onLogin(name); // Pass username to App.jsx state
        }
    };


    return (
        <div className="login-container">
            <h2> Donor Login </h2>
            <form onSubmit={(e)=>e.preventDefault()}>
                <label> Usename:
                    <input type="text" name="name" value={formData.name} onChange={handleChange}
                    placeholder="Enter your name"
                    required />
                </label><br />
                <label> Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange}
                     placeholder="Enter your email"
                    required/>
                </label><br/>
          
                <Link to="/add-dress" onClick={handleLoginClick} className="Dlogin-button">
                    Login
                </Link>
            </form> 
        </div>
    );
}

export default DonorLogin;