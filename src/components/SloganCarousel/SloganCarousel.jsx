import React, { useState, useEffect } from 'react';
import './SloganCarouselStyles.css';
import carousel1 from './images/carousel1.jpg';
import carousel2 from './images/carousel2.jpg';
import carousel3 from './images/carousel3.jpg';
import carousel4 from './images/carousel4.jpg';

const SloganCarousel = (props) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const images = [carousel1, carousel2, carousel3, carousel4];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setCurrentImage((prevImage) => (prevImage === images.length - 1 ? 0 : prevImage + 1));
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [images.length]);

  const handleImageLoad = () => {
    setIsAnimating(false);
  };

  const handleClick = (direction) => {
    setIsAnimating(true);
    if (direction === 'prev') {
      setCurrentImage((prevImage) => (prevImage === 0 ? images.length - 1 : prevImage - 1));
    } else if (direction === 'next') {
      setCurrentImage((prevImage) => (prevImage === images.length - 1 ? 0 : prevImage + 1));
    }
  };

  return (
    <div id="slogan-carousel" className={`carousel${isAnimating ? ' animating' : ''}`}>
      <img
        src={images[currentImage]}
        alt={`Image ${currentImage + 1}`}
        className={`current-image${isAnimating ? ' animating' : ''}`}
        onLoad={handleImageLoad}
      />
      <button className="prev-button" onClick={() => handleClick('prev')}>
        {/* ← */}
      </button>
      <button className="next-button" onClick={() => handleClick('next')}>
        {/* → */}
      </button>
    </div>
  );
};

export default SloganCarousel;