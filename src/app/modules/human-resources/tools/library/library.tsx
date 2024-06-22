import {KTCard} from "../../../../../_zeus/helpers";
import {Content} from "../../../../../_zeus/layout/components/content";
import {ToolbarWrapper} from "../../../../../_zeus/layout/components/toolbar";
import {LibraryHeader} from "./header/LibraryHeader.tsx";
import {LibraryContent} from "./content/LibraryContent.tsx";


const Library = () => {
    return (
        <>
            <KTCard>
                <LibraryHeader />
                <LibraryContent />
            </KTCard>
        </>
    )
}


const LibraryWrapper = () => (
    <Content>
        <ToolbarWrapper />
        <Library />
    </Content>
)

export {LibraryWrapper}