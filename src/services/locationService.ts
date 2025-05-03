import axios from 'axios';
import { Location } from '../types';

// Usar las variables de entorno definidas en .env
const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchLocations = async (): Promise<Location[]> => {
  const response = await axios.get(`${API_URL}/locations`, {
    headers: {
      'X-API-KEY': API_KEY,
    },
  });
  return response.data;
};
