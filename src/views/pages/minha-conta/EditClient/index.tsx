// MUI
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Grid,
  DialogActions,
  Button,
  MenuItem
} from '@mui/material'

// Componentes internos
import CustomTextField from 'src/@core/components/mui/text-field'

// Bibliotecas de validação e formulários
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// Tipos e dados
import { IClientDTO } from 'src/modules/users/dtos/IClientDTO'
import { IUpdateClientDTO } from 'src/modules/users/dtos/IUpdateClientDTO'

// Serviços e utilidades
import toast from 'react-hot-toast'
import { applyDocumentMask, applyPhoneMask } from 'src/utils/inputs'

// React Query
import { useMutation, useQueryClient } from 'react-query'

// Erros
import { AppError } from 'src/shared/errors/AppError'
import { updateClientSchema } from 'src/services/yup/schemas/clients/updateClientSchema'
import { userController } from 'src/modules/users'
import { useAuth } from 'src/hooks/useAuth'

interface EditProfileProps {
  openEdit: boolean
  handleEditClose: () => void
  data: IClientDTO
}

const EditClient = ({ openEdit, handleEditClose, data }: EditProfileProps) => {
  const queryClient = useQueryClient()
  const { refetchAuthUser } = useAuth()

  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues: {
      id: data.id,
      name: data.name,
      status: data.status,
      email: data.email,
      documentType: 'CNPJ',
      documentNumber: applyDocumentMask(data.documentNumber, data.documentType),
      additionalData: {
        fantasyName: data.additionalData.fantasyName,
        observations: data.additionalData.observations || '',
        collaboratorName: data.additionalData.collaboratorName,
        clientCompanyPhone: applyPhoneMask(data.additionalData.clientCompanyPhone || ''),
        financialResponsible: data.additionalData.financialResponsible
      }
    } as IUpdateClientDTO,
    mode: 'onBlur',
    resolver: yupResolver(updateClientSchema)
  })

  const handleEditClient = useMutation(
    async (formData: IUpdateClientDTO) => {
      return userController.updateClient(formData)
    },
    {
      onSuccess: response => {
        if (response?.status === 200) {
          queryClient.invalidateQueries(['profile'])
          refetchAuthUser()
          toast.success('Conta atualizada com sucesso!')
        }
      },
      onError: error => {
        if (error instanceof AppError) {
          if (error.statusCode === 409) {
            if (error.message === 'E-mail já cadastrado, por favor, verifique o e-mail informado') {
              setError('email', { type: 'manual', message: 'E-mail já cadastrado' })
              toast.error(error.message)
            }

            if (error.message === 'Documento Inválido, por favor, verifique o número informado') {
              setError('documentNumber', { type: 'manual', message: 'Documento Inválido' })
              toast.error(error.message)
            }
          } else {
            toast.error('Erro ao atualizar conta, tente novamente mais tarde.')
          }
        }
      },
      onSettled: () => handleEditClose()
    }
  )

  const onSubmit = async (formData: IUpdateClientDTO) => await handleEditClient.mutateAsync(formData)

  return (
    <Dialog open={openEdit} onClose={handleEditClose} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 1000 } }}>
      <DialogTitle
        sx={{
          textAlign: 'center',
          fontSize: '1.5rem !important',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        Editar Minha Conta
      </DialogTitle>
      <DialogContent
        sx={{
          pb: theme => `${theme.spacing(8)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
        }}
      >
        <DialogContentText variant='body2' sx={{ textAlign: 'center', mb: 7 }}>
          Edite as informações da sua conta
        </DialogContentText>
        <form noValidate autoComplete='off'>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
              <Controller
                name='status'
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    select
                    label='Status'
                    required
                    value={value || ''}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.status)}
                    {...(errors.status && { helperText: errors.status.message })}
                  >
                    <MenuItem value='' disabled>
                      Selecione o status
                    </MenuItem>
                    <MenuItem value='ACTIVE'>Ativo</MenuItem>
                    <MenuItem value='INACTIVE'>Inativo</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
              <Controller
                name='additionalData.fantasyName'
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
                    error={Boolean(errors.additionalData?.fantasyName)}
                    {...(errors.additionalData?.fantasyName && {
                      helperText: errors.additionalData.fantasyName.message
                    })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name='additionalData.financialResponsible'
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
                    error={Boolean(errors.additionalData?.financialResponsible)}
                    {...(errors.additionalData?.financialResponsible && {
                      helperText: errors.additionalData.financialResponsible.message
                    })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name='additionalData.collaboratorName'
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
                    error={Boolean(errors.additionalData?.collaboratorName)}
                    {...(errors.additionalData?.collaboratorName && {
                      helperText: errors.additionalData.collaboratorName.message
                    })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name='additionalData.clientCompanyPhone'
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    value={value || ''}
                    onBlur={onBlur}
                    label='Telefone da Empresa'
                    onChange={e => onChange(applyPhoneMask(e.target.value))}
                    placeholder='Telefone da Empresa'
                    error={Boolean(errors.additionalData?.clientCompanyPhone)}
                    {...(errors.additionalData?.clientCompanyPhone && {
                      helperText: errors.additionalData.clientCompanyPhone.message
                    })}
                  />
                )}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <Button variant='tonal' color='secondary' onClick={handleEditClose}>
          Cancelar
        </Button>
        <Button variant='contained' sx={{ mr: 2 }} onClick={handleSubmit(onSubmit)}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditClient
