import { EmergencyLightsRequest } from '../dtos/EmergencyLightsModel'
import { IService, SConstructor } from '../types/apiService.types'

export const EmergencyLightRequests = <TClass extends SConstructor<IService>>(Base: TClass) => {
	return class extends Base {
		emergencyLights = {
			put: (id: string, emergencyLight: EmergencyLightsRequest) => {
				return this.http.put(`/api/emergencyLight/${id}`, emergencyLight);
			},
			delete: (id: string) => {
				return this.http.delete(`/api/emergencyLight/${id}`);
			},
			getById: (id: string) => {
				return this.http.get(`/api/emergencyLight/${id}`);
			},
			register: (request: EmergencyLightsRequest) => {
				return this.http.post(`/api/emergencyLight`, request);
			},
		}
	}
}