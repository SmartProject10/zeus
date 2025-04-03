import { Content } from "src/app/generalcomponents/layouts/content";
import { InspectionEmergencyLightsButton } from "./InspectionEmergencyLightsButton";
import { InspectionEmergencylightsTable } from "./InspectionEmergencyLightsTable";
import { KTCard } from "src/app/generalcomponents/helpers";
import { InspectionEmergencyLightsHeader } from "./InspectionEmergencyLightsHeader";
import { ToolbarWrapper } from "src/app/generalcomponents/layouts/toolbar";

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
