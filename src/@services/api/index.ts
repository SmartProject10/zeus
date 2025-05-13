import axios, { AxiosInstance } from 'axios'
import { getAuth } from '../session'
import { AuthRequests } from './requests/auth.requests'
import { flow } from './types/flow'
import { CompaniesRequests } from './requests/companies.requests'

class BackyServiceConnector {
	http: AxiosInstance
	debug = false

	constructor(debug?: boolean) {
		this.http = axios.create({
			baseURL: import.meta.env.VITE_APP_API_URL ?? 'http://localhost:3000',
			timeout: 60000,
			timeoutErrorMessage: 'No hay conexión con los recursos',
		})
		this.http.defaults.headers.Accept = 'application/json'
		this.http.interceptors.response.use(response => response, error => Promise.reject(error))
		this.http.interceptors.request.use(config => {
			const auth = getAuth()
			if (auth && auth.token) {
				config.headers.Authorization = `${auth.token}`
			}

			return config
		}, error => Promise.reject(error))

		this.debug = debug || false
		if (this.debug) {
			this.http.interceptors.request.use(request => {
				console.log('Starting Request', request)
				return request
			})

			this.http.interceptors.response.use(response => {
				console.log('Response:', response)
				return response
			})
		}
	}
}

const mixer = flow(
	AuthRequests,
	CompaniesRequests,
)

class BackyService extends mixer(BackyServiceConnector) { }

export const backyService = new BackyService()
