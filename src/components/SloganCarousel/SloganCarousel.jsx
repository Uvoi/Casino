import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SloganCarouselStyles.css';
import carousel1 from './images/carousel1.jpg';
import carousel2 from './images/carousel2.jpg';
import carousel3 from './images/carousel3.jpg';
import carousel4 from './images/carousel4.jpg';

const images = [carousel1, carousel2, carousel3, carousel4];

const SloganCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
  }, [currentIndex]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '90vh' }}>
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          style={{
            width: '100%',
            height: '100%',
            background: `url(${images[currentIndex]})`,
            backgroundSize: 'cover',
            opacity: 1,
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, type: 'tween', ease: [0.54, 0.13, 0.93, 0.99] }}
        />
      </AnimatePresence>

      {/* Ваши кнопки для переключения слайдов */}
      {/* Например, кнопка для предыдущего слайда */}
      <button
        onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)}
        style={{ position: 'absolute', top: '0', left: '0', zIndex: 1, height: '100%', opacity: 0 }}
      >
        Prev
      </button>

      {/* Например, кнопка для следующего слайда */}
      <button
        onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)}
        style={{ position: 'absolute', top: '0', right: '0', zIndex: 1, height: '100%', opacity: 0 }}
      >
        Next
      </button>
    </div>
  );
};

export default SloganCarousel;
