import { SidebarMenuItem } from "../components/SidebarMenuItem";
import { SidebarMenuItemWithSub } from "../components/SidebarMenuItemWithSub";


export function SidebarISO9001(): JSX.Element {
    return (
        <>
            <SidebarMenuItemWithSub
                to=""
                icon="document"
                title="Control de documentos"
                fontIcon=""
            >
                <SidebarMenuItem
                    to="/iso9001/pages/document/control"
                    icon="document"
                    title="Formato de documentos"
                    fontIcon=""
                />
                <SidebarMenuItemWithSub
                    to=""
                    icon="trello"
                    title="Nomenclatura"
                    fontIcon=""
                >
                    <SidebarMenuItem
                        to="/iso9001/pages/nomenclatura/tipo-documentos"
                        icon="document"
                        title="Tipo de documentos"
                        fontIcon=""
                    />
                    <SidebarMenuItem
                        to="/iso9001/pages/nomenclatura/proyectos"
                        icon="briefcase"
                        title="Proyectos"
                        fontIcon=""
                    />
                    <SidebarMenuItem
                        to="/iso9001/pages/nomenclatura/corporativo"
                        icon="abstract-1"
                        title="Corporativo"
                        fontIcon=""
                    />
                    <SidebarMenuItem
                        to="/iso9001/pages/nomenclatura/areas"
                        icon="archive"
                        title="Áreas"
                        fontIcon=""
                    />
                    <SidebarMenuItem
                        to="/iso9001/pages/nomenclatura/sub-areas"
                        icon="archive"
                        title="Sub-áreas"
                        fontIcon=""
                    />
                </SidebarMenuItemWithSub>
            </SidebarMenuItemWithSub>
        </>
    );
}
