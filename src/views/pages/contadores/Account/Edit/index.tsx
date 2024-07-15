import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Grid,
  InputAdornment,
  MenuItem,
  DialogActions,
  Button
} from '@mui/material'

import CustomTextField from 'src/@core/components/mui/text-field'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { UserProps } from 'src/types/users'
import toast from 'react-hot-toast'
import { updateCounterSchema } from 'src/services/yup/schemas/counters/updateCounterSchema'
import { userController } from 'src/modules/users'
import { AppError } from 'src/shared/errors/AppError'

interface EditProps {
  openEdit: boolean
  handleEditClose: () => void
  data: UserProps
  refresh: boolean
  setRefresh: (value: boolean) => void
}

interface FormData {
  name: string
  email: string
  status: 'ACTIVE' | 'INACTIVE'
}

const Edit = ({ openEdit, handleEditClose, data, refresh, setRefresh }: EditProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: data,
    mode: 'onBlur',
    resolver: yupResolver(updateCounterSchema)
  })

  const onSubmit = ({ name, email, status }: FormData) => {
    userController
      .updateCounter({
        id: data._id,
        name,
        email,
        status
      })
      .then(
        response =>
          response?.status === 200 && (setRefresh(!refresh), toast.success('Contador atualizado com sucesso!'))
      )
      .catch(error => error instanceof AppError && toast.error(error.message))
      .finally(handleEditClose)
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
        Editar Contador
      </DialogTitle>
      <DialogContent
        sx={{
          pb: theme => `${theme.spacing(8)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
        }}
      >
        <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
          Edite as informações do Contador
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
                    InputProps={{ startAdornment: <InputAdornment position='start'>@</InputAdornment> }}
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
