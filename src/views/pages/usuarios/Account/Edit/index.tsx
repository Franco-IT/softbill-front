// Material UI components for dialogs and layout
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

// Validation library for schema validation
import * as yup from 'yup'

// React Hook Form for form handling
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// Toast notifications for user feedback
import toast from 'react-hot-toast'

// User Data Transfer Objects (DTOs) for type safety
import { IUserDTO } from 'src/modules/users/dtos/IUserDTO'
import { IUpdateUserDTO } from 'src/modules/users/dtos/IUpdateUserDTO'

// React Query for data fetching and caching
import { useQueryClient } from 'react-query'

// User controller for handling user-related API calls
import { userController } from 'src/modules/users'

// Error handling class for managing application errors
import { AppError } from 'src/shared/errors/AppError'

const schema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().email('E-mail inválido'),
  status: yup.string().required('Status obrigatório')
})

interface EditProps {
  openEdit: boolean
  handleEditClose: () => void
  data: IUserDTO
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

  const onSubmit = async ({ name, email, status, id }: IUpdateUserDTO) => {
    try {
      await userController.update({ name, email, status, id })
      await queryClient.invalidateQueries(['users'])
      await queryClient.invalidateQueries(['user', id])
      toast.success('Usuário atualizado com sucesso!')
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
        Editar Usuário
      </DialogTitle>
      <DialogContent
        sx={{
          pb: theme => `${theme.spacing(8)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
        }}
      >
        <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
          Edite as informações do usuário
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
