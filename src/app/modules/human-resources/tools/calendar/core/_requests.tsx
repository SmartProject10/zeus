import axios from "axios";
import { EmployeeRequest } from "./_models";

const BASE_URL = import.meta.env.VITE_APP_API_URL;

export const REGISTER_EMPLOYEE_URL = `${BASE_URL}/api/trabajador`;
export const GET_EMPLOYEES_URL = `${BASE_URL}/api/trabajadores`;
export const GET_EMPLOYEE_URL = `${BASE_URL}/api/trabajador`;
export const DELETE_EMPLOYEE_URL = `${BASE_URL}/api/trabajador`;
export const PUT_EMPLOYEE_URL = `${BASE_URL}/api/trabajador`;


export function registerEmployee(request:EmployeeRequest){
    return axios.post(REGISTER_EMPLOYEE_URL, request);
}

export function getEmployeeById(id:string){
    return axios.get(`${GET_EMPLOYEE_URL}/${id}`);
}

export function getEmployees(){
    return axios.get(GET_EMPLOYEES_URL);
}

export function getFilteredEmployees(filters:string){
    const newUrl = `${GET_EMPLOYEES_URL}${filters}`;
    return axios.get(newUrl);
}

export function deleteEmployeeService(id:string){
    return axios.delete(`${DELETE_EMPLOYEE_URL}/${id}`);
}

export function putEmployeeService(id:string, employee:EmployeeRequest){
    return axios.put(`${PUT_EMPLOYEE_URL}/${id}`, employee);
}

