// src/components/MovieSearch.js
import React, { useState } from 'react';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchMovies = async () => {
    try {
      setLoading(true);
      setError('');

      const apiKey = 'd1fbd9f8';
      const response = await fetch(` http://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}&s=${query}`);
      const data = await response.json();

      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      setError('Error fetching movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className='text-4xl text-center bg-gray-400'>Movie Search</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie"
        className=' outline-double rounded-lg mt-10 px-2 ' 
      />
      <button onClick={searchMovies} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {movies.map((movie) => (
          <li key={movie.imdbID}>
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <p>Year: {movie.Year}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieSearch;
