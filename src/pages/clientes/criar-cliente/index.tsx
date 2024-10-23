// Navigation hook from Next.js for routing
import { useRouter } from 'next/router'

// MUI components for layout and UI elements
import { Box, Button, Card, CardContent, CardHeader, Grid } from '@mui/material'

// React Hook Form for form management and validation
import { useForm, Controller } from 'react-hook-form'

// Yup resolver for schema validation with React Hook Form
import { yupResolver } from '@hookform/resolvers/yup'

// Toast notifications for user feedback
import toast from 'react-hot-toast'

// React Query hooks for data fetching and state management
import { useMutation, useQueryClient } from 'react-query'

// Custom MUI text field component
import CustomTextField from 'src/@core/components/mui/text-field'

// Custom hook for authentication
import { useAuth } from 'src/hooks/useAuth'

// Utility functions for input formatting (document and phone masks)
import { applyDocumentMask, applyPhoneMask } from 'src/utils/inputs'

// Client controller for managing client-related operations
import { clientsController } from 'src/modules/clients'

// Error handling utility
import { AppError } from 'src/shared/errors/AppError'

// Yup schema for client creation validation
import { createClientSchema } from 'src/services/yup/schemas/clients/createClientSchema'

// DTO for creating a new client
import { ICreateClientDTO } from 'src/modules/clients/dtos/ICreateClientDTO'

const CreateClient = () => {
  const router = useRouter()
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      documentNumber: '',
      collaboratorName: '',
      clientCompanyPhone: '',
      financialResponsible: '',
      fantasyName: '',
      observations: '',
      status: 'ACTIVE',
      accountingId: user?.id,
      documentType: 'CNPJ',
      type: 'CLIENT'
    } as ICreateClientDTO,
    mode: 'onBlur',
    resolver: yupResolver(createClientSchema)
  })

  const handleCreateClient = useMutation(
    (data: ICreateClientDTO) => {
      return clientsController.create(data)
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['clients'])
        await queryClient.invalidateQueries(['financial-closing-list'])
        toast.success('Cliente adicionado com sucesso!')
        await router.push('/clientes')
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

  const onSubmit = async (data: ICreateClientDTO) => await handleCreateClient.mutateAsync(data)

  return (
    <Card>
      <CardHeader title='Adicionar Cliente' />
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
                    value={value || ''}
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
                    required
                    value={value || ''}
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
                name='documentNumber'
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    required
                    value={value || ''}
                    onBlur={onBlur}
                    label='CNPJ'
                    onChange={e => onChange(applyDocumentMask(e.target.value, watch('documentType')))}
                    placeholder='Número do CNPJ'
                    error={Boolean(errors.documentNumber)}
                    {...(errors.documentNumber && { helperText: errors.documentNumber.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Controller
                name='fantasyName'
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    required
                    value={value || ''}
                    onBlur={onBlur}
                    label='Nome Fantasia'
                    onChange={onChange}
                    placeholder='Nome Fantasia'
                    error={Boolean(errors.fantasyName)}
                    {...(errors.fantasyName && { helperText: errors.fantasyName.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Controller
                name='financialResponsible'
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    required
                    value={value || ''}
                    onBlur={onBlur}
                    label='Nome do Responsável Financeiro'
                    onChange={onChange}
                    placeholder='Nome do Responsável Financeiro'
                    error={Boolean(errors.financialResponsible)}
                    {...(errors.financialResponsible && { helperText: errors.financialResponsible.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Controller
                name='collaboratorName'
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    required
                    value={value || ''}
                    onBlur={onBlur}
                    label='Colaborador Responsável'
                    onChange={onChange}
                    placeholder='Colaborador Responsável'
                    error={Boolean(errors.collaboratorName)}
                    {...(errors.collaboratorName && { helperText: errors.collaboratorName.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Controller
                name='clientCompanyPhone'
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    value={value || ''}
                    onBlur={onBlur}
                    label='Telefone da Empresa'
                    onChange={e => onChange(applyPhoneMask(e.target.value))}
                    placeholder='Telefone da Empresa'
                    error={Boolean(errors.clientCompanyPhone)}
                    {...(errors.clientCompanyPhone && { helperText: errors.clientCompanyPhone.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Box sx={{ display: 'flex', alignItems: 'end', justifyContent: 'end' }}>
                <Button variant='outlined' sx={{ mr: 2 }} onClick={() => router.push('/clientes')}>
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

CreateClient.acl = {
  action: 'create',
  subject: ['ACCOUNTING', 'ACCOUNTANT']
}

export default CreateClient
