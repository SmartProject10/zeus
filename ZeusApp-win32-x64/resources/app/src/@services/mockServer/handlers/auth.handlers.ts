import { http, HttpResponse } from 'msw'

const AUTH_PATH = `${import.meta.env.VITE_APP_API_URL}/auth` as const

export const AuthHandlers = [
	http.post<any, { email: string; password: string }>(`${AUTH_PATH}/login`, async ({ request }) => {
		const { email, password } = await request.json()
		if (email === 'admin@demo.com' && password === 'demo') {
			return HttpResponse.json({
				token: 'mock token',
				refreshToken: 'mock refresh token',
				message: 'this is a mocking data for login',
			})
		}

		return HttpResponse.json({ message: 'invalid username or password' }, { status: 401 })
	}),
	http.post(`${AUTH_PATH}/verify_token`, async ({ request }) => {
		request.headers.get('Authorization') === 'Bearer mock token'
		console.log('verify_token')
		return HttpResponse.json({
			id: 1,
			username: 'admin',
			email: 'admin@demo.com',
		})
	}),
]
