import { createRoot } from 'react-dom/client'
import { Chart, registerables } from 'chart.js'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

// Apps
import { CompanyWorkerProvider } from './_zeus/i18n/Zeus18n.tsx'
import './_zeus/assets/sass/style.react.scss'
import './_zeus/assets/fonticon/fonticon.css'
import './_zeus/assets/keenicons/duotone/style.css'
import './_zeus/assets/keenicons/outline/style.css'
import './_zeus/assets/keenicons/solid/style.css'
import './_zeus/assets/sass/style.scss'
import { AppRoutes } from './app/routing/AppRoutes'
import { AuthProvider } from '@zeus/@hooks/auth/useAuth.tsx'

Chart.register(...registerables)

const queryClient = new QueryClient()
const container = document.getElementById('root')

if (container) {
    createRoot(container).render(
      <QueryClientProvider
        client={queryClient}>
        <CompanyWorkerProvider>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </CompanyWorkerProvider>

        <ReactQueryDevtools
          initialIsOpen={false} />
      </QueryClientProvider>,
    )
}
