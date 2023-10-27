import React from 'react';
import './DepartmentCard.css';

const DepartmentCard = ({ title, images, link }) => {
  return (
    <div className="department-card">
      <div className="department-card-content">
        <div className="department-card-title">{title}</div>
        <div className="department-card-images">
          {images.slice(0, 1).map((image, index) => (
            <div className="department-card-image-container" key={index}>
              <div className="image-and-link">
                <img className="department-card-image-large" src={image} alt="" />
                <a href={link} className="department-card-link">
                  Vezi mai multe
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



export default DepartmentCard;
