import {KTCard, KTCardBody} from "../../../../../_zeus/helpers";
import {ToolbarWrapper} from "../../../../../_zeus/layout/components/toolbar";
import {Content} from "../../../../../_zeus/layout/components/content";
import {ClockHeader} from "./content/ClockHeader.tsx";
import {ClockContent} from "./header/ClockContent.tsx";

const Clock  = () => {
    return (
        <>
            <KTCard>
                <ClockHeader />
                <ClockContent />
            </KTCard>
        </>
    )
}

const ClockWrapper = () => (

                <Content>
                    <ToolbarWrapper />
                    <Clock />
                </Content>
)

export {ClockWrapper}