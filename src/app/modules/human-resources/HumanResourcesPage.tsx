import { Navigate, Route, Routes } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_zeus/layout/core'
import { CalendarWrapper } from './tools/calendar/Calendar'

const humanResourceBreadcrumbs: Array<PageLink> = [
	{
		title: 'Calendario empresarial',
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

const HumanResourcesPage = () => {
	return (
		<Routes>
			<Route
				index
				element={
					<>
						<PageTitle
							breadcrumbs={humanResourceBreadcrumbs}>Trabajadores</PageTitle>
						<CalendarWrapper />
					</>
				}
			/>
			<Route path="*" element={<Navigate to="/sgrrhh" />} />
		</Routes>
	)
}

export default HumanResourcesPage
