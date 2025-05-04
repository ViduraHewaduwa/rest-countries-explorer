import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Grid, Paper, CircularProgress } from '@mui/material';
import { getCountryByCode } from '../api/countries';

const CountryDetail = () => {
  const { countryCode } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const data = await getCountryByCode(countryCode);
        setCountry(data);
      } catch (error) {
        console.error('Error fetching country:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [countryCode]);

  if (loading) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: '#0a0a12',
        backgroundImage: `
          linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(45,0,83,0.9) 100%),
          repeating-linear-gradient(to right, transparent, transparent 2px, rgba(187, 0, 255, 0.1) 2px, rgba(187, 0, 255, 0.1) 4px)
        `,
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
            ml: 2,
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
          SCANNING TERRITORY...
        </Typography>
      </Box>
    );
  }

  if (!country) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: '#0a0a12',
        backgroundImage: `
          linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(45,0,83,0.9) 100%),
          repeating-linear-gradient(to right, transparent, transparent 2px, rgba(187, 0, 255, 0.1) 2px, rgba(187, 0, 255, 0.1) 4px)
        `,
        flexDirection: 'column',
        gap: 2,
        border: '1px solid rgba(255, 0, 140, 0.5)',
        borderRadius: 2,
        p: 4,
        m: 4,
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
          Territory Not Found
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
          Territory not found in our galactic database
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      component="main"
      sx={{
        width: '100vw',
        minHeight: '100vh',
        py: { xs: 4, md: 6 },
        mt: 8,
        px: { xs: 2, md: 6 },
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
      <Button
        onClick={() => navigate(-1)}
        variant="contained"
        sx={{
          mb: 4,
          background: 'rgba(187, 0, 255, 0.2)',
          border: '1.5px solid rgba(187, 0, 255, 0.4)',
          color: '#bb79ff',
          fontFamily: 'Orbitron, monospace',
          borderRadius: '8px',
          boxShadow: '0 0 15px rgba(187, 0, 255, 0.2)',
          transition: 'all 0.3s ease',
          fontWeight: 600,
          letterSpacing: '1px',
          '&:hover': {
            background: 'rgba(187, 0, 255, 0.3)',
            boxShadow: '0 0 20px rgba(187, 0, 255, 0.4)',
            transform: 'translateY(-2px)',
          }
        }}
      >
        ← Back to Galaxy
      </Button>

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Box sx={{
            position: 'relative',
            borderRadius: '12px',
            padding: '3px',
            background: 'linear-gradient(45deg, #ff00ea, #bb00ff, #7700ff)',
            boxShadow: '0 0 25px rgba(187, 0, 255, 0.4)',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              borderRadius: '12px',
              padding: '2px',
              background: 'linear-gradient(45deg, #ff00ea, #bb00ff, #7700ff)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              opacity: 0.5,
              animation: 'borderGlow 3s infinite alternate'
            }
          }}>
            <style>
              {`
                @keyframes borderGlow {
                  from { opacity: 0.3; filter: blur(0px); }
                  to { opacity: 0.8; filter: blur(1px); }
                }
              `}
            </style>
            <img
              src={country.flags.svg}
              alt={`Flag of ${country.name.common}`}
              style={{
                width: '100%',
                height: 'auto',
                position: 'relative',
                zIndex: 1,
                borderRadius: '10px',
                display: 'block'
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontFamily: 'Orbitron, monospace',
              background: 'linear-gradient(45deg, #ff00ea, #bb00ff, #7700ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3,
              letterSpacing: '1px',
              textShadow: '0 0 10px rgba(187, 0, 255, 0.7)',
              fontWeight: 700
            }}
          >
            {country.name.common}
          </Typography>

          <Grid container spacing={4} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6}>
              <Box sx={{
                '& .MuiTypography-root': {
                  mb: 1.5,
                  fontFamily: '"Courier New", monospace',
                  color: '#bb79ff'
                }
              }}>
                <Typography>
                  <strong style={{ color: '#ff00ea' }}>Native Name:</strong> {Object.values(country.name.nativeName || {})[0]?.common || 'N/A'}
                </Typography>
                <Typography>
                  <strong style={{ color: '#ff00ea' }}>Population:</strong> {new Intl.NumberFormat().format(country.population)}
                </Typography>
                <Typography>
                  <strong style={{ color: '#ff00ea' }}>Region:</strong> {country.region}
                </Typography>
                <Typography>
                  <strong style={{ color: '#ff00ea' }}>Sub Region:</strong> {country.subregion || 'N/A'}
                </Typography>
                <Typography>
                  <strong style={{ color: '#ff00ea' }}>Capital:</strong> {country.capital?.[0] || 'N/A'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{
                '& .MuiTypography-root': {
                  mb: 1.5,
                  fontFamily: '"Courier New", monospace',
                  color: '#bb79ff'
                }
              }}>
                <Typography>
                  <strong style={{ color: '#ff00ea' }}>Top Level Domain:</strong> {country.tld?.[0] || 'N/A'}
                </Typography>
                <Typography>
                  <strong style={{ color: '#ff00ea' }}>Currencies:</strong> {Object.values(country.currencies || {}).map(curr => curr.name).join(', ') || 'N/A'}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {country.borders && (
            <Box>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontFamily: 'Orbitron, monospace',
                  color: '#bb00ff',
                  mb: 2,
                  textShadow: '0 0 8px rgba(187, 0, 255, 0.5)',
                  letterSpacing: '1px'
                }}
              >
                Neighboring Territories:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {country.borders.map((border) => (
                  <Paper
                    key={border}
                    onClick={() => navigate(`/country/${border}`)}
                    sx={{
                      padding: '0.5rem 1.5rem',
                      cursor: 'pointer',
                      background: 'rgba(187, 0, 255, 0.1)',
                      border: '1px solid rgba(187, 0, 255, 0.3)',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease',
                      color: '#bb79ff',
                      fontFamily: '"Courier New", monospace',
                      '&:hover': {
                        background: 'rgba(187, 0, 255, 0.2)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 0 15px rgba(187, 0, 255, 0.3)',
                        border: '1px solid rgba(187, 0, 255, 0.5)',
                      }
                    }}
                  >
                    {border}
                  </Paper>
                ))}
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CountryDetail;
