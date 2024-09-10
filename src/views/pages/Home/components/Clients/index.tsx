import { Card, CardContent, Grid } from '@mui/material'
import { Box } from '@mui/system'

import { useAuth } from 'src/hooks/useAuth'

import Banks from './Banks'
import Pendings from './Pendings'
import { useQuery } from 'react-query'
import { api } from 'src/services/api'
import LoadingCard from 'src/components/FeedbackAPIs/LoadingCard'
import Error from 'src/components/FeedbackAPIs/Error'
import Conciliations from './Conciliations'

const Client = () => {
  const { user } = useAuth()

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

  const ConciliationsProps = {
    data: data.monthlyFinancialCloseBank || []
  }

  return (
    <Card>
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
              <Conciliations {...ConciliationsProps} />
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
