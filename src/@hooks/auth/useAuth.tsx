import { Dispatch, FC, PropsWithChildren, SetStateAction, createContext, useContext, useEffect, useState } from 'react'

import { backyService } from '@zeus/@services/api'
import * as authHelper from '@zeus/@services/session'
import { AuthModel } from '@zeus/@services/api/dtos/AuthModel'
import { LayoutSplashScreen } from '@zeus/_zeus/layout/core'
import { UserModel } from '@zeus/@services/api/dtos/AuthModel'

type AuthContextProps = {
    auth: AuthModel | undefined
    saveAuth: (auth: AuthModel | undefined) => void
    currentUser: UserModel | undefined
    setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>
    logout: () => void
}

const initAuthContextPropsState = {
    auth: authHelper.getAuth(),
    saveAuth: () => void 0,
    currentUser: undefined,
    setCurrentUser: () => void 0,
    logout: () => void 0,
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

export const useAuth = () => useContext(AuthContext)

//SE OBTIENE, QUITA O CREA EL TOKEN EN EL LOCALSTORAGE
//SE QUITA EL USER
export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    //en "auth" queda el token agarrado del localStorage por medio de "getAuth()"
    const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth())
    const [currentUser, setCurrentUser] = useState<UserModel | undefined>()

    //"quita" o "pone" en el localStorage el token
    const saveAuth = (auth: AuthModel | undefined) => {

        //este "setAuth" es de la constante de arriba para setear el "auth" de arriba, no es del de "authHelper.setAuth"
        setAuth(auth)

        //si auth es correcto entonces se manda al localStorage sino se lo saca porque es para sacarlo del localStorage
        if (auth) {
            authHelper.setAuth(auth)
        } else {
            authHelper.removeAuth()
        }
    }

    //"quita" el token del localStorage y "quita" el currentUser
    const logout = () => {
        saveAuth(undefined)
        setCurrentUser(undefined)
    }

    return (
        <AuthContext.Provider
            value={{ auth, saveAuth, currentUser, setCurrentUser, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

//SE VERIFICA QUE EXISTA EL TOKEN Y EL USUARIO LOGEADO, SI EXISTE EL TOKEN Y EL USUARIO NO ESTÁ SETEADO SE LO SETEA DESDE EL TOKEN
export const AuthInit: FC<PropsWithChildren> = ({ children }) => {
    const { auth, currentUser, logout, setCurrentUser } = useAuth()
    const [showSplashScreen, setShowSplashScreen] = useState(true)

    useEffect(() => {

        //se setea el user si es que no existe
        const requestUser = async () => {
            try {
                if (currentUser) return

                const { data } = await backyService.auth.verifyToken()
                if (data) setCurrentUser(data)
            } catch (error) {
                console.error(error)
                if (currentUser) logout()
            } finally {
                setShowSplashScreen(false)
            }
        }
 
        //si existe auth se verifica/setea el user
        if (auth && auth.token) {
            requestUser()
            return
        }

        logout()
        setShowSplashScreen(false)
    }, [])

    //muestra el "cargando" o el "componente hijo"
    return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}
