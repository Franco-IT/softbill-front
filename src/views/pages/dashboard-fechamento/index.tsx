import { useEffect, useState } from 'react'

import CustomTextField from 'src/@core/components/mui/text-field'
import CardOptionHorizontal from 'src/@core/components/card-statistics/card-option-horizontal'

import { Card, CardActions, CardContent, CardHeader, Grid, MenuItem } from '@mui/material'

import { dateProvider } from 'src/shared/providers'

import { monthsOptions, statusOptions, usersQuantiryOptions } from './options'

import { monthName, statusColorsMUI, users } from './utils'

import { StatusValue } from './types'
import LoadingCard from 'src/components/FeedbackAPIs/LoadingCard'
import NoResultsCard from './components/NoResultsCard'
import BankCard from './components/BankCard'

const Dashboard = () => {
  const currentMonth = dateProvider.getCurrentMonth().toLowerCase()

  const [loading, setLoading] = useState(false)
  const [onSearch, setOnSearch] = useState('')
  const [month, setMonth] = useState(currentMonth)
  const [usersData, setUsersData] = useState(users)
  const [usersQuantity, setUsersQuantity] = useState('5')
  const [status, setStatus] = useState<StatusValue>('ALL')
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalApproved: 0,
    totalPending: 0,
    totalError: 0
  })

  const handleOnSearch = (value: string) => {
    setLoading(true)

    setOnSearch(value)

    if (!value)
      return setTimeout(() => {
        setUsersData(users), setLoading(false)
      }, 1500)

    setTimeout(() => {
      const filteredData = users.filter(user => user.name.toLowerCase().includes(value.toLowerCase()))
      setUsersData(filteredData)
      setLoading(false)
    }, 1000)
  }

  const handleStatus = (status: StatusValue) => {
    setLoading(true)

    setStatus(status)

    if (status === 'ALL')
      return setTimeout(() => {
        setUsersData(users), setLoading(false)
      }, 1500)

    setTimeout(() => {
      const filteredData = users.filter(user => user.status === status)
      setUsersData(filteredData)
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    setLoading(true)

    setTimeout(() => {
      const totalUsers = users.length
      const totalApproved = users.filter(user => user.status === 'APPROVED').length
      const totalPending = users.filter(user => user.status === 'PENDING').length
      const totalError = users.filter(user => user.status === 'ERROR').length

      setDashboardData({
        totalUsers,
        totalApproved,
        totalPending,
        totalError
      })

      setLoading(false)
    }, 3000)
  }, [])

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
              value={onSearch}
              onChange={e => handleOnSearch(e.target.value)}
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
              value={usersQuantity || 'default'}
              onChange={e => setUsersQuantity(e.target.value)}
            >
              <MenuItem disabled value='default'>
                <em>selecione</em>
              </MenuItem>
              {usersQuantiryOptions.map(usersQuantity => (
                <MenuItem key={usersQuantity.value} value={usersQuantity.value}>
                  {usersQuantity.label}
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
              onChange={e => handleStatus(e.target.value as StatusValue)}
              color={statusColorsMUI[status]}
              focused={!!statusColorsMUI[status]}
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
              subtitle='Clientes Cancelados'
              avatarColor='error'
              icon='tabler:user-x'
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardContent>
        <Grid container spacing={3}>
          {loading ? (
            <Grid item xs={12}>
              <LoadingCard
                title='Carregando...'
                subtitle='Aguarde um momento'
                avatarColor='primary'
                icon='tabler:loader-2'
              />
            </Grid>
          ) : usersData.length > 0 ? (
            usersData.map((user, index) => (
              <Grid item xs={12} md={4} xl={3} key={index}>
                <BankCard user={user} />
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
