import { useRouter } from 'next/router'

import useGetDataApi from 'src/hooks/useGetDataApi'
import Error from 'src/components/FeedbackAPIs/Error'
import Loading from 'src/components/FeedbackAPIs/Loading'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import { ClientDataProps } from 'src/types/clients'
import BankLinkingStepper from 'src/views/pages/bancos/vinculacao-de-banco/BankLinkingStepper'

const BankVinculation = () => {
  const route = useRouter()

  const { id } = route.query

  const {
    data: client,
    loading,
    error
  } = useGetDataApi<ClientDataProps>({ url: `/users/${id}`, callInit: route.isReady })

  if (loading) return <Loading />

  if (error) return <Error />

  return (
    <Card>
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Typography variant='h4'>Vinculação de Banco</Typography>
            <Typography variant='body1' sx={{ mt: 2 }}>
              Aqui você pode vincular um banco a um cliente
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {client && <BankLinkingStepper client={client.data} />}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

BankVinculation.acl = {
  action: 'create',
  subject: 'ACCOUNTING'
}

export default BankVinculation
