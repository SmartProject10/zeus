import { KTCard } from '../../../../../app/_zeus/helpers/index.ts'
import { Content } from '../../../../../app/_zeus/layout/components/content/index.ts'
import { ToolbarWrapper } from '../../../../../app/_zeus/layout/components/toolbar/index.ts'
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
