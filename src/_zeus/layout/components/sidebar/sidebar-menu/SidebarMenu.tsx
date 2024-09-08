import { useLocation } from 'react-router-dom'
import { SidebarFichaUsuario } from './sidebars/SidebarFichaUsuario'
import { SidebarMain } from './sidebars/SidebarMain'

export const SidebarMenu = () => {
  const { pathname } = useLocation()
  console.log(pathname)

  return (
    <div className='app-sidebar-menu overflow-hidden flex-column-fluid'>
      <div
        id='kt_app_sidebar_menu_wrapper'
        className='app-sidebar-wrapper hover-scroll-overlay-y my-5'
        data-kt-scroll='true'
        data-kt-scroll-activate='true'
        data-kt-scroll-height='auto'
        data-kt-scroll-dependencies='#kt_app_sidebar_logo, #kt_app_sidebar_footer'
        data-kt-scroll-wrappers='#kt_app_sidebar_menu'
        data-kt-scroll-offset='5px'
        data-kt-scroll-save-state='true'
      >
        <div
          className='menu menu-column menu-rounded menu-sub-indention px-3'
          id='#kt_app_sidebar_menu'
          data-kt-menu='true'
          data-kt-menu-expand='false'
        >
          {['/dashboard', '/human-resources'].some(path => pathname.startsWith(path)) && <SidebarMain />}

          {['/ficha-usuario'].some(path => pathname.startsWith(path)) && <SidebarFichaUsuario />}
        </div>
      </div>
    </div>
  )
}
