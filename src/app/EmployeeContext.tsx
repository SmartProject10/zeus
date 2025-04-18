import React, { FC, createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import _api_calls_employee from '../api/apicalls/_api_calls_employee';
import { Employee } from '../models/apimodels/Employee';
import { EmployeeDataRegister,EmployeeDataLogin } from '../models/models';

interface WithChildren {
  children: ReactNode;
}

interface EmployeeContextType {
  isLoading: boolean;
  isAuth: boolean;
  employee: Employee;
  register: (data: EmployeeDataRegister) => Promise<boolean>;
  login: (data: EmployeeDataLogin) => Promise<boolean>;
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

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [employee, setEmployee] = useState<Employee>({} as Employee);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const register = async (dataRegister: EmployeeDataRegister): Promise<boolean> => {
    const data = await _api_calls_employee._register(dataRegister);
    if(data){
      setEmployee(data);
      setIsAuth(true);
      return true;
    }
    return false;
  };

  const login = async (dataLogin: EmployeeDataLogin): Promise<boolean> => {
    const data = await _api_calls_employee._login(dataLogin);
    if(data){
      setEmployee(data);
      setIsAuth(true);
      return true;
    }
    return false;
  };

  const logout = async (): Promise<void> => {
    await _api_calls_employee._logout();
    setEmployee({} as Employee);
    setIsAuth(false);
    window.location.href = '/';
  };

  const getEmployee = async (): Promise<void> => {
    const data = await _api_calls_employee._getProfile();
    if (data) {
      setEmployee(data);
      setIsAuth(true);
    }
    setIsLoading(false);
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

const useEmployee = () : EmployeeContextType => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("EmployeeContext must be used within the context of EmployeeProvider");
  }
  return context;
};

export { EmployeeProvider, useLang , useEmployee };