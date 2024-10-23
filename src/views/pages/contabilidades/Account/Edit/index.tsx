// Material UI components for dialog and layout
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Grid,
  MenuItem,
  DialogActions,
  Button
} from '@mui/material'

// Custom text field component
import CustomTextField from 'src/@core/components/mui/text-field'

// Validation library
import * as yup from 'yup'

// React Hook Form and its resolver for validation with Yup
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// Notification library for displaying toast messages
import toast from 'react-hot-toast'

// Type definition for accounting data transfer objects
import { IAccountingDTO } from 'src/modules/accounting/dtos/IAccountingDTO'

// Accounting controller for managing API interactions
import { accountingsController } from 'src/modules/accounting'

// Query client from React Query for managing server state
import { useQueryClient } from 'react-query'

// Custom error handling class
import { AppError } from 'src/shared/errors/AppError'

const schema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().email('E-mail inválido'),
  status: yup.string().required('Status obrigatório')
})

interface EditProps {
  openEdit: boolean
  handleEditClose: () => void
  data: IAccountingDTO
}

const Edit = ({ openEdit, handleEditClose, data }: EditProps) => {
  const queryClient = useQueryClient()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: data,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = async ({ name, email, status, id }: IAccountingDTO) => {
    try {
      await accountingsController.update({
        id,
        email,
        name,
        status
      })
      await queryClient.invalidateQueries(['accounting', data.id])
      await queryClient.invalidateQueries(['accountings'])
      toast.success('Contabilidade atualizada com sucesso!')
      handleEditClose()
    } catch (e) {
      e instanceof AppError && toast.error(e.message)
    }
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
        Editar Contabilidade
      </DialogTitle>
      <DialogContent
        sx={{
          pb: theme => `${theme.spacing(8)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
        }}
      >
        <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
          Edite as informações da contabilidade
        </DialogContentText>
        <form noValidate autoComplete='off'>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={4} md>
              <Controller
                name='name'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    autoFocus
                    label='Nome'
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
            <Grid item xs={12} sm={4}>
              <Controller
                name='email'
                control={control}
                rules={{ required: false }}
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
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name='status'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    label='Status'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.status)}
                    {...(errors.status && { helperText: errors.status.message })}
                  >
                    <MenuItem value='ACTIVE'>Ativo</MenuItem>
                    <MenuItem value='INACTIVE'>Inativo</MenuItem>
                  </CustomTextField>
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
