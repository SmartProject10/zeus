/*
Este modelo representa al esquema "EmployeeCompanyRegistry" de la base de datos, el cual se creo para usar 
de atajo de la manera siguiente: cada email representa a los empleados de todos los paises y por medio de sus emails
podremos agarrar las compañias a los cuales está asociado
*/

export interface EmployeeCompanyRegistry {
    _id: string;
    employeeEmail: string;
    companiesIds: string[];
}