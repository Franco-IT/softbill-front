// Material UI
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box } from '@mui/material'

// React Hook Form
import { Controller, useForm } from 'react-hook-form'

// Validation Utilities
import { yupResolver } from '@hookform/resolvers/yup'

// React query
import { useQueryClient } from 'react-query'

// Schema
import { FILE_TYPES, ImportAccountingAccounts } from './schema'

// Next.js Router
import { useRouter } from 'next/router'

// DTOs and Controllers
import { clientsController } from 'src/modules/clients'

// Utilities
import { AppError } from 'src/shared/errors/AppError'

// Hooks
import useToast from 'src/hooks/useToast'
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import FileUploaderRestrictions from 'src/components/FileUploaderRestrictions'

interface ImportProps {
  open: boolean
  handleClose: () => void
}

const Import = ({ open, handleClose }: ImportProps) => {
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
      files: []
    },
    mode: 'onBlur',
    resolver: yupResolver(ImportAccountingAccounts)
  })

  //TODO: Refactor for import method
  const onSubmit = async (data: any) => {
    try {
      await clientsController.createAccountingAccount(data)
      await queryClient.invalidateQueries(['accounting-accounts-by-client'])
      toastSuccess('Contas contábeis adicionadas com sucesso!')
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
        Adicionar Contas Contábeis via Importação
      </DialogTitle>
      <DialogContent
        sx={{
          pb: theme => `${theme.spacing(8)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
        }}
      >
        <DialogContentText variant='body2' sx={{ textAlign: 'center', mb: 7 }}>
          Importe o arquivo tipo PDF
        </DialogContentText>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <DropzoneWrapper
            sx={{
              width: '100%',
              border: theme => (!!errors.files ? `1px solid ${theme.palette.error.main}` : 'none')
            }}
          >
            <Controller
              name='files'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <FileUploaderRestrictions
                  accept={FILE_TYPES}
                  error={errors?.files?.message || errors?.files?.[0]?.message || ''}
                  onChange={onChange}
                  value={value}
                  onError={!!errors.files}
                  inputProps={{
                    name: 'file',
                    maxSize: '5 MB'
                  }}
                />
              )}
            />
          </DropzoneWrapper>
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

export default Import
