import clsx from 'clsx'
import './index.scss'

import { Navbar as NavbarItems } from '@zeus/app/generalcomponents/layouts/header/Navbar'
import { useLayout } from '@zeus/app/generalcomponents/layouts/layoutprovider/LayoutProvider'

export function Navbar(): JSX.Element {
	const { config, classes } = useLayout()

	return (
		<div
			id="kt_app_header"
			className="app-header navbar-custom"
	// data-kt-sticky="true"
	// data-kt-sticky-activate="{default: true, lg: true}"
	// data-kt-sticky-name="app-header-minimize"
	// data-kt-sticky-offset='{default: "200px", lg: "0"}'
	// data-kt-sticky-animation="false"
			style={{ position: 'sticky', top: 0, marginLeft: 0, marginRight: 0 }}
		>
			<div
				id="kt_app_header_container"
				className={clsx(
					'app-container',
					classes.headerContainer.join(' '),
					config.app?.header?.default?.containerClass,
				)}
			>
				<div
					id="kt_app_header_wrapper"
					className="w-100">
					<div
						className="d-flex align-items-stretch justify-content-end mt-2"
						style={{ borderBottom: '1px solid #f4f4f4' }}
					>
						<NavbarItems />
					</div>
				</div>
			</div>
		</div>
	)
}
