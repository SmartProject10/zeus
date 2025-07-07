import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MasterLayout } from "../../_zeus/layout/MasterLayout";
import { FichaUsuarioRoutes } from "../modules/fichausuario/fichaUsuario.routes.tsx";
import { CoursesRoutes } from "../modules/courses/courses.routes.tsx";
import { BibliotecaRoutes } from "../modules/biblioteca/biblioteca.routes.tsx";
import { HomeRoutes } from "../modules/home/home.routes.tsx";
import { ISO45001Routes } from "../modules/iso45001/iso45001.routes.tsx";
import { ISO9001Routes } from "../modules/iso9001/iso9001.routes.tsx";
import { DashboardWrapper } from "../pages/dashboard/DashboardWrapper";
import { MenuTestPage } from "../pages/MenuTestPage";

const WizardsPage = lazy(() =>
	import("../modules/wizards/WizardsPage").then((module) => ({
		default: module.WizardsPage,
	}))
);
const WidgetsPage = lazy(() =>
	import("../modules/widgets/WidgetsPage").then((module) => ({
		default: module.WidgetsPage,
	}))
);
const AccountPage = lazy(() => import("../modules/accounts/AccountPage"));
const ChatPage = lazy(() => import("../modules/apps/chat/ChatPage"));
const UsersPage = lazy(
	() => import("../modules/apps/user-management/UsersPage")
);
const HumanResourcesPage = lazy(
	() => import("../modules/human-resources/HumanResourcesPage")
);

export const PrivateRoutes = () => {
	const RedirectTo = () => <Navigate to="/select-company" />;
	return (
		<Routes>
			<Route element={<MasterLayout />}>
				<Route index element={<RedirectTo />} />
				<Route path="auth/*" element={<RedirectTo />} />

				{/* Pages */}
				<Route path="home/*" element={<HomeRoutes />} />
				<Route path="dashboard" element={<DashboardWrapper />} />
				<Route path="menu-test" element={<MenuTestPage />} />
				<Route path="ficha-usuario/*" element={<FichaUsuarioRoutes />} />
				<Route path="courses/*" element={<CoursesRoutes />} />
				<Route path="biblioteca/*" element={<BibliotecaRoutes />} />

				{/* ISO 45001 */}

				{/* ISO SOFTWARE MODULES */}
				<Route path="iso9001/*" element={<ISO9001Routes />} />
				<Route path="iso45001/*" element={<ISO45001Routes />} />
				<Route path="sgrrhh/*" element={<HumanResourcesPage />} />

				{/* Lazy Modules */}
				<Route path="crafted/pages/wizards/*" element={<WizardsPage />} />
				<Route path="crafted/widgets/*" element={<WidgetsPage />} />
				<Route path="crafted/account/*" element={<AccountPage />} />
				<Route path="apps/chat/*" element={<ChatPage />} />
				<Route path="apps/user-management/*" element={<UsersPage />} />

				{/* Page Not Found */}
				<Route path="/*" element={<Navigate to="/error/404" />} />
			</Route>
		</Routes>
	);
};
