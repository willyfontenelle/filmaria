import axios from 'axios';

//Base URL > 

// https://sujeitoprogramador.com/r-api/?api=filmes/123

const api = axios.create({
    baseURL: 'https://sujeitoprogramador.com'
});

export default api;