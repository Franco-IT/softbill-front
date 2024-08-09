import { Box, Card, CardActions, CardContent, CardHeader, MenuItem, Typography } from '@mui/material'
import GlowIcon from '../GlowIcon'
import React from 'react'
import CustomChip from 'src/@core/components/mui/chip'
import { statusColorsMUI } from '../../utils'
import CustomTextField from 'src/@core/components/mui/text-field'
import { StatusValue } from '../../types'

const Validation = () => {
  const [status, setStatus] = React.useState<any>('PENDING')

  const statusValuesText: any = {
    PENDING: 'Pendente',
    APPROVED: 'Aprovado',
    REJECTED: 'Rejeitado'
  }

  const handleStatus = (status: StatusValue) => {
    setStatus(status)
  }

  return (
    <Card>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant='h5'>Validação</Typography>
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
        <CustomTextField
          select
          fullWidth
          label='Status'
          placeholder='Selecione Status'
          value={status || 'default'}
          onChange={e => handleStatus(e.target.value as StatusValue)}
          color={statusColorsMUI[status]}
          focused={!!statusColorsMUI[status]}
        >
          <MenuItem disabled value='default'>
            <em>selecione</em>
          </MenuItem>
          <MenuItem value='PENDING'>Pendente</MenuItem>
          <MenuItem value='APPROVED'>Aprovado</MenuItem>
          <MenuItem value='REJECTED'>Rejeitado</MenuItem>
        </CustomTextField>
      </CardActions>
    </Card>
  )
}

export default Validation
