// React
import { Fragment } from 'react'

// Material UI
import { Card, CardContent, Typography } from '@mui/material'

// Custom Components
import PendingsContent from './PendingsContent'
import Actions from './Actions'

// Hooks
import useGetFetchQuery from 'src/hooks/useGetFetchQuery'

const CardPending = () => {
  const data = useGetFetchQuery<any>('client-dashboard')

  const bankAccounts =
    data.bankAccounts.filter(
      (bankAccount: any) =>
        bankAccount.monthlyFinancialCloseBankSubStatus === 'PENDING' && bankAccount.generatedBy !== 'API'
    ) || []

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
