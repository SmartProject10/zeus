import { useIntl } from "react-intl";
import { SidebarMenuItem } from "../components/SidebarMenuItem";
import { SidebarMenuItemWithSub } from "../components/SidebarMenuItemWithSub";


export function SidebarMain(): JSX.Element {
    const intl = useIntl();

    return (
        <>
            <SidebarMenuItem
                to="/dashboard"
                icon="home"
                title={intl.formatMessage({ id: "MENU.DASHBOARD" })}
                fontIcon="bi-app-indicator"
            />

            {/* <SidebarMenuItemWithSub to="" icon="bookmark" title="ISO 9001" fontIcon="">

            </SidebarMenuItemWithSub> */}
        </>
    );
}
