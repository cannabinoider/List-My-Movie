import React, { useEffect, useState } from "react";
import "./MovieList.css";
import { useParams } from "react-router-dom";
import Cards from "../card/Card";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const { type } = useParams();

  useEffect(() => {
    getData();
  }, [type]);

  const getData = () => {
    let apiUrl;
    switch (type) {
      case "top_rated":
        apiUrl =
          "https://api.themoviedb.org/3/movie/top_rated?api_key=9a032d02ee468f964be26bc206dcf2e6&language=en-US&page=1";
        break;
      case "upcoming":
        apiUrl =
          "https://api.themoviedb.org/3/movie/upcoming?api_key=9a032d02ee468f964be26bc206dcf2e6&language=en-US&page=1";
        break;
      case "videos":
        apiUrl = `https://api.themoviedb.org/3/movie/movie_id/videos?api_key=9a032d02ee468f964be26bc206dcf2e6&language=en-US`;
        break;
      default:
        apiUrl =
          "https://api.themoviedb.org/3/movie/popular?api_key=9a032d02ee468f964be26bc206dcf2e6&language=en-US&page=1";
        break;
    }

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        if (data.results) {
          setMovieList(data.results);
        } else {
          console.error("Error: No results found in API response");
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  return (
    <div className="movie__list">
      <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
      <div className="list__cards">
        {movieList.map((movie) => (
          <Cards key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
