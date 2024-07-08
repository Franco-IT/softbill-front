import { createContext, useEffect, useState, ReactNode } from 'react'

import { useRouter } from 'next/router'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'

import toast from 'react-hot-toast'

import authConfig from 'src/configs/auth'

import { api } from 'src/services/api'
import { authController } from 'src/modules/auth'
import { cryptoProvider } from 'src/shared/providers'
import { AuthValuesType } from './types'
import { IUserLoginDTO } from 'src/modules/auth/dtos/IUserLoginDTO'
import { IUserLoggedDTO } from 'src/modules/auth/dtos/IUserLoggedDTO'
import { AppError } from 'src/shared/errors/AppError'

const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const router = useRouter()
  const [user, setUser] = useState<IUserLoggedDTO | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const encryptedToken = getCookie(authConfig.storageTokenKeyName)
      const encryptedUserId = getCookie(authConfig.storageUserDataKeyName)

      if (!encryptedToken || !encryptedUserId) {
        setLoading(false)
        router.pathname !== '/redefinir-senha' && handleLogout()

        return
      }

      const ivToken = getCookie(`${authConfig.storageTokenKeyName}-iv`)
      const ivUserId = getCookie(`${authConfig.storageUserDataKeyName}-iv`)

      if (!ivToken || !ivUserId) {
        setLoading(false)
        router.pathname !== '/redefinir-senha' && handleLogout()

        return
      }

      setLoading(true)

      const token = cryptoProvider.decrypt(encryptedToken as string, ivToken as string)
      const userId = cryptoProvider.decrypt(encryptedUserId as string, ivUserId as string)

      if (!token || !userId) {
        setLoading(false)
        router.pathname !== '/redefinir-senha' && handleLogout()
        toast.error('Sua sessão expirou, faça login novamente.')

        return
      }

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      authController
        .getAuthUser(userId as string)
        .then(userData => userData && setUser(userData))
        .catch(error => {
          handleLogout()
          if (error instanceof AppError) toast.error(error.message)
        })
        .finally(() => setLoading(false))
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = async (params: IUserLoginDTO) => {
    try {
      const response = await authController.login(params)

      if (!response) return null

      const { token, userId } = response

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      const { iv: ivToken, encrypted: encryptedToken } = cryptoProvider.encrypt(token)
      const { iv: ivUserId, encrypted: encryptedUserId } = cryptoProvider.encrypt(userId)

      setCookie(authConfig.storageTokenKeyName, encryptedToken)
      setCookie(`${authConfig.storageTokenKeyName}-iv`, ivToken)
      setCookie(authConfig.storageUserDataKeyName, encryptedUserId)
      setCookie(`${authConfig.storageUserDataKeyName}-iv`, ivUserId)

      const userData = await authController.getAuthUser(userId)

      if (!userData) return null

      setUser(userData)

      const returnUrl = router.query.returnUrl

      const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

      router.replace(redirectURL as string)
    } catch (error) {
      if (error instanceof AppError) toast.error(error.message)
    }
  }

  const handleLogout = () => {
    setUser(null)
    authController.logout()
    deleteCookie(authConfig.storageUserDataKeyName)
    deleteCookie(`${authConfig.storageUserDataKeyName}-iv`)
    deleteCookie(authConfig.storageTokenKeyName)
    deleteCookie(`${authConfig.storageTokenKeyName}-iv`)
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
