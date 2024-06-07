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

import CustomTextField from 'src/@core/components/mui/text-field'

import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { ClientProps } from 'src/types/clients'
import { api } from 'src/services/api'
import toast from 'react-hot-toast'
import { applyDocumentMask, applyPhoneMask } from 'src/utils/inputs'

const schema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  status: yup.string().required('Status obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  documentType: yup.string().required('Tipo de documento obrigatório'),
  documentNumber: yup
    .string()
    .required('Número do documento obrigatório')
    .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ inválido')
    .max(18, 'CNPJ inválido'),
  collaboratorName: yup.string().required('Nome do colaborador obrigatório'),
  clientCompanyPhone: yup
    .string()
    .required('Telefone da empresa obrigatório')
    .matches(/^(\(?\d{2}\)?\s)?(\d{4,5}\-?\d{4})$/, 'Telefone inválido'),
  financialResponsible: yup.string().required('Responsável financeiro obrigatório'),
  fantasyName: yup.string().required('Nome fantasia obrigatório'),
  observations: yup.string()
})

interface FormData extends ClientProps {
  status: 'ACTIVE' | 'INACTIVE'
  accountingId: string
}

interface EditProfileProps {
  openEdit: boolean
  handleEditClose: () => void
  data: ClientProps
  refresh: boolean
  setRefresh: (value: boolean) => void
}

const Edit = ({ openEdit, handleEditClose, data, refresh, setRefresh }: EditProfileProps) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      ...data,
      documentNumber: applyDocumentMask(data.documentNumber, data.documentType),
      clientCompanyPhone: applyPhoneMask(data.clientCompanyPhone || '')
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (formData: FormData) => {
    if ('type#status' in formData) {
      delete formData['type#status']
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, __v, createdAt, updatedAt, ...dataFormated } = formData

    api
      .put(`/users/${data._id}`, dataFormated)
      .then(response => {
        if (response.status === 200) {
          handleEditClose()
          toast.success('Cliente atualizado com sucesso!')
          setRefresh(!refresh)
        }
      })
      .catch(() => {
        handleEditClose()
      })
  }

  return (
    <Dialog
      open={openEdit}
      onClose={handleEditClose}
      aria-labelledby='user-view-edit'
      aria-describedby='user-view-edit-description'
      sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 1000 } }}
    >
      <DialogTitle
        id='user-view-edit'
        sx={{
          textAlign: 'center',
          fontSize: '1.5rem !important',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        Editar Cliente
      </DialogTitle>
      <DialogContent
        sx={{
          pb: theme => `${theme.spacing(8)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
        }}
      >
        <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
          Edite as informações do cliente
        </DialogContentText>
        <form noValidate autoComplete='off'>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} lg={4} xl={3}>
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
            <Grid item xs={12} sm={6} lg={4} xl={3}>
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
            <Grid item xs={12} sm={6} lg={4} xl={3}>
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
            <Grid item xs={12} sm={6} lg={4} xl={3}>
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
            <Grid item xs={12} sm={6} lg={4} xl={3}>
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
            <Grid item xs={12} sm={6} lg={4} xl={3}>
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
            <Grid item xs={12} sm={6} lg={4} xl={3}>
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
            <Grid item xs={12} sm={6} lg={4} xl={3}>
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

export default Edit
