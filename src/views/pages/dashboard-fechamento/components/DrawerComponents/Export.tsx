import { Card, CardHeader, Typography, CardActions, Grid, Button, Box, CardContent } from '@mui/material'
import toast from 'react-hot-toast'
import IconifyIcon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'
import { useAppSelector } from 'src/hooks/useAppSelector'
import { financialCloseController } from 'src/modules/financialClose'
import { api } from 'src/services/api'
import { AppError } from 'src/shared/errors/AppError'

const Export = () => {
  const monthlyFinancialClose = useAppSelector(state => state.ClosingReducer.monthlyFinancialClose) as any
  const { monthlyFinancialCloseBank } = monthlyFinancialClose

  const { extractFileId } = monthlyFinancialCloseBank

  const handleExport = (fileId: string) => {
    financialCloseController
      .exportFile({ fileId })
      .then(response => window.open(response.data))
      .catch(error => error instanceof AppError && toast.error(error.message))
  }

  const handleGenerateExport = (id: string) => {
    api
      .get('/monthlyFinancialCloseBanks/export/' + id)
      .then(response => window.open(response.data))
      .catch(() => toast.error('Erro ao gerar o arquivo, tente novamente mais tarde'))
  }

  const handleCheckAction = (extractFileId: string, id: string) => {
    if (extractFileId) {
      handleExport(extractFileId)
    } else {
      handleGenerateExport(id)
    }
  }

  return (
    <Card>
      <CardHeader title={<Typography variant='h5'>Exportação</Typography>} />
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Modelo:</Typography>
          <CustomChip rounded skin='light' size='small' label='Padrão' color='primary' />
        </Box>
      </CardContent>
      <CardActions>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              disabled
              startIcon={<IconifyIcon icon='tabler:eye' fontSize='1.7rem' />}
            >
              Visualizar
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              startIcon={<IconifyIcon icon='tabler:file-download' fontSize='1.7rem' />}
              onClick={() => handleCheckAction(extractFileId, monthlyFinancialCloseBank.monthlyFinancialCloseBankId)}
            >
              {extractFileId ? 'Baixar' : 'Gerar'} Arquivo
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  )
}

export default Export
