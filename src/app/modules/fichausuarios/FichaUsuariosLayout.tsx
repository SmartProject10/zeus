import { Outlet } from 'react-router-dom';

import { FooterWrapper } from '@zeus/_zeus/layout/components/footer';
import { HeaderWrapper } from '@zeus/_zeus/layout/components/header';
import { ScrollTop } from '@zeus/_zeus/layout/components/scroll-top';
import { Sidebar } from '@zeus/_zeus/layout/components/sidebar';
import { PageDataProvider } from '@zeus/_zeus/layout/core';
import { ActivityDrawer, DrawerMessenger, InviteUsers, UpgradePlan } from '@zeus/_zeus/partials';
import { RightToolbar } from '@zeus/_zeus/partials/layout/RightToolbar';
import { Content } from '@zeus/_zeus/layout/components/content';

export const FichaUsuarioLayout = () => {
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
                                    <Outlet />
                                </Content>
                            </div>

                            <FooterWrapper />
                        </div>
                    </div>
                </div>
            </div>

            {/* begin:: Drawers */}
            <ActivityDrawer />
            <RightToolbar />
            <DrawerMessenger />
            {/* end:: Drawers */}

            {/* begin:: Modals */}
            <InviteUsers />
            <UpgradePlan />
            {/* end:: Modals */}
            <ScrollTop />
        </PageDataProvider>
    );
}