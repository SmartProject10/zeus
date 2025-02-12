import { AuthModel } from './api/dtos/AuthModel'


export const AUTH_LOCAL_STORAGE_KEY = 'USER_SESSION'

/*"agarrarmos" desde el localStorage el token que tiene la forma modelo siguiente:
    {
        token: string
        refreshToken: string
    }
*/
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

/**
 * "ponemos" en el localStorage el "auth" pasado por parámetro con la key de la constante "AUTH_LOCAL_STORAGE_KEY"
 */
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

/**
 * "removemos" en el localStorage el token con la key de la constante "AUTH_LOCAL_STORAGE_KEY"
 */
export const removeAuth = () => {
    if (!localStorage) return

    try {
        localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
    } catch (error) {
        console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
    }
}
