import React, { useEffect, useState } from 'react';
import Movie from './components/Movie';

// APIs
const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?api_key=ecd6535af409a43474326434779287b4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate";

const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=ecd6535af409a43474326434779287b4&query="

function App() {
  
  const [ movies, setMovies ] = useState([]);
  const [searchTerm, setSearchTerm ] = useState("");

  useEffect(() => {
    getMovies(FEATURED_API);
  }, [])

  const getMovies = (API) => {
    fetch(API).then(resp => resp.json()).then(data => {
      setMovies(data.results);
    });
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if(searchTerm){
      getMovies(SEARCH_API + searchTerm);
      setSearchTerm('');
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  }

  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit}>
          <input className="search" type="search" placeholder="SEARCH" value={searchTerm} onChange={handleOnChange}/>
        </form>    
      </header>
      <div className="movie-container">
        {
          movies.length > 0 && movies.map(movie => (
            <Movie key={movie.id} {...movie} />
          ))
        }
      </div>
    </>
  );
}

export default App;
