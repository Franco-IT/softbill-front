import { createContext, useEffect, useState, ReactNode, useCallback } from 'react'

import { useRouter } from 'next/router'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'

import toast from 'react-hot-toast'

import { api } from 'src/services/api'
import { AuthValuesType } from './types'
import authConfig from 'src/configs/auth'

import { authController } from 'src/modules/auth'
import { cryptoProvider } from 'src/shared/providers'
import { AppError } from 'src/shared/errors/AppError'
import { IUserLoginDTO } from 'src/modules/auth/dtos/IUserLoginDTO'
import { IUserLoggedDTO } from 'src/modules/auth/dtos/IUserLoggedDTO'
import { IUserResetPasswordDTO } from 'src/modules/auth/dtos/IUserResetPasswordDTO'
import { IUserEmailResetPasswordDTO } from 'src/modules/auth/dtos/IUserEmailResetPasswordDTO'
import { IUserFirstAccessDTO } from 'src/modules/auth/dtos/IUserFirstAccessDTO'

const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: async () => Promise.resolve(),
  logout: () => null,
  resetPassword: async () => Promise.resolve(),
  emailResetPassword: async () => Promise.resolve(),
  firstAccess: async () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

let authChannel: BroadcastChannel

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const router = useRouter()
  const [user, setUser] = useState<IUserLoggedDTO | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  const handleCheckRoutes = (currentRoute: string) => {
    const routes = ['/primeiro-acesso', '/redefinir-senha', '/esqueceu-a-senha']

    return routes.includes(currentRoute)
  }

  const handleLogout = useCallback(() => {
    setUser(null)
    authController.logout()
    deleteCookie(authConfig.storageUserDataKeyName)
    deleteCookie(`${authConfig.storageUserDataKeyName}-iv`)
    deleteCookie(authConfig.storageTokenKeyName)
    deleteCookie(`${authConfig.storageTokenKeyName}-iv`)
    authChannel.postMessage('logout')
    router.push('/login')
  }, [router])

  useEffect(() => {
    authChannel = new BroadcastChannel('auth')

    authChannel.onmessage = message => {
      if (message.data === 'logout') handleLogout()
    }

    return () => {
      authChannel.close()
    }
  }, [handleLogout])

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const encryptedToken = getCookie(authConfig.storageTokenKeyName)
      const encryptedUserId = getCookie(authConfig.storageUserDataKeyName)

      if (!encryptedToken || !encryptedUserId) {
        setLoading(false)
        !handleCheckRoutes(router.pathname) && handleLogout()

        return
      }

      const ivToken = getCookie(`${authConfig.storageTokenKeyName}-iv`)
      const ivUserId = getCookie(`${authConfig.storageUserDataKeyName}-iv`)

      if (!ivToken || !ivUserId) {
        setLoading(false)
        !handleCheckRoutes(router.pathname) && handleLogout()

        return
      }

      setLoading(true)

      const token = cryptoProvider.decrypt(encryptedToken as string, ivToken as string)
      const userId = cryptoProvider.decrypt(encryptedUserId as string, ivUserId as string)

      if (!token || !userId) {
        setLoading(false)
        !handleCheckRoutes(router.pathname) && handleLogout()
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

  const handleLogin = async (params: IUserLoginDTO): Promise<void> => {
    try {
      const response = await authController.login(params)

      if (!response) return

      const { token, userId } = response

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      const { iv: ivToken, encrypted: encryptedToken } = cryptoProvider.encrypt(token)
      const { iv: ivUserId, encrypted: encryptedUserId } = cryptoProvider.encrypt(userId)

      setCookie(authConfig.storageTokenKeyName, encryptedToken)
      setCookie(`${authConfig.storageTokenKeyName}-iv`, ivToken)
      setCookie(authConfig.storageUserDataKeyName, encryptedUserId)
      setCookie(`${authConfig.storageUserDataKeyName}-iv`, ivUserId)

      const userData = await authController.getAuthUser(userId)

      if (!userData) return

      setUser(userData)

      const returnUrl = router.query.returnUrl

      const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

      router.replace(redirectURL as string)
    } catch (error) {
      if (error instanceof AppError) toast.error(error.message)
    }
  }

  const handleResetPassword = async (data: IUserResetPasswordDTO) => {
    try {
      const response = await authController.resetPassword(data)

      if (response && response.status === 200) {
        toast.success('Senha redefinida com sucesso')
        router.push('/login')
      }
    } catch (error) {
      if (error instanceof AppError) toast.error(error.message)
      router.push('/esqueceu-a-senha')
    }
  }

  const handleEmailResetPassword = async (data: IUserEmailResetPasswordDTO) => {
    try {
      const response = await authController.emailResetPassword(data)

      if (response && response.status === 200) {
        toast.success('E-mail enviado com sucesso.')
        router.push('/login')
      }
    } catch (error) {
      if (error instanceof AppError) toast.error(error.message)
      router.push('/esqueceu-a-senha')
    }
  }

  const handleFirstAccess = async (data: IUserFirstAccessDTO) => {
    try {
      const response = await authController.firstAccess(data)

      if (response?.status === 200) {
        toast.success('Senha redefinida com sucesso')
        router.push('/login')
      }
    } catch (error) {
      if (error instanceof AppError) toast.error(error.message)
      router.push('/login')
    }
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    resetPassword: handleResetPassword,
    emailResetPassword: handleEmailResetPassword,
    firstAccess: handleFirstAccess
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
