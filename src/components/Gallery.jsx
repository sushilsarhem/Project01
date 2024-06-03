import React, { useEffect, useState } from "react";
import "./Gallery.css";

const accKey = import.meta.env.VITE_APP_ACCESS_KEY;

export const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchSearch() {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?page=1&per_page=30&query=Event&client_id=${accKey}`
    );
    const data = await res.json();
    setImages(data.results);
    setLoading(false);
    // console.log(data.results);
  }

  useEffect(() => {
    fetchSearch();
  }, []);

  return (
    <div className="gallery">
      {/* {images.map((image, id) => (
        <img key={image.id} alt={image.title} src={image.urls.small} />
      ))} */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        images.map((image, id) => (
          <img key={image.id} alt={image.title} src={image.urls.small} />
        ))
      )}
    </div>
  );
};
