import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css"; // Adjust the path based on your folder structure
import loginImage from '../assets/Login.jpg';
import Button from 'react-bootstrap/Button';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Mock login logic
    if (username === "admin" && password === "password") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div  style={{backgroundImage: `url(${loginImage})`,backgroundSize: "cover",backgroundPosition: "center",height: "100vh",display: "flex",justifyContent: "center",alignItems: "center"}}>
        <div className="container">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-center"><Button variant="outline-primary" type="submit">Login</Button></div>
          </form>
        </div>
    </div>
  
  );
};

export default Login;
