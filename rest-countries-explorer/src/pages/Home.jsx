import { Container, Grid, Typography, Box, CircularProgress } from '@mui/material';
import FilterBar from '../components/FilterBar';
import CountryCard from '../components/CountryCard';
import { useCountries } from '../hook/hook';

const Home = () => {
  const { 
    countries, 
    loading, 
    error, 
    searchQuery, 
    region, 
    setSearchQuery, 
    setRegion 
  } = useCountries();

  if (loading) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 64px)',
        mt: 8,
      }}>
        <CircularProgress 
          sx={{
            color: '#bb00ff',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: -4,
              left: -4,
              right: -4,
              bottom: -4,
              border: '2px solid',
              borderColor: 'rgba(187, 0, 255, 0.3)',
              borderRadius: '50%',
            }
          }}
        />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 64px)',
        mt: 8,
      }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 12, mb: 4 }}>
      <FilterBar
        searchQuery={searchQuery}
        selectedRegion={region}
        onSearchChange={setSearchQuery}
        onRegionChange={setRegion}
      />
      <Grid container spacing={3}>
        {countries.map((country) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={country.cca3}>
            <CountryCard country={country} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
