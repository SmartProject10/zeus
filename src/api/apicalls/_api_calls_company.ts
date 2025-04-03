import Swal from "sweetalert2";
import { AxiosError } from 'axios';
import _api from "../_api";
import { CompanyDataRegister,CompanyDataLogin } from "@zeus/models/models";
import { Employee } from "src/models/apimodels/Employee";

const _api_calls_company = {

    async _register(dataRegister: CompanyDataRegister) {
        try {
          const { data } = await _api.post('/company/register', dataRegister);
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

    async _login(dataLogin: CompanyDataLogin) {
        try {
          const { data } = await _api.post('/company/login', dataLogin);
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
          await _api.post('/company/logout');
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
          const { data } = await _api.get('/company/profile');
          return data;
        } catch (error) {
          console.error("Error al intentar obtener el perfil del usuario:", error);
        }
    },

    async _updateCompanyCountry(companyId:string, countryId:string) {
        try {
          const { data } = await _api.put(`/company/${companyId}/updateCountry`, {
            countryId: countryId,
          });
          return data;
        } catch (error) {
          console.error("Error al intentar actualizar el país de la empresa:", error);
          await Swal.fire({
            icon: "error",
            title: "Error",
            text: `Error al actualizar el país de la empresa`,
            confirmButtonText: "Entendido",
          });
        }
    },

    async _addAcquisitionIdToCompany(companyId:string, acquisitionId:string) {
        try {
          const { data } = await _api.put(`/company/${companyId}/addAcquisition`, {
            acquisitionId,
          });
          return data;
        } catch (error) {
          console.error("Error al agregar la adquisición a la empresa:", error);
          await Swal.fire({
            icon: "error",
            title: "Error",
            text: `Error al agregar la adquisición a la empresa`,
            confirmButtonText: "Entendido",
          });
        }
    },

    async _updateRuc(companyId:string,ruc:string) {
        try {
          const { data } = await _api.put(`/company/${companyId}/updateRuc`, { ruc: ruc });
          return data;
        } catch (error) {
            console.error('Error al actualizar el ruc de la empresa:', error);
            await Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al actualizar el ruc de la empresa',
              confirmButtonText: 'Entendido'
            });
        }
    },

    async _updateSocialReason(companyId:string,socialReason:string) {
        try {
          const { data } = await _api.put(`/company/${companyId}/updateSocialReason`, { socialReason: socialReason });
          return data;
        } catch (error) {
            console.error('Error al actualizar la razón social de la empresa:', error);
            await Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al actualizar la razón social de la empresa',
              confirmButtonText: 'Entendido'
            });
        }
    },

    async _updateProvince(companyId:string,province:string) {
        try {
          const { data } = await _api.put(`/company/${companyId}/updateProvince`, { province: province });
          return data;
        } catch (error) {
            console.error('Error al actualizar la provincia de la empresa:', error);
            await Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al actualizar la provincia de la empresa',
              confirmButtonText: 'Entendido'
            });
        }
    },

    async _updateCity(companyId:string,city:string) {
        try {
          const { data } = await _api.put(`/company/${companyId}/updateCity`, { city: city });
          return data;
        } catch (error) {
            console.error('Error al actualizar la ciudad de la empresa:', error);
            await Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al actualizar la ciudad de la empresa',
              confirmButtonText: 'Entendido'
            });
        }
    },

    async _updateAddress(companyId:string,address:string) {
        try {
          const { data } = await _api.put(`/company/${companyId}/updateAddress`, { address: address });
          return data;
        } catch (error) {
            console.error('Error al actualizar la dirección de la empresa:', error);
            await Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al actualizar la dirección de la empresa',
              confirmButtonText: 'Entendido'
            });
        }
    },

    async _updateEconomicActivity(companyId:string,economicActivity:string) {
        try {
          const { data } = await _api.put(`/company/${companyId}/updateEconomicActivity`, { economicActivity: economicActivity });
          return data;
        } catch (error) {
            console.error('Error al actualizar la actividad económica de la empresa:', error);
            await Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al actualizar la actividad económica de la empresa',
              confirmButtonText: 'Entendido'
            });
        }
    },

    async _updateEconomicSector(companyId:string,economicSector:string) {
        try {
          const { data } = await _api.put(`/company/${companyId}/updateEconomicSector`, { economicSector: economicSector });
          return data;
        } catch (error) {
            console.error('Error al actualizar el sector económico de la empresa:', error);
            await Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al actualizar el sector económico de la empresa',
              confirmButtonText: 'Entendido'
            });
        }
    },

    async _updateCompanySize(companyId:string,companySize:string) {
        try {
          const { data } = await _api.put(`/company/${companyId}/updateCompanySize`, { companySize: companySize });
          return data;
        } catch (error) {
            console.error('Error al actualizar el tamaño de la empresa:', error);
            await Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al actualizar el tamaño de la empresa',
              confirmButtonText: 'Entendido'
            });
        }
    },

    async _addSedeIdToCompany(companyId:string,companySiteId:string) {
        try {
          const { data } = await _api.put(`/company/${companyId}/addSite`, { companySiteId: companySiteId });
          return data;
        } catch (error) {
            console.error('Error al agregar la sede a la empresa:', error);
            await Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al agregar la sede a la empresa',
              confirmButtonText: 'Entendido'
            });
        }
    },

    async _addAreaIdToCompany(companyId:string,companyAreaId:string) {
        try {
          const { data } = await _api.put(`/company/${companyId}/addArea`, { companyAreaId: companyAreaId });
          return data;
        } catch (error) {
            console.error('Error al agregar el área a la empresa:', error);
            await Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al agregar el área a la empresa',
              confirmButtonText: 'Entendido'
            });
        }
    },

    async _createEmployee(employeeData:Employee){
        try {
            const { _id, ...dataToSend } = employeeData; // quitamos el campo "_id" porque éste se creará automáticamente en la base de datos
            const { data } = await _api.post('/company/createEmployee', dataToSend);
            return data;
          } catch (error) {
              console.error('Error al crear el trabajador:', error);
              await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al crear el trabajador',
                confirmButtonText: 'Entendido'
              });
        }
    },

}

export default _api_calls_company;