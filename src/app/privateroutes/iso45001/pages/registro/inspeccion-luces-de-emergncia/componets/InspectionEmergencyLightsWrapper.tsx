import { Content } from "@zeus/app/_zeus/layout/components/content";
import { InspectionEmergencyLightsButton } from "./InspectionEmergencyLightsButton";
import { InspectionEmergencylightsTable } from "./InspectionEmergencyLightsTable";
import { KTCard } from "@zeus/app/_zeus/helpers";
import { InspectionEmergencyLightsHeader } from "./InspectionEmergencyLightsHeader";
import { ToolbarWrapper } from "@zeus/app/_zeus/layout/components/toolbar";

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
