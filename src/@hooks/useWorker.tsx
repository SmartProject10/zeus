import { useContext } from "react";
import { WorkerContext } from "./auth/WorkerAuthProvider";

const useWorker = () => {
  const context = useContext(WorkerContext);
  if (!context) {
    throw new Error("useWorker must be used within the context of WorkerAuthProvider");
  }
  return context;
};

export default useWorker;