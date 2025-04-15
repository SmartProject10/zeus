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

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth())
    const [currentUser, setCurrentUser] = useState<UserModel | undefined>()

    const saveAuth = (auth: AuthModel | undefined) => {
        setAuth(auth)

        if (auth) {
            authHelper.setAuth(auth)
        } else {
            authHelper.removeAuth()
        }
    }

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

export const AuthInit: FC<PropsWithChildren> = ({ children }) => {
    const { auth, currentUser, logout, setCurrentUser } = useAuth()
    const [showSplashScreen, setShowSplashScreen] = useState(true)

    useEffect(() => {
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

        if (auth && auth.token) {
            requestUser()
            return
        }

        logout()
        setShowSplashScreen(false)
    }, [])

    return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}
