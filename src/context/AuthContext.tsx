// React Imports
import { createContext, useState, ReactNode, useEffect, useCallback, useMemo } from 'react'

// Next.js Imports
import { useRouter } from 'next/router'

// Cookie Management
import { deleteCookie, getCookie, setCookie, getCookies } from 'cookies-next'

// Notifications
import toast from 'react-hot-toast'

// React Query Imports
import { useQuery, useMutation, useQueryClient, QueryObserverResult } from 'react-query'

// Services
import { api } from 'src/services/api'
import { authController } from 'src/modules/auth'

// Configs
import authConfig from 'src/configs/auth'

// Providers
import { cryptoProvider } from 'src/shared/providers'

// Error Handling
import { AppError } from 'src/shared/errors/AppError'

// Types
import { AuthValuesType } from './types'

// DTOs
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
  login: () => Promise.resolve({} as IUserLoggedDTO),
  logout: () => null,
  resetPassword: () => Promise.resolve(),
  emailResetPassword: () => Promise.resolve(),
  firstAccess: () => Promise.resolve(),
  refetchAuthUser: () => Promise.resolve({} as QueryObserverResult<IUserLoggedDTO, any>)
}

const AuthContext = createContext(defaultProvider)

export let authChannel: BroadcastChannel

type Props = {
  children: ReactNode
  guestGuard?: boolean
}

const AuthProvider = ({ children, guestGuard }: Props) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [user, setUser] = useState<IUserLoggedDTO | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  const loginMutation = useMutation(
    async (params: IUserLoginDTO) => {
      const response = await authController.login(params)
      const { token, userId } = response

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      const { iv: ivToken, encrypted: encryptedToken } = cryptoProvider.encrypt(token)
      const { iv: ivUserId, encrypted: encryptedUserId } = cryptoProvider.encrypt(userId)

      setCookie(authConfig.storageTokenKeyName, encryptedToken)
      setCookie(`${authConfig.storageTokenKeyName}-iv`, ivToken)
      setCookie(authConfig.storageUserDataKeyName, encryptedUserId)
      setCookie(`${authConfig.storageUserDataKeyName}-iv`, ivUserId)

      return authController.getAuthUser(userId)
    },
    {
      onSuccess: (userData: IUserLoggedDTO) => {
        setUser(userData)
        queryClient.removeQueries()

        const returnUrl = router.query.returnUrl
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        return router.replace(redirectURL as string)
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
      const cookies = getCookies()

      if (cookies) Object.keys(cookies).forEach(key => deleteCookie(key))

      setUser(null)
      authChannel.postMessage('logout')

      return router.push('/login')
    },
    {
      onSuccess: () => {
        queryClient.removeQueries()
      }
    }
  )

  const handleLogout = useCallback(() => logoutMutation.mutate(), [logoutMutation])

  const fetchAuthUser = useCallback(async () => {
    const encryptedToken = getCookie(authConfig.storageTokenKeyName)
    const encryptedUserId = getCookie(authConfig.storageUserDataKeyName)
    const ivToken = getCookie(`${authConfig.storageTokenKeyName}-iv`)
    const ivUserId = getCookie(`${authConfig.storageUserDataKeyName}-iv`)

    if (!encryptedToken || !encryptedUserId || !ivToken || !ivUserId) return guestGuard ? null : handleLogout()

    const token = cryptoProvider.decrypt(encryptedToken as string, ivToken as string)
    const userId = cryptoProvider.decrypt(encryptedUserId as string, ivUserId as string)

    if ((!token || !userId) && !guestGuard) {
      toast.error('Sua sessão expirou, faça login novamente.')

      return handleLogout()
    }

    api.defaults.headers['Authorization'] = `Bearer ${token}`

    return authController.getAuthUser(userId as string)
  }, [guestGuard, handleLogout])

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

  const handleResetPassword = useCallback(
    async (data: IUserResetPasswordDTO) => {
      try {
        await authController.resetPassword(data)
        toast.success('Senha redefinida com sucesso')
        await router.push('/login')
      } catch (error) {
        if (error instanceof AppError) toast.error(error.message)

        await router.push('/esqueceu-a-senha')
      }
    },
    [router]
  )

  const handleEmailResetPassword = useCallback(
    async (data: IUserEmailResetPasswordDTO) => {
      try {
        await authController.emailResetPassword(data)
        toast.success('E-mail enviado com sucesso.')
        await router.push('/login')
      } catch (error) {
        if (error instanceof AppError) toast.error(error.message)
        await router.push('/esqueceu-a-senha')
      }
    },
    [router]
  )

  const handleFirstAccess = useCallback(
    async (data: IUserFirstAccessDTO) => {
      try {
        await authController.firstAccess(data)
        toast.success('Senha redefinida com sucesso')
        await router.push('/login')
      } catch (error) {
        if (error instanceof AppError) toast.error(error.message)
        await router.push('/login')
      }
    },
    [router]
  )

  useEffect(() => {
    refetchAuthUser()
  }, [refetchAuthUser])

  useEffect(() => {
    authChannel = new BroadcastChannel('auth')

    authChannel.onmessage = message => {
      console.log('message', message)
      if (message.data === 'logout') handleLogout()
    }

    return () => {
      authChannel.close()
    }
  }, [handleLogout])

  const values = useMemo(
    () => ({
      user,
      loading,
      setUser,
      setLoading,
      login: handleLogin,
      logout: handleLogout,
      resetPassword: handleResetPassword,
      emailResetPassword: handleEmailResetPassword,
      firstAccess: handleFirstAccess,
      refetchAuthUser
    }),
    [
      handleEmailResetPassword,
      handleFirstAccess,
      handleLogin,
      handleLogout,
      handleResetPassword,
      loading,
      refetchAuthUser,
      user
    ]
  )

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
