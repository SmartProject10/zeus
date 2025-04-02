import {KTCard} from '../../../../generalcomponents/helpers/index.ts'
import {Content} from '../../../../generalcomponents/layouts/content/index.ts'
import {ToolbarWrapper} from '../../../../generalcomponents/layouts/toolbar/index.ts'
import {LibraryHeader} from './header/LibraryHeader.tsx'
import {LibraryContent} from './content/LibraryContent.tsx'

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