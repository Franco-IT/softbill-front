import { Box, Card, CardActions, CardContent, CardHeader, MenuItem, Typography } from '@mui/material'
import GlowIcon from 'src/components/GlowIcon'
import React from 'react'
import CustomChip from 'src/@core/components/mui/chip'
import { statusColorsMUI } from '../../utils'
import CustomTextField from 'src/@core/components/mui/text-field'
import { useAppSelector } from 'src/hooks/useAppSelector'

const Validation = () => {
  const monthlyFinancialClose = useAppSelector(state => state.ClosingReducer.monthlyFinancialClose) as any

  const status = monthlyFinancialClose.monthlyFinancialCloseBank.status

  const statusValuesText: any = {
    PENDING: 'Pendente',
    REJECTED: 'Pendente',
    DONE: 'Aprovado'
  }

  const handleCheckStatus = (status: string) => {
    if (status === 'PENDING') return 'REJECTED'

    if (status === 'DONE') return 'DONE'

    return 'PENDING'
  }

  return (
    <Card>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant='h5'>Validação</Typography>
            <GlowIcon status={handleCheckStatus(status)} />
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
            label={statusValuesText[handleCheckStatus(status)]}
            color={statusColorsMUI[handleCheckStatus(status)]}
          />
        </Box>
      </CardContent>
      <CardActions>
        <CustomTextField
          select
          fullWidth
          label='Status'
          placeholder='Selecione Status'
          disabled
          value={status || 'default'}
          color={statusColorsMUI[handleCheckStatus(status)]}
          focused={!!statusColorsMUI[handleCheckStatus(status)]}
        >
          <MenuItem disabled value='default'>
            <em>selecione</em>
          </MenuItem>
          <MenuItem value='PENDING'>Pendente</MenuItem>
          <MenuItem value='DONE'>Aprovado</MenuItem>
        </CustomTextField>
      </CardActions>
    </Card>
  )
}

export default Validation
