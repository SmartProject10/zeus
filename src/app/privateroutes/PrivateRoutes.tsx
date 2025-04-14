import { useLayout } from "../generalcomponents/layouts/layoutprovider/LayoutProvider.tsx";
import { ThemeModeComponent } from "../generalcomponents/assets/ts/layout";
import { MenuComponent } from '../generalcomponents/assets/ts/components' 
import { DrawerComponent } from '../generalcomponents/assets/ts/components' 
import { ScrollComponent } from '../generalcomponents/assets/ts/components' 
import { ScrollTopComponent } from '../generalcomponents/assets/ts/components' 
import { StickyComponent } from '../generalcomponents/assets/ts/components' 
import { ToggleComponent } from '../generalcomponents/assets/ts/components' 
import { SwapperComponent } from '../generalcomponents/assets/ts/components'
import { Tab } from "bootstrap";

import { ReactNode,useState,useEffect } from "react";
import { Navigate,useLocation } from 'react-router-dom';
import { useEmployee } from "../EmployeeContext";
import Swal from "sweetalert2";

//MasterInit
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
//

interface WithChildren {
    children: ReactNode;
}

//PrivateRoutes
const PrivateRoutes: React.FC<WithChildren> = ({ children }) => {
    const location = useLocation();
    const { isAuth, isLoading } = useEmployee();

    console.log(isAuth ? "Autorizado" : "No Autorizado")

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (!isAuth) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Necesitas iniciar sesión para acceder a este sitio.',
        });
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    return (
        <>
            {children}
            <MasterInit />
        </>
    );
};

export default PrivateRoutes;