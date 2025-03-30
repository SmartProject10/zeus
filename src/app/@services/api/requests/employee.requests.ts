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

export const EmployeeRequests = <TClass extends SConstructor<IService>>(Base: TClass) => {
	return class extends Base {
		employee = {
			register: (data: dataRegister) => {
				return this.http.post(`/employee/register`, data);
			},
			login: (data : dataLogin) => {
				return this.http.post(`/employee/login`, data);
			},
			logout: () => {
				return this.http.post(`/employee/logout`);
			},
			get: () => {
				return this.http.get(`/employee/profile`); 
			},
		}
	}
}