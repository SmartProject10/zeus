import { Route, Routes } from 'react-router-dom'
import { Dashboard } from './pages/dashboard'
import { PageTitle } from '../../generalcomponents/layouts/layoutprovider/LayoutProvider.tsx';
import { PageLink } from '../../../models/layoutprovider/model';
import { ControlDocumentos } from './pages/controlDocumentos/ControlDocumentos'

export function ISO9001Routes(): JSX.Element {

    const registrosBreadcrumbs: Array<PageLink> = [
        {
            title: 'Control de documentos',
            path: '/iso9001',
            isSeparator: false,
            isActive: false,
        },
        {
            title: '',
            path: '',
            isSeparator: true,
            isActive: false,
        },
    ]

    return (
        <Routes>
            <Route index element={<Dashboard />} />
            <Route
                path="control-documentos"
                element={
                    <>
                        <PageTitle breadcrumbs={registrosBreadcrumbs}>Control de documentos</PageTitle>
                        <ControlDocumentos />
                    </>
                }
            />
        </Routes>
    )
}
