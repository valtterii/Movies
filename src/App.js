import { useEffect, useState } from 'react';
import './App.css';
import MovieCard from './components/MovieCard';
import SearchIcon from './images/search.svg'
import Footer from './components/Footer.jsx';

const API = 'http://www.omdbapi.com?apikey=e93a6bc7'

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const searchMovies = async (title) => {
    const response = await fetch(`${API}&s=${title}`)
    const data = await response.json();
    setMovies(data.Search);
    console.log(movies)
  }

  useEffect(() => {
    searchMovies('Batman'); // default
  }, []);

  const handleKeyDown = (event) => { // upon pressing the enter key, show the results
    if (event.key === 'Enter') {
      searchMovies(searchTerm);
    }
  }

  return (
    <div className='app'>
      <div className='content'>
        <h1 className='title' onClick={() => window.location.reload()}>Search Movies</h1>
        <div className='search'>
          <input placeholder='Search for movies..' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleKeyDown} />
          <img src={SearchIcon} alt='Search' onClick={() => searchMovies(searchTerm)} />
        </div>

        {movies?.length > 0
          ? (
            <div className='container'>
              {movies.map((movie) => ( // loops over all the movies in the api
                <MovieCard movie={movie} />
              ))}
            </div>
          ) :
          (
            <div className='empty'>
              <h2>No results with the query <i>"{searchTerm}"</i> </h2>
            </div>
          )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
