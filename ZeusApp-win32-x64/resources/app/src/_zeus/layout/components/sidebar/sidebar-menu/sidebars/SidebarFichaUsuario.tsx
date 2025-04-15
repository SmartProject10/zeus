import { useIntl } from "react-intl";
import { SidebarMenuItem } from "../components/SidebarMenuItem";
import { SidebarMenuItemWithSub } from "../components/SidebarMenuItemWithSub";
import { SidebarSubtitle } from "../components/SidebarSubtitle";

export const SidebarFichaUsuario = () => {
	const intl = useIntl();

	return (
		<>
			<SidebarMenuItem
				to="/home"
				icon="home"
				title={intl.formatMessage({ id: "MENU.DASHBOARD" })}
				fontIcon="bi-app-indicator"
			/>
			<SidebarSubtitle label="información personal" />
			<SidebarMenuItem
				to="/ficha-usuario"
				icon="user"
				title={intl.formatMessage({ id: "MENU.USER_TAB" })}
				fontIcon="bi-app-indicator"
			/>
			<SidebarMenuItem to="" icon="gear" title="Otros" fontIcon="bi-gear" />

			<SidebarSubtitle label="Educación" />
			<SidebarMenuItemWithSub
				to="/courses"
				icon="folder-added"
				title="Cursos"
				fontIcon="bi-circle"
			>
				<SidebarMenuItem
					to="/courses/courses-index/"
					icon="folder"
					title="Todos"
					fontIcon="bi-circle"
				/>
				<SidebarMenuItem
					to="/courses/normative-index/"
					icon="folder"
					title="Cursos normativos de cumplimiento"
					fontIcon="bi-circle"
				/>
				<SidebarMenuItem
					to="/courses/learning-index/"
					icon="folder"
					title="Programa aprendizaje corporativo"
					fontIcon="bi-circle"
				/>
				<SidebarMenuItem
					to="/courses/procedures-index/"
					icon="folder"
					title="Procedimientos institucionales"
					fontIcon="bi-circle"
				/>
			</SidebarMenuItemWithSub>
			<SidebarMenuItem
				to="/biblioteca"
				icon="book"
				title="Biblioteca"
				fontIcon="bi-app-indicator"
			/>
			<SidebarMenuItem
				to="/otros"
				icon="folder"
				title="Otros"
				fontIcon="bi-folder"
			/>

			<SidebarSubtitle label="soporte y ayuda" />
			<SidebarMenuItem
				to="/mesa-ayuda"
				icon="question-2"
				title="Mesa de ayuda"
				fontIcon="bi-app-indicator"
			/>
		</>
	);
};
