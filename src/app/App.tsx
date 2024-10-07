import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { I18nProvider } from '../_zeus/i18n/i18nProvider'
import { LayoutProvider, LayoutSplashScreen } from '../_zeus/layout/core'
import { MasterInit } from '../_zeus/layout/MasterInit'
import { AuthInit } from '@zeus/@hooks/auth/useAuth.tsx'
import { ThemeModeProvider } from '../_zeus/partials'

export const App = () => {
  return (
    <Suspense
      fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <ThemeModeProvider>
            <AuthInit>
              <Outlet />
              <MasterInit />
            </AuthInit>
          </ThemeModeProvider>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  )
}
