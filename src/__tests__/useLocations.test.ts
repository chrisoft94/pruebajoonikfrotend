import { renderHook, waitFor } from '@testing-library/react';
import { useLocations } from '../hooks/useLocations';
import { fetchLocations } from '../services/locationService';

// Mocker fijo y confiable
jest.mock('../services/locationService', () => ({
  fetchLocations: jest.fn(),
}));

jest.setTimeout(15000); // Aumenta timeout global por si acaso

describe('useLocations', () => {
  it('debería obtener y retornar las sedes', async () => {
    (fetchLocations as jest.Mock).mockResolvedValue([{ code: '123', name: 'Bogotá' }]);

    const { result } = renderHook(() => useLocations());

    await waitFor(() => {
      expect(result.current.locations).toEqual([{ code: '123', name: 'Bogotá' }]);
    });

    expect(result.current.error).toBe(null);
  });

  it('debería manejar errores al obtener sedes', async () => {
    (fetchLocations as jest.Mock).mockRejectedValue(new Error('Error'));

    const { result } = renderHook(() => useLocations());

    await waitFor(() => {
      expect(result.current.error).toBe('Error al obtener las sedes.');
    });
  });

  it('debería retornar un array vacío si no hay sedes disponibles', async () => {
    (fetchLocations as jest.Mock).mockResolvedValue([]);

    const { result } = renderHook(() => useLocations());

    await waitFor(() => {
      expect(result.current.locations).toEqual([]);
    });

    expect(result.current.error).toBe(null);
  });
});
