import axios from 'axios'
const BASE_URL = import.meta.env.VITE_APP_API_URL

export const GET_KIT_URL = ''
const DELETE_KIT_URL = ''
export const GET_BOTIQUINES_URL = `${BASE_URL}/api/kit`
export const GET_BOTIQUIN_URL = `${BASE_URL}/api/kit`
export const DELETE_BOTIQUIN_URL = `${BASE_URL}/api/trabajador`

export function getKit() {
	return axios.get(GET_KIT_URL)
}

export function getKitById(id: string) {
	return axios.get(`${GET_KIT_URL}/${id}`)
}

export function deleteKitService(id: string) {
	return axios.delete(`${DELETE_KIT_URL}/${id}`)
}
