import { createContext, useState, ReactNode, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import toast from 'react-hot-toast'
import { useQuery, useMutation, useQueryClient } from 'react-query'

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
  login: async () => Promise.resolve({} as IUserLoggedDTO),
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
  const queryClient = useQueryClient()
  const [user, setUser] = useState<IUserLoggedDTO | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  const handleCheckRoutes = (currentRoute: string) => {
    const routes = ['/primeiro-acesso', '/redefinir-senha', '/esqueceu-a-senha']

    return routes.includes(currentRoute)
  }

  const fetchAuthUser = async () => {
    const encryptedToken = getCookie(authConfig.storageTokenKeyName)
    const encryptedUserId = getCookie(authConfig.storageUserDataKeyName)

    if (!encryptedToken || !encryptedUserId) {
      !handleCheckRoutes(router.pathname) && handleLogout()

      return null
    }

    const ivToken = getCookie(`${authConfig.storageTokenKeyName}-iv`)
    const ivUserId = getCookie(`${authConfig.storageUserDataKeyName}-iv`)

    if (!ivToken || !ivUserId) {
      !handleCheckRoutes(router.pathname) && handleLogout()

      return null
    }

    const token = cryptoProvider.decrypt(encryptedToken as string, ivToken as string)
    const userId = cryptoProvider.decrypt(encryptedUserId as string, ivUserId as string)

    if (!token || !userId) {
      toast.error('Sua sessão expirou, faça login novamente.')
      !handleCheckRoutes(router.pathname) && handleLogout()

      return null
    }

    api.defaults.headers['Authorization'] = `Bearer ${token}`

    return authController.getAuthUser(userId as string)
  }

  const { refetch: refetchAuthUser } = useQuery(['auth-user'], fetchAuthUser, {
    onSuccess: (data: IUserLoggedDTO) => {
      if (data) setUser(data)
    },
    onError: (error: any) => {
      handleLogout()
      if (error instanceof AppError) toast.error(error.message)
    },
    onSettled: () => {
      setLoading(false)
    },
    enabled: false,
    staleTime: 1000 * 60 * 20
  })

  const loginMutation = useMutation(
    async (params: IUserLoginDTO) => {
      const response = await authController.login(params)
      if (!response) throw new Error('Erro ao fazer login. Tente novamente.')

      const { token, userId } = response
      api.defaults.headers['Authorization'] = `Bearer ${token}`

      const { iv: ivToken, encrypted: encryptedToken } = cryptoProvider.encrypt(token)
      const { iv: ivUserId, encrypted: encryptedUserId } = cryptoProvider.encrypt(userId)

      setCookie(authConfig.storageTokenKeyName, encryptedToken)
      setCookie(`${authConfig.storageTokenKeyName}-iv`, ivToken)
      setCookie(authConfig.storageUserDataKeyName, encryptedUserId)
      setCookie(`${authConfig.storageUserDataKeyName}-iv`, ivUserId)

      const userData = await authController.getAuthUser(userId)

      if (!userData) throw new AppError('Erro ao buscar usuário logado. Tente novamente.')

      return userData
    },
    {
      onSuccess: (userData: IUserLoggedDTO) => {
        setUser(userData)
        queryClient.invalidateQueries(['auth-user'])

        const returnUrl = router.query.returnUrl
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        router.replace(redirectURL as string)
      },
      onError: (error: any) => {
        if (error instanceof AppError) toast.error(error.message)
      }
    }
  )

  const handleLogin = useCallback(async (params: IUserLoginDTO) => loginMutation.mutateAsync(params), [loginMutation])

  const logoutMutation = useMutation(
    () => {
      authController.logout()
      deleteCookie(authConfig.storageUserDataKeyName)
      deleteCookie(`${authConfig.storageUserDataKeyName}-iv`)
      deleteCookie(authConfig.storageTokenKeyName)
      deleteCookie(`${authConfig.storageTokenKeyName}-iv`)

      setUser(null)
      authChannel.postMessage('logout')

      return router.push('/login')
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['auth-user'])
      }
    }
  )

  const handleLogout = useCallback(() => logoutMutation.mutate(), [logoutMutation])

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

  useEffect(() => {
    refetchAuthUser()
  }, [refetchAuthUser])

  useEffect(() => {
    authChannel = new BroadcastChannel('auth')

    authChannel.onmessage = message => {
      if (message.data === 'logout') handleLogout()
    }

    return () => {
      authChannel.close()
    }
  }, [handleLogout])

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
