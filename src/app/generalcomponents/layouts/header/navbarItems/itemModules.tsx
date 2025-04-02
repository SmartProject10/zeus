import { KTIcon } from "@zeus/app/generalcomponents/helpers"
import clsx from 'clsx'
import { Link } from 'react-router-dom'

type Props = {
	toggleBtnClass?: string
	toggleBtnIconClass?: string
	menuPlacement?: string
	menuTrigger?: string
}

export const NavbarItemModules = ({
	toggleBtnClass = '',
	toggleBtnIconClass = 'fs-1',
	menuPlacement = 'bottom-end',
	menuTrigger = "{default: 'click', lg: 'hover'}",
}: Props) => {

	const MODULES = [
		{ module: '⁠9001-20152', url: '/iso9001' },
		{ module: '45001-20183', url: '/iso45001' },
		{ module: '14001-2018', url: '#' },
		{ module: '27001-2022', url: '#' },
		{ module: '19601-2017', url: '#' },
		{ module: '20121-2024', url: '#' },
		{ module: '30301-2019', url: '#' },
		{ module: '39001-2018', url: '#' },
		{ module: '13485-2018', url: '#' },
		{ module: '22001-2018', url: '#' },
		{ module: '50001-2018', url: '#' },
		{ module: '21001-2018', url: '#' },
		{ module: '28001-2018', url: '#' },
		{ module: '37001-2018', url: '#' },
		{ module: '17020-2018 EMA', url: '#' },
		{ module: '29001-2020', url: '#' },
		{ module: '26001-2019', url: '#' },
		{ module: '15189-2023', url: '#' },
		{ module: '27701-2019', url: '#' },
		{ module: '16949-2016', url: '#' },
		{ module: '17025-2017', url: '#' },
		{ module: '22716-2008', url: '#' },
		{ module: '22301-2019', url: '#' },
		{ module: '24001-2015', url: '#' },
		{ module: '17021-2015', url: '#' },
		{ module: 'SGRRHH', url: '/sgrrhh' },
	].filter(module => module.url !== window.location.pathname);

	return (
		<>
			{/* begin::Menu toggle */}
			<a
				href='#'
				className={clsx('btn btn-icon ', toggleBtnClass)}
				data-kt-menu-trigger={menuTrigger}
				data-kt-menu-attach='parent'
				data-kt-menu-placement={menuPlacement}
			>
				<KTIcon iconName='abstract-13' className={clsx('theme-dark-hide', toggleBtnIconClass)} />
			</a>
			{/* begin::Menu toggle */}

			<div
				className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-muted menu-active-bg menu-state-primary fw-semibold py-4 fs-base w-175px'
				data-kt-menu='true'
			>
				{MODULES.map((module, index) => (
					<div key={index} className='menu-item px-3 my-0'>
						<Link
							to={module.url}
							// className={clsx('menu-link px-3 py-2', { active: menuMode === 'system' })}
							className={clsx('menu-link px-3 py-2')}
						>
							<span className='menu-title'>{module.module}</span>
						</Link>
					</div>
				))}
			</div>
		</>
	)
}
