import { Box, Button, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material'

import IconifyIcon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'
import CustomTextField from 'src/@core/components/mui/text-field'

import GlowIcon from 'src/components/GlowIcon'

const Conciliation = (props: any) => {
  const { onSubmit, handleCancel, type, cc, cd, description, value } = props.item

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

  const typeValues: any = {
    CREDIT: 'Crédito',
    DEBIT: 'Débito'
  }

  const typeColors: any = {
    CREDIT: 'success',
    DEBIT: 'error'
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
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Tipo:</Typography>
          <CustomChip rounded skin='light' size='small' label={typeValues[type]} color={typeColors[type]} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Valor:</Typography>
          <CustomChip rounded skin='light' size='small' label={value} color={typeColors[type]} />
        </Box>
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
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Descrição:</Typography>
          <CustomChip rounded skin='light' size='small' label={description} color='primary' />
        </Box>
      </CardContent>
      <CardActions>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            {type === 'DEBIT' ? (
              <CustomTextField fullWidth required label='Conta Crédito' placeholder='Ex: 12345678' value={cc} />
            ) : (
              <CustomTextField fullWidth required label='Conta Débito' placeholder='Ex: 12345678' value={cd} />
            )}
          </Grid>
          <Grid item xs={12}>
            <CustomTextField multiline fullWidth required label='Origem' placeholder='Digite a origem da transação' />
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
              startIcon={<IconifyIcon icon='tabler:input-check' fontSize='1.7rem' />}
              onClick={onSubmit}
            >
              Salvar
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  )
}

export default Conciliation
