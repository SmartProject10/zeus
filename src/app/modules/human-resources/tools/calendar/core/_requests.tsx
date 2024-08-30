import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const REGISTER_EMPLOYEE_URL = `${API_URL}/register_employee`;

export function registerEmployee(data:any){
    // console.log(data)
    return axios.post(REGISTER_EMPLOYEE_URL, data);
}