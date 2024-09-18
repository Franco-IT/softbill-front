// Material UI Imports
import { Card, CardHeader, Typography, CardActions, Grid, Button, Box, CardContent } from '@mui/material'

// Notifications
import toast from 'react-hot-toast'

// Custom Components
import IconifyIcon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'

// Services
import { api } from 'src/services/api'

interface ExportOnDashboardProps {
  monthlyFinancialCloseId: string
}

const ExportOnDashboard = ({ monthlyFinancialCloseId }: ExportOnDashboardProps) => {
  const handleGenerateExport = (id: string) => {
    api
      .get('/monthlyFinancialCloses/export/' + id)
      .then(response => window.open(response.data))
      .catch(() => toast.error('Erro ao baixar o arquivo, tente novamente mais tarde.'))
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
              onClick={() => handleGenerateExport(monthlyFinancialCloseId)}
            >
              Baixar Arquivo
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  )
}

export default ExportOnDashboard
