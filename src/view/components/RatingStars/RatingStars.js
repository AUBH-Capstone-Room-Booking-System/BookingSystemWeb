import React from 'react';

const RatingStars = ({ rating ,size}) => {
  const maxStars = 5;
  const goldStars = Math.round(rating); // Round to the nearest whole number

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= maxStars; i++) {
      if (i <= goldStars) {
        stars.push(<span key={i} className="gold-star" style={{color:"gold"}}>&#9733;</span>);
      } else {
        stars.push(<span key={i} className="grey-star">&#9733;</span>);
      }
    }

    return stars;
  };

  return <div className="rating-stars" style={{fontSize:size}}>{renderStars()}</div>;
};

export default RatingStars;