import { Grid, Card, CardContent, Typography, Box } from '@mui/material'

import Chip from 'src/@core/components/mui/chip'

import { ThemeColor } from 'src/@core/layouts/types'
import { UserProps } from 'src/types/users'
import { verifyUserStatus, verifyUserType } from 'src/@core/utils/user'

interface ColorsType {
  [key: string]: ThemeColor
}
const roleColors: ColorsType = {
  ADMIN: 'info',
  ACCOUNTING: 'success'
}

const statusColors: ColorsType = {
  ACTIVE: 'success',
  INACTIVE: 'secondary'
}

interface InfoProps {
  data: UserProps
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
                  <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Status:</Typography>
                    <Chip
                      rounded
                      skin='light'
                      size='small'
                      label={verifyUserStatus(String(data.status))}
                      color={statusColors[String(data.status)]}
                      sx={{
                        textTransform: 'capitalize'
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Tipo:</Typography>
                    <Chip
                      rounded
                      skin='light'
                      size='small'
                      label={verifyUserType(String(data.type))}
                      color={roleColors[data.type]}
                      sx={{ textTransform: 'capitalize', mb: 4 }}
                    />
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
