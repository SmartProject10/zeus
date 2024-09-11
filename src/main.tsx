import { createRoot } from 'react-dom/client'
import { Chart, registerables } from 'chart.js'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

// Apps
import { MetronicI18nProvider } from './_zeus/i18n/Zeus18n.tsx'
import './_zeus/assets/sass/style.react.scss'
import './_zeus/assets/fonticon/fonticon.css'
import './_zeus/assets/keenicons/duotone/style.css'
import './_zeus/assets/keenicons/outline/style.css'
import './_zeus/assets/keenicons/solid/style.css'
/**
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_zeus/assets/css/style.rtl.css'
 **/
import './_zeus/assets/sass/style.scss'
import { AppRoutes } from './app/routing/AppRoutes'
import { AuthProvider } from '@zeus/@hooks/auth/useAuth.tsx'
import { enableMocking } from './@services/mockServer/index.ts'

/**
 * Creates `axios-mock-adapter` instance for provided `axios` instance, add
 * basic Metronic mocks and returns it.
 *
 * @see https://github.com/ctimmerm/axios-mock-adapter
 */
/**
 * Inject Metronic interceptors for axios.
 *
 * @see https://github.com/axios/axios#interceptors
 */
Chart.register(...registerables)

const queryClient = new QueryClient()
const container = document.getElementById('root')

if (container) {
  enableMocking().then(() => {
    createRoot(container).render(
      <QueryClientProvider client={queryClient}>
        <MetronicI18nProvider>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </MetronicI18nProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    )
  })
}
