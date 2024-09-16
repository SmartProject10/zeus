import { FC } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { useAuth } from '@zeus/@hooks/auth/useAuth.tsx'
import { PrivateRoutes } from './PrivateRoutes'

import { App } from '../App'
import { AuthPage } from '../modules/_auth/AuthPage'
import { Logout } from '../modules/_auth/pages/Logout'
import { ErrorsPage } from '../modules/errors/ErrorsPage'
import { SelectCompanyRoutes } from '../modules/selectCompany/selecCompany.routes'

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const { BASE_URL } = import.meta.env

export const AppRoutes: FC = () => {
	const { currentUser } = useAuth()
	return (
		<BrowserRouter basename={BASE_URL}>
			<Routes>
				<Route element={<App />}>
					<Route path="logout" element={<Logout />} />
					<Route path="error/*" element={<ErrorsPage />} />

					{currentUser ? (
						<>
							<Route path="/select-company/*" element={<SelectCompanyRoutes />} />
							<Route path="*" element={<PrivateRoutes />} />
						</>
					) : (
						<>
							<Route path="auth/*" element={<AuthPage />} />
							<Route path="*" element={<Navigate to="/auth" />} />
						</>
					)}
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
