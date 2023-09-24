import axios from 'axios';

//Base URL > 

// https://sujeitoprogramador.com/r-api/?api=filmes/123

const api = axios.create({
    baseURL: 'https://650865f556db83a34d9c4a36.mockapi.io/'
});

export default api;