// React Imports
import { CSSProperties, ReactNode, useState } from 'react'

// Next.js Imports
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next/types'

// Material UI Imports
import { Box, Button, CardContent, CardProps, IconButton, Typography, styled, Card as MuiCard } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'

// Custom Components
import Icon from 'src/@core/components/icon'
import CustomTextField from 'src/@core/components/mui/text-field'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import Logo from 'src/components/Logo'

// Hooks
import { useAuth } from 'src/hooks/useAuth'
import { useForm, Controller } from 'react-hook-form'

// Validation
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from 'src/services/yup/schemas/loginSchema'

// DTOs
import { IUserLoginDTO } from 'src/modules/auth/dtos/IUserLoginDTO'

// Configs
import themeConfig from 'src/configs/themeConfig'
import authConfig from 'src/configs/auth'

// Services
import { api } from 'src/services/api'

// Providers
import { cryptoProvider } from 'src/shared/providers'

// Utilities
import { setCookie } from 'cookies-next'
import { jwtDecode } from 'jwt-decode'

export const getServerSideProps: GetServerSideProps<any> = async ({ req, res }) => {
  const token = req.url?.split('/').pop()

  if (!token) return { props: {} }

  api.defaults.headers['Authorization'] = `Bearer ${token}`

  const decodedToken = jwtDecode(token as string) as any

  const { iv: ivToken, encrypted: encryptedToken } = cryptoProvider.encrypt(token)
  const { iv: ivUserId, encrypted: encryptedUserId } = cryptoProvider.encrypt(decodedToken.user_id)

  setCookie(authConfig.storageTokenKeyName, encryptedToken, { req, res })
  setCookie(`${authConfig.storageTokenKeyName}-iv`, ivToken, { req, res })
  setCookie(authConfig.storageUserDataKeyName, encryptedUserId, { req, res })
  setCookie(`${authConfig.storageUserDataKeyName}-iv`, ivUserId, { req, res })

  return {
    props: {}
  }
}

const styleVideo: CSSProperties = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  top: 0,
  left: 0,
  zIndex: -1,
  opacity: 0.4,
  filter: 'brightness(0.5)'
}

const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '25rem' }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.primary.main} !important`
}))

const defaultValues = {
  password: '',
  email: ''
}

const LoginToken = () => {
  const router = useRouter()

  console.log(router.query.token)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(loginSchema)
  })

  const auth = useAuth()

  const onSubmit = async (data: IUserLoginDTO) => await auth.login(data)

  return (
    <Box className='content-center'>
      <Card>
        <CardContent sx={{ p: theme => `${theme.spacing(10.5, 8, 8)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Logo />
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h4' sx={{ mb: 1.5 }}>
              {`Bem vindo a ${themeConfig.templateName}! 👋🏻`}
            </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mb: 4 }}>
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    autoFocus
                    type='email'
                    label='E-mail'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder='E-mail'
                    error={Boolean(errors.email)}
                    {...(errors.email && { helperText: errors.email.message })}
                  />
                )}
              />
            </Box>
            <Box sx={{ mb: 1.5 }}>
              <Controller
                name='password'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    onBlur={onBlur}
                    label='Senha'
                    onChange={onChange}
                    id='auth-login-v2-password'
                    placeholder='Senha'
                    error={Boolean(errors.password)}
                    {...(errors.password && { helperText: errors.password.message })}
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <Icon fontSize='1.25rem' icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
            </Box>
            <Box
              sx={{
                py: 3,
                display: 'flex',
                justifyContent: 'end'
              }}
            >
              <Typography component={LinkStyled} href='/esqueceu-a-senha'>
                Esqueceu a Senha?
              </Typography>
            </Box>
            <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }}>
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
      <video autoPlay loop muted playsInline style={styleVideo}>
        <source src='/login-video.mp4' type='video/mp4' />
      </video>
    </Box>
  )
}

LoginToken.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

LoginToken.guestGuard = true

export default LoginToken
