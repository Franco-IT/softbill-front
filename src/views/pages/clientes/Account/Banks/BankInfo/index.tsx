// MUI
import { Card, CardHeader, Divider, CardContent, Grid, Typography, Box, Avatar } from '@mui/material'

// Componentes internos
import Chip from 'src/@core/components/mui/chip'
import CustomInfoField from 'src/components/CustomInfoField'

// Tipos e layouts
import { ThemeColor } from 'src/@core/layouts/types'
import { IBankAccountDTO } from 'src/modules/banks/dtos/IBankAccountDTO'

// Providers
import { dateProvider } from 'src/shared/providers'

interface ColorsType {
  [key: string]: ThemeColor
}

const statusColors: ColorsType = {
  ACTIVE: 'success',
  INACTIVE: 'secondary'
}

const statusValues: { [key: string]: string } = {
  ACTIVE: 'Ativo',
  INACTIVE: 'Inativo'
}

interface BankInfoProps {
  data: IBankAccountDTO
}

const BankInfo = ({ data }: BankInfoProps) => {
  return (
    <Card>
      <CardHeader
        title={data.bank.name}
        subheader='Informações bancárias'
        avatar={
          <Box>
            {data.bank.logo ? (
              <Avatar src={data.bank.logo} alt={data.bank.name} />
            ) : (
              <Avatar
                sx={{
                  fontSize: 20
                }}
              >
                {data.bank.name.charAt(0).toUpperCase()}
              </Avatar>
            )}
          </Box>
        }
      />
      <Divider />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h6'>Informações</Typography>
          </Grid>
          <Grid item xs={12}>
            <CustomInfoField label='Conta' value={data.accountNumber} />
          </Grid>
          <Grid item xs={12}>
            <CustomInfoField label='Agência' value={data.agencyNumber} />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Status:</Typography>
              <Chip
                rounded
                skin='light'
                size='small'
                label={statusValues[data.status]}
                color={statusColors[String(data.status)]}
                sx={{
                  textTransform: 'capitalize'
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <CustomInfoField label='Data de Vinculação' value={dateProvider.formatDate(new Date(data.createdAt))} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default BankInfo
