
import axois from 'axios';

const API = axois.create({baseURL:'https://webnotesbackend-0k1u.onrender.com/api'})

API.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token');
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

export default API;
