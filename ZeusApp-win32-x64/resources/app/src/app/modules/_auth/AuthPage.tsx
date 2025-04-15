import { Route, Routes } from 'react-router-dom'
import { Registration } from './pages/Registration'
import { ForgotPassword } from './pages/ForgotPassword'
import { Login } from './pages/Login'
import { AuthLayout } from './AuthLayout'

const AuthPage = () => (
  <Routes>
    <Route
element={<AuthLayout />}>
      <Route
path="login"
element={<Login />} />
      <Route
path="registration"
element={<Registration />} />
      <Route
path="forgot-password"
element={<ForgotPassword />} />
      <Route
index
element={<Login />} />
    </Route>
  </Routes>
)

export { AuthPage }
