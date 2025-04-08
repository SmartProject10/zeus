import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/locale-data/en';
import '@formatjs/intl-relativetimeformat/locale-data/es';

//react imports
import { createContext,useContext, SetStateAction, Dispatch, lazy, Suspense, useEffect, useState, ReactNode, PropsWithChildren, FC } from 'react';
import { createBrowserRouter, Navigate, Outlet, useLocation } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

//layouts imports
import { ThemeModeProvider } from './generalcomponents/partials/layout/theme-mode/ThemeModeProvider.tsx';

//contexts imports
import { useEmployee, useLang } from './EmployeeContext.tsx';

//
import { HeaderWrapper } from './generalcomponents/layouts/header/HeaderWrapper.tsx';
import { RightToolbar } from './generalcomponents/partials/layout/RightToolbar.tsx';
import { ScrollTop } from './generalcomponents/layouts/scroll-top/index.ts';
import { FooterWrapper } from './generalcomponents/layouts/footer/index.ts';
import { Sidebar } from './generalcomponents/layouts/sidebar/index.ts';
import { ActivityDrawer, DrawerMessenger, InviteUsers, UpgradePlan } from './generalcomponents/partials/index.ts';
import { Content } from './generalcomponents/layouts/content/index.ts';
import TopBarProgress from 'react-topbar-progress-indicator';
import { getCSSVariableValue } from './generalcomponents/assets/ts/_utils/DomHelpers.ts';

import { MenuComponent } from './generalcomponents/assets/ts/components/MenuComponent.ts';
import { DrawerComponent } from './generalcomponents/assets/ts/components/_DrawerComponent.ts';
import { ScrollComponent } from './generalcomponents/assets/ts/components/_ScrollComponent.ts';
import { ScrollTopComponent } from './generalcomponents/assets/ts/components/_ScrollTopComponent.ts';
import { StickyComponent } from './generalcomponents/assets/ts/components/_StickyComponent.ts';
import { ToggleComponent } from './generalcomponents/assets/ts/components/_ToggleComponent.ts';
import { SwapperComponent } from './generalcomponents/assets/ts/components/_SwapperComponent.ts';

import { ThemeModeComponent } from './generalcomponents/assets/ts/layout/ThemeMode.ts';

import { LayoutProvider,PageDataProvider,useLayout } from './generalcomponents/layouts/layoutprovider/LayoutProvider.tsx';

import { Tab } from 'bootstrap';
import Swal from 'sweetalert2';
import enMessages from '../app/generalcomponents/utils/messages/en.json'
import esMessages from '../app/generalcomponents/utils/messages/es.json'

//RUTAS PUBLICAS
import { AuthPage } from './publicroutes/authpage/AuthPage.tsx';
import { Logout } from './publicroutes/authpage/logout/Logout.tsx';
import { ErrorsPage } from './publicroutes/errorspage/ErrorsPage.tsx';

//RUTAS PRIVADAS
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

const ProtectedRoutes: React.FC<WithChildren> = ({ children }) => {
    const location = useLocation();
    const { isAuth, isLoading } = useEmployee();
    const [alertShown, setAlertShown] = useState(false);

    useEffect(() => {
        if (!isAuth && !alertShown) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Necesitas iniciar sesión para acceder a este sitio.',
            });
            setAlertShown(true);
        }
    }, [isAuth, alertShown]);

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (!isAuth) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    return (
        <>
            {children}
            <MasterInit />
        </>
    );
};

const MasterLayout = () => {
    const location = useLocation();
    useEffect(() => {
        const reInitMenu = () => {
            setTimeout(() => {
              MenuComponent.reinitialization()
            }, 500)
        }
        reInitMenu();
    }, [location.key]);

    return (
        <PageDataProvider>
            <div className='d-flex flex-column flex-root app-root' id='kt_app_root'>
                <div className='app-page flex-column flex-column-fluid' id='kt_app_page'>
                    <HeaderWrapper />
                    <div className='app-wrapper flex-column flex-row-fluid' id='kt_app_wrapper'>
                        <Sidebar />
                        <div className='app-main flex-column flex-row-fluid' id='kt_app_main'>
                            <div className='d-flex flex-column flex-column-fluid'>
                                <Content>
                                    <SuspensedView>
                                        <Outlet />
                                    </SuspensedView>
                                </Content>
                            </div>
                            <FooterWrapper />
                        </div>
                    </div>
                </div>
            </div>

            <ActivityDrawer />
            <RightToolbar />
            <DrawerMessenger />
            <InviteUsers />
            <UpgradePlan />
            <ScrollTop />
        </PageDataProvider>
    );
};

const SuspensedView: React.FC<PropsWithChildren> = ({ children }) => {
    const baseColor = getCSSVariableValue('--bs-primary');
    TopBarProgress.config({
        barColors: {
            '0': baseColor,
        },
        barThickness: 1,
        shadowBlur: 5,
    });
    return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

function MasterInit() {
    const { config } = useLayout();
    const [initialized, setInitialized] = useState(false);
    const pluginsInitialization = () => {
        ThemeModeComponent.init();
        setTimeout(() => {
            ToggleComponent.bootstrap();
            ScrollTopComponent.bootstrap();
            DrawerComponent.bootstrap();
            StickyComponent.bootstrap();
            MenuComponent.bootstrap();
            ScrollComponent.bootstrap();
            SwapperComponent.bootstrap();
            document.querySelectorAll('[data-bs-toggle="tab"]').forEach((tab) => {
                Tab.getOrCreateInstance(tab);
            });
        }, 500);
    };

    useEffect(() => {
        if (!initialized) {
            setInitialized(true);
            pluginsInitialization();
        }
    }, [config, initialized]);

    return <></>;
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

//

const router = createBrowserRouter([
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
            // Rutas Públicas
            { index: true, element: <Navigate to="/auth" /> },
            { path: 'auth/*', element: <AuthPage /> },
            { path: 'logout', element:<Logout /> },
            { path: 'error/*', element: <ErrorsPage /> },
            { path: '*', element: <Navigate to="/auth" /> },

            // Rutas Privadas
            {
                element: (
                    <ProtectedRoutes>
                        <MasterLayout />
                    </ProtectedRoutes>
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
                    { path: "/*", element: <Navigate to="/error/404" /> },
                ],
            },
        ],
    },
]);

export default router;