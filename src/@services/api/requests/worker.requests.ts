import { WorkerRequest } from '../dtos/WorkerModel'
import { IService, SConstructor } from '../types/apiService.types'

export const WorkerRequests = <TClass extends SConstructor<IService>>(Base: TClass) => {
	return class extends Base {
		worker = {
			put: (id: string, Worker: WorkerRequest) => {
			 return this.http.put(`/api/trabajador/${id}`, Worker);
			},
			delete: (id: string) => {
				return this.http.delete(`/api/trabajador/${id}`);
			},
			getById: (id: string) => {
				return this.http.get(`/api/trabajador/${id}`);
			},
			getFiltered: (filters: string) => {
			return this.http.get(`/api/trabajadores${filters}`);
			},
			get: () => {
			return this.http.get(`/api/trabajadores`); 
			},
			register: (request: WorkerRequest) => {
				return this.http.post(`/api/trabajador`, request);
			},
		}
	}
}