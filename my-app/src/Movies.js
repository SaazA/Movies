import React, { useState, useEffect } from 'react';

function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/movies')
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="App">
      <h1>Movies</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie._id}>
            <h3>{movie.moviename}</h3>
            <img src={movie.image} alt={movie.moviename} />
            <a href={movie.link} target="_blank" rel="noopener noreferrer">Watch Now</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Movies;
