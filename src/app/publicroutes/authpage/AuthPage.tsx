import { Route, Routes, Navigate } from 'react-router-dom';
import { Registration } from './registration/Registration';
import { ForgotPassword } from './forgotpassword/ForgotPassword';
import { Login } from './login/Login';
import { AuthLayout } from './AuthLayout';
import { useEmployee } from '../../EmployeeContext';

const AuthPage = () => {
  const { isAuth } = useEmployee();

  if (isAuth) {
    return <Navigate to="/select-company"/>;
  }

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route index element={<Login />} />
      </Route>
    </Routes>
  );
};

export { AuthPage };