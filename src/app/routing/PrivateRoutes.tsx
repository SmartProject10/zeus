import { FC, lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import TopBarProgress from 'react-topbar-progress-indicator'
import { getCSSVariableValue } from '../../_zeus/assets/ts/_utils'
import { WithChildren } from '../../_zeus/helpers'
import { MasterLayout } from '../../_zeus/layout/MasterLayout'
import { FichaUsuarioRoutes } from '../modules/fichausuario/fichaUsuario.routes.tsx'
import { HomeRoutes } from '../modules/home/home.routes.tsx'
import { ISO45001Routes } from '../modules/iso45001/iso45001.routes.tsx'
import { ISO9001Routes } from '../modules/iso9001/iso9001.routes.tsx'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
import { MenuTestPage } from '../pages/MenuTestPage'

const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage').then((module) => ({ default: module.WizardsPage })))
const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage').then((module) => ({ default: module.WidgetsPage })))
const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))
const HumanResourcesPage = lazy(() => import('../modules/human-resources/HumanResourcesPage'))

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route
        element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route
          path="auth/*"
          element={<Navigate
            to="/select-company" />} />
        {/* Pages */}
        <Route
          path="dashboard"
          element={<DashboardWrapper />} />
        <Route
          path="menu-test"
          element={<MenuTestPage />} />
        <Route
          path="home/*"
          element={<HomeRoutes />} />
        <Route
          path="ficha-usuario/*"
          element={<FichaUsuarioRoutes />} />

        {/* ISO SOFTWARE MODULES */}
        <Route
          path="iso9001/*"
          element={<ISO9001Routes />} />
        <Route
          path="iso45001/*"
          element={<ISO45001Routes />} />

        {/* Lazy Modules */}
        <Route
          path="human-resources/*"
          element={
            <SuspensedView>
              <HumanResourcesPage />
            </SuspensedView>
          }
        />
        <Route
          path="crafted/pages/profile/*"
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path="crafted/pages/wizards/*"
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path="crafted/widgets/*"
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path="crafted/account/*"
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path="apps/chat/*"
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path="apps/user-management/*"
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />

        {/* Page Not Found */}
        <Route
          path="*"
          element={<Navigate
            to="/error/404" />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense
    fallback={<TopBarProgress />}>{children}</Suspense>
}
