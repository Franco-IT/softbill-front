import { useState } from 'react'

import { Card, CardActions, CardContent, CardHeader, Grid, MenuItem } from '@mui/material'

import CustomTextField from 'src/@core/components/mui/text-field'
import CardOptionHorizontal from 'src/@core/components/card-statistics/card-option-horizontal'

import { dateProvider } from 'src/shared/providers'

import { monthsOptions, statusOptions, usersQuantiryOptions } from './options'

import { monthName, statusColorsMUI, users } from './utils'
import CustomUserAccordion from './components/CustomUserAccordion'
import { StatusValue } from './types'

const Dashboard = () => {
  const currentMonth = dateProvider.getCurrentMonth().toLowerCase()

  const [onSearch, setOnSearch] = useState('')
  const [month, setMonth] = useState(currentMonth)
  const [usersQuantity, setUsersQuantity] = useState('5')
  const [status, setStatus] = useState<StatusValue>('ALL')

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
              onChange={e => setOnSearch(e.target.value)}
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
              onChange={e => setStatus(e.target.value as StatusValue)}
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
            <CardOptionHorizontal title='10' subtitle='Total de Clientes' avatarColor='primary' icon='tabler:user' />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardOptionHorizontal
              title='3'
              subtitle='Clientes Aprovados'
              avatarColor='success'
              icon='tabler:user-check'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardOptionHorizontal
              title='5'
              subtitle='Clientes Pendentes'
              avatarColor='warning'
              icon='tabler:user-exclamation'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardOptionHorizontal title='2' subtitle='Clientes Cancelados' avatarColor='error' icon='tabler:user-x' />
          </Grid>
        </Grid>
      </CardContent>
      <CardContent>
        <Grid container spacing={3}>
          {users.map((user, index) => (
            <Grid item xs={12} key={index}>
              <CustomUserAccordion data={user} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Dashboard
