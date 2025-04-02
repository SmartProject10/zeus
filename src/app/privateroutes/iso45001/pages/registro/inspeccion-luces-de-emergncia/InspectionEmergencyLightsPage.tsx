import { PageTitle } from "@zeus/app/generalcomponents/layouts/layoutprovider/LayoutProvider";
import { PageLink } from "@zeus/models/layoutprovider/model";
import { InspectionEmergencyLightsWrapper } from "./componets/InspectionEmergencyLightsWrapper";
// import { CalendarWrapper } from "../..app/modules/human-resources/tools/calendar/Calendar";
// import { CalendarWrapper } from './tools/calendar/Calendar'

const emergencyLightsBreadcrumbs: Array<PageLink> = [
	{
		title: "Luces de emergencia",
		path: "/iso45001/inspeccion-luces-de-emergencia",
		isSeparator: false,
		isActive: false,
	},
	{
		title: "",
		path: "",
		isSeparator: true,
		isActive: false,
	},
];

export const InspectionEmergencyLightsPage = (): JSX.Element => {

	return (
		<>
			<PageTitle breadcrumbs={emergencyLightsBreadcrumbs}>
				Inspección luces de emergencia
			</PageTitle>
			<InspectionEmergencyLightsWrapper />
		</>
	);
};
