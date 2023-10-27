import React, { useState, useEffect, useRef } from 'react';
import './Carousel.css';

const Carousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((activeIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [activeIndex, images.length]);

  const handlePrevClick = () => {
    setActiveIndex(activeIndex === 0 ? images.length - 1 : activeIndex - 1);
  };

  const handleNextClick = () => {
    setActiveIndex((activeIndex + 1) % images.length);
  };

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="carousel">
      {images.map((image, index) => (
        <div
          key={index}
          className={`carousel__slide ${index === activeIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
      <button className="carousel__button carousel__button--prev" onClick={handlePrevClick}>
        &#8249;
      </button>
      <button className="carousel__button carousel__button--next" onClick={handleNextClick}>
        &#8250;
      </button>
      <div className="carousel__dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`carousel__dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
