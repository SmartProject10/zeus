import { KTCard, KTCardBody } from "../../../../../_zeus/helpers";
import { CalendarHeader } from './components/header/CalendarHeader';
import { CalendarTable } from './components/table/CalendarTable';
import { ToolbarWrapper } from "../../../../../_zeus/layout/components/toolbar";
import { Content } from "../../../../../_zeus/layout/components/content";
import { CalendarButton } from "./components/buttons/CalendarButton";


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