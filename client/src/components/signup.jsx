import React, {useState} from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {

    const [name, setName] = useState("");
    const [success, setSuccess] = useState("");
    const [message, setMessage] = useState("");
    const [user, setUser] = useState();

    const handleSubmit = async e => {
        e.preventDefault();

        const body = { name };

        try {
            const result = await axios.post("http://localhost:5000/user/login", body, {
                headers: {'Content-Type': 'application/json'}
            });
            console.log(result.data);
            if(result.data) {
                setMessage("User already Exists");
            } else {
                try {
                    const response = await axios.post("http://localhost:5000/add/user", body, {
                        headers: {'Content-Type': 'application/json'}
                    });
                    console.log(response.data);
                    if(response.data) {
                        setSuccess("Account successfully created");
                        setTimeout(() => {
                            setUser(response.data);
                        }, 1500);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    if(user == null) {
        return(
            <div className="login-form">
                <div className="login-icon">
                <svg xmlns="http://www.w3.org/2000/svg" height="75px" viewBox="0 -960 960 960" width="75px" fill="#e8eaed"><path d="M480-481q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM160-160v-94q0-38 19-65t49-41q67-30 128.5-45T480-420q62 0 123 15.5t127.92 44.69q31.3 14.13 50.19 40.97Q800-292 800-254v94H160Zm60-60h520v-34q0-16-9.5-30.5T707-306q-64-31-117-42.5T480-360q-57 0-111 11.5T252-306q-14 7-23 21.5t-9 30.5v34Zm260-321q39 0 64.5-25.5T570-631q0-39-25.5-64.5T480-721q-39 0-64.5 25.5T390-631q0 39 25.5 64.5T480-541Zm0-90Zm0 411Z"/></svg>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="text" name="name" id="name" required value={name} placeholder="User name" onChange={e => {
                            setName(e.target.value);
                            setMessage("");
                        }} />
                    </div>
                    <div>
                        <button className="login-btn" type="submit">CREATE ACCOUNT</button>
                    </div>
                </form>
                <p className="success">{success}</p>
                <p className="error">{message}</p>
                <div className="sign-up-link">
                    <h4>Already have an account? <a href="/">Sign In</a></h4>
                </div>
            </div>
        );
    } else {
        return (
            <Navigate to={`/${user.id}`} />
        );
    }
}

export default Signup;