import { Box, Button, Card, CardActions, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material'
import { useState } from 'react'
import IconifyIcon from 'src/@core/components/icon'
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import FileUploaderRestrictions from 'src/components/FileUploaderRestrictions'
import CustomChip from 'src/@core/components/mui/chip'
import { dateProvider } from 'src/shared/providers'
import { useDrawer } from 'src/hooks/useDrawer'
import useToast from 'src/hooks/useToast'
import { statusColorsMUI } from '../../utils'
import GlowIcon from 'src/components/GlowIcon'

interface ExtractProps {
  status: string
  method: string
  receivedAt: Date
}

const Extract = ({ status, method, receivedAt }: ExtractProps) => {
  const { formatDate } = dateProvider
  
  const { toastPromise } = useToast()
  const { anchor, toggleDrawer } = useDrawer()

  const statusValues: any = {
    PENDING: true,
    DONE: false
  }

  const statusValuesText: any = {
    PENDING: 'Pendente',
    DONE: 'Aprovado'
  }

  const statusValuesExtract: any = {
    PENDING: 'Não Integrado',
    DONE: formatDate(receivedAt)
  }

  const statusValuesExtractOFX: any = {
    PENDING: 'Não Recebido',
    DONE: formatDate(receivedAt)
  }

  const [files, setFiles] = useState<any>([])

  const handleGetExtract = (e: React.KeyboardEvent | React.MouseEvent) => {
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

    toastPromise(myPromise, 'Buscando extrato...', 'Busca realizada com sucesso', 'Erro ao buscar extrato')
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

  return (
    <Card>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant='h5'>Extrato</Typography>
            <GlowIcon status={status as any} />
          </Box>
        }
        action={
          <IconButton disabled={statusValues[status]}>
            <IconifyIcon icon='tabler:file-download' fontSize='1.7rem' color='primary' />
          </IconButton>
        }
      />
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
            label={statusValuesText[status]}
            color={statusColorsMUI[status]}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
            {method === 'OFX' ? 'Recebido em' : 'Integrado em'}:
          </Typography>
          <CustomChip
            rounded
            skin='light'
            size='small'
            label={method === 'OFX' ? statusValuesExtractOFX[status] : statusValuesExtract[status]}
            color={status === 'DONE' ? 'primary' : 'secondary'}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Método:</Typography>
          <CustomChip rounded skin='light' size='small' label={method} color='primary' />
        </Box>
      </CardContent>
      <CardActions>
        <Grid container spacing={5}>
          {method === 'OFX' ? (
            <>
              <Grid item xs={12} md={6}>
                <Button
                  fullWidth
                  variant='contained'
                  color='primary'
                  disabled={statusValues[status]}
                  startIcon={<IconifyIcon icon='tabler:eye' fontSize='1.7rem' />}
                >
                  Visualizar
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  fullWidth
                  variant='contained'
                  color='primary'
                  disabled={statusValues[status]}
                  startIcon={<IconifyIcon icon='tabler:trash' fontSize='1.7rem' />}
                >
                  Deletar
                </Button>
              </Grid>
              {method === 'OFX' && status !== 'DONE' && (
                <>
                  <Grid item xs={12}>
                    <DropzoneWrapper>
                      <FileUploaderRestrictions
                        accept={{
                          'application/ofx': ['.ofx']
                        }}
                        onChange={(files: File[]) => setFiles(files)}
                        value={files}
                        inputProps={{
                          name: 'file'
                        }}
                        onError={false}
                        error='Erro'
                      />
                    </DropzoneWrapper>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant='contained'
                      color='primary'
                      startIcon={<IconifyIcon icon='tabler:upload' fontSize='1.7rem' />}
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
                onClick={e => handleGetExtract(e)}
                startIcon={<IconifyIcon icon='tabler:search' fontSize='1.7rem' />}
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
