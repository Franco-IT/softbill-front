import { useState, ReactNode, useEffect } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'

import Icon from 'src/@core/components/icon'
import CustomTextField from 'src/@core/components/mui/text-field'

import BlankLayout from 'src/@core/layouts/BlankLayout'
import AuthIllustrationV1Wrapper from 'src/views/pages/auth/AuthIllustrationV1Wrapper'

import toast from 'react-hot-toast'

import { useAuth } from 'src/hooks/useAuth'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { firstAccessSchema } from 'src/services/yup/schemas/firstAccessSchema'
import { IUserFirstAccessDTO } from 'src/modules/auth/dtos/IUserFirstAccessDTO'

import themeConfig from 'src/configs/themeConfig'

const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '25rem' }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'center',
  color: `${theme.palette.primary.main} !important`
}))

const FirstAccess = () => {
  const router = useRouter()
  const { firstAccess } = useAuth()

  const [showNewPassword, setShowNewPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
      token: ''
    },
    mode: 'onBlur',
    resolver: yupResolver(firstAccessSchema)
  })

  const onSubmit = async (data: IUserFirstAccessDTO) => await firstAccess(data)

  useEffect(() => {
    if (router.isReady) {
      if (router.query.token) return setValue('token', router.query.token as string)

      toast.error('Token inválido, tente novamente.')

      setInterval(() => {
        router.push('/login')
      }, 3000)
    }
  }, [router, setValue])

  return (
    <Box className='content-center'>
      <AuthIllustrationV1Wrapper>
        <Card>
          <CardContent sx={{ p: theme => `${theme.spacing(10.5, 8, 8)} !important` }}>
            <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant='h3' sx={{ ml: 2.5, fontWeight: 700 }}>
                {themeConfig.templateName}
              </Typography>
            </Box>
            <Box sx={{ mb: 6 }}>
              <Typography variant='h4' sx={{ mb: 1.5 }}>
                Primeiro Acesso - Redefinir Senha
              </Typography>
            </Box>
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ mb: 4 }}>
                <Controller
                  name='newPassword'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      onBlur={onBlur}
                      label='Nova Senha'
                      onChange={onChange}
                      placeholder='Senha'
                      error={Boolean(errors.newPassword)}
                      {...(errors.newPassword && { helperText: errors.newPassword.message })}
                      type={showNewPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onMouseDown={e => e.preventDefault()}
                              onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                              <Icon fontSize='1.25rem' icon={showNewPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
              </Box>
              <Box sx={{ mb: 4 }}>
                <Controller
                  name='confirmPassword'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      onBlur={onBlur}
                      label='Confirmar Senha'
                      onChange={onChange}
                      placeholder='Confirmar Senha'
                      error={Boolean(errors.confirmPassword)}
                      {...(errors.confirmPassword && { helperText: errors.confirmPassword.message })}
                      type={showConfirmPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onMouseDown={e => e.preventDefault()}
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              <Icon fontSize='1.25rem' icon={showConfirmPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
              </Box>
              <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }}>
                Redefinir Senha
              </Button>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { mr: 1 } }}>
                <Typography component={LinkStyled} href='/login'>
                  <Icon fontSize='1.25rem' icon='tabler:chevron-left' />
                  <span>Voltar para o login</span>
                </Typography>
              </Typography>
            </form>
          </CardContent>
        </Card>
      </AuthIllustrationV1Wrapper>
    </Box>
  )
}

FirstAccess.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

FirstAccess.guestGuard = true

export default FirstAccess
