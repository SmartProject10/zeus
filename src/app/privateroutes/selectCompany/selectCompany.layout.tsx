import { Outlet } from 'react-router-dom'

import { Content } from '../../generalcomponents/layouts/content'

export function SelectCompanyLayout(): JSX.Element {
	return (
		<Content>
			<Outlet />
		</Content>
	)
}
