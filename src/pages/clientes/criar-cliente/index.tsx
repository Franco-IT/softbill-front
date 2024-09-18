import { useRouter } from 'next/router'
import { Box, Button, Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'

import CustomTextField from 'src/@core/components/mui/text-field'
import { useAuth } from 'src/hooks/useAuth'

import { applyDocumentMask, applyPhoneMask } from 'src/utils/inputs'
import { userController } from 'src/modules/users'
import { AppError } from 'src/shared/errors/AppError'

import { createClientSchema } from 'src/services/yup/schemas/clients/createClientSchema'
import { ICreateClientDTO } from 'src/modules/users/dtos/ICreateClientDTO'

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
      return userController.createClient(data)
    },
    {
      onSuccess: response => {
        if (response?.status === 201) {
          queryClient.invalidateQueries(['clients'])
          queryClient.invalidateQueries(['financial-closing-list'])
          toast.success('Cliente adicionado com sucesso!')
          router.push('/clientes')
        }
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
