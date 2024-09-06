import { Card, CardHeader, Typography, Box, CardContent, CardActions, Grid, Button, Divider } from '@mui/material'
import IconifyIcon from 'src/@core/components/icon'
import GlowIcon from 'src/components/GlowIcon'
import CustomChip from 'src/@core/components/mui/chip'
import { useDrawer } from 'src/hooks/useDrawer'
import useToast from 'src/hooks/useToast'
import { useAppDispatch } from 'src/hooks/useAppDispatch'
import { setShowConciliations, setShowStatements } from 'src/store/modules/closing/reducer'
import { useAppSelector } from 'src/hooks/useAppSelector'
import { ColorType } from '../../types'

const Conciliation = () => {
  const { toastPromise } = useToast()
  const { anchor, toggleDrawer } = useDrawer()

  const dispatch = useAppDispatch()
  const monthlyFinancialClose = useAppSelector(state => state.ClosingReducer.monthlyFinancialClose) as any

  const status = monthlyFinancialClose.monthlyFinancialCloseBank.subStatus

  const statusValuesText: any = {
    PENDING: 'Pendente',
    PROCESSING: 'Processando',
    DONE: 'Aprovado',
    TRANSACTION_UNTRACKED: 'Transações Pendentes'
  }

  const statusColorsMUI: { [key: string]: ColorType } = {
    DONE: 'success',
    PENDING: 'error',
    PROCESSING: 'error',
    TRANSACTION_UNTRACKED: 'warning'
  }

  const statusValuesBoolean: any = {
    PENDING: true,
    PROCESSING: true,
    TRANSACTION_UNTRACKED: false,
    WAITING_VALIDATION: false,
    DONE: false
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

  const handleGenerateConciliations = (e: React.KeyboardEvent | React.MouseEvent) => {
    dispatch(setShowConciliations(true))
    dispatch(setShowStatements(false))
    toggleDrawer(anchor, false, null)(e)
  }

  const handleCheckStatusColor = (status: string) => {
    const statusValues: any = {
      PENDING: 'REJECTED',
      PROCESSING: 'REJECTED',
      TRANSACTION_UNTRACKED: 'PENDING',
      WAITING_VALIDATION: 'DONE',
      DONE: 'DONE'
    }

    return statusValues[status]
  }

  return (
    <Card>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant='h5'>Conciliação</Typography>
            <GlowIcon status={handleCheckStatusColor(status)} />
          </Box>
        }
      />
      <Divider />
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Status:</Typography>
          <CustomChip
            rounded
            skin='light'
            size='small'
            label={statusValuesText[status] || 'Aprovado'}
            color={statusColorsMUI[status]}
          />
        </Box>
      </CardContent>
      <CardActions>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              startIcon={<IconifyIcon icon='tabler:eye' fontSize='1.7rem' />}
              disabled={statusValuesBoolean[status]}
              onClick={e => handleGenerateConciliations(e)}
            >
              Visualizar
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant='outlined'
              color='primary'
              startIcon={<IconifyIcon icon='tabler:alert-circle' fontSize='1.7rem' />}
              onClick={e => handleSendReminder(e)}
              disabled={statusValuesBoolean[status]}
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
