// React
import React, { Fragment, memo } from 'react'

// Material UI
import { Box, Card, CardContent, CardHeader, IconButton, Tooltip, Typography, useMediaQuery } from '@mui/material'

// Custom Components
import DrawerAnchor from 'src/components/DrawerAnchor'
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/components/CustomAvatar'
import EditTransaction from 'src/components/DrawerComponents/client/EditTransaction'
import IconifyIcon from 'src/@core/components/icon'

// Hooks
import { useDrawer } from 'src/hooks/useDrawer'
import useGetFetchQuery from 'src/hooks/useGetFetchQuery'

// Utils e Providers
import { formatAmount } from 'src/utils/format'
import { getInitials } from 'src/utils/getInitials'
import { dateProvider } from 'src/shared/providers'

export type ColorType = 'primary' | 'error' | 'success' | 'secondary' | 'info' | 'warning' | undefined

interface TransactionProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any
}

const Transaction = memo(({ data, ...rest }: TransactionProps) => {
  const { anchor, open, toggleDrawer, children } = useDrawer()
  const dataCached = useGetFetchQuery<any>('client-dashboard')
  const isSmallerThanMd = useMediaQuery((theme: any) => theme.breakpoints.down('md'))

  const bankAccount = dataCached?.bankAccounts?.find((item: any) => item.bankAccountId === data.bankAccountId) || null

  const typeColors: { [key: string]: ColorType } = {
    CREDIT: 'success',
    DEBIT: 'error'
  }

  const drawerProps = {
    anchor,
    open,
    toggleDrawer,
    children
  }

  return (
    <Fragment {...rest}>
      <Card>
        <CardHeader
          avatar={
            <Fragment>
              {data.transactionTypeExtract !== 'CREDIT' ? (
                <Tooltip title={bankAccount.bankName}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2
                    }}
                  >
                    <CustomAvatar src={bankAccount.bankLogo} content={getInitials(bankAccount.bankName)} />
                    <IconifyIcon icon='tabler:arrow-right' fontSize={20} />
                  </Box>
                </Tooltip>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                  }}
                >
                  <CustomChip rounded skin='light' size='small' label='Conta Desconhecida' color='warning' />
                  <IconifyIcon icon='tabler:arrow-right' fontSize={20} />
                </Box>
              )}
            </Fragment>
          }
          title={
            <Fragment>
              {data.transactionTypeExtract !== 'CREDIT' ? (
                <Box>
                  <CustomChip rounded skin='light' size='small' label='Conta Desconhecida' color='warning' />
                </Box>
              ) : (
                <Tooltip title={bankAccount.bankName}>
                  <Box>
                    <CustomAvatar src={bankAccount.bankLogo} content={getInitials(bankAccount.bankName)} />
                  </Box>
                </Tooltip>
              )}
            </Fragment>
          }
          action={
            <Tooltip
              title={'Editar'}
              onClick={e => {
                toggleDrawer(isSmallerThanMd ? 'bottom' : 'right', true, <EditTransaction {...data} />)(e)
              }}
            >
              <IconButton>
                <IconifyIcon icon='tabler:edit' fontSize={20} />
              </IconButton>
            </Tooltip>
          }
        />
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: isSmallerThanMd ? 'column' : 'row', gap: 2 }}>
            <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Data:</Typography>
            <Typography variant='body1'>{dateProvider.formatDate(new Date(data.date))}</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: isSmallerThanMd ? 'column' : 'row', gap: 2 }}>
            <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Descrição:</Typography>
            <Typography variant='body1'>{data.extractDescription}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Valor:</Typography>
            <CustomChip
              rounded
              skin='light'
              size='small'
              label={formatAmount(data.amount, data.transactionTypeExtract === 'DEBIT' ? 'negative' : 'positive')}
              color={typeColors[data.transactionTypeExtract]}
            />
          </Box>
        </CardContent>
      </Card>
      <DrawerAnchor {...drawerProps} />
    </Fragment>
  )
})

export default Transaction
