import React, { useState, useEffect } from "react";

const ImageCarousel = () => {
  const images = [
    "https://bit.ly/43CZs77",

  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Auto-slide the images every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [images]);

  return (
    <header
      className="py-16 px-8 text-center text-white p-5 bg-cover bg-center md:min-h-450"
      style={{
        backgroundImage: `url(${images[currentIndex]})`,
        minHeight: "250px", // Default minHeight for mobile devices
      }}
    >
      {/* Add any content or components inside the header if needed */}
    </header>
  );
};

export default ImageCarousel;
