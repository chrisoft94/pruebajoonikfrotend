// src/hooks/useLocations.ts
import { useEffect, useState } from 'react';
import { Location } from '../types';
import { fetchLocations } from '../services/locationService';

export const useLocations = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLocations()
      .then(setLocations)
      .catch(() => setError('Error al obtener las sedes.'));
  }, []);

  return { locations, error };
};
