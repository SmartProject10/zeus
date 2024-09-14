import { Route, Routes } from 'react-router-dom'
import { InspeccionesInternasSeguridad } from './pages/inspeccionesInternasSeguridad'
import { CompromisosAltaGenerencia } from './pages/compromisosAltaGerencia'
import { LucesEmergencia } from './pages/lucesEmergencia'

export function ISO45001Routes(): JSX.Element {
	return (
		<Routes>
			<Route path="inspecciones-internas-seguridad" element={<InspeccionesInternasSeguridad />} />
			<Route path="compromisos-alta-generencia" element={<CompromisosAltaGenerencia />} />
			<Route path="luces-emergencia" element={<LucesEmergencia />} />
		</Routes>
	)
}
