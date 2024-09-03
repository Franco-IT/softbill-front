import { Card, CardHeader, Typography, CardActions, Grid, Button, Box, CardContent } from '@mui/material'
import IconifyIcon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'

const Export = () => {
  const status: any = 'APPROVED'

  const statusValues: any = {
    PENDING: true,
    APPROVED: false
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
              disabled={statusValues[status]}
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
            >
              Exportar
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  )
}

export default Export
