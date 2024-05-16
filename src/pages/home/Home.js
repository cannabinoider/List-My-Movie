import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import MovieList from '../../components/movieList/MovieList';

export const Home = () => {
   const [popularMovies, setpopularMovies ] = useState([]);

    useEffect(() => {
        const apiKey = '9a032d02ee468f964be26bc206dcf2e6';
        const apiUrl = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${apiKey}`;

        fetch(apiUrl)
            .then(res => res.json())
            .then(data => setpopularMovies(data.results))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <>
        <div className="welcome"><h4>Welcome, user</h4></div>
           <div className="poster">
               <Carousel
                  showThumbs={false}
                  autoPlay={true}
                  transitionTime={3}
                  infiniteLoop={true}
                  showStatus={false}
               >
                  {
                     popularMovies.map(movie => (
                        <Link key={movie.id} style={{textDecoration:"none",color:"white"}} to={`/movie/${movie.id}`}>
                           <div className='posterImage'>
                              <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} alt={movie.original_title} />
                           </div>
                           <div className="posterImage_overlay">
                              <div className="posterImage_title">{movie ? movie.original_title : " "}</div>
                              <div className="poster_runtime">
                                 {movie ? movie.release_date : " "}
                                 <span className="posterImage_rating">
                                    {movie ? movie.vote_average : " "}
                                    <i className="fas fa-star" />{" "}
                                 </span>
                              </div>
                              <div className="posterImage_description">{movie ? movie.overview : " " }</div>
                           </div>
                        </Link>
                     ))
                  }
               </Carousel>
               <MovieList />
           </div> 
        </>
    );
};

export default Home;
