import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import axios from 'axios';

// Asegúrate de que axios esté correctamente mockeado
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('renderiza sedes después de llamada a la API', async () => {
  // Configura el mock de axios para devolver datos simulados
  mockedAxios.get.mockResolvedValueOnce({
    data: [
      { code: '1', name: 'Sede Norte', city: 'Bogotá', address: 'Calle 123' },
      { code: '2', name: 'Sede Sur', city: 'Medellín', address: 'Carrera 45' },
    ],
  });

  // Renderiza el componente
  render(<App />);

  // Espera a que los elementos se rendericen después de la llamada a la API
  await waitFor(() => {
    expect(screen.getByText('Sede Norte')).toBeInTheDocument();
    expect(screen.getByText('Sede Sur')).toBeInTheDocument();
  });
});