require('dotenv').config({ path: '../../.env' });
import axios, { AxiosError } from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL,
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response) {
      console.log('%c⧭', 'color: #ace2e6', error.response.data);
      return error
    } 
    if (error.request) {
      console.log('%c⧭', 'color: #ff0000', 'No se recibió respuesta del servidor');
      return 'timeout'
    } 

    console.log('%c⧭', 'color: #9c66cc', error.message);
    return error
  }
);
