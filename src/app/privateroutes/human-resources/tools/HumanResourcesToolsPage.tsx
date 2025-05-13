import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../../_zeus/layout/core'
import { CalendarWrapper } from './calendar/Calendar'
import { SubWorkerWrapper } from './calendar/Calendar'
import { ClockWrapper } from './clock/Clock.tsx'
import { LibraryWrapper } from './library/library.tsx'
import { RegisterTable } from './calendar/components/table/RegisterTable.tsx'
import { RegisterArea } from './calendar/components/table/RegisterArea.tsx'
import { RegisterSede } from './calendar/components/table/RegisterSede.tsx'
import { RegisterSubEm } from './calendar/components/table/RegisterSubEm.tsx'
import { RegisterSubSede } from './calendar/components/table/RegisterSubSede.tsx'

const humanResourceToolsBreadcrumbs: Array<PageLink> = [
	{
		title: 'Herramientas',
		path: '/human-resources/tools',
		isSeparator: false,
		isActive: false,
	},
	{
		title: 'Registrar Empresa',
		path: '/human-resources/tools/calendar/register-table',
		isSeparator: false,
		isActive: false,
	},
	{
		title: 'Registrar Area',
		path: '/human-resources/tools/calendar/register-area',
		isSeparator: false,
		isActive: false,
	},
	{
		title: 'Registrar Sede',
		path: '/human-resources/tools/calendar/register-sede',
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

const HumanResourcesToolsPage = () => {
	return (
		<Routes>
			<Route
				element={<Outlet />}>
				<Route
					path="calendar"
					element={
						<>
							<PageTitle
								breadcrumbs={humanResourceToolsBreadcrumbs}>Calendario Empresarial</PageTitle>
							<CalendarWrapper />
						</>
					}
				/>
				<Route
					path="calendar/register-table"
					element={
						<>
							<PageTitle breadcrumbs={humanResourceToolsBreadcrumbs}>
								Registrar Empresa
							</PageTitle>
							<RegisterTable />
						</>
					}
				/>
				<Route
					path="calendar/register-area"
					element={
						<>
							<PageTitle breadcrumbs={humanResourceToolsBreadcrumbs}>
								Registrar Area
							</PageTitle>
							<RegisterArea />
						</>
					}
				/>
				<Route
					path="calendar/register-sede"
					element={
						<>
							<PageTitle breadcrumbs={humanResourceToolsBreadcrumbs}>
								Registrar Sede
							</PageTitle>
							<RegisterSede />
						</>
					}
				/>
				<Route
					path="calendar/register-sub-em"
					element={
						<>
							<PageTitle breadcrumbs={humanResourceToolsBreadcrumbs}>
								Registrar Sub Empresa
							</PageTitle>
							<RegisterSubEm />
						</>
					}
				/>
				<Route
					path="calendar/register-sub-sede"
					element={
						<>
							<PageTitle breadcrumbs={humanResourceToolsBreadcrumbs}>
								Registrar Sub Sede
							</PageTitle>
							<RegisterSubSede />
						</>
					}
				/>
				<Route
					path="calendar/register-sub-worker"
					element={
						<>
							<PageTitle breadcrumbs={humanResourceToolsBreadcrumbs}>
								Registrar Sub - Trabajador
							</PageTitle>
							<SubWorkerWrapper />
						</>
					}
				/>
				<Route
					path="library"
					element={
						<>
							<PageTitle
								breadcrumbs={humanResourceToolsBreadcrumbs}>Biblioteca</PageTitle>
							<LibraryWrapper />
						</>
					}
				/>
				<Route
					path="clock"
					element={
						<>
							<PageTitle
								breadcrumbs={humanResourceToolsBreadcrumbs}>Reloj en la nube</PageTitle>
							<ClockWrapper />
						</>
					}
				/>
				<Route path="*" element={<Navigate to="/sgrrhh" />} />
			</Route>
		</Routes>
	)
}

export default HumanResourcesToolsPage
