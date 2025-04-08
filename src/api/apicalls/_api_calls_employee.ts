import Swal from "sweetalert2";
import { AxiosError } from 'axios';
import _api from "../_api";
import { EmployeeDataRegister,EmployeeDataLogin } from "../../models/models";

const _api_calls_employee = {

    async _register(dataRegister: EmployeeDataRegister) {
        try {
          const { data } = await _api.post('/employee/register', dataRegister);
          await Swal.fire({
            icon: 'success',
            text: "Registro exitoso",
          });
          return data;
        } catch (error) {
          console.error("Error al intentar registrarse:", error);
          const axiosError = error as AxiosError;
          await Swal.fire({
            icon: "error",
            title: "Error",
            text: axiosError.message || `Error al intentar registrarse`,
            confirmButtonText: "Entendido",
          });
        }
    },

    async _login(dataLogin: EmployeeDataLogin) {
        try {
          const { data } = await _api.post('/employee/login', dataLogin);
          await Swal.fire({
            icon: 'success',
            text: "Inicio de sesión exitoso",
          })
          return data;
        } catch (error) {
          console.error("Error al intentar registrarse:", error);
          const axiosError = error as AxiosError;
          await Swal.fire({
            icon: 'error',
            title: "Error",
            text: axiosError.message || "Error en el inicio de sesión. Verifique los datos ingresados.",
            confirmButtonText: "Entendido",
          });
        }
    },

    async _logout() {
        try {
          await _api.post('/employee/logout');
        } catch (error) {
          console.error("Error al cerrar sesión:", error);
          await Swal.fire({
            icon: "error",
            title: "Error",
            text: `Error al cerrar sesión`,
            confirmButtonText: "Entendido",
          });
        }
    },

    async _getProfile() {
        try {
          const { data } = await _api.get('/employee/profile');
          return data;
        } catch (error) {
          console.error("Error al intentar obtener el perfil del usuario:", error);
        }
    },

}

export default _api_calls_employee;