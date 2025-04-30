import axios from "axios";
import { EmergencyLightsRequest, EmployeeRequest, Employee } from "./_models";

const BASE_URL = import.meta.env.VITE_APP_API_URL;

export const REGISTER_EMPLOYEE_URL = `${BASE_URL}/api/trabajador`;
export const GET_EMPLOYEES_URL = `${BASE_URL}/api/trabajadores`;
export const GET_EMPLOYEE_URL = `${BASE_URL}/api/trabajador`;
export const DELETE_EMPLOYEE_URL = `${BASE_URL}/api/trabajador`;
export const PUT_EMPLOYEE_URL = `${BASE_URL}/api/trabajador`;

export function registerEmployee(request: EmployeeRequest) {
	return axios.post(REGISTER_EMPLOYEE_URL, request);
}

export function getEmployeeById(id: string) {
	return axios.get(`${GET_EMPLOYEE_URL}/${id}`);
}

export function getEmployees() {
	return axios.get(GET_EMPLOYEES_URL);
}

export function getFilteredEmployees(filters: string) {
	const newUrl = `${GET_EMPLOYEES_URL}${filters}`;
	return axios.get(newUrl);
}

export function deleteEmployeeService(id: string) {
	return axios.delete(`${DELETE_EMPLOYEE_URL}/${id}`);
}

export function putEmployeeService(id: string, employee: EmployeeRequest) {
	return axios.put(`${PUT_EMPLOYEE_URL}/${id}`, employee);
}

export function getFilteredCompanies(filters: string) {
	const newUrl = `${GET_EMPLOYEES_URL}${filters}`;
	return axios.get(newUrl);
}
/*
inicio peticiones para el modulo "Luces de emercencia", no conozco la
logica de negocio por lo cual estoy suponiendo que es una entidad distinta a empleado
*/

export function getEmergencyLightById(id: string) {
	return axios.get(`${GET_EMPLOYEE_URL}/${id}`); //falta agregar la url correcta
}

export function deleteEmergencyLightService(id: string) {
	return axios.delete(`${DELETE_EMPLOYEE_URL}/${id}`); //falta agregar la url correcta
}

export function putEmergencyLightService(
	id: string,
	employee: EmergencyLightsRequest
) {
	return axios.put(`${PUT_EMPLOYEE_URL}/${id}`, employee); //falta agregar la url correcta
}

export function registerEmergencyLight(request: EmergencyLightsRequest) {
	return axios.post(REGISTER_EMPLOYEE_URL, request);
}

export function registerCompany(request: any) {
	return axios.post(REGISTER_EMPLOYEE_URL, request);
}

export function registerSede(request: any) {
	return axios.post(REGISTER_EMPLOYEE_URL, request);
}

export function registerArea(request: any) {
	return axios.post(REGISTER_EMPLOYEE_URL, request);
}

export function registerSubWorker(request: any) {
	return axios.post(REGISTER_EMPLOYEE_URL, request);
}
/*
fin peticiones para el modulo "Luces de emercencia",
*/
// En core/_requests.ts
export const updateEmployee = (id: string, data: Partial<Employee>) => {
	return axios.put(`/api/employees/${id}`, data);
}
