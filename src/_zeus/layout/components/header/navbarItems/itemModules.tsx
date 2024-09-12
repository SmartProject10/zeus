import { KTIcon } from '@zeus/_zeus/helpers'
import clsx from 'clsx'

const Modules = [
    '⁠9001-20152',
    '45001-20183',
    '14001-2018',
    '27001-2022',
    '19601-2017',
    '20121-2024',
    '30301-2019',
    '39001-2018',
    '13485-2018',
    '22001-2018',
    '50001-2018',
    '21001-2018',
    '28001-2018',
    '37001-2018',
    '17020-2018 EMA',
    '29001-2020',
    '26001-2019',
    '15189-2023',
    '27701-2019',
    '16949-2016',
    '17025-2017',
    '22716-2008',
    '22301-2019',
    '24001-2015',
    '17021-2015',
]


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
                {Modules.map((module, index) => (
                    <div key={index} className='menu-item px-3 my-0'>
                        <a
                            href='#'
                            // className={clsx('menu-link px-3 py-2', { active: menuMode === 'system' })}
                            className={clsx('menu-link px-3 py-2')}
                        >
                            <span className='menu-title'>{module}</span>
                        </a>
                    </div>
                ))}
            </div>
        </>
    )
}
