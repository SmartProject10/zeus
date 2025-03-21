import { createContext, useEffect, useState, ReactNode } from "react";
import { backyService } from "../../@services/api/index";
import { EmployeeResponse } from "@zeus/app/@services/api/dtos/EmployeeModel";
import Swal from 'sweetalert2';

// Tipo del contexto
interface EmployeeContextType {
  isLoading: boolean;
  isAuth: boolean;
  employee: EmployeeResponse;
  register: (data: DataRegistration) => Promise<boolean> 
  login: (data: DataLogin) => Promise<boolean>;
  logout: () => Promise<void>;
  getEmployee: () => Promise<void>;
}

// Tipo para las props del Provider
interface EmployeeAuthProviderProps {
  children: ReactNode;
}

// Inicializa el contexto con un objeto vacío en lugar de `null`
const EmployeeContext = createContext<EmployeeContextType>({} as EmployeeContextType);

// DataLogin
interface DataLogin {
  email: string,
  password: string,
}

// DataLogin
interface DataRegistration {
  email: string, 
  name: string, 
  lastname: string, 
  password: string, 
}

const EmployeeAuthProvider: React.FC<EmployeeAuthProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [employee, setEmployee] = useState<EmployeeResponse>({} as EmployeeResponse);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const register = async (data: DataRegistration): Promise<boolean> => {
    try {
        const response = await backyService.employee.register(data);
        const employee: EmployeeResponse = response.data;
        setEmployee(employee);
        setIsAuth(true);
        await Swal.fire({
          icon: 'success',
          text: "Se registraron correctamente los datos en el email ingresado",
        });
        return true;
    } catch (error: any) {
        const errorMessage = "Error al registrar los datos en dicho correo o el correo no se encuentra registrado en nuestra base de datos";
        await Swal.fire({
            icon: 'error',
            text: errorMessage,
        });
        return false;
    }
  };

  const login = async (data: DataLogin): Promise<boolean> => {
    try {
        const response = await backyService.employee.login(data);
        const employee: EmployeeResponse = response.data;
        setEmployee(employee);
        setIsAuth(true);
        await Swal.fire({
            icon: 'success',
            text: 'Inicio de sesión exitoso',
        });
        return true;
    } catch (error: any) {
        const errorMessage = "Error en el inicio de sesión. Verifique los datos ingresados.";
        await Swal.fire({
            icon: 'error',
            text: errorMessage,
        });
        return false;
    }
  };


  const logout = async (): Promise<void> => {
    try {
      await backyService.employee.logout();
      setEmployee({} as EmployeeResponse);
      setIsAuth(false);
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  const getEmployee = async (): Promise<void> => {
    try {
      const response = await backyService.employee.get();
      if (response.status === 200) {
        const employee: EmployeeResponse = response.data;
        setEmployee(employee);
        setIsAuth(true);
      }
    } catch (error: any) {
      console.error("Error fetching employee:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEmployee();
  }, []);

  return (
    <EmployeeContext.Provider
      value={{
        isLoading,
        register,
        isAuth,
        logout,
        login,
        employee,
        getEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export { EmployeeContext, EmployeeAuthProvider };