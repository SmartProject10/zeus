import { useMemo } from "react";
import { useLocation } from "react-router-dom";

import { SidebarFichaUsuario } from "./sidebars/SidebarFichaUsuario";
import { SidebarCourses } from "./sidebars/SidebarCourses";
import { SidebarLibrary } from "./sidebars/SidebarLibrary";
import { SidebarMain } from "./sidebars/SidebarMain";
import { SidebarISO45001 } from "./sidebars/SidebarISO45001";
import { SidebarISO9001 } from "./sidebars/SidebarISO9001";
import { SidebarSGRRHH } from "./sidebars/SidebarSGRRHH";

export const SidebarMenu = ({ handleReloadMenu }: any) => {
	const { pathname } = useLocation();

	const isISO45001 = useMemo(
		() => pathname.startsWith("/iso45001"),
		[pathname]
	);
	const isISO9001 = useMemo(() => pathname.startsWith("/iso9001"), [pathname]);
	const isSGRHH = useMemo(() => pathname.startsWith("/sgrrhh"), [pathname]);

	const isSidebarMain = useMemo(
		() => ["/dashboard", "/crafted"].some((path) => pathname.startsWith(path)),
		[pathname]
	);

	const isSidebarFichaUsuario = useMemo(
		() => ["/home", "/ficha-usuario"].some((path) => pathname.startsWith(path)),
		[pathname]
	);
	const isSidebarCourses = useMemo(
		() => pathname.startsWith("/courses"),
		[pathname]
	);
	const isSidebarLibrary = useMemo(
		() => pathname.startsWith("/biblioteca"),
		[pathname]
	);

	return (
		<div className="app-sidebar-menu overflow-hidden flex-column-fluid">
			<div
				id="kt_app_sidebar_menu_wrapper"
				className="app-sidebar-wrapper hover-scroll-overlay-y my-5"
				data-kt-scroll="true"
				data-kt-scroll-activate="true"
				data-kt-scroll-height="auto"
				data-kt-scroll-dependencies="#kt_app_sidebar_logo, #kt_app_sidebar_footer"
				data-kt-scroll-wrappers="#kt_app_sidebar_menu"
				data-kt-scroll-offset="5px"
				data-kt-scroll-save-state="true"
			>
				<div
					className="menu menu-column menu-rounded menu-sub-indention px-3"
					id="#kt_app_sidebar_menu"
					data-kt-menu="true"
					data-kt-menu-expand="false"
				>
					{isSidebarMain && <SidebarMain />}
					{isSidebarFichaUsuario && <SidebarFichaUsuario />}
					{isSidebarCourses && <SidebarCourses />}
					{isSidebarLibrary && <SidebarLibrary />}

					{/* Sidebar for ISO 45001, ISO 9001 and SGRHH */}
					{isSGRHH && <SidebarSGRRHH />}
					{isISO45001 && (
						<SidebarISO45001 handleReloadMenu={handleReloadMenu} />
					)}
					{isISO9001 && <SidebarISO9001 />}
				</div>
			</div>
		</div>
	);
};
