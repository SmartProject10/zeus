import { Route, Routes } from 'react-router-dom'
import { FichaUsuarioLayout } from './FichaUsuariosLayout'
import { FichaUsuario } from './pages/FichaUsuario/FichaUsuario'

const FichaUsuarioPage = () => (
  <Routes>
    <Route element={<FichaUsuarioLayout />}>
      <Route path='ficha-usuario' element={<FichaUsuario />} />
      <Route index element={<FichaUsuario />} />
    </Route>
  </Routes>
)

export { FichaUsuarioPage }
