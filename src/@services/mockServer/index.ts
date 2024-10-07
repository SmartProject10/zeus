import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

export async function enableMocking() {
    if (import.meta.env.VITE_APP_API_MOCKING !== 'true') {
        return
    }

    await worker.start({ onUnhandledRequest: 'bypass' })
}