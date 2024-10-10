// React and Material UI
import { Card, CardContent, CardHeader, Grid, Tooltip, Typography, useMediaQuery, Box } from '@mui/material'

// Hooks
import { useAuth } from 'src/hooks/useAuth'
import { useClientDashboard } from 'src/hooks/clients/useClientDashboard'

// Services and Utilities
import { formatName } from 'src/utils/format'
import { getInitials } from 'src/utils/getInitials'

// Custom Components
import Banks from './Banks'
import Pendings from './Pendings'
import Transactions from './Transactions'
import Error from 'src/components/FeedbackAPIs/Error'
import CustomAvatar from 'src/components/CustomAvatar'
import FinancialCloseBanks from './FinancialCloseBanks'
import LoadingCard from 'src/components/FeedbackAPIs/LoadingCard'

const Client = () => {
  const { user } = useAuth()
  const isSmallerThanMd = useMediaQuery((theme: any) => theme.breakpoints.down('md'))

  const { data, isLoading, isError } = useClientDashboard({
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true
  })

  if (isLoading) {
    return <LoadingCard title='Carregando...' subtitle='Aguarde um momento' icon='tabler:loader-2' />
  }

  if (isError) {
    return <Error />
  }

  const banksProps = {
    id: user?.id || ''
  }

  return (
    <Card>
      <CardHeader
        avatar={<CustomAvatar src={data.accounting.logo} content={getInitials(data.accounting.name)} />}
        title={
          <Tooltip
            title={data.accounting.name}
            placement='top'
            sx={{
              width: 'max-content',
              cursor: 'pointer'
            }}
          >
            <Typography variant='h5' color='text.secondary'>
              {formatName(data.accounting.name, isSmallerThanMd ? 20 : 100)}
            </Typography>
          </Tooltip>
        }
      />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <FinancialCloseBanks />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              }}
            >
              <Banks {...banksProps} />
              <Transactions />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Pendings />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Client
