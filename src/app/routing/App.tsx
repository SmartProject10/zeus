import { FC } from 'react'
import { Suspense } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { PrivateRoutes } from './PrivateRoutes';
import { AuthPage } from '../modules/_auth/AuthPage';
import { Logout } from '../modules/_auth/pages/Logout';
import { ErrorsPage } from '../modules/errors/ErrorsPage';
import { SelectCompanyRoutes } from '../modules/selectCompany/selecCompany.routes';
import { I18nProvider } from '@zeus/_zeus/i18n/i18nProvider';
import { LayoutProvider, LayoutSplashScreen } from '@zeus/_zeus/layout/core';
import { ThemeModeProvider } from '@zeus/_zeus/partials';
import ProtectedRoutes from './ProtectedRoutes';

export const App: FC = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <ThemeModeProvider>
            <BrowserRouter>
              <Routes>

                {/* Rutas públicas */}
                <Route path="auth/*" element={<AuthPage />} />
                <Route path="logout" element={<Logout />} />
                <Route path="error/*" element={<ErrorsPage />} />
                <Route path="*" element={<Navigate to="/auth" />} />

                {/* Rutas protegidas */}
                <Route element={<ProtectedRoutes />}>
                  <Route path="/select-company/*" element={<SelectCompanyRoutes />} />
                  <Route path="*" element={<PrivateRoutes />} />
                </Route>

              </Routes>
            </BrowserRouter>
          </ThemeModeProvider>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  );
};