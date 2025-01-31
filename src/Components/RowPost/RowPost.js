// import React, { useEffect, useState, useContext } from 'react'
// import axios from '../../axios'
// import './RowPost.css'
// import { useNavigate } from 'react-router-dom';
// import { imageUrl ,API_KEY} from '../../Constants/Constants'
// import Youtube from 'react-youtube'
// function RowPost(props) {



//   const [movie, setmovie] = useState([])
//   const navigate = useNavigate()
//   const [urlId, seturlId] = useState('')
//   const DetailsHandler = (data) => {

//     navigate('/About', { data })
//   }

//   useEffect(() => {

//     axios.get(props.url).then(response => {
//       setmovie(response.data.results)

//     }).catch(err => {
//       alert()
//     })
//   }, [])
//   const opts = {
//     height: '390',
//     width: '100%',
//     playerVars: {
//       autoplay: 1,
//     }
//   }
//   const HandleMovie = (id) => {
//     axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response => {
//       if(response.data.results.length!==0){
//         seturlId(response.data.results[0])
//       }else{
//         alert('Currently Unavilable')
//       }
//     })
//   }
//   return (
//     <div className='row'>
//       <h2>{props.title}</h2>
//       <div className='posters'>
//         {movie.map((obj) =>
//           <img onClick={() => HandleMovie(obj.id)} key={obj.id} className='poster' src={`${imageUrl + obj.poster_path}`} alt="Poster" />
//         )}
//       </div>
//      {urlId &&  <Youtube opts={opts} videoId={urlId.key}></Youtube>}
//     </div>
//   )

// }

// export default RowPost

import React, { useEffect, useState } from 'react';
import './RowPost.css';
import { useNavigate } from 'react-router-dom';
import { imageUrl } from '../../Constants/Constants';
import Youtube from 'react-youtube';

function RowPost({ title }) {
  const [movies, setMovies] = useState([]);
  const [urlId, setUrlId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedMovies = localStorage.getItem('movies');
    console.log(storedMovies)
    if (storedMovies) {
      try {
        const parsedMovies = JSON.parse(storedMovies);
        if (Array.isArray(parsedMovies)) {
          setMovies(parsedMovies);
          console.log("parsed movies", parsedMovies)
        } else {
          console.error('Invalid movies format in localStorage');
        }
      } catch (error) {
        console.error('Error parsing movies from localStorage:', error);
      }
    }
  }, []);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    }
  };

  const handleMovieClick = (movie) => {
    if (movie.trailerKey) {
      setUrlId(movie.trailerKey);
    } else {
      alert('Trailer currently unavailable');
    }
  };

  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className='posters'>
        {movies.map((movie) =>
          movie.poster_path ? (
            <img
              key={movie.id}
              onClick={() => handleMovieClick(movie)}
              className='poster'
              src={`${imageUrl}${movie.poster_path}`}
              alt={movie.title || 'Movie Poster'}
            />
          ) : null
        )}
      </div>
      {urlId && <Youtube opts={opts} videoId={urlId} />}
    </div>
  );
}

export default RowPost;