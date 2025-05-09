import React, { FC, createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Swal from 'sweetalert2';

import { backyService } from './@services/api';
import { Employee } from '@zeus/app/@services/api/dtos/EmployeeModel';

interface WithChildren {
  children: ReactNode;
}

interface EmployeeContextType {
  isLoading: boolean;
  isAuth: boolean;
  employee: Employee;
  register: (data: DataRegistration) => Promise<boolean>;
  login: (data: DataLogin) => Promise<boolean>;
  logout: () => Promise<void>;
  getEmployee: () => Promise<void>;
}

////

// Configuración de React Query
const queryClient = new QueryClient();

// I18n Integrado
const I18N_CONFIG_KEY = import.meta.env.VITE_APP_I18N_CONFIG_KEY || 'i18nConfig';

type LangProps = {
  selectedLang: 'en' | 'es';
};

const initialState: LangProps = {
  selectedLang: 'es',
};

function getConfig(): LangProps {
  const ls = localStorage.getItem(I18N_CONFIG_KEY);

  if (ls) {
    try {
      return JSON.parse(ls) as LangProps;
    } catch (er) {
      console.error(er);
    }
  }
  return initialState;
}

export function setLanguage(lang: string) {
  localStorage.setItem(I18N_CONFIG_KEY, JSON.stringify({ selectedLang: lang }));
  window.location.reload();
}

const useLang = () => {
  return useContext(Context).selectedLang;
};

const Provider: FC<WithChildren> = ({ children }) => {
  const lang = getConfig();
  return <Context.Provider value={lang}>{children}</Context.Provider>;
};

const Context = createContext<LangProps>(initialState);

////

const EmployeeContext = createContext<EmployeeContextType>({} as EmployeeContextType);

interface AuthProviderProps {
  children: ReactNode;
}

interface DataLogin {
  email: string;
  password: string;
}

interface DataRegistration {
  email: string;
  name: string;
  lastname: string;
  password: string;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [employee, setEmployee] = useState<Employee>({} as Employee);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const register = async (data: DataRegistration): Promise<boolean> => {
    try {
      const response = await backyService.employee.register(data);
      const employee: Employee = response.data;
      setEmployee(employee);
      setIsAuth(true);
      await Swal.fire({
        icon: 'success',
        text: 'Se registraron correctamente los datos en el email ingresado',
      });
      return true;
    } catch (error: any) {
      const errorMessage =
        'Error al registrar los datos en dicho correo o el correo no se encuentra registrado en nuestra base de datos';
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
      const employee: Employee = response.data;
      setEmployee(employee);
      setIsAuth(true);
      await Swal.fire({
        icon: 'success',
        text: 'Inicio de sesión exitoso',
      });
      return true;
    } catch (error: any) {
      const errorMessage = 'Error en el inicio de sesión. Verifique los datos ingresados.';
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
      setEmployee({} as Employee);
      setIsAuth(false);
      window.location.href = '/';
    } catch (error) {
      console.error(error);
    }
  };

  const getEmployee = async (): Promise<void> => {
    try {
      const response = await backyService.employee.get();
      if (response.status === 200) {
        const employee: Employee = response.data;
        setEmployee(employee);
        setIsAuth(true);
      }
    } catch (error: any) {
      console.error('Error fetching employee:', error.message);
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

const EmployeeProvider: FC<WithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const useEmployee = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("EmployeeContext must be used within the context of EmployeeProvider");
  }
  return context;
};

export { EmployeeProvider, useLang , useEmployee };