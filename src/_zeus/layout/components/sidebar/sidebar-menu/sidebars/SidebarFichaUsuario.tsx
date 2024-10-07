import { useIntl } from "react-intl";
import { SidebarMenuItem } from "../components/SidebarMenuItem";
import { SidebarMenuItemWithSub } from "../components/SidebarMenuItemWithSub";
import { SidebarSubtitle } from "../components/SidebarSubtitle";

export const SidebarFichaUsuario = () => {
    const intl = useIntl();

    return (
        <>
            <SidebarMenuItem
                to="/home"
                icon="home"
                title={intl.formatMessage({ id: "MENU.DASHBOARD" })}
                fontIcon="bi-app-indicator"
            />
            <SidebarSubtitle label="información personal" />
            <SidebarMenuItem
                to="/ficha-usuario"
                icon="user"
                title={intl.formatMessage({ id: "MENU.USER_TAB" })}
                fontIcon="bi-app-indicator"
            />

            <SidebarSubtitle label="educación" />
            <SidebarMenuItem
                to="/cursos"
                icon="user"
                title="Cursos"
                fontIcon="bi-app-indicator"
            />
            <SidebarMenuItem
                to="/biblioteca"
                icon="user"
                title="Biblioteca"
                fontIcon="bi-app-indicator"
            />

            <SidebarSubtitle label="soporte y ayuda" />
            <SidebarMenuItem
                to="/mesa-ayuda"
                icon="question-2"
                title="Mesa de ayuda"
                fontIcon="bi-app-indicator"
            />
        </>
    );
};
