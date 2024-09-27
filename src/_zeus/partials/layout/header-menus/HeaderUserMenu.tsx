
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@zeus/@hooks/auth/useAuth.tsx'
import { Languages } from './Languages'
import { toAbsoluteUrl } from '../../../helpers'

const HeaderUserMenu: FC = () => {
	const { currentUser, logout } = useAuth()
	const location = window.location

	return (
		<div
			className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
			data-kt-menu='true'
		>
			<div className='menu-item px-3'>
				<div className='menu-content d-flex align-items-center px-3'>
					<div className='symbol symbol-50px me-5'>
						<img alt='Logo' src={toAbsoluteUrl('media/avatars/300-3.jpg')} />
					</div>

					<div className='d-flex flex-column'>
						<div className='fw-bolder d-flex align-items-center fs-5'>
							{currentUser?.first_name} {currentUser?.first_name}
							<span className='badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2'>VIP</span>
						</div>
						<a href='#' className='fw-bold text-muted text-hover-primary fs-7'>
							{currentUser?.email}
						</a>
					</div>
				</div>
			</div>

			<div className='separator my-2'></div>

			{

				!(location.pathname === "/select-company")

				&&

				<>
					<div className='menu-item px-5'>
						<Link to={'/home'} className='menu-link px-5'>
							Mi Perfil
						</Link>
					</div>

					<div className='menu-item px-5'>
						<a href='#' className='menu-link px-5'>
							<span className='menu-text'>Pendientes</span>
							<span className='menu-badge'>
								<span className='badge badge-light-danger badge-circle fw-bolder fs-7'>3</span>
							</span>
						</a>
					</div>

					<div
						className='menu-item px-5'
						data-kt-menu-trigger='hover'
						data-kt-menu-placement='left-start'
						data-kt-menu-flip='bottom'
					>

					</div>

					<div className='menu-item px-5'>
						<a href='#' className='menu-link px-5'>
							Estado
						</a>
					</div>

					<div className='separator my-2'></div>
				</>

			}

			{/*<Languages />*/}

			<div className='menu-item px-5 my-1'>
				<Link to='/crafted/account/settings' className='menu-link px-5'>
					Configuracion
				</Link>
			</div>

			<div className='menu-item px-5'>
				<a onClick={logout} className='menu-link px-5'>
					Salir
				</a>
			</div>
		</div>
	)
}

export { HeaderUserMenu }
