import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Typography } from "@mui/material";
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/", {
        username,
        password,
      });

      if (response.data === "exist") {
        navigate("/home", { state: { username } });
      } else if (response.data === "notexist") {
        setError("User does not exist. Please sign up.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <img src="/assets/images/logonew.ico" alt="Logo" className="login-logo"/>
        <Typography variant="h5" component="h1">Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
           <button type="submit" className="submit-button">LOGIN</button>
        </form>
        <br />
        <Typography variant="body1">OR</Typography>
        <br />
        <Link to="/signup" className="signup-link">Signup Page</Link>
        {error && <Typography variant="body2" className="error-message">{error}</Typography>}
      </div>
    </div>
  );
}

export default Login;
