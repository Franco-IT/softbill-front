import Link from 'next/link'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types'

import { Grid } from '@mui/material'

import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import CardOptionHorizontal from 'src/@core/components/card-statistics/card-option-horizontal'

import { NavLink, ThemeColor } from 'src/@core/layouts/types'
import navigation from 'src/navigation/vertical'

import CanViewNavLink from 'src/layouts/components/acl/CanViewNavLink'
import CanView from 'src/components/CanView'
import AccountingDashboard from 'src/components/AccountingDashboard'
import Client from 'src/views/pages/Home/components/Clients'

import authConfig from 'src/configs/auth'

import { cryptoProvider, dateProvider } from 'src/shared/providers'
import { UserProps } from 'src/types/users'

import { useAuth } from 'src/hooks/useAuth'

export type DashboardProps = {
  status: string
  title: string
  color: ThemeColor
  icon: string
}

export const getServerSideProps: GetServerSideProps<{
  data: DashboardProps[] | null
  lastUpdate: string | null
}> = async ({ req }) => {
  const encryptedToken = req.cookies[authConfig.storageTokenKeyName]
  const ivToken = req.cookies[`${authConfig.storageTokenKeyName}-iv`]
  const ivUserId = req.cookies[`${authConfig.storageUserDataKeyName}-iv`]
  const encryptedUserId = req.cookies[authConfig.storageUserDataKeyName]

  if (!encryptedToken || !ivToken || !ivUserId || !encryptedUserId) {
    return {
      props: {
        data: null,
        lastUpdate: null
      }
    }
  }

  const token = cryptoProvider.decrypt(encryptedToken as string, ivToken as string)
  const userId = cryptoProvider.decrypt(encryptedUserId as string, ivUserId as string)

  if (!token || !userId) {
    return {
      props: {
        data: null,
        lastUpdate: null
      }
    }
  }

  const addQueryParams = (baseURL: string, params: Record<string, string>): string => {
    const url = new URL(baseURL)
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    return url.toString()
  }

  const url = addQueryParams(process.env.NEXT_PUBLIC_API_URL + '/users', {
    type: 'ACCOUNTING',
    perPage: String(10000)
  })

  const headers = {
    Authorization: `Bearer ${token}`,
    'x-api-key': process.env.API_KEY as string
  }

  const res = await fetch(url, {
    headers
  })

  if (!res.ok) {
    return {
      props: {
        data: null,
        lastUpdate: null
      }
    }
  }

  const { data }: { data: UserProps[] } = await res.json()

  const totalActive = data.filter((user: UserProps) => user.status === 'ACTIVE').length
  const totalInactive = data.filter((user: UserProps) => user.status === 'INACTIVE').length
  const totalBlocked = data.filter((user: UserProps) => user.status === 'BLOCKED').length
  const total = data.length

  const dashboardData: DashboardProps[] = [
    {
      status: `${total}`,
      color: 'info',
      title: 'Total',
      icon: 'tabler:users-group'
    },
    {
      status: `${totalActive}`,
      title: 'Ativos',
      color: 'success',
      icon: 'tabler:user-check'
    },
    {
      status: `${totalInactive}`,
      color: 'secondary',
      title: 'Inátivos',
      icon: 'tabler:user-x'
    },
    {
      status: `${totalBlocked}`,
      color: 'error',
      title: 'Bloqueados',
      icon: 'tabler:user-cancel'
    }
  ]

  const dateNow = dateProvider.getCurrentDate().toISOString()

  return {
    props: {
      data: dashboardData,
      lastUpdate: dateNow
    }
  }
}

const Home = ({ data, lastUpdate }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { user } = useAuth()

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <CanView actions='manage'>
          <Grid item xs={12}>
            {data && lastUpdate && <AccountingDashboard data={data} lastUpdate={new Date(lastUpdate)} />}
          </Grid>
        </CanView>
        {user?.role === 'CLIENT' && (
          <CanView actions='client:update'>
            <Grid item xs={12}>
              <Client />
            </Grid>
          </CanView>
        )}
        <CanView actions='read'>
          {navigation().map((item: NavLink, index) => {
            if (item.path === '/home') return null

            return (
              <CanViewNavLink key={index} navLink={item}>
                <Grid item xs={12} sm={6} lg={6}>
                  <Link
                    href={item.path as string}
                    style={{
                      textDecoration: 'none'
                    }}
                  >
                    <CardOptionHorizontal {...item} />
                  </Link>
                </Grid>
              </CanViewNavLink>
            )
          })}
        </CanView>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Home
