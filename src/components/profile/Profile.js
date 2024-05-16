import React from 'react';
import { Container, Typography, Box, Grid, Avatar } from '@mui/material';
import './Profile.css';

export const Profile = () => {
  const user = {
    username: 'example_user',
    email: 'example@example.com',
    profile: 'Your Profile Information',
    savedMovies: '8',
    imageUrl: 'https://via.placeholder.com/150' // Replace with actual image URL
  };

  return (
    <Container maxWidth="xl" className="profile-container">
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" component="h1" className="profile-header">
          Profile Information
        </Typography>  
      </Box>
      <div>
        <Avatar alt="User Image" src={user.imageUrl} className="profile-image " />
        </div>
      <Grid container spacing={2} direction="column" justify="space-between" style={{height :'100%'}} >
        <Grid item sm={12}>
          <div className="profile-item">
            <Typography variant="subtitle1" component="span" className="profile-label">Username:</Typography>
            <Typography variant="body1" component="span" className="profile-value">{user.username}</Typography>
          </div>
          <div className="profile-item">
            <Typography variant="subtitle1" component="span" className="profile-label">Email:</Typography>
            <Typography variant="body1" component="span" className="profile-value">{user.email}</Typography>
          </div>
          <div className="profile-item">
            <Typography variant="subtitle1" component="span" className="profile-label">Profile:</Typography>
            <Typography variant="body1" component="span" className="profile-value">{user.profile}</Typography>
          </div>
          <div className="profile-item">
            <Typography variant="subtitle1" component="span" className="profile-label">Saved Movies:</Typography>
            <Typography variant="body1" component="span" className="profile-value">{user.savedMovies}</Typography>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
