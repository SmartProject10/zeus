import { Route, Routes } from 'react-router-dom'
import { Registration } from './registration/Registration'
import { ForgotPassword } from './forgotpassword/ForgotPassword'
import { Login } from './login/Login'
import { AuthLayout } from './AuthLayout'

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path="login" element={<Login />} />
      <Route path="registration" element={<Registration />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
)

export { AuthPage }
