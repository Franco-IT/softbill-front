// Material UI
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box } from '@mui/material'

// React Hook Form
import { Controller, useForm } from 'react-hook-form'

// Validation Utilities
import { yupResolver } from '@hookform/resolvers/yup'

// React query
import { useQueryClient } from 'react-query'

// Schema
import { FILE_TYPE_DOMINIO, FILE_TYPE_QUESTOR, ImportAccountingAccounts } from './schema'

// Next.js Router
import { useRouter } from 'next/router'

// Utilities
import { AppError } from 'src/shared/errors/AppError'

// Hooks
import useToast from 'src/hooks/useToast'
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import FileUploaderRestrictions from 'src/components/FileUploaderRestrictions'
import { api } from 'src/services/api'

interface ImportProps {
  importType: string
  open: boolean
  handleClose: () => void
}

const typeFile: { [key: string]: string } = {
  QUESTOR: 'csv',
  DOMINIO: 'txt'
}

const Import = ({ open, handleClose, importType }: ImportProps) => {
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

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData()

      formData.append('clientId', data.clientId)
      formData.append('file', data.files[0])
      formData.append('importedFrom', importType)

      await api.post('clientAccountingAccounts/import-accounts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

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
          Importe o arquivo tipo {typeFile[importType]} com as contas contábeis
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
                  accept={importType === 'QUESTOR' ? FILE_TYPE_QUESTOR : FILE_TYPE_DOMINIO}
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
