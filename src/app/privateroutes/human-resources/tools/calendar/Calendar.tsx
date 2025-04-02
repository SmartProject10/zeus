import { KTCard } from '../../../../generalcomponents/helpers'
import { Content } from '../../../../generalcomponents/layouts/content'
import { ToolbarWrapper } from '../../../../generalcomponents/layouts/toolbar'
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
