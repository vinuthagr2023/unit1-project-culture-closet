import { useState } from "react";
import { Link } from "react-router-dom";


function UserLogin({onLogin}){
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
            onLogin({ name, email, role: "user" });
        }
    };


    return (
        <div className="login-container">
            <h2> User Login </h2>
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
          
                <Link to="/browse-dresses" onClick={handleLoginClick} className="Ulogin-button">
                    Login
                </Link>
            </form> 
        </div>
    );
}

export default UserLogin;