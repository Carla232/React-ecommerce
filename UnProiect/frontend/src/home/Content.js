import React from 'react';
import Carousel from './Carousel';
import './Carousel.css';

const Content = () => {
  const images = [
    'https://i.imgur.com/264qykN.png',//800x300
    'https://blog.shift4shop.com/hubfs/Starting%20a%20Successful%20Clothing%20Line.jpg',
    'https://i.imgur.com/264qykN.png',
    'https://blog.shift4shop.com/hubfs/Starting%20a%20Successful%20Clothing%20Line.jpg',
  ];

  return (
    <div className="app">
      <Carousel images={images} />
    </div>
  );
};

export default Content;
