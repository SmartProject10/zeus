import { SidebarMenuItem } from "../components/SidebarMenuItem";
import { SidebarMenuItemWithSub } from "../components/SidebarMenuItemWithSub";

interface SidebarIso45001Props { }

export function SidebarISO45001(props: SidebarIso45001Props): JSX.Element {
    return (
        <>
            <SidebarMenuItemWithSub
                to="/crafted/pages"
                title="Registro"
                fontIcon="bi-archive"
                icon="people"
            >
                <SidebarMenuItem
                    to=""
                    icon="graph-3"
                    title="Luces de emergencia"
                    fontIcon="bi-layers"
                />

                <SidebarMenuItem
                    to=""
                    icon="graph-3"
                    title="Kit antiderrames"
                    fontIcon="bi-layers"
                />

                <SidebarMenuItem
                    to="/iso45001/botiquin"
                    icon="graph-3"
                    title="Botiquin"
                    fontIcon="bi-layers"
                />

                <SidebarMenuItem
                    to=""
                    icon="graph-3"
                    title="Examenes medicos ocupacionales"
                    fontIcon="bi-layers"
                />

                <SidebarMenuItem
                    to="/iso45001/inspecciones-internas-seguridad"
                    icon="graph-3"
                    title="Inspecciones internas de seguridad"
                    fontIcon="bi-layers"
                />

                <SidebarMenuItem
                    to=""
                    icon="graph-3"
                    title="Accidentes/Enfermedades de trabajo"
                    fontIcon="bi-layers"
                />

                <SidebarMenuItem
                    to=""
                    icon="graph-3"
                    title="Monitoreos ocupacionales"
                    fontIcon="bi-layers"
                />

                <SidebarMenuItem
                    to=""
                    icon="graph-3"
                    title="Estadisticas SST"
                    fontIcon="bi-layers"
                />

                <SidebarMenuItem
                    to=""
                    icon="graph-3"
                    title="Inducciones"
                    fontIcon="bi-layers"
                />

                <SidebarMenuItem
                    to=""
                    icon="graph-3"
                    title="Capacitaciones"
                    fontIcon="bi-layers"
                />

                <SidebarMenuItem
                    to=""
                    icon="graph-3"
                    title="Simulacros"
                    fontIcon="bi-layers"
                />

                <SidebarMenuItem
                    to=""
                    icon="graph-3"
                    title="Auditorias"
                    fontIcon="bi-layers"
                />

                <SidebarMenuItem
                    to="/iso45001/compromisos-alta-generencia"
                    icon="graph-3"
                    title="Compromisos de alta generencia"
                    fontIcon="bi-layers"
                />
            </SidebarMenuItemWithSub>

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
        </>
    );
}
