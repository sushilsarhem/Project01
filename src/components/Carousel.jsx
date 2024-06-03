import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import data from "./images";
import "./Carousel.css";

export const Carousel = () => {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      if (slide < data.length - 1) {
        setSlide(slide + 1);
      } else {
        slide === data.length - 1;
        setSlide(0);
      }
    }, 1500);
    return () => clearInterval(slideInterval);
  }, [slide]);

  function goLeft() {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  }

  function goRight() {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  }

  return (
    <>
      <div className="carousel-container">
        {data.map((item, idx) => (
          <img
            key={item.id}
            src={item.img}
            alt={item.title}
            className={slide === idx ? "show-slide" : "hidden"}
          />
        ))}
      </div>
      <div className="nav-arrows">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="left-arrow"
          onClick={goLeft}
        />
        <FontAwesomeIcon
          icon={faArrowRight}
          className="right-arrow"
          onClick={goRight}
        />
      </div>
      <div className="nav-circle">
        {data.map((item, idx) => (
          <FontAwesomeIcon
            className={`circle-icon ${
              slide === idx ? "active-indicator" : "inactive-indicator"
            }`}
            icon={faCircle}
            key={item.id}
            onClick={() => setSlide(idx)}
          />
        ))}
      </div>
    </>
  );
};
