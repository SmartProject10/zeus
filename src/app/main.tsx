import { createRoot } from 'react-dom/client';
import { Chart, registerables } from 'chart.js';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { FC, createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Swal from 'sweetalert2';

import './_zeus/assets/sass/style.react.scss';
import './_zeus/assets/fonticon/fonticon.css';
import './_zeus/assets/keenicons/duotone/style.css';
import './_zeus/assets/keenicons/outline/style.css';
import './_zeus/assets/keenicons/solid/style.css';
import './_zeus/assets/sass/style.scss';
import { App } from './routing/App.js';
import { backyService } from '../../@services/api/index';
import { EmployeeResponse } from '@zeus/app/@services/api/dtos/EmployeeModel';
import {WithChildren} from './_zeus/helpers'

// Configuración de Chart.js
Chart.register(...registerables);

// Configuración de React-Query
const queryClient = new QueryClient();
const container = document.getElementById('root');

// I18n Integrado
const I18N_CONFIG_KEY = import.meta.env.VITE_APP_I18N_CONFIG_KEY || 'i18nConfig';

type Props = {
  selectedLang: 'en' | 'es';
};

const initialState: Props = {
  selectedLang: 'es',
};

function getConfig(): Props {
  const ls = localStorage.getItem(I18N_CONFIG_KEY);
  if (ls) {
    try {
      return JSON.parse(ls) as Props;
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

const EmployeeContext = createContext<Props>(initialState);

const useLang = () => {
  return useContext(EmployeeContext).selectedLang;
};

const EmployeeProvider: FC<WithChildren> = ({ children }) => {
  const lang = getConfig();
  return <EmployeeContext.Provider value={lang}>{children}</EmployeeContext.Provider>;
};

// AuthProvider Integrado
interface EmployeeContextType {
  isLoading: boolean;
  isAuth: boolean;
  employee: EmployeeResponse;
  register: (data: DataRegistration) => Promise<boolean>;
  login: (data: DataLogin) => Promise<boolean>;
  logout: () => Promise<void>;
  getEmployee: () => Promise<void>;
}

interface EmployeeAuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<EmployeeContextType>({} as EmployeeContextType);

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

const EmployeeAuthProviderComponent: React.FC<EmployeeAuthProviderProps> = ({ children }) => {
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
      const employee: EmployeeResponse = response.data;
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
      setEmployee({} as EmployeeResponse);
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
        const employee: EmployeeResponse = response.data;
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
    <AuthContext.Provider
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
    </AuthContext.Provider>
  );
};

// Renderizado de la aplicación
if (container) {
  createRoot(container).render(
    <QueryClientProvider client={queryClient}>
      <EmployeeProvider>
        <EmployeeAuthProviderComponent>
          <App />
        </EmployeeAuthProviderComponent>
      </EmployeeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>,
  );
}

export { useLang, AuthContext as EmployeeAuthContext };