import { KTCard } from '../../../../generalcomponents/helpers/index.ts'
import { Content } from '../../../../generalcomponents/layouts/content/index.ts'
import { ToolbarWrapper } from '../../../../generalcomponents/layouts/toolbar/index.ts'
import { ClockHeader } from './content/ClockHeader.tsx'
import { ClockContent } from './header/ClockContent.tsx'

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

export { ClockWrapper }
