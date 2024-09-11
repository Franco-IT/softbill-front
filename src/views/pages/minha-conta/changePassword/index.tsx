// ** React Imports
import { useState } from 'react'

// ** React Hook Form Imports
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** MUI Components
import {
  Card,
  Grid,
  Alert,
  Button,
  CardHeader,
  AlertTitle,
  IconButton,
  CardContent,
  InputAdornment,
  Box
} from '@mui/material'

// ** Custom Components
import Icon from 'src/@core/components/icon'
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Services and Utilities
import toast from 'react-hot-toast'
import { delay } from 'src/utils/delay'
import { useAuth } from 'src/hooks/useAuth'

// ** Schema Validation
import { changePasswordAuthUserSchema } from 'src/services/yup/schemas/changePasswordAuthUserSchema'
import { IChangePasswordAuthUserDTO } from 'src/modules/auth/dtos/IChangePasswordAuthUserDTO'
import { useMutation, useQueryClient } from 'react-query'
import { authController } from 'src/modules/auth'
import { AppError } from 'src/shared/errors/AppError'

const ChangePassword = () => {
  const { logout, user } = useAuth()
  const queryClient = useQueryClient()

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      userId: user?.id
    } as IChangePasswordAuthUserDTO,
    mode: 'onBlur',
    resolver: yupResolver(changePasswordAuthUserSchema)
  })

  const handleChangePassword = useMutation((data: IChangePasswordAuthUserDTO) => authController.changePassword(data), {
    onSuccess: response => {
      if (response?.status === 200) {
        toast.success('Senha alterada com sucesso, faça login novamente')
        queryClient.invalidateQueries(['profile'])

        delay(2000).then(() => {
          logout()
        })
      }
    },
    onError: error => {
      if (error instanceof AppError) toast.error(error.message)
    }
  })

  const onSubmit = async (data: IChangePasswordAuthUserDTO) => await handleChangePassword.mutateAsync(data)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Alterar Senha' />
          <CardContent>
            <Alert icon={false} severity='warning' sx={{ mb: 4 }}>
              <AlertTitle
                sx={{ fontWeight: 500, fontSize: '1.125rem', mb: theme => `${theme.spacing(2.5)} !important` }}
              >
                Requerimentos de senha
              </AlertTitle>
              Mínino de 8 caracteres
            </Alert>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Controller
                    name='oldPassword'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        onBlur={onBlur}
                        label='Senha Atual'
                        onChange={onChange}
                        placeholder='Senha Atual'
                        error={Boolean(errors.oldPassword)}
                        {...(errors.oldPassword && { helperText: errors.oldPassword.message })}
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
                </Grid>
                <Grid item xs={12} sm={6}>
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
                        placeholder='Nova Senha'
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='confirmPassword'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        onBlur={onBlur}
                        label='Confirmar Nova Senha'
                        onChange={onChange}
                        placeholder='Confirmação de Nova Senha'
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
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Button type='submit' variant='contained'>
                      Salvar
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ChangePassword
