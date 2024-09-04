import {Route, Routes} from 'react-router-dom'
import { FichaUsuarioLayout } from './FichaUsuariosLayout'
import { FichaUsuario } from './components/FichaUsuario'
import { MenuTestPage } from '../../pages/MenuTestPage'

const FichaUsuarioPage = () => (
  <Routes>
    <Route element={<FichaUsuarioLayout />}>
      <Route path='ficha-usuario' element={<FichaUsuario />} />
      {/* <Route path='menu-test' element={<MenuTestPage />} /> */}
      <Route index element={<FichaUsuario />} />
    </Route>
  </Routes>
)

export {FichaUsuarioPage}