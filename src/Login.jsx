import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import './Login.css'; // Import the CSS file

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const navigate = useNavigate(); // Initialize navigate

    function handleUsername(event) {
        let value = event.target.value;
        if (value.length < 6) {
            setUsernameError("Please write a maximum of 6 characters");
        } else {
            setUsernameError("");
        }
        setUsername(value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if (!username || !password) {
            alert("Please provide all fields");
        } else if (usernameError) {
            alert("Please provide correct input");
        } else {
            console.log(username, password);
            setUsername("");
            setPassword("");

            // Navigate to the welcome page with the username
            navigate("/welcome", { state: { username } });
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={submitHandler}>
                <label>Username:</label>
                <input type="text" id="username" onChange={handleUsername} value={username} />
                <span>{usernameError}</span>

                <label>Password:</label>
                <input type="password" onChange={(event) => setPassword(event.target.value)} />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
