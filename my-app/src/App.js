import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({ moviename: '', image: '', link: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/movies')
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({ ...newMovie, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/api/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMovie)
    })
    .then(response => response.json())
    .then(data => {
      setMovies([...movies, data]);
      setNewMovie({ moviename: '', image: '', link: '' });
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div className="App">
      <h1>Movies</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Movie Name:</label>
          <input
            type="text"
            className="form-control"
            name="moviename"
            value={newMovie.moviename}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="text"
            className="form-control"
            name="image"
            value={newMovie.image}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Watch Link:</label>
          <input
            type="text"
            className="form-control"
            name="link"
            value={newMovie.link}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Movie</button>
      </form>
      <ul className="movie-list">
        {movies.map(movie => (
          <li key={movie._id} className="movie-item">
            <h3>{movie.moviename}</h3>
            <img src={movie.image} alt={movie.moviename} className="movie-image" />
            <div>
              <a href={movie.link} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">Watch Now</a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
