import { useIntl } from 'react-intl'
import { KTIcon } from '../../../../helpers'
import { SidebarMenuItemWithSub } from './SidebarMenuItemWithSub'
import { SidebarMenuItem } from './SidebarMenuItem'

const SidebarMenuMain = () => {
    const intl = useIntl()

    return (
        <>
            <SidebarMenuItem
                to='/dashboard'
                icon='home'
                title={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
                fontIcon='bi-app-indicator'
            />
            <SidebarMenuItem
                to='/apps/user-management/users'
                icon='people'
                title={intl.formatMessage({ id: 'MENU.GESTION_USUARIOS' })}
                fontIcon='bi-layers'
            />
            <SidebarMenuItem to='' icon='bank' title={intl.formatMessage({ id: 'MENU.GESTION_EMPRESAS' })} fontIcon='bi-layers' />




            <SidebarMenuItemWithSub
                to='/crafted/pages'
                title={intl.formatMessage({ id: 'MENU.RECURSOS_HUMANOS' })}
                fontIcon='bi-archive'
                icon='people'
            >

                <SidebarMenuItemWithSub
                    to='/crafted/pages'
                    title={intl.formatMessage({ id: 'MENU.EMPLEADOS' })}
                    fontIcon='bi-archive'
                    icon='people'
                >


                    <SidebarMenuItem to='' icon='people' title={intl.formatMessage({ id: 'MENU.GESTION_EMPLEADOS' })} fontIcon='bi-layers' />
                    <SidebarMenuItem to='' icon='people' title={intl.formatMessage({ id: 'MENU.GESTION_EMPLEADOS_EXTERNOS' })} fontIcon='bi-layers' />
                    <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.PERMISOS_ROLES' })} fontIcon='bi-layers' />
                    <SidebarMenuItem to='' icon='delivery-time' title={intl.formatMessage({ id: 'MENU.HISTORIAL_LABORAL' })} fontIcon='bi-layers' />

                </SidebarMenuItemWithSub>

                <SidebarMenuItemWithSub
                    to='/crafted/pages'
                    title={intl.formatMessage({ id: 'MENU.RECLUTAMIENTO_SELECCION' })}
                    fontIcon='bi-archive'
                    icon='people'
                >


                    <SidebarMenuItem to='' icon='people' title={intl.formatMessage({ id: 'MENU.VACANTES' })} fontIcon='bi-layers' />
                    <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.GESTION_CANDIDATOS' })} fontIcon='bi-layers' />
                    <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.ARCHIVO_CANDIDATOS' })} fontIcon='bi-layers' />
                    <SidebarMenuItem to='' icon='delivery-time' title={intl.formatMessage({ id: 'MENU.PROCESO_SELECCION' })} fontIcon='bi-layers' />
                    <SidebarMenuItem to='' icon='category' title={intl.formatMessage({ id: 'MENU.DOCUMENTACION_CONTRATACION' })} fontIcon='bi-layers' />
                </SidebarMenuItemWithSub>

                <SidebarMenuItemWithSub
                    to='/crafted/pages'
                    title={intl.formatMessage({ id: 'MENU.DESEMPENO' })}
                    fontIcon='bi-archive'
                    icon='people'
                >


                    <SidebarMenuItem to='' icon='people' title={intl.formatMessage({ id: 'MENU.EVALUACIONES_DESEMPENO' })} fontIcon='bi-layers' />
                    <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.OBJETIVOS_METAS' })} fontIcon='bi-layers' />
                    <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.RETROALIMENTACION_REVISIONES' })} fontIcon='bi-layers' />


                </SidebarMenuItemWithSub>

                <SidebarMenuItemWithSub
                    to='/crafted/pages'
                    title={intl.formatMessage({ id: 'MENU.FORMACION_DESARROLLO' })}
                    fontIcon='bi-archive'
                    icon='people'
                >

                    <SidebarMenuItem to='' icon='people' title={intl.formatMessage({ id: 'MENU.PROGRAMAS_FORMACION' })} fontIcon='bi-layers' />
                    <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.HISTORIAL_CAPACITACIONES' })} fontIcon='bi-layers' />
                    <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.EVALUACION_COMPETENCIAS' })} fontIcon='bi-layers' />

                </SidebarMenuItemWithSub>

                <SidebarMenuItemWithSub
                    to='/crafted/pages'
                    title={intl.formatMessage({ id: 'MENU.NOMINA_BENEFICIOS' })}
                    fontIcon='bi-archive'
                    icon='people'
                >

                    <SidebarMenuItem to='' icon='people' title={intl.formatMessage({ id: 'MENU.GESTION_NOMINA' })} fontIcon='bi-layers' />
                    <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.BENEFICIOS_EMPLEADOS' })} fontIcon='bi-layers' />
                    <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.DEDUCCIONES_BONIFICACIONES' })} fontIcon='bi-layers' />

                </SidebarMenuItemWithSub>

                <SidebarMenuItemWithSub
                    to='/crafted/pages'
                    title={intl.formatMessage({ id: 'MENU.AUSENCIAS_TIEMPO' })}
                    fontIcon='bi-archive'
                    icon='people'
                >


                    <SidebarMenuItem to='' icon='people' title={intl.formatMessage({ id: 'MENU.SOLICITUD_VACACIONES_PERMISOS' })} fontIcon='bi-layers' />
                    <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.SEGUIMIENTO_AUSENCIAS' })} fontIcon='bi-layers' />
                    <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.RELOJ_TIEMPO_NUBE' })} fontIcon='bi-layers' />
                    <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.CALENDARIO_LABORAL' })} fontIcon='bi-layers' />

                </SidebarMenuItemWithSub>

                <SidebarMenuItemWithSub
                    to='/crafted/pages'
                    title={intl.formatMessage({ id: 'MENU.REPORTES_ANALISIS' })}
                    fontIcon='bi-archive'
                    icon='people'
                >


                    <SidebarMenuItem to='' icon='people' title={intl.formatMessage({ id: 'MENU.REPORTES_PERSONALIZABLES' })} fontIcon='bi-layers' />
                    <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.ANALISIS_DATOS_RRHH' })} fontIcon='bi-layers' />
                    <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.METRICAS_RENDIMIENTO' })} fontIcon='bi-layers' />


                </SidebarMenuItemWithSub>

                <SidebarMenuItem to='' icon='graph-3' title={intl.formatMessage({ id: 'MENU.TERMINACION_RELACION_LABORAL' })} fontIcon='bi-layers' />

            </SidebarMenuItemWithSub>


            <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.GESTION_DOCUMENTOS' })} fontIcon='bi-layers' />
            <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.PROVEEDORES_CONTRATOS' })} fontIcon='bi-layers' />

            <SidebarMenuItemWithSub
                to='/crafted/pages'
                title={intl.formatMessage({ id: 'MENU.GESTION_CALIDAD' })}
                fontIcon='bi-archive'
                icon='people'
            >


                <SidebarMenuItem to='' icon='people' title={intl.formatMessage({ id: 'MENU.PLANIFICACION_CALIDAD' })} fontIcon='bi-layers' />
                <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.AUDITORIAS' })} fontIcon='bi-layers' />
                <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.NO_CONFORMIDADES' })} fontIcon='bi-layers' />
                <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.MEJORA_CONTINUA' })} fontIcon='bi-layers' />

            </SidebarMenuItemWithSub>

            <SidebarMenuItemWithSub
                to='/crafted/pages'
                title={intl.formatMessage({ id: 'MENU.SEGURIDAD_SALUD_TRABAJO' })}
                fontIcon='bi-archive'
                icon='people'
            >


                <SidebarMenuItem to='' icon='people' title={intl.formatMessage({ id: 'MENU.GESTION_RIESGOS_LABORALES' })} fontIcon='bi-layers' />
                <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.CAPACITACION_SEGURIDAD' })} fontIcon='bi-layers' />
                <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.INCIDENTES_ACCIDENTES' })} fontIcon='bi-layers' />
                <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.NORMATIVAS_SEGURIDAD' })} fontIcon='bi-layers' />

            </SidebarMenuItemWithSub>

            <SidebarMenuItemWithSub
                to='/crafted/pages'
                title={intl.formatMessage({ id: 'MENU.GESTION_ANTISOBORNO' })}
                fontIcon='bi-archive'
                icon='people'
            >

                <SidebarMenuItem to='' icon='people' title={intl.formatMessage({ id: 'MENU.EVALUACION_RIESGOS_SOBORNO' })} fontIcon='bi-layers' />
                <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.POLITICAS_ANTICORRUPCION' })} fontIcon='bi-layers' />
                <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.AUDITORIAS_ANTICORRUPCION' })} fontIcon='bi-layers' />
                <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.INCIDENTES_SOBORNO' })} fontIcon='bi-layers' />

            </SidebarMenuItemWithSub>

            <SidebarMenuItemWithSub
                to='/crafted/pages'
                title={intl.formatMessage({ id: 'MENU.GESTION_AMBIENTAL' })}
                fontIcon='bi-archive'
                icon='people'
            >


                <SidebarMenuItem to='' icon='people' title={intl.formatMessage({ id: 'MENU.EVALUACION_IMPACTOS_AMBIENTALES' })} fontIcon='bi-layers' />
                <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.CONTROL_ASPECTOS_AMBIENTALES' })} fontIcon='bi-layers' />
                <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.GESTION_RESIDUOS' })} fontIcon='bi-layers' />
                <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.NORMATIVAS_AMBIENTALES' })} fontIcon='bi-layers' />

            </SidebarMenuItemWithSub>
            <SidebarMenuItemWithSub
                to='/crafted/pages'
                title={intl.formatMessage({ id: 'MENU.AUDITORIAS' })}
                fontIcon='bi-archive'
                icon='people'
            >

                <SidebarMenuItem to='' icon='people' title={intl.formatMessage({ id: 'MENU.PROGRAMAR_NUEVA_AUDITORIA' })} fontIcon='bi-layers' />
                <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.PRUEBA_AUDITORIAS' })} fontIcon='bi-layers' />
                <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.EJECUCION_AUDITORIAS' })} fontIcon='bi-layers' />
                <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.NO_CONFORMIDADES' })} fontIcon='bi-layers' />
                <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.REPORTES_ANALISIS' })} fontIcon='bi-layers' />

            </SidebarMenuItemWithSub>

        </>
    )
}

export { SidebarMenuMain }
