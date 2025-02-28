import { createContext, useEffect, useState, ReactNode } from "react";
import { backyService } from "../../@services/api/index";
import { WorkerResponse } from "@zeus/@services/api/dtos/WorkerModel";

// Tipo del contexto
interface WorkerContextType {
  isLoading: boolean;
  isAuth: boolean;
  worker: WorkerResponse;
  register: (data: any, setErrores: (errors: string[]) => void) => Promise<boolean>;
  login: (data: any, setError: (error: string) => void) => Promise<boolean | void>;
  logout: () => Promise<void>;
  getWorker: () => Promise<void>;
}

// Tipo para las props del Provider
interface WorkerAuthProviderProps {
  children: ReactNode;
}

// Inicializa el contexto con un objeto vacío en lugar de `null`
const WorkerContext = createContext<WorkerContextType>({} as WorkerContextType);

const WorkerAuthProvider: React.FC<WorkerAuthProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [worker, setWorker] = useState<WorkerResponse>({} as WorkerResponse);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const register = async (data: any, setErrores: (errors: string[]) => void): Promise<boolean> => {
    try {
      const response = await backyService.worker.register(data);
      const worker: WorkerResponse = response.data;
      setWorker(worker);
      setIsAuth(true);
      return true;
    } catch (error: any) {
      if (error.response) {
        setErrores(Object.values(error.response.data));
      }
      return false;
    }
  };

  const login = async (data: any, setError: (error: string) => void): Promise<boolean | void> => {
    try {
      const response = await backyService.worker.login(data);
      const worker: WorkerResponse = response.data;
      setWorker(worker);
      setIsAuth(true);
      return true;
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.error);
      }
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await backyService.worker.logout();
      setWorker({} as WorkerResponse);
      setIsAuth(false);
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  const getWorker = async (): Promise<void> => {
    try {
      const response = await backyService.worker.get();
      if (response.status === 200) {
        const worker: WorkerResponse = response.data;
        setWorker(worker);
        setIsAuth(true);
      }
    } catch (error: any) {
      console.error("Error fetching worker:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getWorker();
  }, []);

  return (
    <WorkerContext.Provider
      value={{
        isLoading,
        register,
        isAuth,
        logout,
        login,
        worker,
        getWorker,
      }}
    >
      {children}
    </WorkerContext.Provider>
  );
};

export { WorkerContext, WorkerAuthProvider };