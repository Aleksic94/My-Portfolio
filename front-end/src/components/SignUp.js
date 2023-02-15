import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postAsync } from "../services/http-client";
import "../css/SignUp.css";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/my-profile");
    }
  }, []);

  const collectData = async () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !birthday ||
      !password ||
      !repeatPassword
    ) {
      setError(true);
      return false;
    }

    let result = await postAsync("/signup", {
      firstName,
      lastName,
      email,
      birthday,
      password,
      repeatPassword,
    });
    if (result) {
      navigate("/login");
    } else {
      alert("Please enter correct data !");
    }
  };

  return (
    <div className="wrapper">
      <div className="page-header">
        <h1 className="page-title">Create Account</h1>
        <p className="horizontall_line"></p>
      </div>
      <div className="container">
        <div className="content-1">
          <span className="span-title1">Create Your</span>
          <span className="span-title2">account</span>
          <p className="text">
            All the Lorem Ipsum generators on the Internet tend to repeat
            predefined chunks as necessary, making this the first true generator
            on the Internet. It uses a dictionary of over 200 Latin words,
            combined with a handful of model sentence structures, to generate
            Lorem Ipsum which looks reasonable.
          </p>
        </div>
        <div className="content-2">
          <div className="firstColumn-inputs">
            <label className="labels">First Name</label>
            <input
              className="inputBox"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {error && !firstName && (
              <span className="invalid-input">Enter valid data!</span>
            )}
            <label className="labels" for="e-mail">
              Enter email
            </label>
            <input
              className="inputBox"
              type="email"
              for="e-mail"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && !email && (
              <span className="invalid-input">Enter valid data!</span>
            )}
            <label className="labels">Password</label>
            <input
              className="inputBox"
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && !password && (
              <span className="invalid-input">Enter valid data!</span>
            )}
            {password !== repeatPassword && (
              <span className="invalid-input">Your password doesn't match</span>
            )}
            <button
              onClick={collectData}
              className="create-btn cursor-pointer"
              type="button"
            >
              Create Account
            </button>
          </div>
          <div className="secondColumn-inputs">
            <label className="labels">Last Name</label>
            <input
              className="inputBox"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {error && !lastName && (
              <span className="invalid-input">Enter valid data!</span>
            )}

            <label className="labels" for="birthday">
              Birthday:
            </label>
            <input
              className="inputBox"
              type="date"
              id="birthday"
              name="birthday"
              placeholder="Enter Birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
            {error && !birthday && (
              <span className="invalid-input">Enter valid data!</span>
            )}

            <label className="labels"> Repeat Password</label>
            <input
              className="inputBox"
              type="password"
              placeholder="Repeat your Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            {error && !repeatPassword && (
              <span className="invalid-input">Enter valid data!</span>
            )}
            {password !== repeatPassword && (
              <span className="invalid-input">
                Your password doesen't match
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
