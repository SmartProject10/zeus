import { Content } from "../../../../../../generalcomponents/layouts/content";
import { InspectionEmergencyLightsButton } from "./InspectionEmergencyLightsButton";
import { InspectionEmergencylightsTable } from "./InspectionEmergencyLightsTable";
import { KTCard } from "../../../../../../generalcomponents/helpers";
import { InspectionEmergencyLightsHeader } from "./InspectionEmergencyLightsHeader";
import { ToolbarWrapper } from "../../../../../../generalcomponents/layouts/toolbar";

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
