import { Route, Routes } from 'react-router-dom'
import { GestorTrabajadores } from './components/GestorTrabajadores'
import { SgrrhhLayout } from './SgrrhhLayout'

const SgrrhhPage = () => (
  <Routes>
    <Route
      element={<SgrrhhLayout />}>
      <Route
        path="sistema-rrhh"
        element={<GestorTrabajadores />} />
      {/* <Route path='menu-test' element={<MenuTestPage />} /> */}
      <Route
        index
        element={<GestorTrabajadores />} />
    </Route>
  </Routes>
)

export { SgrrhhPage }
