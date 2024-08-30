import { useEffect, useMemo, useState } from 'react'

import CustomTextField from 'src/@core/components/mui/text-field'
import CardOptionHorizontal from 'src/@core/components/card-statistics/card-option-horizontal'

import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material'

import { dateProvider } from 'src/shared/providers'

import { monthsOptions, statusOptions, usersQuantiryOptions } from './options'

import { monthName, statusColorsMUI } from './utils'

import { StatusValue } from './types'
import LoadingCard from 'src/components/FeedbackAPIs/LoadingCard'
import NoResultsCard from './components/NoResultsCard'
import BankCard from './components/BankCard'
import IconifyIcon from 'src/@core/components/icon'
import CustomUserAccordion from './components/CustomUserAccordion'
import { useQuery } from 'react-query'
import { api } from 'src/services/api'
import Error from 'src/components/FeedbackAPIs/Error'

const Dashboard = () => {
  const currentMonth = dateProvider.getCurrentMonth().toLowerCase()

  const [showList, setShowList] = useState<'LIST' | 'GRID'>('GRID')

  const [search, setSearch] = useState('')
  const [month, setMonth] = useState(currentMonth)
  const [perPage, setPerPage] = useState('5')
  const [status, setStatus] = useState<any>('')
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalApproved: 0,
    totalPending: 0,
    totalError: 0
  })

  const params = useMemo(
    () => ({
      search,
      status,
      perPage
    }),
    [perPage, search, status]
  )

  const { data, isLoading, isError } = useQuery(
    ['dashboard-data', params],
    async () => {
      const response = await api.get('/monthlyFinancialCloses/dashboard-accounting', { params })

      return response.data
    },
    {
      staleTime: 1000 * 60 * 5,
      keepPreviousData: true
    }
  )

  const gridProps = {
    LIST: {
      xs: 12
    },
    GRID: {
      xs: 12,
      md: 4,
      xl: 3
    }
  }

  useEffect(() => {
    if (data) {
      const totalUsers = data.totalMonthlyFinancialCloses
      const totalApproved = data.monthlyFinancialClosesDone
      const totalPending = data.monthlyFinancialClosesPending
      const totalError = data.totalMonthlyFinancialCloseBanks

      setDashboardData({
        totalUsers,
        totalApproved,
        totalPending,
        totalError
      })
    }
  }, [data])

  if (isError) return <Error />

  return (
    <Card>
      <CardHeader
        title='Dashboard de Fechamento'
        subheader={`#${monthName[month]}`}
        subheaderTypographyProps={{
          variant: 'overline',
          style: {
            backgroundColor: '#655BD3',
            width: 'fit-content',
            padding: '0 8px',
            borderRadius: '4px',
            color: 'white'
          }
        }}
      />
      <CardActions>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <CustomTextField
              fullWidth
              label='Cliente'
              placeholder='Buscar Cliente'
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <CustomTextField
              select
              fullWidth
              label='Periodo'
              placeholder='Selecione Periodo'
              value={month || 'default'}
              onChange={e => setMonth(e.target.value)}
              disabled
            >
              <MenuItem disabled value='default'>
                <em>selecione</em>
              </MenuItem>
              {monthsOptions.map(month => (
                <MenuItem key={month.value} value={month.value}>
                  {month.label}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <CustomTextField
              select
              fullWidth
              label='Quantidade de Usuários'
              placeholder='Selecione a quantidade de usuários'
              value={perPage || 'default'}
              onChange={e => setPerPage(e.target.value)}
            >
              <MenuItem disabled value='default'>
                <em>selecione</em>
              </MenuItem>
              {usersQuantiryOptions.map(perPage => (
                <MenuItem key={perPage.value} value={perPage.value}>
                  {perPage.label}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <CustomTextField
              select
              fullWidth
              label='Status'
              placeholder='Selecione Status'
              value={status || 'default'}
              onChange={e => setStatus(e.target.value as StatusValue)}
              color={statusColorsMUI[status || '']}
              focused={!!statusColorsMUI[status || '']}
            >
              <MenuItem disabled value='default'>
                <em>selecione</em>
              </MenuItem>
              {statusOptions.map(status => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>
        </Grid>
      </CardActions>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <CardOptionHorizontal
              title={dashboardData.totalUsers}
              subtitle='Total de Clientes'
              avatarColor='primary'
              icon='tabler:user'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardOptionHorizontal
              title={dashboardData.totalApproved}
              subtitle='Clientes Aprovados'
              avatarColor='success'
              icon='tabler:user-check'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardOptionHorizontal
              title={dashboardData.totalPending}
              subtitle='Clientes Pendentes'
              avatarColor='warning'
              icon='tabler:user-exclamation'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardOptionHorizontal
              title={dashboardData.totalError}
              subtitle='Total de Bancos Pendentes'
              avatarColor='error'
              icon='tabler:building-bank'
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
              <ToggleButtonGroup
                exclusive
                size='small'
                color='primary'
                value={showList}
                onChange={(e, newValue) => newValue !== null && setShowList(newValue)}
              >
                <ToggleButton value='GRID'>
                  <IconifyIcon icon='tabler:layout-grid-filled' fontSize='1.5rem' />
                </ToggleButton>
                <ToggleButton value='LIST'>
                  <IconifyIcon icon='tabler:layout-list-filled' fontSize='1.5rem' />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Grid>
          {isLoading ? (
            <Grid item xs={12}>
              <LoadingCard
                title='Carregando...'
                subtitle='Aguarde um momento'
                avatarColor='primary'
                icon='tabler:loader-2'
              />
            </Grid>
          ) : data.monthlyFinancialCloses.data.length > 0 ? (
            data.monthlyFinancialCloses.data.map((client: any, index: number) => (
              <Grid item {...gridProps[showList]} key={index}>
                {showList === 'GRID' ? <BankCard client={client} /> : <CustomUserAccordion client={client} />}
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <NoResultsCard />
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Dashboard
