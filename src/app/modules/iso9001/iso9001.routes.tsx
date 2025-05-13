import { Route, Routes } from 'react-router-dom'
import { Dashboard } from './pages/dashboard'
import { TipoDocumento } from './pages/nomenclatura/tipo-documento'
import { Proyectos } from './pages/nomenclatura/proyectos'
import { Corporativo } from './pages/nomenclatura/corporativo'
import { Areas } from './pages/nomenclatura/areas'
import { SubAreas } from './pages/nomenclatura/sub-areas'
import ControlPage from './pages/document/control'

export function ISO9001Routes(): JSX.Element {
    return (
        <Routes>
            <Route path="/pages/nomenclatura/tipo-documentos" element={<TipoDocumento />} />
            <Route path="/pages/nomenclatura/proyectos" element={<Proyectos />} />
            <Route path="/pages/nomenclatura/corporativo" element={<Corporativo />} />
            <Route path="/pages/nomenclatura/areas" element={<Areas />} />
            <Route path="/pages/nomenclatura/sub-areas" element={<SubAreas />} />
            <Route path="/pages/document/control" element={<ControlPage />} />
            <Route path="*" element={<Dashboard />} />
        </Routes>
    )
}
