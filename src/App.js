import React, { useEffect, useState } from 'react';
import './App.css';
import logo from './logo.svg';
import death from './death_star.png';
import ActorCard from './components/ActorCard';
import ActorDetail from './components/ActorDetail';

function App() {
  const [actors, setActors] = useState([]);
  const [selectedActor, setSelectedActor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://swapi.py4e.com/api/people/')
      .then(response => response.json())
      .then(data => {
        setActors(data.results);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="App">
      <header className = "App-header">
        <h1>Actor List </h1>
      <img src={logo} className="App-logo" alt="logo" />
      <img src={death} className='App-death' alt="star_wars_star"/>
      <div className="actor-list">
        {actors.map(actor => (
          <ActorCard key={actor.name} actor={actor} onDetail={() => setSelectedActor(actor)} />
        ))}
      </div>
      {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        </header>
        {selectedActor && <div className="overlay" onClick={() => setSelectedActor(null)}></div>}
        {selectedActor && <ActorDetail actor={selectedActor} onClose={() => setSelectedActor(null)} />}
    </div>
  );
};

export default App;
