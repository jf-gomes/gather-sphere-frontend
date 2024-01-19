import axios from "axios";

export const api = axios.create({
    baseURL: 'https://gather-sphere-backend.vercel.app'
})