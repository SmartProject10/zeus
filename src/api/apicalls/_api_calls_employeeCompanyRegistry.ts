import Swal from "sweetalert2";
import { AxiosError } from 'axios';
import _api from "../_api";
import { Company } from "../../models/apimodels/Company";
import { EmployeeCompanyRegistry } from "../../models/apimodels/EmployeeCompanyRegistry";

const _api_calls_employeeCompanyRegistry = {

    async create(employeeCompanyRegistry: EmployeeCompanyRegistry): Promise<EmployeeCompanyRegistry | null> {
        try {
          const { data } = await _api.post('/employeeCompanyRegistry/create', employeeCompanyRegistry);
          return data;
        } catch (error) {
          console.error((((error as AxiosError).response?.data as object) as any).message || `Error al intentar crear el registro del empleado`)
          return null;
        }
    },

    async getCompaniesOfEmployee(employeeEmail:string): Promise<Company[] | null> {
      try {
        const { data } = await _api.get(`/employeeCompanyRegistry/getCompaniesOfEmployee/${encodeURIComponent(employeeEmail)}`);
        return data;
      } 
      catch (error) {
        console.error((((error as AxiosError).response?.data as object) as any).message || `Error al intentar obtener las compañias del empleado con dicho mail`);
        return null;
      }
    },

    async putCompanyToEmployee(employeeEmail:string,companyId:string):Promise<EmployeeCompanyRegistry | null>{
      try {
        const { data } = await _api.put(`/employeeCompanyRegistry/putCompanyToEmployee/${encodeURIComponent(companyId)}/${encodeURIComponent(employeeEmail)}`);
        return data;
      } 
      catch (error) {
        console.error((((error as AxiosError).response?.data as object) as any).message || `Error al querer añadir la compañia al registro del empleado`);
        return null;
      }
    }

}

export default _api_calls_employeeCompanyRegistry;