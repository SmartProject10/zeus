import axios from 'axios'

const API = `${import.meta.env.VITE_APP_API_URL}`
export const registerRequest = user => axios.post(`${API}/auth/register`, user)
