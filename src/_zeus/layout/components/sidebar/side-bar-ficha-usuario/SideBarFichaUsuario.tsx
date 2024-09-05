import { useIntl } from "react-intl";
import { SidebarMenuItem } from "../sidebar-menu/SidebarMenuItem";
import { SidebarMenuItemWithSub } from "../sidebar-menu/SidebarMenuItemWithSub";

export const SidebarFichaUsuario = () => {
    const intl = useIntl();

    return (
        <>
            <SidebarMenuItem
                to="/dashboard"
                icon="home"
                title={intl.formatMessage({ id: "MENU.DASHBOARD" })}
                fontIcon="bi-app-indicator"
            />

            <p className="text-muted fs-9 fw-bold mb-0 mt-2">INFORMACION PERSONAL</p>

            <SidebarMenuItemWithSub to="" icon="bookmark" title="ISO 45001" fontIcon="">

                <SidebarMenuItem
                    to=""
                    icon="people"
                    title="Organizacion"
                    fontIcon="bi-layers"
                />
                <SidebarMenuItem
                    to=""
                    icon="bank"
                    title="Tareas y Avisos"
                    fontIcon="bi-layers"
                />
                <SidebarMenuItem
                    to=""
                    icon="bank"
                    title="Cuadros de Mando"
                    fontIcon="bi-layers"
                />
                <SidebarMenuItem
                    to=""
                    icon="bank"
                    title="Documentacion"
                    fontIcon="bi-layers"
                />

                <SidebarMenuItemWithSub
                    to="/crafted/pages"
                    title="Riesgos"
                    fontIcon="bi-archive"
                    icon="people"
                >
                    <SidebarMenuItem
                        to=""
                        icon="graph-3"
                        title="Factor de Riesgo"
                        fontIcon="bi-layers"
                    />
                    <SidebarMenuItem
                        to=""
                        icon="graph-3"
                        title="Medidas"
                        fontIcon="bi-layers"
                    />
                    <SidebarMenuItem
                        to=""
                        icon="graph-3"
                        title="Evaluaciones"
                        fontIcon="bi-layers"
                    />
                    <SidebarMenuItem
                        to=""
                        icon="graph-3"
                        title="Visitas de Seguridad"
                        fontIcon="bi-layers"
                    />
                    <SidebarMenuItem
                        to=""
                        icon="graph-3"
                        title="Analisis dinamico de Riesgos"
                        fontIcon="bi-layers"
                    />
                    <SidebarMenuItemWithSub
                        to="/crafted/pages"
                        title="Cuadro de medidas"
                        fontIcon="bi-archive"
                        icon="people"
                    >
                        <SidebarMenuItem
                            to=""
                            icon="people"
                            title="Configuracion"
                            fontIcon="bi-layers"
                        />
                    </SidebarMenuItemWithSub>
                </SidebarMenuItemWithSub>
                <SidebarMenuItemWithSub
                    to=""
                    icon="graph-3"
                    title="Formas de Pago"
                    fontIcon="bi-layers"
                />
                <SidebarMenuItemWithSub
                    to=""
                    icon="graph-3"
                    title="Medidas"
                    fontIcon="bi-layers"
                />
                <SidebarMenuItemWithSub
                    to=""
                    icon="graph-3"
                    title="Evaluaciones"
                    fontIcon="bi-layers"
                />
                <SidebarMenuItemWithSub
                    to=""
                    icon="graph-3"
                    title="Visitas de Seguridad"
                    fontIcon="bi-layers"
                />
                <SidebarMenuItemWithSub
                    to=""
                    icon="graph-3"
                    title="Analisis dinamico de Riesgos"
                    fontIcon="bi-layers"
                />
                <SidebarMenuItemWithSub
                    to=""
                    icon="graph-3"
                    title="Cuarto de medidas"
                    fontIcon="bi-layers"
                />
                <SidebarMenuItemWithSub
                    to=""
                    icon="graph-3"
                    title="Configuración"
                    fontIcon="bi-layers"
                />
                <SidebarMenuItemWithSub
                    to=""
                    icon="graph-3"
                    title="Mediciones"
                    fontIcon="bi-layers"
                />
                <SidebarMenuItemWithSub
                    to=""
                    icon="graph-3"
                    title="Estudios Ergonomicos"
                    fontIcon="bi-layers"
                />
            </SidebarMenuItemWithSub>

            <p className="text-muted fs-9 fw-bold mb-0 mt-2">EDUCACIÓN</p>
            <SidebarMenuItemWithSub to="" icon="bookmark" title="ISO 9001" fontIcon=""></SidebarMenuItemWithSub>

            <p className="text-muted fs-9 fw-bold mb-0 mt-2">SOPORTE Y AYUDA</p>
            <SidebarMenuItemWithSub to="" icon="bookmark" title="SG RRHH" fontIcon="">
                <SidebarMenuItem to="/human-resources/main" icon="star" title="Registro Trabajadores" fontIcon="" />
            </SidebarMenuItemWithSub>
        </>
    );
};
