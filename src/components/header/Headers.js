import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Headers.css';
import {AccountCircle} from '@mui/icons-material';
import {Menu, MenuItem, IconButton} from '@mui/material';

export const Headers = () => {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (location.pathname === "/signup") {
    return null; 
  }
  if (location.pathname === "/login") {
    return null; 
  }

  return (
    <div className="header">
      <div className="headerLeft">
        <Link to="/">
          <img className="header_icon" src="/assets/images/logonew.ico" alt="icon" />
        </Link>
        <Link to="/movies/popular" style={{textDecoration: "none"}}><span>Popular</span></Link>
        <Link to="/movies/top_rated" style={{textDecoration: "none"}}><span>Top Rated</span></Link>
        <Link to="/movies/upcoming" style={{textDecoration: "none"}}><span>Upcoming</span></Link>
        <Link to="/movies/videos" style={{textDecoration: "none"}}><span>Videos</span></Link>
        <Link to="/movies/watchlist" style={{textDecoration: "none"}}><span>Watchlist</span></Link>
      </div>
      <div className="headerRight">
        <IconButton onClick={handleMenuOpen} style={{color:"white"}}>
          <AccountCircle fontSize="large" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem>
          <Link to='/profile' style={{textDecoration:"none", color:"inherit"}}>
          Profile
          </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/signup" style={{textDecoration: "none", color: "inherit"}}>
              Logout
            </Link>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Headers;
