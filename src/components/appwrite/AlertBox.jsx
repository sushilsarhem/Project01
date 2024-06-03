import React from "react";
import "./AlertBox.css";

export const AlertBox = ({ status, redirect }) => {
  return (
    <div className="alert-container">
      <div className="alert-box">
        <p>{status}</p>
        <p>{redirect}</p>
      </div>
    </div>
  );
};
