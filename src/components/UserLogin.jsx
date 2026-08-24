import { useState } from "react";
import { Link } from "react-router-dom";

function UserLogin(){
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
            <h2> User Login </h2>
            <form onSubmit={handleLoginClick}>
                <label> Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </label><br />
                <label> Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange}/>
                </label><br/>
          
                <Link to="/browse-dresses" onClick={handleLoginClick} className="Ulogin-button">
                    Login
                </Link>
            </form> 
        </div>
    );
}

export default UserLogin;