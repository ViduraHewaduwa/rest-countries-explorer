import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { theme } from './styles/theme';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CountryDetail from './components/CountryDetail';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0A192F 0%, #0F2547 100%)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `
              radial-gradient(circle at 20% 20%, rgba(15, 244, 198, 0.03) 0%, transparent 40%),
              radial-gradient(circle at 80% 80%, rgba(255, 15, 123, 0.03) 0%, transparent 40%)
            `,
            pointerEvents: 'none',
            zIndex: 0,
          },
        }}>
          <Navbar />
          <Box component="main" sx={{ position: 'relative', zIndex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/country/:countryCode" element={<CountryDetail />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
