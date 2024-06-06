import React, { useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Typography } from "@mui/material";
import { userLogin } from "../../actions/api";
import './Login.css';

function Login() {
  const cookie=new Cookies();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log(username, password);
      const loginResult = await userLogin(username, password);
      if (loginResult.token) {
        console.log("hello");
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + 7200000); // Adjust the expiration time if needed
        console.log(expirationDate);
        cookie.set("user", loginResult.token, { expires: expirationDate });
      } else {
        setError(loginResult);
      }
      if (loginResult === "Login Successful") {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch {
      setError("Something went wrong, please retry");
    }
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <img src="/assets/images/logonew.ico" alt="Logo" className="login-logo" />
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
        <Typography variant="body1" style={{ color: "black", textAlign: "center" }}>OR</Typography>
        <br />
        {error && <Typography variant="body2" className="error-message">{error}</Typography>}
        <Link to="/signup" className="signup-link">Signup</Link>
      </div>
    </div>
  );
}

export default Login;
