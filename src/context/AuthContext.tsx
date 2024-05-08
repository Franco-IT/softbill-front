import { createContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/router'

import { setCookie, deleteCookie, getCookie } from 'cookies-next'

import { api } from 'src/services/api'
import authConfig from 'src/configs/auth'

import { formatAuthUser } from 'src/utils/formatAuthUser'

import toast from 'react-hot-toast'

import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType } from './types'

// ** Defaults
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
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = getCookie(authConfig.storageTokenKeyName)
      const userId = getCookie(authConfig.storageUserDataKeyName)

      if (storedToken) {
        setLoading(true)

        api.defaults.headers['Authorization'] = `Bearer ${storedToken}`

        api
          .get(`${authConfig.meEndpoint}/${userId}`)
          .then(async response => {
            setLoading(false)
            setUser(formatAuthUser(response.data.data))
          })
          .catch(() => {
            setLoading(false)
            handleLogout()
            toast.error('Sua sessão expirou, faça login novamente.')
          })
      } else {
        setLoading(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = async (params: LoginParams, errorCallback?: ErrCallbackType) => {
    try {
      const { data } = await api.post(authConfig.loginEndpoint, {
        email: params.email,
        password: params.password
      })

      api.defaults.headers['Authorization'] = `Bearer ${data.token}`

      setCookie(authConfig.storageTokenKeyName, data.token)
      setCookie(authConfig.storageUserDataKeyName, data.userId)

      const userData = await api.get(`${authConfig.meEndpoint}/${data.userId}`)

      setUser(formatAuthUser(userData.data.data))

      const returnUrl = router.query.returnUrl

      const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

      router.replace(redirectURL as string)
    } catch (error) {
      if (errorCallback) errorCallback(error as any)
    }
  }

  const handleLogout = () => {
    setUser(null)
    deleteCookie(authConfig.storageUserDataKeyName)
    deleteCookie(authConfig.storageTokenKeyName)
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
