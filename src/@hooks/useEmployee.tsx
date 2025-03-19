import { useContext } from "react";
import { EmployeeContext } from "./auth/EmployeeAuthProvider";

const useEmployee = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployee must be used within the context of EmployeeAuthProvider");
  }
  return context;
};

export default useEmployee;