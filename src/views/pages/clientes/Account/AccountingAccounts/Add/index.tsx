// Material UI
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box } from '@mui/material'

// React Hook Form
import { FormProvider, useForm } from 'react-hook-form'

// Validation Utilities
import { yupResolver } from '@hookform/resolvers/yup'

// Services and Notifications
import { api } from 'src/services/api'
import toast from 'react-hot-toast'
import { useQueryClient } from 'react-query'
import { AddAccountingAccounts } from './schema'

interface AddProps {
  open: boolean
  handleClose: () => void
}

const Add = ({ open, handleClose }: AddProps) => {
  const queryClient = useQueryClient()

  const methods = useForm({
    defaultValues: {},
    resolver: yupResolver(AddAccountingAccounts as any)
  })

  const onSubmit = (form: any) => {
    const formData = new FormData()

    const dataKeys = Object.keys(form)

    const schemaKeys = ['bankId', 'agency', 'account', 'accountType', 'accountStatus']

    for (const key of schemaKeys) {
      if (dataKeys.includes(key)) formData.append(key, form[key])
    }

    api
      .put('/bankAccounts/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        if (response.status === 200) {
          toast.success('Dados atualizados com sucesso!')
          queryClient.invalidateQueries(['bank-accounts'])
          handleClose()
        }
      })
      .catch(() => {
        toast.error('Erro ao vincular banco, tente novamente mais tarde')
      })
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
          Preencha os campos abaixo ou import o arquivo CSV
        </DialogContentText>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <h2>Teste</h2>
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
        </FormProvider>
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
