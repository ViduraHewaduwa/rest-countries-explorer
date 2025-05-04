import { Box, Grid, CircularProgress, Typography } from '@mui/material';
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
    setRegion, 
    setSelectedLanguage,
    selectedLanguage 
  } = useCountries();

  return (
    <Box
      component="main"
      sx={{ 
        width: '100vw',  // Full viewport width
        minHeight: '100vh',
        py: { xs: 4, md: 6 },
        mt: 8,
        px: { xs: 2, md: 6 }, // Responsive horizontal padding
        position: 'relative',
        backgroundColor: '#0a0a12',
        borderRadius: 2,
        boxShadow: '0 0 20px rgba(187, 0, 255, 0.3)',
        color: '#e0e0e0',
        overflowX: 'hidden',
        '&::before': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(45,0,83,0.9) 100%), 
            repeating-linear-gradient(to right, transparent, transparent 2px, rgba(187, 0, 255, 0.1) 2px, rgba(187, 0, 255, 0.1) 4px)
          `,
          pointerEvents: 'none',
          zIndex: -1,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #ff00ea, #bb00ff, #7700ff)',
          borderRadius: '2px 2px 0 0',
          boxShadow: '0 0 15px rgba(187, 0, 255, 0.7)',
          zIndex: 1,
        }
      }}
    >
      <FilterBar
        searchQuery={searchQuery}
        selectedRegion={region}
        onSearchChange={setSearchQuery}
        onRegionChange={setRegion}
        onLanguageChange={setSelectedLanguage}   
          selectedLanguage={selectedLanguage} 
      />
      
      {error ? (
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'center', 
          alignItems: 'center',
          minHeight: '50vh',
          flexDirection: 'column',
          gap: 2,
          border: '1px solid rgba(255, 0, 140, 0.5)',
          borderRadius: 2,
          p: 4,
          background: 'rgba(10, 10, 18, 0.8)',
          backdropFilter: 'blur(5px)',
          boxShadow: 'inset 0 0 30px rgba(255, 0, 140, 0.2)'
        }}>
          <Typography 
            variant="h5" 
            sx={{ 
              color: '#ff005e',
              fontFamily: '"Orbitron", "Bladerunner", monospace',
              textAlign: 'center',
              textShadow: '0 0 10px rgba(255, 0, 94, 0.7)',
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}
          >
            Transmission Error
          </Typography>
          <Typography 
            color="text.secondary"
            sx={{ 
              textAlign: 'center',
              color: '#bb79ff',
              fontFamily: '"Courier New", monospace',
              position: 'relative',
              '&::before': {
                content: '"> "',
                color: '#ff005e'
              },
              animation: 'blink 1.5s infinite',
              '@keyframes blink': {
                '0%, 100%': { opacity: 1 },
                '50%': { opacity: 0.7 }
              }
            }}
          >
            Unable to establish connection with the galactic database
          </Typography>
        </Box>
      ) : loading ? (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          minHeight: '50vh',
          flexDirection: 'column',
          gap: 2
        }}>
          <CircularProgress 
            sx={{ 
              color: '#bb00ff',
              position: 'relative',
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
                animation: 'pulse 1.5s ease-in-out infinite',
                boxShadow: '0 0 20px rgba(187, 0, 255, 0.5)'
              },
              '@keyframes pulse': {
                '0%': { transform: 'scale(1)', opacity: 1 },
                '50%': { transform: 'scale(1.1)', opacity: 0.5 },
                '100%': { transform: 'scale(1)', opacity: 1 }
              }
            }} 
          />
          <Typography 
            sx={{ 
              color: '#bb79ff',
              fontFamily: '"Orbitron", "Bladerunner", monospace',
              mt: 2,
              animation: 'flicker 3s infinite',
              textShadow: '0 0 5px rgba(187, 0, 255, 0.7)',
              letterSpacing: '1px',
              '@keyframes flicker': {
                '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
                  opacity: 1,
                  textShadow: '0 0 5px rgba(187, 0, 255, 0.7), 0 0 10px rgba(187, 0, 255, 0.5)'
                },
                '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
                  opacity: 0.8,
                  textShadow: 'none'
                }
              }
            }}
          >
            SCANNING GALAXY...
          </Typography>
        </Box>
      ) : (
        <>
          {countries.length === 0 ? (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              minHeight: '50vh',
              flexDirection: 'column',
              gap: 2,
              border: '1px solid rgba(187, 0, 255, 0.3)',
              borderRadius: 2,
              p: 4,
              background: 'rgba(10, 10, 18, 0.8)',
              backdropFilter: 'blur(5px)',
              boxShadow: 'inset 0 0 30px rgba(187, 0, 255, 0.2)'
            }}>
              <Typography 
                variant="h5" 
                sx={{ 
                  color: '#bb00ff',
                  fontFamily: '"Orbitron", "Bladerunner", monospace',
                  textAlign: 'center',
                  textShadow: '0 0 10px rgba(187, 0, 255, 0.7)',
                  letterSpacing: '2px',
                  textTransform: 'uppercase'
                }}
              >
                No Territories Found
              </Typography>
              <Typography 
                color="text.secondary"
                sx={{ 
                  textAlign: 'center',
                  color: '#a056e7',
                  fontFamily: '"Courier New", monospace',
                  position: 'relative',
                  '&::before': {
                    content: '"> "',
                    color: '#bb00ff'
                  }
                }}
              >
                Adjust your search parameters to explore more territories
              </Typography>
            </Box>
          ) : (
            <Grid 
              container 
              spacing={3}
              sx={{
                opacity: 0,
                animation: 'fadeIn 0.5s ease-out forwards',
                '@keyframes fadeIn': {
                  from: { opacity: 0, transform: 'translateY(20px)' },
                  to: { opacity: 1, transform: 'translateY(0)' }
                }
              }}
            >
              {countries.map((country, index) => (
                <Grid 
                  item 
                  key={country.cca3} 
                  xs={12} 
                  sm={6} 
                  md={4} 
                  lg={3}
                  sx={{ animation: `fadeIn 0.5s ease-out forwards ${index * 0.1}s` }}
                >
                  <CountryCard country={country} />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </Box>
  );
};

export default Home;
