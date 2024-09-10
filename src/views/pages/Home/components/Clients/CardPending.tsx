import { Card, CardContent, Typography } from '@mui/material'

import PendingsContent from './PendingsContent'
import Actions from './Actions'
import useGetFetchQuery from 'src/hooks/useGetFetchQuery'
import { Fragment } from 'react'

const CardPending = () => {
  const data = useGetFetchQuery<any>('dashboard-client')

  const bankAccounts = data.bankAccounts || []

  const pendingsContentProps = {
    bankAccounts
  }

  return (
    <Card>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4
        }}
      >
        <Typography variant='h5' color='text.secondary'>
          Pendências
        </Typography>
        {data && bankAccounts.length > 0 ? (
          <Fragment>
            <PendingsContent {...pendingsContentProps} />
            <Actions />
          </Fragment>
        ) : (
          <Typography>Nenhuma pendência encontrada.</Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default CardPending
