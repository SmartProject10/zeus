//import {  } from '../dtos/...'
import { IService, SConstructor } from '../types/apiService.types'

export const KitRequests = <TClass extends SConstructor<IService>>(Base: TClass) => {
    return class extends Base {
        kitRequests = {
            // put: (id: string, emergencyLight: EmergencyLightsRequest) => {
            //     return this.http.put(`/api/emergencyLight/${id}`, emergencyLight);
            // },
            // delete: (id: string) => {
            //     return this.http.delete(`/api/emergencyLight/${id}`);
            // },
            // getById: (id: string) => {
            //     return this.http.get(`/api/emergencyLight/${id}`);
            // },
            // register: (request: EmergencyLightsRequest) => {
            //     return this.http.post(`/api/emergencyLight`, request);
            // },
        }
    }
}