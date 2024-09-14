import { Route, Routes } from 'react-router-dom'
import { InspeccionesInternasSeguridad } from './pages/inspeccionesInternasSeguridad'
import { CompromisosAltaGenerencia } from './pages/compromisosAltaGerencia'
import { ExtintoresPage } from './pages/extintoresPage'

export function ISO45001Routes(): JSX.Element {
	return (
		<Routes>
			<Route
				path="inspecciones-internas-seguridad"
				element={<InspeccionesInternasSeguridad />}
			/>
			<Route
				path="inspeccion-extintores"
				element={< ExtintoresPage />}
			/>
			<Route
				path="compromisos-alta-generencia"
				element={<CompromisosAltaGenerencia />}
			/>
		</Routes>
	)
}
