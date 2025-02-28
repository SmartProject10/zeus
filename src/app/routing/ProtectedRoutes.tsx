import { FC, useEffect, useState } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { MasterInit } from '@zeus/_zeus/layout/MasterInit';
import useWorker from '@zeus/@hooks/useWorker';
import Swal from 'sweetalert2';

const ProtectedRoutes: FC = () => {
    const location = useLocation();
    const { isAuth, isLoading } = useWorker();
    const [alertShown, setAlertShown] = useState(false);

    useEffect(() => {
        if (!isAuth && !alertShown) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Necesitas iniciar sesión para acceder a este sitio.",
            });
            setAlertShown(true); // Asegura que la alerta solo se muestre una vez
        }
    }, [isAuth, alertShown]);

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (!isAuth) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>
                <Outlet />
                <MasterInit />
            </> 
};

export default ProtectedRoutes;