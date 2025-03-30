import { Route, Routes } from 'react-router-dom'

// Layout
import { SelectCompanyLayout } from './selectCompany.layout'

// Pages
import { SelectCompany } from './selectCompany/selectCompany'

export function SelectCompanyRoutes(): JSX.Element {
	return (
		<Routes>
			<Route element={<SelectCompanyLayout />}>
				<Route index element={<SelectCompany />} />
			</Route>
		</Routes>
	)
}
