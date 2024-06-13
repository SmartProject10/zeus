import {useIntl} from 'react-intl'
import {KTIcon} from '../../../../helpers'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'

const SidebarMenuMain = () => {
  const intl = useIntl()

  return (
      <>
          <SidebarMenuItem
              to='/dashboard'
              icon='home'
              title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
              fontIcon='bi-app-indicator'
          />
          <SidebarMenuItem
              to='/apps/user-management/users'
              icon='people'
              title='Gestion de usuarios'
              fontIcon='bi-layers'
          />
          <SidebarMenuItem to='/builder' icon='bank' title='Gestion de empresas' fontIcon='bi-layers'/>

          <div className='menu-item'>
              <div className='menu-content pt-8 pb-2'>
                  <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Recursos humanos</span>
              </div>
          </div>

          <SidebarMenuItemWithSub
              to='/crafted/pages'
              title='Empleados'
              fontIcon='bi-archive'
              icon='people'
          >

              <SidebarMenuItem to='' icon='people' title='Gestión de empleados' fontIcon='bi-layers'/>
              <SidebarMenuItem to='' icon='user-tick' title='Gestión de beneficios' fontIcon='bi-layers'/>
              <SidebarMenuItem to='' icon='profile-user' title='Gestión del desempeño' fontIcon='bi-layers'/>
              <SidebarMenuItem to='' icon='profile-circle' title='Reclutamiento y selección' fontIcon='bi-layers'/>
              <SidebarMenuItem to='' icon='delivery-time' title='Seguimiento' fontIcon='bi-layers'/>
              <SidebarMenuItem to='' icon='category' title='Autoservicio' fontIcon='bi-layers'/>

          </SidebarMenuItemWithSub>

          <SidebarMenuItem to='' icon='graph-3' title='Análisis y reportes' fontIcon='bi-layers'/>
          <SidebarMenuItem to='' icon='data' title='Automatización de procesos' fontIcon='bi-layers'/>
          <SidebarMenuItem to='' icon='security-user' title='Seguridad y cumplimiento' fontIcon='bi-layers'/>
          <SidebarMenuItem to='' icon='teacher' title='Formación y competencias' fontIcon='bi-layers'/>


          <div className='menu-item'>
              <div className='menu-content pt-8 pb-2'>
                  <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Gestión de Calidad </span>
              </div>
          </div>

          <SidebarMenuItem to='' icon='document' title='Gestión de documentos' fontIcon='bi-layers'/>
          <SidebarMenuItem to='' icon='folder-up' title='Auditorías internas' fontIcon='bi-layers'/>
          <SidebarMenuItem to='' icon='folder-up' title='Gestión de riesgos' fontIcon='bi-layers'/>
          <SidebarMenuItem to='' icon='folder-up' title='Gestión de proveedores' fontIcon='bi-layers'/>


          <SidebarMenuItemWithSub
              to=''
              title='Herramientas'
              icon='element-7'
              fontIcon='bi-layers'
          >

              <SidebarMenuItem to='' icon='chart' title='Indicadores de desempeño' fontIcon='bi-layers'/>
              <SidebarMenuItem to='' icon='code' title='integración a/con terceros' fontIcon='bi-layers'/>

          </SidebarMenuItemWithSub>


      </>
  )
}

export {SidebarMenuMain}
