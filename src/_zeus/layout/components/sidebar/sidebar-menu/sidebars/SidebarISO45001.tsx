import { SidebarMenuItem } from "../components/SidebarMenuItem";
import { SidebarMenuItemWithSub } from "../components/SidebarMenuItemWithSub";

interface SidebarIso45001Props { handleReloadMenu: any }

export function SidebarISO45001(props: SidebarIso45001Props): JSX.Element {
	return (
		<>
			<SidebarMenuItem
				to="/iso45001"
				icon="graph-3"
				title="ISO 45001"
				fontIcon="bi-layers"
				handleReloadMenu={props.handleReloadMenu}
			/>

			<SidebarMenuItemWithSub to="" title="EPPS" fontIcon="" icon="people">
				<SidebarMenuItem
					to="iso45001/entrega-epps"
					icon="graph-3"
					title="Entrega de EPPS"
					fontIcon="bi-layers"
				/>
				<SidebarMenuItem
					to="iso45001/base-de-datos-epps"
					icon="graph-3"
					title="Base de datos de EPPS"
					fontIcon="bi-layers"
				/>
			</SidebarMenuItemWithSub>

			<SidebarMenuItemWithSub
				to=""
				title="PASST"
				fontIcon=""
				icon="people"
			></SidebarMenuItemWithSub>

			<SidebarMenuItemWithSub
				to=""
				title="Linea Base"
				fontIcon=""
				icon="people"
			></SidebarMenuItemWithSub>

			<SidebarMenuItemWithSub
				to="/crafted/pages"
				title="Registro"
				fontIcon="bi-archive"
				icon="people"
			>
				<SidebarMenuItemWithSub
					to="/crafted/pages"
					title="Luces de emergencia"
					fontIcon="bi-archive"
					icon="people"
				>
					<SidebarMenuItem
						to="/iso45001/luces-de-emergencia"
						icon="graph-3"
						title="Registro luces de emergencia"
						fontIcon="bi-layers"
					/>
					<SidebarMenuItem
						to="/iso45001/inspeccion-luces-de-emergencia"
						icon="graph-3"
						title="Inspección luces de emergencia"
						fontIcon="bi-layers"
					/>
				</SidebarMenuItemWithSub>

				<SidebarMenuItem
					to="/iso45001/kit"
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
					to="/iso45001/base-de-datos-registro"
					icon="graph-3"
					title="Bases de datos"
					fontIcon="bi-layers"
				/>

				<SidebarMenuItem
					to="/iso45001/accidentes-enfermedades-trabajo"
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
					to="/iso45001/asistencia"
					icon="graph-3"
					title="Asistencia"
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
