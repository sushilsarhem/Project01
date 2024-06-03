import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";

export const Footer = () => {
  return (
    <div className="footer">
      <p>Sarangthem</p>
      <FontAwesomeIcon icon={faCopyright} className="copyright" />
      <p>2021-2024</p>
    </div>
  );
};
