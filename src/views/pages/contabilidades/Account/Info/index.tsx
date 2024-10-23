// Material UI components for layout and styling
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// Utility functions for input handling and data verification
import { applyDocumentMask } from 'src/utils/inputs'
import verifyDataValue from 'src/utils/verifyDataValue'

// Type definition for accounting data transfer objects
import { IAccountingDTO } from 'src/modules/accounting/dtos/IAccountingDTO'

interface InfoProps {
  data: IAccountingDTO
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
              <Grid item xs={12} sm={6}>
                <Box sx={{ pt: 4 }}>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Nome:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{data.name}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>E-mail:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{data.email}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Documento:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      {verifyDataValue(applyDocumentMask(data.documentNumber, data.documentType))}
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
