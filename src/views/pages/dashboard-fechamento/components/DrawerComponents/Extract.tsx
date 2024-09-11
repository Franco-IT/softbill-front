import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Typography
} from '@mui/material'
import IconifyIcon from 'src/@core/components/icon'
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import FileUploaderRestrictions from 'src/components/FileUploaderRestrictions'
import CustomChip from 'src/@core/components/mui/chip'
import { dateProvider } from 'src/shared/providers'
import { useDrawer } from 'src/hooks/useDrawer'
import useToast from 'src/hooks/useToast'
import { statusColorsMUI, typesIntegration } from '../../utils'
import GlowIcon from 'src/components/GlowIcon'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { api } from 'src/services/api'
import toast from 'react-hot-toast'
import { useQueryClient } from 'react-query'
import { useAppSelector } from 'src/hooks/useAppSelector'
import { useAppDispatch } from 'src/hooks/useAppDispatch'
import { setShowConciliations, setShowStatements } from 'src/store/modules/closing/reducer'

const FILE_TYPES: { [key: string]: string[] } = {
  'application/ofx': ['.ofx']
}

const fileSchema = yup.object().shape({
  file: yup
    .array()
    .of(
      yup
        .mixed<File>()
        .required('Arquivo obrigatório')
        .test('fileSize', 'O arquivo deve ter menos de 2MB', value => !value || value.size <= 2 * 1024 * 1024)
        .test('fileType', 'Tipo de arquivo não permitido', value => {
          const isValidFileType = (file: File): boolean => {
            if (!file) return false

            const allowedExtensions = FILE_TYPES[file.type || 'application/ofx']
            if (!allowedExtensions) return false

            const fileExtension = file.name.split('.').pop()

            return fileExtension ? allowedExtensions.includes(`.${fileExtension}`) : false
          }

          return isValidFileType(value)
        })
    )
    .min(1, 'É necessário adicionar um arquivo')
    .max(1, 'É permitido adicionar apenas um arquivo')
})

const Extract = () => {
  const { formatDate } = dateProvider

  const queryClient = useQueryClient()

  const { toastPromise } = useToast()
  const { anchor, toggleDrawer } = useDrawer()

  const dispatch = useAppDispatch()
  const monthlyFinancialClose = useAppSelector(state => state.ClosingReducer.monthlyFinancialClose) as any

  const status = monthlyFinancialClose.monthlyFinancialCloseBank.subStatus
  const method = monthlyFinancialClose.monthlyFinancialCloseBank.bankAccount.generatedBy
  const receivedAt = new Date(monthlyFinancialClose.monthlyFinancialCloseBank.referenceDate)
  const importedFileId = monthlyFinancialClose.monthlyFinancialCloseBank.importedFileId

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      file: []
    },
    resolver: yupResolver(fileSchema)
  })

  const statusValues: any = {
    PENDING: true
  }

  const statusValuesTextForMethod: { [key: string]: { [key: string]: string } } = {
    IMPORT: {
      PENDING: 'Não Recebido',
      DONE: 'Recebido'
    },
    API: {
      PENDING: 'Não Integrado',
      DONE: 'Integrado'
    }
  }

  const statusValuesExtract: any = {
    PENDING: 'Não Integrado',
    DONE: formatDate(receivedAt)
  }

  const statusValuesExtractOFX: any = {
    PENDING: 'Não Recebido',
    DONE: formatDate(receivedAt)
  }

  const handleSendReminder = (e: React.KeyboardEvent | React.MouseEvent) => {
    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.5) {
          resolve('foo')

          toggleDrawer(anchor, false, null)(e)
        } else {
          reject('fox')
        }
      }, 1000)
    })

    toastPromise(myPromise, 'Enviando lembrete...', 'Lembrete enviado com sucesso', 'Erro ao enviar lembrete')
  }

  const handleDownloadImportedFile = (fileId: string) => {
    api
      .get('/files/download-file/' + fileId)
      .then(response => window.open(response.data))
      .catch(() => toast.error('Erro ao baixar o arquivo, tente novamente mais tarde'))
  }

  const handleDeleteImportedFile = (fileId: string) => {
    api
      .delete('/files/' + fileId)
      .then(() => queryClient.invalidateQueries(['financial-closing']))
      .catch(() => toast.error('Erro ao baixar o arquivo, tente novamente mais tarde'))
  }

  const handleGenerateExtract = (e: React.KeyboardEvent | React.MouseEvent) => {
    dispatch(setShowStatements(true))
    dispatch(setShowConciliations(false))
    toggleDrawer(anchor, false, null)(e)
  }

  const onSubmit = (data: any, e: any) => {
    const dataKeys = Object.keys(data)

    const formData = new FormData()

    dataKeys.map(key => {
      if (data[key]) data[key].map((file: any) => formData.append(key, file))
    })

    api
      .post('/monthlyFinancialCloseBanks/bank-monthly-financial-close', formData, {
        params: {
          clientId: monthlyFinancialClose.clientId
        },
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        if (response.status === 200) {
          queryClient.invalidateQueries(['financial-closing'])
          toast.success('Arquivo enviado com sucesso!')
          toggleDrawer(anchor, false, null)(e)
        }
      })
      .catch(() => {
        toast.error('Erro ao enviar, tente novamente mais tarde')
      })
  }

  const handleCheckStatus = (status: string) => {
    if (statusValuesTextForMethod[method][status]) return statusValuesTextForMethod[method][status]

    return statusValuesTextForMethod[method] && method == 'IMPORT' ? 'Recebido' : 'Integrado'
  }

  const handleCheckStatusColor = (status: string) => {
    if (status === 'PENDING') return 'REJECTED'

    return 'DONE'
  }

  return (
    <Card>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant='h5'>Extrato</Typography>
            <GlowIcon status={handleCheckStatusColor(status)} />
          </Box>
        }
        action={
          method === 'IMPORT' && (
            <IconButton
              disabled={statusValues[status] || false}
              onClick={() => handleDownloadImportedFile(importedFileId as string)}
            >
              <IconifyIcon icon='tabler:file-download' fontSize='1.7rem' color='primary' />
            </IconButton>
          )
        }
      />
      <Divider />
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Status:</Typography>
          <CustomChip
            rounded
            skin='light'
            size='small'
            label={handleCheckStatus(status)}
            color={statusColorsMUI[handleCheckStatusColor(status)] || 'success'}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
            {typesIntegration[method] === 'IMPORT' ? 'Recebido em' : 'Integrado em'}:
          </Typography>
          <CustomChip
            rounded
            skin='light'
            size='small'
            label={
              typesIntegration[method] === 'IMPORT'
                ? statusValuesExtractOFX[status] || formatDate(receivedAt)
                : statusValuesExtract[status] || formatDate(receivedAt)
            }
            color={statusColorsMUI[handleCheckStatusColor(status)]}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Método:</Typography>
          <CustomChip rounded skin='light' size='small' label={typesIntegration[method]} color='primary' />
        </Box>
      </CardContent>
      <CardActions>
        <Grid container spacing={5}>
          {method === 'IMPORT' ? (
            <>
              <Grid item xs={12} md={6}>
                <Button
                  fullWidth
                  variant='contained'
                  color='primary'
                  disabled={statusValues[status] || false}
                  startIcon={<IconifyIcon icon='tabler:eye' fontSize='1.7rem' />}
                  onClick={e => handleGenerateExtract(e)}
                >
                  Visualizar
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  fullWidth
                  variant='contained'
                  color='primary'
                  disabled={statusValues[status] || false}
                  startIcon={<IconifyIcon icon='tabler:trash' fontSize='1.7rem' />}
                  onClick={() => handleDeleteImportedFile(importedFileId as string)}
                >
                  Deletar
                </Button>
              </Grid>
              {method === 'IMPORT' && status === 'PENDING' && (
                <>
                  <Grid item xs={12}>
                    <Controller
                      name='file'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <DropzoneWrapper
                          style={{
                            border: !!errors.file ? '1px solid #ea5455' : 'none'
                          }}
                        >
                          <FileUploaderRestrictions
                            accept={{
                              'application/ofx': ['.ofx']
                            }}
                            onChange={onChange}
                            value={value}
                            inputProps={{
                              name: 'file',
                              multiple: true
                            }}
                            onError={!!errors.file}
                            error={errors.file?.message}
                          />
                        </DropzoneWrapper>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant='contained'
                      color='primary'
                      startIcon={<IconifyIcon icon='tabler:upload' fontSize='1.7rem' />}
                      onClick={handleSubmit(onSubmit)}
                    >
                      Enviar
                    </Button>
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant='outlined'
                  color='primary'
                  startIcon={<IconifyIcon icon='tabler:alert-circle' fontSize='1.7rem' />}
                  onClick={e => handleSendReminder(e)}
                  disabled={!statusValues[status] || false}
                >
                  Enviar Lembrete Para o Cliente
                </Button>
              </Grid>
            </>
          ) : (
            <Grid item xs={12}>
              <Button
                fullWidth
                variant='contained'
                color='primary'
                startIcon={<IconifyIcon icon='tabler:file-search' fontSize='1.7rem' />}
                onClick={e => handleGenerateExtract(e)}
              >
                Buscar Extrato
              </Button>
            </Grid>
          )}
        </Grid>
      </CardActions>
    </Card>
  )
}

export default Extract
