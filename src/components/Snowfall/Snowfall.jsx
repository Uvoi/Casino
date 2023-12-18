// Snowfall.js
import React, { useEffect } from 'react';
import './SnowfallStyles.css';

const Snowfall = ({ children }) => {
  useEffect(() => {
    const createSnowflake = () => {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      snowflake.innerHTML = '❄'; // Используйте символ ❄

      const startX = Math.random() * window.innerWidth;
      const endX = Math.random() * window.innerWidth;

      snowflake.style.left = `${startX}px`;
      snowflake.style.fontSize = `${Math.random() * 20 + 10}px`; // Размер символа

      // Используйте ref, чтобы получить доступ к контейнеру снежинок
      try {
        const snowflakesContainer = document.getElementById('snowflakes-container');
        snowflakesContainer.appendChild(snowflake);
      } catch (error) {
        
      }


      snowflake.addEventListener('animationiteration', () => {
        snowflake.style.left = `${endX}px`;
      });

      setTimeout(() => {
        snowflake.remove();
      }, 6000); // Удалить снежинку через 6 секунд
    };

    // Создайте новую снежинку каждые 200 миллисекунд (уменьшил интервал)
    const snowfallInterval = setInterval(createSnowflake, 100);

    // Очистите интервал при размонтировании компонента
    return () => clearInterval(snowfallInterval);
  }, []);

  return (
    <div className="snowfall">
      <div id="snowflakes-container"> {/* Добавлен контейнер для снежинок */}
        {children}
      </div>
    </div>
  );
};

export default Snowfall;
