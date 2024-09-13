import { Outlet } from "react-router-dom";

import { Navbar } from "@zeus/@components/navbar";
import { Content } from "@zeus/_zeus/layout/components/content";

interface SelectCompanyLayoutProps { }

export function SelectCompanyLayout(props: SelectCompanyLayoutProps): JSX.Element {
    return (
        <div className='d-flex flex-column flex-root app-root' id='kt_app_root'>
            <div className='app-page flex-column flex-column-fluid' id='kt_app_page'>
                <Navbar />

                <div className='app-wrapper flex-column flex-row-fluid' id='kt_app_wrapper'>
                    <div className='app-main flex-column flex-row-fluid' id='kt_app_main'>
                        <div className='d-flex flex-column flex-column-fluid'>
                            <Content>
                                <Outlet />
                            </Content>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div style={{ overflow: 'hidden', height: 60, width: '100%' }}>
            </div> */}

            {/* <Outlet /> */}
        </div>
    );
}
