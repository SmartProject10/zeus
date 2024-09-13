import { AuthModel } from './api/dtos/AuthModel'

export const AUTH_LOCAL_STORAGE_KEY = 'USER_SESSION'

export const getAuth = (): AuthModel | undefined => {
    if (!localStorage) {
        return
    }

    const lsValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)
    if (!lsValue) {
        return
    }

    try {
        const auth: AuthModel = JSON.parse(lsValue) as AuthModel
        if (auth) {
            // You can easily check auth_token expiration also
            return auth
        }
    } catch (error) {
        console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
    }
}

export const setAuth = (auth: AuthModel) => {
    if (!localStorage) {
        return
    }

    try {
        const lsValue = JSON.stringify(auth)
        localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue)
    } catch (error) {
        console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
    }
}

export const removeAuth = () => {
    if (!localStorage) return

    try {
        localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
    } catch (error) {
        console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
    }
}
