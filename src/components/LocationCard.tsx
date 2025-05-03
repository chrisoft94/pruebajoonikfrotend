import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Modal, Box } from '@mui/material';

// Definimos las props para LocationCard
interface LocationCardProps {
  location: {
    code: string;
    name: string;
    image: string;
    creationDate: string;
  };
}

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  const [openModal, setOpenModal] = useState(false);

  // Función para abrir el modal
  const handleOpenModal = () => setOpenModal(true);

  // Función para cerrar el modal
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={location.image}
        alt={location.name}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {location.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {location.creationDate}
        </Typography>
        <Button onClick={handleOpenModal} variant="contained" color="primary" sx={{ mt: 2 }}>
          Ver Foto
        </Button>
      </CardContent>

      {/* Modal para ver la imagen en grande */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            borderRadius: 1,
            padding: 2,
            boxShadow: 24,
          }}
        >
          <img
            src={location.image}
            alt={location.name}
            style={{ width: '100%', height: 'auto', maxWidth: '600px' }}
          />
          <Button
            onClick={handleCloseModal}
            variant="outlined"
            color="secondary"
            sx={{ marginTop: 2 }}
          >
            Cerrar
          </Button>
        </Box>
      </Modal>
    </Card>
  );
};

export default LocationCard;
