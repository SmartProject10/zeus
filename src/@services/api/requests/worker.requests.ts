import { IService, SConstructor } from '../types/apiService.types'

interface dataRegister { 
	email: string, 
	name: string, 
	lastname: string, 
	password: string, 
}

interface dataLogin {
	email: string,
	password: string,
}

export const WorkerRequests = <TClass extends SConstructor<IService>>(Base: TClass) => {
	return class extends Base {
		worker = {
			register: (data: dataRegister) => {
				return this.http.post(`/worker/register`, data);
			},
			login: (data : dataLogin) => {
				return this.http.post(`/worker/login`, data);
			},
			logout: () => {
				return this.http.post(`/worker/logout`);
			},
			get: () => {
				return this.http.get(`/worker/profile`); 
			},
		}
	}
}