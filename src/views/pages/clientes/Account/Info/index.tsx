import { Box, Card, CardContent, Grid, Typography } from '@mui/material'

import { ClientProps } from 'src/types/clients'
import verifyDataValue from 'src/utils/verifyDataValue'
import { applyCnpjMask, applyPhoneMask } from 'src/utils/inputs'

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
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Nome Fantasia:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      {verifyDataValue(data.additionalData.fantasyName)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>CNPJ:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      {verifyDataValue(applyCnpjMask(data.documentNumber))}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} lg={6} xl={6} paddingTop={{ xs: '0 !important', xl: '8px !important' }}>
                <Box sx={{ pt: 4 }}>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>
                      Responsável Financeiro:
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      {verifyDataValue(data.additionalData.financialResponsible)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>
                      Nome do Colaborador:
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      {verifyDataValue(data.additionalData.collaboratorName)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>
                      Telefone da Empresa:
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                      {verifyDataValue(applyPhoneMask(data.additionalData.clientCompanyPhone))}
                    </Typography>
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
