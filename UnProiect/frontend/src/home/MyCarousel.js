import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';

const MyCarousel = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('/api/books') // Replace with your own API endpoint
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1
  };

  return (
    <Slider {...settings}>
      {books.map(book => (
        <div key={book.id}>
          <h3>{book.title}</h3>
          <img src={book.imageUrl} alt={book.title} />
        </div>
      ))}
    </Slider>
  );
};

export default MyCarousel;