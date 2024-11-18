import axios from "axios";
import { EmergencyLightsRequest, EmployeeRequest, Sede, LuzEmergencia, AreaResponsable, InspeccionadoPor, Cargo, Trabajador } from "./_models";

const BASE_URL = import.meta.env.VITE_APP_API_URL;
export const REGISTER_EMPLOYEE_URL = `${BASE_URL}/api/trabajador`;
export const GET_EMPLOYEES_URL = `${BASE_URL}/api/trabajadores`;
export const GET_EMPLOYEE_URL = `${BASE_URL}/api/trabajador`;
export const DELETE_EMPLOYEE_URL = `${BASE_URL}/api/trabajador`;
export const PUT_EMPLOYEE_URL = `${BASE_URL}/api/trabajador`;

// Servicio simulado para obtener sedes
const sedeOptions = [
	{ id: "1", name: 'Sede A' },
	{ id: "2", name: 'Sede B' }
];
export const GET_SEDE_URL = sedeOptions;
export function getSede(): Promise<{ data: Sede[] }> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				data: [
					{ id: "1", name: 'Sede A' },
					{ id: "2", name: 'Sede B' },
				],
			});
		}, 0);
	});
}

// Servicio simulado para obtener luzEmergencia
const luzEmergenciaOptions = [
	{ id: "1", name: 'Luz emergencia 1' },
	{ id: "2", name: 'Luz emergencia 2' }
];
export const GET_NUMERO_LUZ_EMERGENCIA_URL = luzEmergenciaOptions;
export function getLuzEmergencia(): Promise<{ data: LuzEmergencia[] }> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				data: [
					{ id: "1", name: 'Luz emergencia 1' },
					{ id: "2", name: 'Luz emergencia 2' },
				],
			});
		}, 0);
	});
}

// Servicio simulado para obtener areaResponsable
const areaResponsableOptions = [
	{ id: "1", name: 'Área responsable 1' },
	{ id: "2", name: 'Área responsable 2' }
];
export const GET_AREA_RESPONSABLE_URL = areaResponsableOptions;
export function getAreaResponsable(): Promise<{ data: AreaResponsable[] }> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				data: [
					{ id: "1", name: 'Área resposnable 1' },
					{ id: "2", name: 'Área responsable 2' },
				],
			});
		}, 0);
	});
}

// Servicio simulado para obtener inspeccionadoPor
const inspeccionadoPorOptions = [
	{ id: "1", name: 'Gerencia' },
	{ id: "2", name: 'Seguridad industrial' }
];
export const GET_INSPECCIONADO_POR_URL = inspeccionadoPorOptions;
export function getInspeccionadoPor(): Promise<{ data: InspeccionadoPor[] }> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				data: [
					{ id: "1", name: 'Gerencia' },
					{ id: "2", name: 'Seguridad industrial' },
				],
			});
		}, 0);
	});
}

// Servicio simulado para obtener cargo
const cargoOptions = [
	{ id: "1", name: 'Gerente', area: "1" },
	{ id: "2", name: 'Jefe', area: "2" }
];
export const GET_CARGO_URL = cargoOptions;
export function getCargo(): Promise<{ data: Cargo[] }> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				data: [
					{ id: "1", name: 'Gerente', area: "1" },
					{ id: "2", name: 'Jefe', area: "2" }
				],
			});
		}, 0);
	});
}

// Servicio simulado para obtener trabajador
const trabajadorOptions = [
	{ id: "1", name: 'Juan Pérez', cargo: '1', dni: '12345678', foto: '/man1.jpg' },
	{ id: "2", name: 'María Gómez', cargo: '2', dni: '87654321', foto: '/woman1.jpg' },
	{ id: "3", name: 'Carlos Rodriguez', cargo: '2', dni: '11223344', foto: '/man2.jpg' },
];
export const GET_TRABAJADOR_URL = trabajadorOptions;
export function getTrabajador(): Promise<{ data: Trabajador[] }> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				data: [
					{ id: "1", name: 'Juan Pérez', cargo: '1', dni: '12345678', foto: '/man1.jpg' },
					{ id: "2", name: 'María Gómez', cargo: '2', dni: '87654321', foto: '/woman1.jpg' },
					{ id: "3", name: 'Carlos Rodriguez', cargo: '2', dni: '11223344', foto: '/man2.jpg' },
				],
			});
		}, 0);
	});
}

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

/*
fin peticiones para el modulo "Luces de emercencia",
*/
