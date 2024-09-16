import { Route, Routes } from 'react-router-dom'
import { InspeccionesInternasSeguridad } from './pages/inspeccionesInternasSeguridad'
import { CompromisosAltaGenerencia } from './pages/compromisosAltaGerencia'
import { Botiquin } from './pages/botiquin/Botiquin'
import { PageLink, PageTitle } from "@zeus/_zeus/layout/core";

const registrosBreadcrumbs: Array<PageLink> = [
    {
        title: 'Registro',
        path: '/iso45001',
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

export function ISO45001Routes(): JSX.Element {
    return (
        <Routes>
            <Route path='botiquin' element={
                <>
                    <PageTitle
                        breadcrumbs={registrosBreadcrumbs}>Botiquin</PageTitle>
                    <Botiquin />
                </>
            }
            />
            <Route
                path="inspecciones-internas-seguridad"
                element={<InspeccionesInternasSeguridad />} />
            <Route
                path="compromisos-alta-generencia"
                element={<CompromisosAltaGenerencia />} />
        </Routes>
    )
}
