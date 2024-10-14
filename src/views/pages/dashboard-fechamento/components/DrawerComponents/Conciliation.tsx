// Material UI Imports
import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material'

// Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import GlowIcon from 'src/components/GlowIcon'
import IconifyIcon from 'src/@core/components/icon'

// Hooks
import { useAppDispatch } from 'src/hooks/useAppDispatch'
import { useAppSelector } from 'src/hooks/useAppSelector'
import { useDrawer } from 'src/hooks/useDrawer'
import { useQueryClient } from 'react-query'
import useToast from 'src/hooks/useToast'

// Store
import { setShowConciliations, setShowStatements } from 'src/store/modules/closing/reducer'

// Types
import { ColorType } from '../../types'

// Controllers
import { financialCloseController } from 'src/modules/financialClose'

const Conciliation = () => {
  const { toastPromise } = useToast()
  const queryClient = useQueryClient()
  const { anchor, toggleDrawer } = useDrawer()

  const dispatch = useAppDispatch()
  const monthlyFinancialClose = useAppSelector(state => state.ClosingReducer.monthlyFinancialClose) as any
  const monthlyFinancialCloseId = monthlyFinancialClose.monthlyFinancialCloseId
  const status = monthlyFinancialClose.monthlyFinancialCloseBank.subStatus
  const showConcilations = useAppSelector(state => state.ClosingReducer.showConciliations)

  const statusValuesText: any = {
    PENDING: 'Pendente',
    PROCESSING: 'Processando',
    DONE: 'Aprovado',
    TRANSACTION_UNTRACKED: 'Conciliações Pendentes',
    WAITING_VALIDATION: 'Aguardando Validação'
  }

  const statusColorsMUI: { [key: string]: ColorType } = {
    DONE: 'success',
    PENDING: 'error',
    PROCESSING: 'error',
    PROCESSED: 'success',
    TRANSACTION_UNTRACKED: 'warning',
    WAITING_VALIDATION: 'warning'
  }

  const statusValuesBoolean: any = {
    PENDING: true,
    PROCESSING: true,
    TRANSACTION_UNTRACKED: false,
    WAITING_VALIDATION: false,
    DONE: false
  }

  const handleRequestConciliation = (e: React.KeyboardEvent | React.MouseEvent) => {
    const myPromise = financialCloseController
      .requestConciliation({ monthlyFinancialCloseId })
      .then(() => toggleDrawer(anchor, false, null)(e))

    toastPromise(
      myPromise,
      'Enviando lembrete...',
      'Lembrete enviado com sucesso!',
      'Erro ao enviar lembrete, tente novamente mais tarde.'
    )
  }

  const handleGenerateConciliations = (e: React.KeyboardEvent | React.MouseEvent) => {
    showConcilations ? queryClient.invalidateQueries(['conciliations']) : dispatch(setShowConciliations(true))
    dispatch(setShowStatements(false))
    toggleDrawer(anchor, false, null)(e)
  }

  const handleCheckStatusColor = (status: string) => {
    const statusValues: any = {
      PENDING: 'REJECTED',
      PROCESSING: 'REJECTED',
      PROCESSED: 'DONE',
      TRANSACTION_UNTRACKED: 'PENDING',
      WAITING_VALIDATION: 'PENDING',
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
              onClick={e => handleRequestConciliation(e)}
              disabled={status !== 'TRANSACTION_UNTRACKED'}
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
