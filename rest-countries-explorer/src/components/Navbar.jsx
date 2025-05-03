import { AppBar, Toolbar, Typography, Container, Box, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: 'rgba(10, 10, 18, 0.85)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 20px rgba(187, 0, 255, 0.25)',
        borderBottom: '2px solid transparent',
        borderImage: 'linear-gradient(90deg, #ff00ea, #bb00ff, #7700ff) 1',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #ff00ea, #bb00ff, #7700ff)',
          boxShadow: '0 0 15px rgba(187, 0, 255, 0.7)',
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              fontFamily: '"Orbitron", "Bladerunner", monospace',
              fontWeight: 700,
              background: 'linear-gradient(45deg, #ff00ea 20%, #bb00ff 50%, #7700ff 80%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textDecoration: 'none',
              position: 'relative',
              display: 'inline-block',
              padding: '0.5rem 0',
              letterSpacing: '1.2px',
              textShadow: '0 0 10px rgba(187, 0, 255, 0.7)',
              transition: 'color 0.3s ease',
              '&::after': {
                content: '""',
                position: 'absolute',
                width: '100%',
                height: '2px',
                bottom: 0,
                left: 0,
                background: 'linear-gradient(45deg, #ff00ea 20%, #bb00ff 50%, #7700ff 80%)',
                transform: 'scaleX(0)',
                transformOrigin: 'right',
                transition: 'transform 0.3s ease',
                boxShadow: '0 0 10px rgba(187, 0, 255, 0.7)',
              },
              '&:hover::after': {
                transform: 'scaleX(1)',
                transformOrigin: 'left',
              },
              '@media (max-width: 600px)': {
                fontSize: '1.3rem',
              },
              animation: 'flicker 6s infinite',
              '@keyframes flicker': {
                '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
                  opacity: 1,
                  textShadow: '0 0 5px rgba(187, 0, 255, 0.7), 0 0 10px rgba(187, 0, 255, 0.5)',
                },
                '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
                  opacity: 0.8,
                  textShadow: 'none',
                },
              },
            }}
          >
            Wander World
          </Typography>

          {/* Right side: Buttons + Neon Dot */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              sx={{
                color: '#ff00ea',
                borderColor: '#bb00ff',
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
              Login
            </Button>
            <Button
              component={Link}
              to="/signup"
              variant="contained"
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
              Signup
            </Button>
            {/* Neon Dot */}
            <Box
              sx={{
                position: 'relative',
                width: 30,
                height: 30,
                cursor: 'pointer',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '-15px',
                  right: '-15px',
                  width: '30px',
                  height: '30px',
                  background: 'radial-gradient(circle, rgba(187, 0, 255, 0.4) 0%, transparent 70%)',
                  animation: 'pulse 2.5s infinite ease-in-out',
                  borderRadius: '50%',
                  zIndex: 0,
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  width: '10px',
                  height: '10px',
                  backgroundColor: '#bb00ff',
                  borderRadius: '50%',
                  boxShadow: '0 0 12px 3px #bb00ff',
                  zIndex: 1,
                },
              }}
            >
              <style>
                {`
                  @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.5); opacity: 0.5; }
                  }
                `}
              </style>
            </Box>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
