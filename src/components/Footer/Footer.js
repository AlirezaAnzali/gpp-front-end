import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__info">
        <p className="footer__designer">
          Designed and Developed by Alireza Anzali
        </p>
        <p className="footer__date">2023</p>
        <p className="footer__rights">
          &copy; 2023 Alireza Anzali. All rights reserved. Capstone project for
          Brainstation.
        </p>
      </div>
    </footer>
  );
};

export default Footer;