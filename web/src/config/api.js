import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:7777/api/v1',
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
});

export default api;