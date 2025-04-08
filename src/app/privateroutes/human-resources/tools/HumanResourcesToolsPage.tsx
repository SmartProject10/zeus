import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { PageTitle } from '../../../generalcomponents/layouts/layoutprovider/LayoutProvider.tsx'
import { PageLink } from '../../../../models/layoutprovider/model.ts'
import { CalendarWrapper } from './calendar/Calendar.tsx'
import { ClockWrapper } from './clock/Clock.tsx'
import { LibraryWrapper } from './library/library.tsx'

const humanResourceToolsBreadcrumbs: Array<PageLink> = [
	{
		title: 'Herramientas',
		path: '/human-resources/tools/calendar',
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
			</Route>
			<Route
				index
				element={<Navigate
					to="/human-resources/tools/calendar" />} />
		</Routes>
	)
}

export default HumanResourcesToolsPage
