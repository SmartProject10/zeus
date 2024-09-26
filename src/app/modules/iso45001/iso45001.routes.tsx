import { Route, Routes } from 'react-router-dom'
import { InspeccionesInternasSeguridad } from './pages/inspeccionesInternasSeguridad'
import { CompromisosAltaGenerencia } from './pages/compromisosAltaGerencia'
import { Botiquin } from './pages/botiquin/Botiquin'
import { PageLink, PageTitle } from '@zeus/_zeus/layout/core'
import { Kit } from './pages/kit/Kit'
import { EPPS } from './pages/epps/delivery'
import { DatabasePage } from './pages/epps/database'
import { ExtintoresPage } from './pages/extintores/extintoresPage'

const registrosBreadcrumbs: Array<PageLink> = [
	{
		title: 'Registro',
		path: '/iso45001',
		isSeparator: false,
		isActive: false,
	},
	{
		title: '',
		path: '',
		isSeparator: true,
		isActive: false,
	},
]

const registroAntiderrame: Array<PageLink> = [
	{
		title: 'Kit',
		path: '/iso45001/kit',
		isSeparator: false,
		isActive: false,
	},
	{
		title: '',
		path: '',
		isSeparator: true,
		isActive: false,
	},
]

export function ISO45001Routes(): JSX.Element {
	return (
		<Routes>
			<Route
				path="entrega-epps"
				element={
					<>
						<EPPS />
					</>
				}
			/>
			<Route
				path="base-de-datos-epps"
				element={
					<>
						<DatabasePage />
					</>
				}
			/>
			<Route
				path="botiquin"
				element={
					<>
						<PageTitle breadcrumbs={registrosBreadcrumbs}>Botiquin</PageTitle>
						<Botiquin />
					</>
				}
			/>
			<Route
				path="kit"
				element={
					<>
						<PageTitle breadcrumbs={registroAntiderrame}>
							Kit Antiderrame
						</PageTitle>
						<Kit />
					</>
				}
			/>
			<Route
				path="inspeccion-extintores"
				element={< ExtintoresPage />}
			/>
			<Route
				path="inspecciones-internas-seguridad"
				element={<InspeccionesInternasSeguridad />}
			/>
			<Route
				path="compromisos-alta-generencia"
				element={<CompromisosAltaGenerencia />}
			/>
		</Routes>
	)
}
