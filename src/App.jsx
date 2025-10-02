import React, { useState, useEffect } from 'react'
import './App.css'
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx'
import Movies from './components/Movies.jsx';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_OPTIONS = {
  method: 'GET',
  headers: {
    'accept': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }
}

const App = () => {

  const [query, setQuery] = useState('');
  const [isLoading, setisLoading] = useState(false)
  const [error, setError] = useState(null)
  const [movies, setMovies] = useState([])

  const fetchMovies = async (Searchquery = '') => {

    setisLoading(true);
    setError(null);
    try {
      const endpoint = Searchquery
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(Searchquery)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
      const response = await fetch(endpoint, API_OPTIONS);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.status_message || 'Failed to fetch movies.');
      }

      if (!data.results || data.results.length === 0) {
        setMovies([]);
        setError('No movies found.');
        return;
      }

      setMovies(data.results);
      setError(null);


    } catch (error) {
      console.log(error);
      setError('Failed to fetch movies. Please try again later.');
    } finally {
      setisLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(query);
  }, [query])

  return (
    <main>
      <div className='pattern'/>
        <div className='wrapper'>
          <header>
            <img src="/hero-img.png" alt="Hero Banner" />
            <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle</h1>

            <Search query={query} setQuery={setQuery}/>
          </header>

          <section className='all-movies'>
            <h2 className='mt-[40px]'>All Movies</h2>

            {isLoading ? (
               <Spinner />
            ) : error ? (
              <p className='text-red-500'>{error}</p>
            ) : (
              <ul>
                {movies.map((movie) => (
                  <Movies key={movie.id} movie={movie} />
                ))}
              </ul>
            )}
          </section>

        </div>
    </main>
  )
}

export default App