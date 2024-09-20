// React and Material UI
import { Card, CardContent, CardHeader, Grid, Tooltip, Typography, useMediaQuery } from '@mui/material'
import { Box } from '@mui/system'

// Hooks
import { useAuth } from 'src/hooks/useAuth'
import { useQuery } from 'react-query'

// Services and Utilities
import { api } from 'src/services/api'
import { getInitials } from 'src/utils/getInitials'
import { formatName } from 'src/utils/format'

// Custom Components
import Banks from './Banks'
import Pendings from './Pendings'
import Transactions from './Transactions'
import LoadingCard from 'src/components/FeedbackAPIs/LoadingCard'
import Error from 'src/components/FeedbackAPIs/Error'
import CustomAvatar from 'src/components/CustomAvatar'

const Client = () => {
  const { user } = useAuth()
  const isSmallerThanMd = useMediaQuery((theme: any) => theme.breakpoints.down('md'))

  const { data, isLoading, isError } = useQuery(
    ['dashboard-client'],
    async () => {
      const response = await api.get('monthlyFinancialCloses/dashboard-client')

      return response.data
    },
    {
      staleTime: 1000 * 60 * 5,
      keepPreviousData: true
    }
  )

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
              width: 'max-content'
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
