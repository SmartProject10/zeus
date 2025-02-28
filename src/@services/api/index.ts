import axios from 'axios';
import { flow } from './types/flow';
import { CompaniesRequests } from './requests/company.requests';
import { EmergencyLightRequests } from './requests/emergencyLight.requests';
import { WorkerRequests } from './requests/worker.requests';
import { AccidentsRequests } from './requests/accident.requests';
import { AssistanceRequests } from './requests/assistance.requests';
import { BotiquinRequests } from './requests/botiquin.requests';
import { KitRequests } from './requests/kit.requests';
import { UserManagementRequests } from './requests/userManagement.requests';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
    withCredentials: true,
    timeout: 60000,
    timeoutErrorMessage: 'No hay conexión con los recursos'
});

class BackyServiceConnector {
    http = api;
    debug = false;

    constructor(debug = false) {
        this.debug = debug;
        if (this.debug) {
            this.http.interceptors.request.use(request => {
                console.log('Starting Request', request);
                return request;
            });

            this.http.interceptors.response.use(response => {
                console.log('Response:', response);
                return response;
            });
        }
    }
}

const mixer = flow(
    CompaniesRequests,
    EmergencyLightRequests,
    WorkerRequests,
    AccidentsRequests,
    AssistanceRequests,
    BotiquinRequests,
    KitRequests,
    UserManagementRequests
);

class BackyService extends mixer(BackyServiceConnector) { }

export const backyService = new BackyService();