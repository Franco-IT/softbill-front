import { Box, Button, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material'

import IconifyIcon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'
import CustomTextField from 'src/@core/components/mui/text-field'

import GlowIcon from 'src/components/GlowIcon'

const Conciliation = (props: any) => {
  const { onSubmit, handleCancel } = props
  const status: any = 'PENDING'

  const statusValuesText: any = {
    PENDING: 'Pendente',
    APPROVED: 'Aprovado',
    REJECTED: 'Rejeitado'
  }

  const statusColorsMUI: any = {
    ALL: undefined,
    APPROVED: 'success',
    REJECTED: 'error',
    PENDING: 'warning'
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
          <Grid item xs={12}>
            <CustomTextField multiline fullWidth required label='Conciliação' placeholder='Valor da Conciliação' />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              disabled={status === 'APPROVED'}
              startIcon={<IconifyIcon icon='tabler:x' fontSize='1.7rem' />}
              onClick={handleCancel}
            >
              Cancelar
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              startIcon={<IconifyIcon icon='tabler:send' fontSize='1.7rem' />}
              onClick={onSubmit}
            >
              Atualizar
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  )
}

export default Conciliation
