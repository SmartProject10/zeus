export interface CompanyDataRegister {
    email:string,
    phone:string,
    password:string,
}
  
export interface CompanyDataLogin {
    email:string,
    password:string,
}

export interface EmployeeDataRegister { 
    email: string, 
    name: string, 
    lastname: string, 
    password: string, 
}

export interface EmployeeDataLogin {
    email: string,
    password: string,
}