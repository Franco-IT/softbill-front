import { Card, CardHeader, IconButton, Typography, Box, CardContent, CardActions, Grid, Button } from '@mui/material'
import IconifyIcon from 'src/@core/components/icon'
import GlowIcon from '../GlowIcon'
import CustomChip from 'src/@core/components/mui/chip'
import { statusColorsMUI } from '../../utils'
import { useDrawer } from 'src/hooks/useDrawer'
import useToast from 'src/hooks/useToast'

const Conciliation = () => {
  const { toastPromise } = useToast()
  const { anchor, toggleDrawer } = useDrawer()

  const status: any = 'PENDING'

  const statusValuesText: any = {
    PENDING: 'Pendente',
    APPROVED: 'Aprovado',
    REJECTED: 'Rejeitado'
  }

  const statusValues: any = {
    PENDING: true,
    APPROVED: false
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
            <Typography variant='h5'>Conciliação</Typography>
            <GlowIcon status={status} />
          </Box>
        }
        action={
          <IconButton disabled={statusValues[status]}>
            <IconifyIcon icon='tabler:file-download' fontSize='1.7rem' color='primary' />
          </IconButton>
        }
      />
      <CardContent>
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
      </CardContent>
      <CardActions>
        <Grid container spacing={5}>
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
              disabled={status === 'APPROVED'}
              startIcon={<IconifyIcon icon='tabler:edit' fontSize='1.7rem' />}
            >
              Editar
            </Button>
          </Grid>
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
        </Grid>
      </CardActions>
    </Card>
  )
}

export default Conciliation
