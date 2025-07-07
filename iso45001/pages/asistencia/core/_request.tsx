import axios from 'axios'
const BASE_URL = import.meta.env.VITE_APP_API_URL

export const GET_ASISTENCIAS_URL = `${BASE_URL}/api/estadisticas`
export const GET_ASISTENCIA_URL = `${BASE_URL}/api/estadistica`
export const DELETE_ASISTENCIA_URL = `${BASE_URL}/api/estadistics`

export function getAsistencias() {
	return axios.get(GET_ASISTENCIAS_URL)
}

export function getAsistenciaById(id: string) {
	return axios.get(`${GET_ASISTENCIA_URL}/${id}`)
}

export function deleteAsistenciaService(id: string) {
	return axios.delete(`${DELETE_ASISTENCIA_URL}/${id}`)
}
