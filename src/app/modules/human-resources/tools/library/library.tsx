import {KTCard} from '../../../../../_zeus/helpers/index.ts'
import {Content} from '../../../../../_zeus/layout/components/content/index.ts'
import {ToolbarWrapper} from '../../../../../_zeus/layout/components/toolbar/index.ts'
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