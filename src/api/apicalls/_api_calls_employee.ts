import Swal from "sweetalert2";
import { AxiosError } from 'axios';
import _api from "../_api";
import { EmployeeDataRegister,EmployeeDataLogin } from "../../models/models";

const _api_calls_employee = {

    async _register(dataRegister: EmployeeDataRegister) {
        try {
          const { data } = await _api.post('/employee/register', dataRegister);
          return data;
        } catch (error) {
          console.error((((error as AxiosError).response?.data as object) as any).message || `Error al intentar registrarse`)
          return null;
        }
    },

    async _login(dataLogin: EmployeeDataLogin) {
        try {
          const { data } = await _api.post('/employee/login', dataLogin);
          return data;
        } catch (error) {
          console.error((((error as AxiosError).response?.data as object) as any).message || `Error al intentar iniciar sesión`)
          return null;
        }
    },

    async _logout() {
        try {
          await _api.post('/employee/logout');
        } catch (error) {
          console.error((((error as AxiosError).response?.data as object) as any).message || `Error al intentar cerrar la sesión`)
          await Swal.fire({
            icon: "error",
            title: "Error",
            text: `Error al cerrar sesión`,
            confirmButtonText: "Entendido",
          });
          return null;
        }
    },

    async _getProfile() {
        try {
          const { data } = await _api.get('/employee/profile');
          return data;
        } 
        catch (error) {
          console.error((((error as AxiosError).response?.data as object) as any).message || `Error al intentar obtener el perfil del usuario`);
        }
    },

    async _getEmployeeByEmail(email:string) {
      try {
        const { data } = await _api.get(`/employee/getCompanyEmployeeByEmail/${encodeURIComponent(email)}`);
        return data;
      } 
      catch (error) {
        console.error((((error as AxiosError).response?.data as object) as any).message || `Error al intentar obtener el empleado con dicho email`);
        return null;
      }
    },

}

export default _api_calls_employee;