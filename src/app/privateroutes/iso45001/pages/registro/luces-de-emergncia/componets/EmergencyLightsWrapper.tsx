// import { KTCard } from "../../../../../app/_zeus/helpers";
// import { Content } from "../../../../../app/_zeus/layout/components/content";
// import { ToolbarWrapper } from "../../../../../app/_zeus/layout/components/toolbar";
// import { CalendarButton } from "./components/buttons/CalendarButton";
// import { CalendarHeader } from "./components/header/CalendarHeader";
// import { CalendarTable } from "./components/table/CalendarTable";
import { Content } from "src/app/generalcomponents/layouts/content";
import { EmergencyLightsButton } from "./EmergencyLightsButton";
import { EmergencylightsTable } from "./EmergencyLightsTable";
import { KTCard } from "src/app/generalcomponents/helpers";
import { EmergencyLightsHeader } from "./EmergencyLightsHeader";
import { ToolbarWrapper } from "src/app/generalcomponents/layouts/toolbar";

export const EmergencyLightsWrapper = () => (
	<Content>
		<EmergencyLightsButton />
		<ToolbarWrapper />
		<KTCard>
			<EmergencyLightsHeader />
			<EmergencylightsTable />
		</KTCard>
	</Content>
);
