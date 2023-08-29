// Login.js
import React from "react";
import { useAuth } from "../contexts/AuthContext";

function Login() {
    const { login } = useAuth();

    const handleLogin = () => {
        // Perform login logic, e.g., API call
        // After successful login, call `login()`
        login();
    };

    return (
        <div>
            <h2>Login Page</h2>
            <button onClick={handleLogin}>Log In</button>
        </div>
    );
}

export default Login;
