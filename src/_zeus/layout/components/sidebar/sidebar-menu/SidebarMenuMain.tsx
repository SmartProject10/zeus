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
          <SidebarMenuItem to='' icon='bank' title='Gestion de empresas' fontIcon='bi-layers'/>

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
                  <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Gestión de Procesos</span>
              </div>
          </div>

          <SidebarMenuItem to='' icon='graph-3' title='Procesos' fontIcon='bi-layers'/>
          <SidebarMenuItem to='' icon='graph-3' title='Procesos' fontIcon='bi-layers'/>
          <SidebarMenuItem to='' icon='graph-3' title='Procesos' fontIcon='bi-layers'/>

          <SidebarMenuItemWithSub
              to=''
              title='Modelado de Procesos'
              fontIcon='bi-archive'
              icon='document'
          >

              <SidebarMenuItem to='' icon='document' title='Diagramas de Flujo' fontIcon='bi-layers'/>
              <SidebarMenuItem to='' icon='document' title='Simulación de Procesos' fontIcon='bi-layers'/>

          </SidebarMenuItemWithSub>

          <div className='menu-item'>
              <div className='menu-content pt-8 pb-2'>
                  <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Auditorías</span>
              </div>
          </div>

          <SidebarMenuItem to='' icon='graph-3' title='Auditorías' fontIcon='bi-layers'/>
          <SidebarMenuItem to='' icon='data' title='Seguimiento y Análisis de Tendencias' fontIcon='bi-layers'/>
          <SidebarMenuItem to='' icon='security-user' title='Seguridad y Auditoría de Auditorías' fontIcon='bi-layers'/>

          <div className='menu-item'>
              <div className='menu-content pt-8 pb-2'>
                  <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Gestión Documental</span>
              </div>
          </div>

          <SidebarMenuItemWithSub
              to=''
              title='Gestión de Políticas'
              fontIcon='bi-archive'
              icon='document'
          >

              <SidebarMenuItem to='' icon='document' title='Politicas ambientales' fontIcon='bi-layers'/>
              <SidebarMenuItem to='' icon='document' title='Politicas de calidad' fontIcon='bi-layers'/>
              <SidebarMenuItem to='' icon='document' title='Politicas de salud y seguridad ocupacional'
                               fontIcon='bi-layers'/>
              <SidebarMenuItem to='' icon='document' title='Politicas de gestion de energia' fontIcon='bi-layers'/>

          </SidebarMenuItemWithSub>


          <SidebarMenuItem to='' icon='document' title='Procesos y Procedimientos' fontIcon='bi-layers'/>

          <SidebarMenuItemWithSub
              to=''
              title='Gestión de Políticas'
              fontIcon='bi-archive'
              icon='document'
          >

              <SidebarMenuItem to='' icon='document' title='Politicas ambientales' fontIcon='bi-layers'/>
              <SidebarMenuItem to='' icon='document' title='Politicas de calidad' fontIcon='bi-layers'/>
              <SidebarMenuItem to='' icon='document' title='Politicas de salud y seguridad ocupacional'
                               fontIcon='bi-layers'/>
              <SidebarMenuItem to='' icon='document' title='Politicas de gestion de energia' fontIcon='bi-layers'/>

          </SidebarMenuItemWithSub>

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
