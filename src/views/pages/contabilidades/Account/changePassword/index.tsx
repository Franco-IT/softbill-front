// ** React Imports
import { useState } from 'react'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

import Icon from 'src/@core/components/icon'

import CustomTextField from 'src/@core/components/mui/text-field'
import { Box } from '@mui/system'
import toast from 'react-hot-toast'
import { changePasswordSchema } from 'src/services/yup/schemas/changePasswordSchema'
import { userController } from 'src/modules/users'
import { AppError } from 'src/shared/errors/AppError'
import { IChangeUserPasswordDTO } from 'src/modules/users/dtos/IChangeUserPasswordDTO'

interface ChangePasswordProps {
  id: string
}

const ChangePassword = ({ id }: ChangePasswordProps) => {
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      id,
      newPassword: '',
      confirmPassword: ''
    },
    mode: 'onBlur',
    resolver: yupResolver(changePasswordSchema)
  })

  const onSubmit = (data: IChangeUserPasswordDTO) => {
    userController
      .changePassword(data)
      .then(response => response?.status === 200 && (toast.success('Senha alterada com sucesso'), reset()))
      .catch(error => error instanceof AppError && toast.error(error.message))
  }

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
                        label='Confirmar Senha'
                        onChange={onChange}
                        placeholder='Confirmação de Senha'
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
