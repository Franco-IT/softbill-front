// React hook for managing component state
import { useState } from 'react'

// Hook for managing forms with validation
import { useForm, Controller } from 'react-hook-form'

// Yup resolver for schema validation with React Hook Form
import { yupResolver } from '@hookform/resolvers/yup'

// Next.js router hook for navigation
import { useRouter } from 'next/router'

// Notification library for displaying messages to the user
import toast from 'react-hot-toast'

// React Query hooks for data fetching and mutation
import { useMutation, useQueryClient } from 'react-query'

// Material UI components for layout and user interface
import { Box, Button, Card, CardContent, CardHeader, Grid, IconButton, InputAdornment, MenuItem } from '@mui/material'

// Custom text field component for form inputs
import CustomTextField from 'src/@core/components/mui/text-field'

// Icon component for displaying icons
import Icon from 'src/@core/components/icon'

// Utility function for applying input masks to document fields
import { applyDocumentMask } from 'src/utils/inputs'

// Yup schema for validating accounting data during creation
import { createAccountingSchema } from 'src/services/yup/schemas/accountings/createAccountingSchema'

// Custom error class for handling application errors
import { AppError } from 'src/shared/errors/AppError'

// Controller for managing accounting-related operations
import { accountingsController } from 'src/modules/accounting'

interface FormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  status: string
  type: string
  documentType: string
  documentNumber: string
}

const CreateAccounting = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    setError,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      status: 'ACTIVE',
      password: '',
      confirmPassword: '',
      type: 'ACCOUNTING'
    } as FormData,
    mode: 'onBlur',
    resolver: yupResolver(createAccountingSchema)
  })

  const handleCreateAccounting = useMutation(
    (data: FormData) => {
      return accountingsController.create(data)
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['accountings'])
        toast.success('Contabilidade adicionada com sucesso!')
        await router.push('/contabilidades')
      },
      onError: error => {
        if (error instanceof AppError) {
          if (error.statusCode === 409) {
            if (error.message === 'E-mail já cadastrado, por favor, verifique o e-mail informado') {
              setError('email', { type: 'manual', message: 'E-mail já cadastrado' })
            }

            if (error.message === 'Documento Inválido, por favor, verifique o número informado') {
              setError('documentNumber', { type: 'manual', message: 'Documento Inválido' })
            }

            toast.error(error.message)
          } else {
            toast.error(error.message)
          }
        }
      }
    }
  )

  const onSubmit = async (data: FormData) => await handleCreateAccounting.mutateAsync(data)

  return (
    <Card>
      <CardHeader title='Adicionar Contabilidade' />
      <CardContent>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} lg={4}>
              <Controller
                name='name'
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    label='Nome'
                    required
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder='Nome'
                    error={Boolean(errors.name)}
                    {...(errors.name && { helperText: errors.name.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Controller
                name='email'
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
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
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Controller
                name='documentType'
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    label='Tipo de Documento'
                    required
                    value={value || 'default'}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.documentType)}
                    {...(errors.documentType && { helperText: errors.documentType.message })}
                  >
                    <MenuItem value='default' disabled>
                      Selecione
                    </MenuItem>
                    <MenuItem value='CPF'>CPF</MenuItem>
                    <MenuItem value='CNPJ'>CNPJ</MenuItem>
                    <MenuItem value='OTHER'>Outro</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Controller
                name='documentNumber'
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    onBlur={onBlur}
                    label='Número do Documento'
                    onChange={e => onChange(applyDocumentMask(e.target.value, watch('documentType')))}
                    placeholder={!watch('documentType') ? 'Selecione o tipo de documento' : 'Número do Documento'}
                    disabled={!watch('documentType')}
                    error={Boolean(errors.documentNumber)}
                    {...(errors.documentNumber && { helperText: errors.documentNumber.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
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
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
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
            </Grid>
            <Grid item xs={12} sm={12}>
              <Box sx={{ display: 'flex', alignItems: 'end', justifyContent: 'end' }}>
                <Button variant='outlined' sx={{ mr: 2 }} onClick={() => router.push('/contabilidades')}>
                  Cancelar
                </Button>
                <Button type='submit' variant='contained' sx={{ mr: 2 }}>
                  Adicionar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

CreateAccounting.acl = {
  action: 'manage',
  subject: 'ADMIN'
}

export default CreateAccounting
