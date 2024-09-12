import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'

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

import { statusOptions } from './options'

import { statusColorsMUI } from './utils'

import { StatusValue } from './types'
import LoadingCard from 'src/components/FeedbackAPIs/LoadingCard'
import NoResultsCard from './components/NoResultsCard'
import BankCard from './components/BankCard'
import IconifyIcon from 'src/@core/components/icon'
import CustomUserAccordion from './components/CustomUserAccordion'
import { useQuery } from 'react-query'
import { api } from 'src/services/api'
import Error from 'src/components/FeedbackAPIs/Error'
import CustomDatePicker from 'src/components/CustomDatePicker'
import Pagination from './components/Pagination'

const Dashboard = () => {
  const [showList, setShowList] = useState<'LIST' | 'GRID'>('GRID')

  const [search, setSearch] = useState('')
  const [month, setMonth] = useState('')
  const [date, setDate] = useState<any>()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [status, setStatus] = useState<any>('')
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalApproved: 0,
    totalPending: 0,
    totalError: 0
  })

  const {
    data: dashboardDataResponse,
    isLoading: isLoadingDashboardData,
    isError: isErrorDashboardData
  } = useQuery(['financial-closing-dashboard'], async () => await api.get('/monthlyFinancialCloses/statistics'), {
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true
  })

  const params = useMemo(
    () => ({
      search,
      status,
      perPage: rowsPerPage,
      page: page + 1
    }),
    [page, rowsPerPage, search, status]
  )

  const {
    data: financialClosingData,
    isLoading: isLoadingFinancialClosingData,
    isError: isErrorFinancialClosingData
  } = useQuery(
    ['financial-closing-list', params],
    async () => {
      const response = await api.get('/monthlyFinancialCloses/dashboard-accounting', { params })

      return response.data
    },
    {
      staleTime: 1000 * 60 * 5,
      keepPreviousData: true
    }
  )

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage)
  }, [])

  const handleChangeRowsPerPage = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }, [])

  const handleConvertStringToDate = (date: string | null) => {
    return date ? new Date(date) : null
  }

  const handleConvertDateToString = (date: Date | null) => {
    return date ? date.toISOString() : null
  }

  useEffect(() => {
    setDate(new Date())
    setMonth(dateProvider.getMonthFromDate(new Date()))
  }, [])

  useEffect(() => {
    if (dashboardDataResponse) {
      const { data } = dashboardDataResponse.data
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
  }, [dashboardDataResponse])

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

  const paginationProps = {
    rowsTotal: financialClosingData?.total || 0,
    rowsPerPage,
    rowsPerPageOptions: [5, 10, 25],
    page,
    handleChangePage,
    handleChangeRowsPerPage
  }

  if (isErrorDashboardData || isErrorFinancialClosingData) return <Error />

  return (
    <Card>
      <CardHeader
        title='Dashboard de Fechamento'
        subheader={`#${month}`}
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
            <CustomDatePicker
              label='Mês de Referência'
              value={handleConvertStringToDate(date)}
              onChange={e => setDate(handleConvertDateToString(e))}
              placeholderText='Escolha o mês'
              maxDate={new Date()}
              dateFormat='MMMM'
              showMonthYearPicker
              disabled
            />
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
            {isLoadingDashboardData ? (
              <LoadingCard
                title='Carregando...'
                subtitle='Aguarde um momento'
                avatarColor='primary'
                icon='tabler:loader-2'
              />
            ) : (
              <CardOptionHorizontal
                title={dashboardData.totalUsers}
                subtitle='Total de Fechamentos'
                avatarColor='primary'
                icon='tabler:user'
              />
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {isLoadingDashboardData ? (
              <LoadingCard
                title='Carregando...'
                subtitle='Aguarde um momento'
                avatarColor='primary'
                icon='tabler:loader-2'
              />
            ) : (
              <CardOptionHorizontal
                title={dashboardData.totalApproved}
                subtitle='Fechamentos Aprovados'
                avatarColor='success'
                icon='tabler:user-check'
              />
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {isLoadingDashboardData ? (
              <LoadingCard
                title='Carregando...'
                subtitle='Aguarde um momento'
                avatarColor='primary'
                icon='tabler:loader-2'
              />
            ) : (
              <CardOptionHorizontal
                title={dashboardData.totalPending}
                subtitle='Fechamentos Pendentes'
                avatarColor='warning'
                icon='tabler:user-exclamation'
              />
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {isLoadingDashboardData ? (
              <LoadingCard
                title='Carregando...'
                subtitle='Aguarde um momento'
                avatarColor='primary'
                icon='tabler:loader-2'
              />
            ) : (
              <CardOptionHorizontal
                title={dashboardData.totalError}
                subtitle='Total de Bancos Pendentes'
                avatarColor='error'
                icon='tabler:building-bank'
              />
            )}
          </Grid>
        </Grid>
      </CardContent>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', gap: 2 }}>
              <Pagination {...paginationProps} />
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
          {isLoadingFinancialClosingData ? (
            <Grid item xs={12}>
              <LoadingCard
                title='Carregando...'
                subtitle='Aguarde um momento'
                avatarColor='primary'
                icon='tabler:loader-2'
              />
            </Grid>
          ) : financialClosingData.data.length > 0 ? (
            financialClosingData.data.map((client: any, index: number) => (
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
