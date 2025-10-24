import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getFeatures = () => {
  return apiClient.get('/features');
};

export const createFeatureCollection = (featureCollection) => {
  return apiClient.post('/feature/collection', featureCollection);
};

export const getLineas = () => {
  return apiClient.get('/lineas/');
};

export const getZonas = () => {
  return apiClient.get('/zonas');
}

export const getPuntos = () => {
  return apiClient.get('/puntos');
}