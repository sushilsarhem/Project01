import React from "react";
import img7 from "./Images/krakenimages-376KN_ISplE-unsplash.jpg";
import "./Sections.css";

export const Sections = () => {
  return (
    <div className="main-container">
      <h1>Why Choose Us?</h1>
      <div className="section-container">
        <img className="section-image" src={img7} alt="section image" />
        <p>
          "At EventMaster, we specialize in making your event planning
          stress-free and memorable. Our comprehensive platform offers
          streamlined scheduling, personalized planning tools, and exceptional
          vendor management, ensuring your event is a stunning success."
        </p>
      </div>
    </div>
  );
};
