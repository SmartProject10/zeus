import { KTCard } from '../../../../../_zeus/helpers'
import { Content } from '../../../../../_zeus/layout/components/content'
import { ToolbarWrapper } from '../../../../../_zeus/layout/components/toolbar'
import { CalendarButton } from './components/buttons/CalendarButton'
import { CalendarHeader } from './components/header/CalendarHeader'
import { CalendarTable } from './components/table/CalendarTable'
import { SubWorkerButton } from './components/buttons/SubWorkerButton'
import { SubWorkerHeader } from './components/header/SubWorkerHeader'
import { RegisterSubWorker } from './components/table/RegisterSubWorker'

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

const SubWorker = () => {
    return (
        <>
            <KTCard>
                <SubWorkerHeader />
                <RegisterSubWorker />
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

const SubWorkerWrapper = () => (
    <Content>
        <SubWorkerButton />
        <ToolbarWrapper />
        <SubWorker />
    </Content>
)

export { CalendarWrapper }
export { SubWorkerWrapper }