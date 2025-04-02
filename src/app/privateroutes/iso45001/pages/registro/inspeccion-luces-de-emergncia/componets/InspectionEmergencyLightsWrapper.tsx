import { Content } from "@zeus/app/generalcomponents/layouts/content";
import { InspectionEmergencyLightsButton } from "./InspectionEmergencyLightsButton";
import { InspectionEmergencylightsTable } from "./InspectionEmergencyLightsTable";
import { KTCard } from "@zeus/app/generalcomponents/helpers";
import { InspectionEmergencyLightsHeader } from "./InspectionEmergencyLightsHeader";
import { ToolbarWrapper } from "@zeus/app/generalcomponents/layouts/toolbar";

export const InspectionEmergencyLightsWrapper = () => (
	<Content>
		{/* <EmergencyLightsButton /> */}
		<ToolbarWrapper />
		<KTCard>
			<InspectionEmergencyLightsHeader />
			<InspectionEmergencylightsTable />
		</KTCard>
	</Content>
);
