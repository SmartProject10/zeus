import { MenuComponent } from '../../assets/ts/components';
//
import { HeaderWrapper } from '../header/HeaderWrapper.tsx';
import { RightToolbar } from '../../partials/layout/RightToolbar';
import { ScrollTop } from '../scroll-top/ScrollTop.tsx';
import { FooterWrapper } from '../footer/FooterWrapper.tsx';
import { Sidebar } from '../sidebar/Sidebar.tsx';
import { ActivityDrawer, DrawerMessenger, InviteUsers, UpgradePlan } from '../../partials';
import { Content } from '../content/Content.tsx';
import TopBarProgress from 'react-topbar-progress-indicator';
import { getCSSVariableValue } from '../../assets/ts/_utils';
import { PageDataProvider } from '../layoutprovider/LayoutProvider.tsx';
//
import { useLocation,Outlet } from 'react-router-dom';
import { useEffect,Suspense } from 'react';
import { PropsWithChildren } from 'react';


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

export default MasterLayout;