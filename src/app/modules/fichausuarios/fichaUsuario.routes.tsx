import { Route, Routes } from 'react-router-dom'
import { FichaUsuario } from './pages/FichaUsuario'

export const FichaUsuarioRoutes = () => (
  <Routes>
    <Route path='ficha-usuario' element={<FichaUsuario />} />
    <Route index element={<FichaUsuario />} />
  </Routes>
)
