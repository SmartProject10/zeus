import { createRoot } from 'react-dom/client'
import { Chart, registerables } from 'chart.js'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import './_zeus/assets/sass/style.react.scss'
import './_zeus/assets/fonticon/fonticon.css'
import './_zeus/assets/keenicons/duotone/style.css'
import './_zeus/assets/keenicons/outline/style.css'
import './_zeus/assets/keenicons/solid/style.css'
import './_zeus/assets/sass/style.scss'
import { App } from './app/routing/App.js'
import { WorkerProvider } from './_zeus/i18n/Zeus18n.tsx'
import { WorkerAuthProvider } from '@zeus/@hooks/auth/WorkerAuthProvider.tsx'

Chart.register(...registerables)

const queryClient = new QueryClient()
const container = document.getElementById('root')

if (container) {
    createRoot(container).render(
      <QueryClientProvider client={queryClient}>
        <WorkerProvider>
          <WorkerAuthProvider>
            <App />
          </WorkerAuthProvider>
        </WorkerProvider>

        <ReactQueryDevtools
          initialIsOpen={false} />
      </QueryClientProvider>,
    )
}
