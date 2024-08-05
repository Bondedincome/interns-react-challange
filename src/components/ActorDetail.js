import React from 'react';
import './ActorDetail.css';

function ActorDetail({ actor, onClose }) {
  return (
    <div className="actor-detail">
      <h2>{actor.name}</h2>
      <p><font>Height:</font> <b>{actor.height}</b></p>
      <p><font>Birth Year:</font> <b>{actor.birth_year}</b></p>
      <p><font>Gender:</font> <b>{actor.gender}</b></p>
      <button className = "button" onClick={onClose}>Close</button>
    </div>
  );
};

export default ActorDetail;
