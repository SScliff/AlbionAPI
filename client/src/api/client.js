/**
 * Fetch wrapper para o backend.
 * Centraliza chamadas HTTP para a API (http://localhost:3001/api/),
 * tratamento de erros e parsing de respostas JSON.
 */
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api', // Em dev, a string base vem do proxy ou da variável de .env
});

// Interceptor para logs ou headers adicionais (se necessário no futuro)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;
