import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  Avatar, 
  Button, 
  TextField, 
  Grid,
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import { useAuth } from '../api/auth'; // Adjust the import path as necessary
import { useFavorites } from '../context/FavoritesContext';
import CountryCard from './CountryCard';

const Profile = () => {
  const { user, authFetch, logout } = useAuth();
  const { favorites } = useFavorites();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [profileData, setProfileData] = useState({
    username: user?.username || '',
    email: '',
    bio: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      
      try {
        const response = await authFetch('http://127.0.0.1:8000/api/auth/profile/');
        
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        
        const data = await response.json();
        setProfileData({
          username: data.username,
          email: data.email || '',
          bio: data.bio || '',
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchProfile();
    }
  }, [user, authFetch]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      const response = await authFetch('/api/profile/update/', {
        method: 'PUT',
        body: JSON.stringify(profileData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }
      
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
    setError('');
    setSuccess('');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 12, mb: 8 }}>
      <Paper 
        elevation={6} 
        sx={{
          p: 4,
          background: 'rgba(10, 10, 18, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          border: '1px solid rgba(187, 0, 255, 0.3)',
          boxShadow: '0 4px 20px rgba(187, 0, 255, 0.25)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography 
            variant="h4" 
            sx={{
              fontFamily: '"Orbitron", "Bladerunner", monospace',
              fontWeight: 700,
              background: 'linear-gradient(45deg, #ff00ea 20%, #bb00ff 50%, #7700ff 80%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            My Profile
          </Typography>
          
          <Button
            onClick={toggleEdit}
            variant="outlined"
            sx={{
              color: isEditing ? '#ff00ea' : '#bb00ff',
              borderColor: isEditing ? '#ff00ea' : '#bb00ff',
              background: 'rgba(187,0,255,0.05)',
              borderWidth: 2,
              borderRadius: 2,
              fontWeight: 700,
              textTransform: 'none',
              letterSpacing: '1px',
              '&:hover': {
                background: 'linear-gradient(90deg, #ff00ea22, #bb00ff22, #7700ff22)',
                borderColor: '#ff00ea',
                boxShadow: '0 0 10px #bb00ff77',
              },
            }}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </Box>

        {loading && !isEditing && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress sx={{ color: '#bb00ff' }} />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {success}
          </Alert>
        )}

        {!loading && (
          <Box component={isEditing ? 'form' : 'div'} onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              {/* Profile Avatar */}
              <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    background: 'linear-gradient(45deg, #ff00ea, #bb00ff, #7700ff)',
                    boxShadow: '0 0 20px rgba(187, 0, 255, 0.6)',
                    mb: 2,
                    fontSize: '3rem',
                  }}
                >
                  {profileData.username ? profileData.username[0].toUpperCase() : 'U'}
                </Avatar>
                
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: '#fff',
                    fontWeight: 600,
                    textAlign: 'center' 
                  }}
                >
                  {profileData.username}
                </Typography>
                
                {!isEditing && (
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{ 
                      mt: 3,
                      color: '#ff3d71',
                      borderColor: '#ff3d71',
                      '&:hover': {
                        borderColor: '#ff3d71',
                        background: 'rgba(255, 61, 113, 0.1)',
                      }
                    }}
                    onClick={logout}
                  >
                    Logout
                  </Button>
                )}
              </Grid>
              
              {/* Profile Info */}
              <Grid item xs={12} md={8}>
                {isEditing ? (
                  <>
                    <TextField
                      fullWidth
                      label="Username"
                      name="username"
                      value={profileData.username}
                      onChange={handleChange}
                      margin="normal"
                      disabled // Username cannot be changed
                      InputProps={{
                        sx: {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(187, 0, 255, 0.5)',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(187, 0, 255, 0.8)',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#bb00ff',
                          },
                          color: '#fff',
                        }
                      }}
                      InputLabelProps={{
                        sx: { color: 'rgba(255, 255, 255, 0.7)' }
                      }}
                    />
                    
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleChange}
                      margin="normal"
                      InputProps={{
                        sx: {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(187, 0, 255, 0.5)',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(187, 0, 255, 0.8)',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#bb00ff',
                          },
                          color: '#fff',
                        }
                      }}
                      InputLabelProps={{
                        sx: { color: 'rgba(255, 255, 255, 0.7)' }
                      }}
                    />
                    
                    <TextField
                      fullWidth
                      label="Bio"
                      name="bio"
                      value={profileData.bio}
                      onChange={handleChange}
                      margin="normal"
                      multiline
                      rows={4}
                      InputProps={{
                        sx: {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(187, 0, 255, 0.5)',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(187, 0, 255, 0.8)',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#bb00ff',
                          },
                          color: '#fff',
                        }
                      }}
                      InputLabelProps={{
                        sx: { color: 'rgba(255, 255, 255, 0.7)' }
                      }}
                    />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        sx={{
                          background: 'linear-gradient(90deg, #ff00ea, #bb00ff, #7700ff)',
                          color: '#fff',
                          fontWeight: 700,
                          borderRadius: 2,
                          textTransform: 'none',
                          letterSpacing: '1px',
                          boxShadow: '0 0 10px #bb00ff77',
                          '&:hover': {
                            background: 'linear-gradient(90deg, #7700ff, #bb00ff, #ff00ea)',
                            boxShadow: '0 0 18px #bb00ffcc',
                          },
                        }}
                      >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'}
                      </Button>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                        Email
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#fff' }}>
                        {profileData.email || 'No email provided'}
                      </Typography>
                    </Box>
                    
                    <Divider sx={{ my: 2, backgroundColor: 'rgba(187, 0, 255, 0.2)' }} />
                    
                    <Box>
                      <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                        Bio
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#fff' }}>
                        {profileData.bio || 'No bio provided'}
                      </Typography>
                    </Box>
                  </>
                )}
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>

      {/* Favorites Section */}
      <Paper 
        elevation={6} 
        sx={{
          p: 4,
          mt: 4,
          background: 'rgba(10, 10, 18, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          border: '1px solid rgba(187, 0, 255, 0.3)',
          boxShadow: '0 4px 20px rgba(187, 0, 255, 0.25)',
        }}
      >
        <Typography 
          variant="h5" 
          sx={{
            fontFamily: '"Orbitron", "Bladerunner", monospace',
            fontWeight: 700,
            background: 'linear-gradient(45deg, #ff00ea 20%, #bb00ff 50%, #7700ff 80%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 3
          }}
        >
          Favorite Countries
        </Typography>

        {favorites.length === 0 ? (
          <Typography 
            sx={{ 
              color: '#bb79ff',
              textAlign: 'center',
              py: 4
            }}
          >
            No favorite countries yet. Start exploring to add some!
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {favorites.map((country) => (
              <Grid item xs={12} sm={6} md={4} key={country.cca3}>
                <CountryCard country={country} />
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default Profile;