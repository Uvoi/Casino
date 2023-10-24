import React, { useState, useEffect } from 'react';
import './SloganCarouselStyles.css';
import bm1 from './images/bauman1.jpg';
import bm2 from './images/bauman2.jpg';
import bm3 from './images/bauman3.jpg';

const SloganCarousel = (props) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const images = [bm1, bm2, bm3];

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
        ←
      </button>
      <button className="next-button" onClick={() => handleClick('next')}>
        →
      </button>
    </div>
  );
};

export default SloganCarousel;