import { Route, Routes } from 'react-router-dom'
import { InspeccionesInternasSeguridad } from './pages/inspeccionesInternasSeguridad'
import { CompromisosAltaGenerencia } from './pages/compromisosAltaGerencia'
import Iso45001Cards from './pages/iso45001/Iso45001Cards'
import { Botiquin } from './pages/botiquin/Botiquin'
import { PageLink,PageTitle } from '@zeus/app/_zeus/layout/core'
import { Kit } from './pages/kit/Kit'
import { EPPS } from './pages/epps/delivery'
import { DatabasePage } from './pages/epps/database'
import { ExtintoresPage } from './pages/extintores/extintoresPage'
import { EmergencyLightsPage } from './pages/registro/luces-de-emergncia/EmergencyLightsPage'
import { InspectionEmergencyLightsPage } from './pages/registro/inspeccion-luces-de-emergncia/InspectionEmergencyLightsPage'
import { Asistencia } from './pages/assistance/Asistencia'
import { AccidentsillnessesAtWork } from './pages/accidents/AccidentsillnessesAtWork'

const indexIso45001: Array<PageLink> = [
	{
		title: 'Iso45001',
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
				path="luces-de-emergencia"
				element={
					<>
						<EmergencyLightsPage />
					</>
				}
			/>
			<Route
				path="inspeccion-luces-de-emergencia"
				element={
					<>
						<InspectionEmergencyLightsPage />
					</>
				}
			/>
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
				path=""
				element={
					<>
						<PageTitle breadcrumbs={indexIso45001}>Iso 45001</PageTitle>
						<Iso45001Cards />
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
				path="asistencia"
				element={
					<>
						<PageTitle breadcrumbs={registrosBreadcrumbs}>Asistencia</PageTitle>
						<Asistencia />
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
			<Route path="inspeccion-extintores" element={<ExtintoresPage />} />
			<Route
				path="inspecciones-internas-seguridad"
				element={<InspeccionesInternasSeguridad />}
			/>
			<Route
				path="compromisos-alta-generencia"
				element={<CompromisosAltaGenerencia />}
			/>
			<Route
				path="accidentes-enfermedades-trabajo"
				element={
					<>
						<PageTitle breadcrumbs={registrosBreadcrumbs}>Accidentes/Enfermedades de trabajo</PageTitle>
						<AccidentsillnessesAtWork />
					</>
				}
			/>
		</Routes>
	);
}
