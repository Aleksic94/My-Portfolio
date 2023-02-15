import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postAsync } from "../services/http-client";
import "../css/Login.css";
import CardPopUp from "./CardPopUp";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/my-profile");
    }
  }, []);

  const handleLogin = async (event) => {
    if (!email || !password) {
      setError(true);
      return false;
    }
    event.preventDefault();
    try {
      let result = await postAsync("/login", {
        email: email,
        password: password,
      });
      if (result.email) {
        localStorage.setItem("user", JSON.stringify(result));
        navigate("/my-profile");
      } else {
        alert("Please enter correct details");
      }
    } catch {
      alert("Please enter correct details");
    }
  };

  return (
    <div>
      <div className="title-container">
        <h1 className="title">Log In</h1>
        <p className="login_line"></p>
      </div>
      <div className="login-container">
        <div className="description-content">
          <h1 className="welcome_1">
            Welcome to <span className="welcome_2">Baby's</span>
          </h1>
          <p className="welcome-quote">
            All the Lorem Ipsum generators on the Internet tend to repeat
            predefined chunks as necessary, making this the first true generator
            on the Internet. It uses a dictionary of over 200 Latin words,
            combined with a handful of model sentence structures, to generate
            Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is
            therefore always free from repetition, injected humour, or
            non-characteristic words etc.
          </p>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <label className="input-label">Email</label>
          <input
            className="input-box"
            type="email"
            for="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && !email && (
            <span className="invalid-input">Please enter data!</span>
          )}
          <label className="input-label">Password</label>
          <input
            className="input-box"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && !password && (
            <span className="invalid-input">Please enter data!</span>
          )}
          <button
            onClick={handleLogin}
            className="submit-btn cursor-pointer"
            type="submit"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
