import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import { Box } from '@mui/system'

import Avatar from 'src/@core/components/mui/avatar'
import { useAuth } from 'src/hooks/useAuth'

import Banks from './Banks'
import Pendings from './Pendings'
import Closing from './Closing'

const Client = () => {
  const { user } = useAuth()

  const banksProps = {
    id: user?.id || ''
  }

  return (
    <Card>
      <CardHeader
        title={user?.name}
        avatar={<Avatar src={user?.avatar || undefined} sx={{ width: 42, height: 42 }} />}
      />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              }}
            >
              <Banks {...banksProps} />
              <Pendings />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Closing />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Client
