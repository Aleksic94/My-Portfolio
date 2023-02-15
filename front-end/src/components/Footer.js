import React from "react";
import footerLogo from "../assets/images/logo_white.svg";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-wrapper">
        <section className="footerLogo">
          <img src={footerLogo} alt="" className="logo-img" />
        </section>
        <section className="categorys-container">
          <div className="category">Breakfast</div>
          <span className="dot-footer"></span>
          <div className="category">Brunch</div>
          <span className="dot-footer"></span>
          <div className="category">Lunch</div>
          <span className="dot-footer"></span>
          <div className="category">Dinner</div>
        </section>
        <section className="copyrght">
          <div>Baby's Food Place </div>
          <div>copyright © 2023</div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
