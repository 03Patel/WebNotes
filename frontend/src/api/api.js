
import axois from 'axios';

const API = axois.create({baseURL:'http://localhost:5000/api'})

API.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token');
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

export default API;