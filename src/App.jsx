import { useState,useEffect } from 'react';
import './App.css'
import SearchIcon from './search.svg';
import MoviesCard from './MoviesCard';


const API_URL = 'http://www.omdbapi.com/?apikey=8d3d9ee9';


const App = () => {
  const[movies,setMovies]=useState([]);
  const[input,setInput] = useState('');

  const searchMovies = async(title)=>{
    const response = await fetch (`${API_URL}&s=${title}`);
    const data = await response.json();
    
    console.log(data.Search)
      setMovies(data.Search);

    
  }
  useEffect(()=>{
    searchMovies(input);
  },[])
  
  return (
    <div className='app'>
      <h1>MoviesHub</h1>
      <div className='search'>
        <input placeholder='Search movie..'value={input} onChange={(e)=>{setInput(e.target.value)}}/>
        <img src={SearchIcon} alt='search'onClick={()=>{searchMovies(input)}}/>
        </div>


        {
          movies?.length > 0 ?(
            <div className='container'>
            {movies.map((movie,index)=>(
              <MoviesCard movie={movie} key={index}/>
            ))}
          </div>
          ):(
            <div className='empty'>
              <h2>No movies found!</h2>
              </div>
          )
        }
       
      </div>
    
  );
}

export default App
