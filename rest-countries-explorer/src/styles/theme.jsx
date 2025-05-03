import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0FF4C6', // Neon cyan
      light: '#7CFFCB',
      dark: '#00B894',
    },
    secondary: {
      main: '#FF0F7B', // Neon pink
      light: '#FF4E9E',
      dark: '#C70B5E',
    },
    background: {
      default: '#0A192F', // Dark blue background
      paper: '#172A45',
    },
    text: {
      primary: '#E6F1FF',
      secondary: '#8892B0',
    },
  },
  typography: {
    fontFamily: "'Orbitron', 'Nunito Sans', sans-serif",
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      background: 'linear-gradient(45deg, #0FF4C6, #7CFFCB)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1.1rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #172A45 0%, #1F4068 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(15, 244, 198, 0.1)',
          borderRadius: '12px',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 30px rgba(15, 244, 198, 0.2)',
            border: '1px solid rgba(15, 244, 198, 0.3)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
          background: 'linear-gradient(45deg, #0FF4C6, #00B894)',
          color: '#0A192F',
          '&:hover': {
            background: 'linear-gradient(45deg, #7CFFCB, #0FF4C6)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(23, 42, 69, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(15, 244, 198, 0.1)',
        },
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
});