import { Route, Routes } from 'react-router-dom'

// Layout
import { SelectCompanyLayout } from './selectCompany.layout'

// Pages
import { SelectCompany } from './pages/selectCompany/selectCompany'
import { SelectCompanyDetail } from './pages/selectCompanyDetail/selectCompanyDetail'

export function SelectCompanyRoutes(): JSX.Element {
    return (
        <Routes>
            <Route
element={<SelectCompanyLayout />}>
                <Route
index
element={<SelectCompany />} />
                <Route
path=":companyId"
element={<SelectCompanyDetail />} />
            </Route>
        </Routes>
    )
}
