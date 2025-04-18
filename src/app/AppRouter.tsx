import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/locale-data/en';
import '@formatjs/intl-relativetimeformat/locale-data/es';

//react imports
import { createContext,useContext, SetStateAction, Dispatch, lazy, Suspense, useEffect, ReactNode, FC } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

//layouts imports
import { ThemeModeProvider } from './generalcomponents/partials/layout/theme-mode/ThemeModeProvider.tsx';
import MasterLayout from './generalcomponents/layouts/masterlayout/MasterLayout.tsx';

//contexts imports
import { useLang } from './EmployeeContext.tsx';

import { LayoutProvider } from './generalcomponents/layouts/layoutprovider/LayoutProvider.tsx';

import enMessages from '../app/generalcomponents/utils/messages/en.json'
import esMessages from '../app/generalcomponents/utils/messages/es.json'

//rutas públicas
import { AuthPage } from './publicroutes/authpage/AuthPage.tsx';
import { Logout } from './publicroutes/authpage/logout/Logout.tsx';

//rutas privadas
import PrivateRoutes from './privateroutes/PrivateRoutes.tsx';
import { SelectCompanyRoutes } from './privateroutes/selectCompany/selecCompany.routes.tsx';
import { HomeRoutes } from './privateroutes/home/home.routes.tsx';
import { DashboardWrapper } from './privateroutes/dashboardwrapper/DashboardWrapper.tsx';
import { MenuTestPage } from './privateroutes/menutestpage/MenuTestPage.tsx';
import { FichaUsuarioRoutes } from './privateroutes/fichausuario/fichaUsuario.routes.tsx';
import { ISO45001Routes } from './privateroutes/iso45001/iso45001.routes.tsx';
import { ISO9001Routes } from './privateroutes/iso9001/iso9001.routes.tsx';
const HumanResourcesPage = lazy(() => import('./privateroutes/human-resources/HumanResourcesPage.tsx'));
const WizardsPage = lazy(() => import('./privateroutes/wizards/WizardsPage.tsx').then((module) => ({ default: module.WizardsPage })));
const WidgetsPage = lazy(() => import('./privateroutes/widgets/WidgetsPage.tsx').then((module) => ({ default: module.WidgetsPage })));
const AccountPage = lazy(() => import('./privateroutes/accounts/AccountPage.tsx'));
const ChatPage = lazy(() => import('./privateroutes/chat/ChatPage.tsx'));
const UsersPage = lazy(() => import('./privateroutes/user-management/UsersPage.tsx'));

interface WithChildren {
    children: ReactNode;
}

const allMessages = {
    en: enMessages,
    es: esMessages,
};

const I18nProvider: FC<WithChildren> = ({ children }) => {
    const locale = useLang();
    const messages = allMessages[locale];

    return (
        <IntlProvider locale={locale} messages={messages}>
            {children}
        </IntlProvider>
    );
};

// LayoutSplashScreen

const MetronicSplashScreenContext = createContext<Dispatch<SetStateAction<number>> | undefined>(
    undefined
  )
  
const LayoutSplashScreen: FC<{visible?: boolean}> = ({visible = true}) => {
    const setCount = useContext(MetronicSplashScreenContext)

    useEffect(() => {
        if (!visible) {
        return
        }

        if (setCount) {
        setCount((prev) => {
            return prev + 1
        })
        }

        return () => {
        if (setCount) {
            setCount((prev) => {
            return prev - 1
            })
        }
        }
    }, [setCount, visible])

    return null
}

// Router

const router = createBrowserRouter([

    //Rutas públicas
    {
        path: '/',
        element: (
            <Suspense fallback={<LayoutSplashScreen />}>
                <I18nProvider>
                    <LayoutProvider>
                        <ThemeModeProvider>
                            <Outlet />
                        </ThemeModeProvider>
                    </LayoutProvider>
                </I18nProvider>
            </Suspense>
        ),
        children: [
            { index: true, element: <Navigate to="/auth" /> },
            { path: 'auth/*', element: <AuthPage /> },
            { path: "*", element: <Navigate to="/auth" /> },
        ]
    },

    //Rutas privadas
    {
        path: '/',
        element: (
            <Suspense fallback={<LayoutSplashScreen />}>
                <I18nProvider>
                    <LayoutProvider>
                        <ThemeModeProvider>
                            <PrivateRoutes>
                                <MasterLayout />
                            </PrivateRoutes>
                        </ThemeModeProvider>
                    </LayoutProvider>
                </I18nProvider>
            </Suspense>
        ),
        children: [
            { path: 'select-company/*', element: <SelectCompanyRoutes /> },
            { path: 'home/*', element: <HomeRoutes /> },
            { path: 'dashboard', element: <DashboardWrapper /> },
            { path: 'menu-test', element: <MenuTestPage /> },
            { path: 'ficha-usuario/*', element: <FichaUsuarioRoutes /> },
            { path: 'iso9001/*', element: <ISO9001Routes /> },
            { path: 'iso45001/*', element: <ISO45001Routes /> },
            { path: "sgrrhh/*", element: <HumanResourcesPage /> },
            { path: "crafted/pages/wizards/*", element: <WizardsPage /> },
            { path: "crafted/widgets/*", element: <WidgetsPage /> },
            { path: "crafted/account/*", element: <AccountPage /> },
            { path: "apps/chat/*", element: <ChatPage /> },
            { path: "apps/user-management/*", element: <UsersPage /> },
            { path: 'logout', element:<Logout /> },
        ],
    },
]);

export default router;