import { Box, Card, CardContent, Grid, Typography } from '@mui/material'

import Chip from 'src/@core/components/mui/chip'

import { ClientProps } from 'src/types/clients'
import { ThemeColor } from 'src/@core/layouts/types'
import verifyDataValue from 'src/utils/verifyDataValue'

interface ColorsType {
  [key: string]: ThemeColor
}

const statusColors: ColorsType = {
  ACTIVE: 'success',
  INACTIVE: 'secondary'
}

interface ClientStatusType {
  [key: string]: string
}

const status: ClientStatusType = {
  ACTIVE: 'Ativo',
  INACTIVE: 'Inativo'
}

interface InfoProps {
  data: ClientProps
}

const Info = ({ data }: InfoProps) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent sx={{ padding: { xs: '20px 20px 20px !important', xl: '40px !important' }, width: '100%' }}>
            <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
              Informações
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6} xl={6}>
                <Box sx={{ pt: 4 }}>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Nome:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{data.name}</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Telefone:</Typography>
                    <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                      {verifyDataValue(data.cellphone)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Telefone fixo:</Typography>
                    <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                      {verifyDataValue(data.phone)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Status:</Typography>
                    <Chip
                      rounded
                      skin='light'
                      size='small'
                      label={status[data.status]}
                      color={statusColors[data.status]}
                      sx={{
                        textTransform: 'capitalize'
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} lg={6} xl={6} paddingTop={{ xs: '0 !important', xl: '8px !important' }}>
                <Box sx={{ pt: { xl: 4 } }}>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>CEP:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{data.cep}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Cidade:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{data.city}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Endereço:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      {data.address}, {data.number}, {data?.complement}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Bairro:</Typography>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>
                      {data.neighborhood}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Estado:</Typography>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{data.state}</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Info
