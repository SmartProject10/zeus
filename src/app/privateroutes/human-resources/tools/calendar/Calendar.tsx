import { KTCard } from '../../../../../app/_zeus/helpers'
import { Content } from '../../../../../app/_zeus/layout/components/content'
import { ToolbarWrapper } from '../../../../../app/_zeus/layout/components/toolbar'
import { CalendarButton } from './components/buttons/CalendarButton'
import { CalendarHeader } from './components/header/CalendarHeader'
import { CalendarTable } from './components/table/CalendarTable'

const Calendar = () => {
    return (
        <>
            <KTCard>
                <CalendarHeader />
                <CalendarTable />
            </KTCard>
        </>
    )
}

const CalendarWrapper = () => (

    <Content>
        <CalendarButton />
        <ToolbarWrapper />
        <Calendar />
    </Content>
)

export { CalendarWrapper }
