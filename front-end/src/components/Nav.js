import React from "react";
import { Link, useNavigate } from "react-router-dom";
import headerLogo from "../assets/images/logo_color.svg";
import "../css/NavBar.css";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="navbar-wrapper">
      <div className="home-section">
        <Link to="/" className="home-btn">
          <img src={headerLogo} alt="" className="main-logo" />
        </Link>
      </div>
      <div className="categorys-section">
        <div>
          <Link to="/breakfast" className="categorys-btn">
            Breakfast
          </Link>
        </div>
        <span class="dot"></span>
        <div>
          <Link to="/brunch" className="categorys-btn">
            Brunch
          </Link>
        </div>
        <span class="dot"></span>
        <div>
          <Link to="/lunch" className="categorys-btn">
            Lunch
          </Link>
        </div>
        <span class="dot"></span>
        <div>
          <Link to="/dinner" className="categorys-btn">
            Dinner
          </Link>
        </div>
      </div>
      <div className="secured-section">
        {auth ? (
          <>
            <Link to="/my-recipes">
              <span className="MyRecipes-navbar">
                <u>My Recipes</u>
              </span>
            </Link>

            <span class="dot_1"></span>

            <Link to="/my-profile">
              <span className="MyProfile-navbar">
                <u>My Profile</u>
              </span>
            </Link>

            <span class="dot_1"></span>

            <Link onClick={logout} to="/login">
              <span className="logout-navbar">
                <u>Log Out</u>
              </span>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="login-btn cursor-pointer">Log In</button>
            </Link>

            <span className="or">or</span>

            <Link to="/signup">
              <button className="singup-btn cursor-pointer">
                Create Acount
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
