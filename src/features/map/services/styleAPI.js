
import { http } from '@/shared/services/api';

export const getGlobalStyle = async () => {
  const response = await http.get('/style');
  return response.data;
};

export const updateGlobalStyle = async (style) => {
  const response = await http.put('/style', style);
  return response.data;
};
