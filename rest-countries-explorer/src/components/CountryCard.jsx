import { Card, CardContent, CardMedia, Typography, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const CountryCard = ({ country }) => {
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent card click when clicking favorite button
    if (isFavorite(country.cca3)) {
      removeFavorite(country.cca3);
    } else {
      addFavorite(country);
    }
  };

  return (
    <Card
      onClick={() => navigate(`/country/${country.cca3}`)}
      sx={{
        height: '100%',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #181828 80%, #2d0053 100%)',
        border: '1.5px solid rgba(187, 0, 255, 0.35)',
        boxShadow: '0 0 18px 2px rgba(187, 0, 255, 0.18), 0 2px 8px rgba(0,0,0,0.5)',
        borderRadius: 3,
        transition: 'transform 0.2s, box-shadow 0.2s, border 0.2s',
        '&:hover': {
          transform: 'translateY(-8px) scale(1.03)',
          border: '2px solid #bb00ff',
          boxShadow: '0 0 30px 6px #bb00ff, 0 2px 20px rgba(0,0,0,0.7)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(45deg, rgba(187,0,255,0.07), rgba(255,0,234,0.04))',
          zIndex: 0,
        },
      }}
    >
      <IconButton
        onClick={handleFavoriteClick}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 2,
          color: isFavorite(country.cca3) ? '#bb00ff' : 'rgba(187, 0, 255, 0.5)',
          '&:hover': {
            color: '#bb00ff',
            transform: 'scale(1.1)',
          },
        }}
      >
        {isFavorite(country.cca3) ? <StarIcon /> : <StarBorderIcon />}
      </IconButton>

      <CardMedia
        component="img"
        height="150"
        image={country.flags.svg}
        alt={`Flag of ${country.name.common}`}
        sx={{
          objectFit: 'cover',
          borderBottom: '1.5px solid rgba(187, 0, 255, 0.15)',
          filter: 'drop-shadow(0 0 8px #bb00ff44)',
          background: 'rgba(45,0,83,0.18)',
          zIndex: 1,
        }}
      />
      <CardContent sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          noWrap
          sx={{
            fontFamily: 'Orbitron, monospace',
            background: 'linear-gradient(90deg, #ff00ea, #bb00ff, #7c3fff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: 1,
            fontWeight: 700,
            textShadow: '0 0 8px #bb00ff77',
          }}
        >
          {country.name.common}
        </Typography>
        <Box sx={{
          '& .MuiTypography-root': {
            mb: 0.5,
            fontSize: '0.95rem',
            color: '#bb79ff',
            fontFamily: '"Courier New", monospace',
            '& strong': {
              color: '#ff00ea',
              fontWeight: 700,
              textShadow: '0 0 4px #bb00ffbb',
            }
          }
        }}>
          <Typography>
            <strong>Population:</strong> {new Intl.NumberFormat().format(country.population)}
          </Typography>
          <Typography>
            <strong>Region:</strong> {country.region}
          </Typography>
          <Typography>
            <strong>Capital:</strong> {country.capital?.[0] || 'N/A'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CountryCard;
