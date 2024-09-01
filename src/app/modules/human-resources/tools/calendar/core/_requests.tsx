import axios from "axios";
import { EmployeeRequest } from "./_models";

const BASE_URL = import.meta.env.VITE_API_URL;

export const REGISTER_EMPLOYEE_URL = `${BASE_URL}/api/trabajador`;
export const GET_EMPLOYEES_URL = `${BASE_URL}/api/trabajadores`

export function registerEmployee(request:EmployeeRequest){
    // console.log(data)
    return axios.post(REGISTER_EMPLOYEE_URL, request);
}

export function getEmployees(){
    return axios.get(GET_EMPLOYEES_URL);
}