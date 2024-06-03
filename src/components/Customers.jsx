import React, { useEffect, useState } from "react";
import users from "./UserData";
import "./Customers.css";

export const Customers = () => {
  return (
    <div className="user-container">
      <div className="user-wrapper">
        <h1 className="user-heading">"Our Happy Customers"</h1>
        <div className="image-row">
          {users.map((user) => (
            <img
              key={user.id}
              className="user-image"
              src={user.image}
              alt={user.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
