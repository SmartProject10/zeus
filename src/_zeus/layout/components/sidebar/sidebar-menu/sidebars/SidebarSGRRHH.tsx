import { useIntl } from "react-intl";
import { SidebarMenuItem } from "../components/SidebarMenuItem";
import { SidebarMenuItemWithSub } from "../components/SidebarMenuItemWithSub";
import { SidebarSubtitle } from "../components/SidebarSubtitle";

export const SidebarSGRRHH = () => {
	const intl = useIntl();

	return (
		<>
			<SidebarMenuItemWithSub
				to=""
				icon="trello"
				title="Empresa"
				fontIcon=""
			>
				<SidebarSubtitle label="Registro" />
				<SidebarMenuItem
					to="/human-resources/tools/calendar/register-table"
					icon="home"
					title="Empresa"
					fontIcon=""
				/>
				<SidebarMenuItem
					to="/human-resources/tools/calendar/register-sede"
					icon="office-bag"
					title="Sede"
					fontIcon=""
				/>
				<SidebarMenuItem
					to="/human-resources/tools/calendar/register-area"
					icon="archive"
					title="Área"
					fontIcon=""
				/>
				<SidebarMenuItem
					to="/human-resources/tools/calendar/calendar-table"
					icon="people"
					title="Trabajador"
					fontIcon=""
				/>
			</SidebarMenuItemWithSub>

			<SidebarMenuItemWithSub
				to="/human-resources/main"
				icon="wallet"
				title="Sub - Empresa"
				fontIcon=""
			>
				<SidebarSubtitle label="Registro" />
				<SidebarMenuItem
					to="/human-resources/tools/calendar/register-sub-em"
					icon="home"
					title="Sub-Empresa"
					fontIcon=""
				/>
				{/*<SidebarMenuItem
					to="/human-resources/tools/calendar/register-sub-sede"
					icon="office-bag"
					title="Sub-Sede"
					fontIcon=""
				/>*/}
				<SidebarMenuItem
					to="/human-resources/tools/calendar/register-sub-worker"
					icon="people"
					title="Sub-Trabajador"
					fontIcon=""
				/>
			</SidebarMenuItemWithSub >
		</>
	);
};
