import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Typography } from "@mui/material";
import {signUp} from "../../actions/api"

import './Signup.css';

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try{
      console.log(username,email,password);
      const signUpResult=await signUp(username,email,password);
      setError(signUpResult);
      const timer=setTimeout(()=>{
        navigate("/login");
      },1000);
      
    }
    catch{
      setError("Something went wrong please retry");
    }


    }

  return (
    <div className="signup-container">
      <div className="signup-content">
      <img src="/assets/images/logonew.ico" alt="Logo" className="signup-logo"/>
        <h2>Create Your Account</h2>
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
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <button type="submit" className="submit-button">Create Login</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <div className="alternative-action">
          <p>Already have an account?</p>
          <Link to="/login" className="login-link">Login Here</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;