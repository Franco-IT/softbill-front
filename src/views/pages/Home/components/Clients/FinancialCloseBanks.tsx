// Material UI
import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material'

// Hooks
import useGetFetchQuery from 'src/hooks/useGetFetchQuery'

// Custom Components
import FinancialCloseBank from './FinancialCloseBank'
import GlowIcon from 'src/components/GlowIcon'

// Providers
import { dateProvider } from 'src/shared/providers'

const FinancialCloseBanks = () => {
  const { getPreviousMonths, getMonthFromDate } = dateProvider
  const dataCached = useGetFetchQuery<any>('client-dashboard')

  const monthlyFinancialCloseBanks = dataCached.monthlyFinancialCloseBank

  const isFinancialClosePending = monthlyFinancialCloseBanks.some((bank: any) => bank.status === 'PENDING')

  return (
    <Card>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Typography variant='h5'>Fechamento</Typography>
            <GlowIcon status={isFinancialClosePending ? 'PENDING' : 'DONE'} />
          </Box>
        }
        subheader={`#${getMonthFromDate(getPreviousMonths(new Date(), 1))}`}
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
          {monthlyFinancialCloseBanks.length > 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, px: 4 }}>
              {monthlyFinancialCloseBanks.map((bank: any) => (
                <FinancialCloseBank key={bank.bankId} data={bank} />
              ))}
            </Box>
          ) : (
            <Typography noWrap variant='h6' sx={{ color: 'text.secondary', px: 6 }}>
              Nenhum fechamento encontrado
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default FinancialCloseBanks
