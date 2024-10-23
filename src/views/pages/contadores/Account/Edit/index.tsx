// Material UI Components
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

// Custom Components
import CustomTextField from 'src/@core/components/mui/text-field'

// React Hook Form and Yup Resolver
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// Notifications and Error Handling
import toast from 'react-hot-toast'
import { AppError } from 'src/shared/errors/AppError'

// Validation Schema
import { updateCounterSchema } from 'src/services/yup/schemas/counters/updateCounterSchema'

// React Query and Controllers
import { useQueryClient } from 'react-query'
import { accountantsController } from 'src/modules/accountant'

// DTOs
import { IAccountantDTO } from 'src/modules/accountant/dtos/IAccountantDTO'

interface EditProps {
  openEdit: boolean
  handleEditClose: () => void
  data: IAccountantDTO
}

interface FormData {
  name: string
  email: string
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED'
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
    resolver: yupResolver(updateCounterSchema)
  })

  const onSubmit = async ({ name, email, status }: FormData) => {
    try {
      await accountantsController.update({
        id: data.id,
        name,
        email,
        status
      })
      await queryClient.invalidateQueries(['accountant', data.id])
      await queryClient.invalidateQueries(['accountants'])
      toast.success('Contador atualizado com sucesso!')
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
