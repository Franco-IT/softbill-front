import { Grid, LinearProgress } from '@mui/material'

import Tabs from 'src/views/pages/minha-conta/Tabs'
import Error from 'src/components/FeedbackAPIs/Error'
import MyAccountContent from 'src/views/pages/minha-conta'

import { useQuery } from 'react-query'
import { useAuth } from 'src/hooks/useAuth'

import { userController } from 'src/modules/users'

const MyAccount = () => {
  const { user } = useAuth()

  const getUserProps = {
    id: user?.id || ''
  }

  const {
    data: userData,
    isLoading,
    isError
  } = useQuery(['profile', user?.id], () => userController.findByID(getUserProps), {
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5
  })

  if (isLoading) return <LinearProgress />

  if (isError) return <Error />

  if (userData) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12} xl={4}>
          <MyAccountContent data={userData.data} />
        </Grid>
        <Grid item xs={12} xl={8}>
          <Tabs data={userData.data} />
        </Grid>
      </Grid>
    )
  }
}

MyAccount.acl = {
  action: ['read', 'update', 'delete', 'client:read', 'client:update', 'client:delete'],
  subject: ['ADMIN', 'ACCOUNTING', 'ACCOUNTANT', 'CLIENT']
}

export default MyAccount
