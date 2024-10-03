import React from "react";
import "./ActorDetail.css";

function ActorDetail({ actor, onClose }) {
	return (
		<div className="actor-detail">
			<h2>{actor.name}</h2>
			<p>
				<font>Height:</font> <b>{actor.height}</b>
			</p>
			<p>
				<font>Birth Year:</font> <b>{actor.birth_year}</b>
			</p>
			<p>
				<font>Gender:</font> <b>{actor.gender}</b>
			</p>
			<p>
				<font>Mass:</font> <b>{actor.mass}</b>
			</p>
			{/* <p><font>Species:</font> <b>{actor.species}</b></p> */}
			<p>
				<font>Hair Color:</font> <b>{actor.hair_color}</b>
			</p>
			<p>
				<font>Skin Color:</font> <b>{actor.skin_color}</b>
			</p>
			<p>
				<font>Films:</font> <b>{actor.films ? actor.films.length : 0}</b>
			</p>
			<p>
				<font>Vehicles:</font>{" "}
				<b>{actor.vehicles ? actor.vehicles.length : 0}</b>
			</p>
			<p>
				<font>Starships:</font>{" "}
				<b>{actor.starships ? actor.starships.length : 0}</b>
			</p>
			{/* <p><font>Homeworld:</font> <b>{actor.homeworld.name}</b></p> */}

			<button className="button" onClick={onClose}>
				Close
			</button>
		</div>
	);
}

export default ActorDetail;
