import { Content } from "@zeus/_zeus/layout/components/content";
import { InspectionEmergencyLightsButton } from "./InspectionEmergencyLightsButton";
import { InspectionEmergencylightsTable } from "./InspectionEmergencyLightsTable";
import { KTCard } from "@zeus/_zeus/helpers";
import { InspectionEmergencyLightsHeader } from "./InspectionEmergencyLightsHeader";
import { ToolbarWrapper } from "@zeus/_zeus/layout/components/toolbar";

export const InspectionEmergencyLightsWrapper = () => (
	<Content>
		<InspectionEmergencyLightsButton />
		<ToolbarWrapper />
		<KTCard>
			<InspectionEmergencyLightsHeader />
			<InspectionEmergencylightsTable />
		</KTCard>
	</Content>
);
