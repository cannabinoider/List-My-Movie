import React from 'react'; 
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Headers from './components/header/Headers';
import Home from './pages/home/Home';
import MovieList from './components/movieList/MovieList';
import Movie from './pages/movieDetail/Movie';
import Watchlist from './pages/watchlist/Watchlist'; 
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import Profile from './components/profile/Profile';

function App() {
  return (
    <div className="App">
      <Router>
        <Headers />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/movies/:type" element={<MovieList />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/videos" element={<MovieList type="videos" />} />
          <Route path="/watchlist" element={<Watchlist />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/*" element={<h1>Error Page</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
