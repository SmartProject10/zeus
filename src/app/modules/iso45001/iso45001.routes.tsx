import { Route, Routes } from 'react-router-dom'
import { InspeccionesInternasSeguridad } from './pages/inspeccionesInternasSeguridad'
import { CompromisosAltaGenerencia } from './pages/compromisosAltaGerencia'
import { EPPS } from './pages/epps'

export function ISO45001Routes(): JSX.Element {
    return (
        <Routes>
            <Route
                path="inspecciones-internas-seguridad"
                element={<InspeccionesInternasSeguridad />} />
						<Route path="epps" element={<EPPS />} />
            <Route
                path="compromisos-alta-generencia"
                element={<CompromisosAltaGenerencia />} />
        </Routes>
    )
}
