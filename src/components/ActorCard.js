import React from 'react';
import './ActorCard.css';

function ActorCard({ actor, onDetail }) {
  return (
    <div className="actor-card">
      <h2>{actor.name}</h2>
      <p><font>Height:</font> <b>{actor.height}</b></p>
      <p><font>Birth Year:</font> <b>{actor.birth_year}</b></p>
      <button className = "button" onClick={onDetail}>Detail</button>
    </div>
  );
};

export default ActorCard;
