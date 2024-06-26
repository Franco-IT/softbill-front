import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { applyCnpjMask } from 'src/utils/inputs'
import verifyDataValue from 'src/utils/verifyDataValue'

import { ClientProps } from 'src/types/clients'

interface BankNameType {
  [key: string]: string
}

const bankName: BankNameType = {
  BB: 'Banco do Brasil',
  INTER: 'Banco Inter'
}

interface SummaryProps {
  client: ClientProps
  payload: any
}

const Summary = ({ client, payload }: SummaryProps) => {
  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={6}>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Nome:</Typography>
          <Typography sx={{ color: 'text.secondary' }}>{client.name}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>E-mail:</Typography>
          <Typography sx={{ color: 'text.secondary' }}>{client.email}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Nome Fantasia:</Typography>
          <Typography sx={{ color: 'text.secondary' }}>{verifyDataValue(client.additionalData.fantasyName)}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>CNPJ:</Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            {verifyDataValue(applyCnpjMask(client.documentNumber))}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Banco:</Typography>
          <Typography sx={{ color: 'text.secondary' }}>{bankName[payload.bankName]}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Número da Conta:</Typography>
          <Typography sx={{ color: 'text.secondary' }}>{payload.accountNumber}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Número da Agência:</Typography>
          <Typography sx={{ color: 'text.secondary' }}>{verifyDataValue(payload.agencyNumber)}</Typography>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Summary
