import { useState, useEffect } from 'react'

import { Box, Grid, Card, CardHeader, Typography, CardContent } from '@mui/material'

import Icon from 'src/@core/components/icon'
import CustomAvatar from 'src/@core/components/mui/avatar'

import { DashboardProps } from 'src/pages/home'
import { dateProvider } from 'src/shared/providers'

interface AccountingDashboardProps {
  data: DashboardProps[]
  lastUpdate: Date
}

const AccountingDashboard = ({ data, lastUpdate }: AccountingDashboardProps) => {
  const [timeSinceUpdate, setTimeSinceUpdate] = useState<string>(dateProvider.getTimeSinceUpdate(lastUpdate))

  const renderStats = (data: DashboardProps[]) => {
    return data.map((sale: DashboardProps, index: number) => (
      <Grid item xs={6} md={3} key={index}>
        <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
          <CustomAvatar skin='light' color={sale.color} sx={{ mr: 4, width: 42, height: 42 }}>
            <Icon icon={sale.icon} fontSize='1.5rem' />
          </CustomAvatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h5'>{sale.status}</Typography>
            <Typography variant='body2'>{sale.title}</Typography>
          </Box>
        </Box>
      </Grid>
    ))
  }

  useEffect(() => {
    const interval = setInterval(() => setTimeSinceUpdate(dateProvider.getTimeSinceUpdate(lastUpdate)), 60000)

    return () => clearInterval(interval)
  }, [lastUpdate])

  return (
    <Card>
      <CardHeader title='Contabilidade Informações' subheader={`Atualizado ${timeSinceUpdate}`} sx={{ pb: 0 }} />
      <CardContent
        sx={{ pt: theme => `${theme.spacing(7)} !important`, pb: theme => `${theme.spacing(7.5)} !important` }}
      >
        <Grid container spacing={6}>
          {renderStats(data)}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AccountingDashboard
