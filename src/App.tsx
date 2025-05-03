import React, { useState } from 'react';
import { Container, Typography, Box, AppBar, Toolbar, IconButton, Menu, MenuItem, Pagination } from '@mui/material';
import LocationCard from './components/LocationCard';
import { useLocations } from './hooks/useLocations';
import { keyframes } from '@mui/system';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import GitHubIcon from '@mui/icons-material/GitHub';

// Animación
const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const App: React.FC = () => {
  const { locations, error } = useLocations();
  const [page, setPage] = useState<number>(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [rowsPerPage] = useState<number>(6);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => setPage(value);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleWspClick = () => {
    window.open('https://wa.me/573173834016', '_blank');
    handleMenuClose();
  };

  const handleGithubClick = () => {
    window.open('https://github.com/chrisoft94', '_blank');
    handleMenuClose();
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(to right, #00c6ff, #0072ff)', display: 'flex', flexDirection: 'column', padding: 4 }}>
      <Container sx={{ py: 4 }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#ffffff', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          Explora nuestras sedes
        </Typography>

        {error && (
          <Typography color="error" align="center" sx={{ mt: 2 }}>{error}</Typography>
        )}

        <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={3} sx={{ marginTop: 2, animation: `${fadeIn} 1s ease-out` }}>
          {locations.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((location) => (
            <Box key={location.code} sx={{ flexBasis: '30%', display: 'flex', justifyContent: 'center', alignItems: 'stretch', animation: `${fadeIn} 1s ease-out`, minHeight: 300 }}>
              <Box sx={{ width: '100%', height: '100%' }}>
                <LocationCard location={location} />
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <Pagination count={Math.ceil(locations.length / rowsPerPage)} page={page} onChange={handleChangePage} color="primary" />
        </Box>
      </Container>

      <AppBar position="static" sx={{ top: 'auto', bottom: 0, backgroundColor: '#333' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#fff' }}>
            Christian Fernando Porras Jimenez
          </Typography>
          <IconButton color="inherit" onClick={handleMenuClick}>☰</IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} MenuListProps={{ 'aria-labelledby': 'basic-button' }} sx={{ '& .MuiMenu-paper': { backgroundColor: '#0077ff' } }}>
            <MenuItem onClick={handleWspClick} sx={{ color: 'white' }}><WhatsAppIcon sx={{ marginRight: 1 }} />Escribirme por WhatsApp</MenuItem>
            <MenuItem onClick={handleGithubClick} sx={{ color: 'white' }}><GitHubIcon sx={{ marginRight: 1 }} />Ir a mi Repositorio</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default App;
