// import { KTCard } from "../../../../../_zeus/helpers";
// import { Content } from "../../../../../_zeus/layout/components/content";
// import { ToolbarWrapper } from "../../../../../_zeus/layout/components/toolbar";
// import { CalendarButton } from "./components/buttons/CalendarButton";
// import { CalendarHeader } from "./components/header/CalendarHeader";
// import { CalendarTable } from "./components/table/CalendarTable";
import { Content } from "@zeus/_zeus/layout/components/content";
import { EmergencyLightsButton } from "./EmergencyLightsButton";
import { EmergencylightsTable } from "./EmergencyLightsTable";
import { KTCard } from "@zeus/_zeus/helpers";
import { EmergencyLightsHeader } from "./EmergencyLightsHeader";
import { ToolbarWrapper } from "@zeus/_zeus/layout/components/toolbar";

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
