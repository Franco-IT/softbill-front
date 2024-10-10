// Material UI
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Grid,
  MenuItem
} from '@mui/material'

// React Hook Form
import { Controller, useForm } from 'react-hook-form'

// Validation Utilities
import { yupResolver } from '@hookform/resolvers/yup'

// React query
import { useQueryClient } from 'react-query'

// Schema
import { AddAccountingAccounts } from './schema'

// Custom Components
import CustomTextField from 'src/@core/components/mui/text-field'

// Next.js Router
import { useRouter } from 'next/router'

// DTOs and Controllers
import { ICreateAccountingAccountDTO } from 'src/modules/accountingAccounts/dtos/ICreateAccountingAccountDTO'
import { accountingAccountsController } from 'src/modules/accountingAccounts'

// Utilities
import { applyAccountNumberMask } from 'src/utils/inputs'
import { AppError } from 'src/shared/errors/AppError'

// Hooks
import useToast from 'src/hooks/useToast'

interface AddProps {
  open: boolean
  handleClose: () => void
}

const Add = ({ open, handleClose }: AddProps) => {
  const router = useRouter()
  const { toastSuccess, toastError } = useToast()
  const queryClient = useQueryClient()

  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm({
    defaultValues: {
      clientId: router.query.id as string,
      transactionType: '',
      number: '',
      description: ''
    } as ICreateAccountingAccountDTO,
    mode: 'onBlur',
    resolver: yupResolver(AddAccountingAccounts)
  })

  const onSubmit = async (data: ICreateAccountingAccountDTO) => {
    try {
      await accountingAccountsController.createAccountingAccount(data)
      await queryClient.invalidateQueries(['accounting-accounts-by-client'])
      toastSuccess('Conta contábil adicionada com sucesso!')
      handleClose()
    } catch (e) {
      e instanceof AppError && toastError(e.message)
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 1000 } }}>
      <DialogTitle
        id='user-view-edit'
        sx={{
          textAlign: 'center',
          fontSize: '1.5rem !important',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        Adicionar Contas Contábeis
      </DialogTitle>
      <DialogContent
        sx={{
          pb: theme => `${theme.spacing(8)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
        }}
      >
        <DialogContentText variant='body2' sx={{ textAlign: 'center', mb: 7 }}>
          Preencha os campos abaixo
        </DialogContentText>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='number'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    label='Conta Contábel'
                    placeholder='Ex: 2784623-7'
                    value={value}
                    onChange={e => onChange(applyAccountNumberMask(e.target.value))}
                    onBlur={onBlur}
                    error={Boolean(errors.number)}
                    {...(errors.number && { helperText: errors.number.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='transactionType'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    label='Tipo de Transação'
                    value={value || 'default'}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.transactionType)}
                    {...(errors.transactionType && { helperText: errors.transactionType.message })}
                  >
                    <MenuItem value='default' disabled>
                      Selecione
                    </MenuItem>
                    <MenuItem value='CREDIT'>Crédito</MenuItem>
                    <MenuItem value='DEBIT'>Débito</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='description'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    multiline
                    fullWidth
                    required
                    label='Descrição'
                    placeholder='Digite a descrição da transação'
                    error={Boolean(errors.description)}
                    {...(errors.description && { helperText: errors.description.message })}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              mt: 4
            }}
          >
            <Button variant='tonal' color='error' onClick={handleClose} sx={{ minWidth: 107 }}>
              Cancelar
            </Button>
            <Button type='submit' variant='contained' color='primary' sx={{ minWidth: 107 }}>
              Adicionar
            </Button>
          </Box>
        </form>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      ></DialogActions>
    </Dialog>
  )
}

export default Add
