import { Grid, LinearProgress } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import useGetDataApi from 'src/hooks/useGetDataApi'
import { UserProps } from 'src/types/users'
import MyAccountContent from 'src/views/pages/minha-conta'
import Tabs from 'src/views/pages/minha-conta/Tabs'

interface UseGetDataApiProps {
  data: UserProps
}

const MyAccount = () => {
  const { user } = useAuth()

  const { data, loading, refresh, setRefresh } = useGetDataApi<UseGetDataApiProps>({ url: `/users/${user?.id}` })

  if (loading) {
    return <LinearProgress />
  }

  if (data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12} xl={4}>
          <MyAccountContent data={data.data} refresh={refresh} setRefresh={setRefresh} />
        </Grid>
        <Grid item xs={12} xl={8}>
          <Tabs data={data.data} />
        </Grid>
      </Grid>
    )
  }
}

MyAccount.acl = {
  action: ['read', 'update', 'delete'],
  subject: ['ADMIN', 'ACCOUNTING', 'COUNTER', 'CLIENT']
}

export default MyAccount
