import React from 'react';
import './FashionItems.css';
//150x150
const FashionItems = () => {
  const items = [
    {image: 'https://i.imgur.com/CBOFgnQ.png', text: 'Fuste'},
    {image: 'https://i.imgur.com/hALDXCi.png', text: 'Bluze'},
    {image: 'https://i.imgur.com/OPsQola.png', text: 'Rochii'},
    {image: 'https://i.imgur.com/GSu6Ree.png', text: 'Pantofi'}
  ];

  const links = [
    '#',
    '#',
    '#',
    '#'
  ];

  return (
    <div className="gam-access-card">
      <div className="gam-access-content">
        <div className="gam-access-title">Moda pentru femei</div>
        <div className="gam-access-images">
          {items.map((item, index) => (
            <div className="gam-access-image-container" key={index}>
              <img className="gam-access-image" src={item.image} alt="" />
              <div className="gam-access-image-text">{item.text}</div>
            </div>
          ))}
        </div>
        <a href="#" className="gam-access-link">
          Vezi mai multe
        </a>
      </div>
    </div>
  );
};

export default FashionItems;