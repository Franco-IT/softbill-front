// React and Next.js
import { useRouter } from 'next/router'

// React Query
import { useQuery } from 'react-query'

// Material UI
import { Box, Button, Card, CardContent, CardHeader, Typography } from '@mui/material'

// Custom Components
import Transaction from './Transaction'

// Hooks
import { useAuth } from 'src/hooks/useAuth'

// Services
import { api } from 'src/services/api'

const Transactions = () => {
  const router = useRouter()
  const { user } = useAuth()

  const params = {
    page: 1,
    perPage: 50000,
    step: 'MONTHLY_FINANCIAL_CLOSE'
  }

  const {
    data: pendingTransactions,
    isLoading: isLoadingPendingTransactions,
    isError: isErrorPendingTransactions
  } = useQuery(
    ['client-pending-transactions-list', params],
    async () => {
      const response = await api.get('transactions/by-client/' + user?.id, {
        params
      })

      const { data } = response.data

      return data.filter((transaction: any) => transaction.status === 'PENDING')
    },
    {
      staleTime: 1000 * 60 * 5,
      keepPreviousData: true,
      enabled: !!user
    }
  )

  return (
    <Card>
      <CardHeader
        title='Transações Pendentes'
        action={
          <Button
            size='small'
            variant='contained'
            color='primary'
            onClick={() => router.push('transacoes-bancarias-cliente')}
          >
            Ver Todas
          </Button>
        }
      />
      <CardContent sx={{ p: 0 }}>
        <Box
          sx={{
            width: '100%',
            overflow: 'auto',
            maxHeight: 300,
            '&::-webkit-scrollbar': {
              width: '0.2em'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme => theme.palette.grey[300],
              borderRadius: 10
            }
          }}
        >
          {isLoadingPendingTransactions ? (
            <Typography noWrap variant='h6' sx={{ color: 'text.secondary', px: 6 }}>
              Carregando...
            </Typography>
          ) : isErrorPendingTransactions ? (
            <Typography noWrap variant='h6' sx={{ color: 'text.secondary', px: 6 }}>
              Erro ao carregar transações
            </Typography>
          ) : pendingTransactions.length > 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {pendingTransactions.map((item: any) => (
                <Transaction key={item.id} data={item} />
              ))}
            </Box>
          ) : (
            <Typography noWrap variant='h6' sx={{ color: 'text.secondary', px: 6 }}>
              Nenhuma transação pendente
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default Transactions
