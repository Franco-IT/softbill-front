// Material UI Components
import { useMediaQuery, Card, CardHeader, CardContent, Stack, Box, Typography, Button } from '@mui/material'

// Custom Components
import DrawerAnchor from 'src/components/DrawerAnchor'
import BankInfo from './BankInfo'
import Bank from './Bank'

// Hooks
import { useDrawer } from 'src/hooks/useDrawer'
import { useBankAccountsForClient } from '../../../../../hooks/bankAccounts/useBankAccountsForClient'

interface BanksProps {
  id: string
}

const Banks = ({ id }: BanksProps) => {
  const { anchor, open, toggleDrawer, children } = useDrawer()
  const isSmallerThanMd = useMediaQuery((theme: any) => theme.breakpoints.down('md'))

  const getBanksProps = {
    id,
    params: {
      page: 0,
      perPage: 100,
      search: '',
      withBanks: true
    }
  }

  const {
    data: response,
    isLoading,
    isError,
    refetch
  } = useBankAccountsForClient(getBanksProps, {
    enabled: !!id,
    staleTime: 1000 * 60 * 5
  })

  const banks = response?.data || null
  const handleRefetch = () => refetch()

  const drawerProps = {
    anchor,
    open,
    toggleDrawer,
    children
  }

  return (
    <Card>
      <CardHeader title='Meus Bancos' />
      <CardContent>
        {isLoading ? (
          <Box>
            <Typography variant='body1'>Carregando...</Typography>
          </Box>
        ) : isError ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
              gap: 2
            }}
          >
            <Typography variant='body1'>Erro ao carregar bancos</Typography>
            <Typography variant='body2'>
              Possíveis causas incluem problemas de conectividade, falhas na autenticação ou a API pode estar
              temporariamente indisponível.
            </Typography>
            <Button variant='contained' onClick={handleRefetch}>
              Tentar novamente
            </Button>
          </Box>
        ) : banks && banks.length > 0 ? (
          <Stack spacing={3} direction='row' useFlexGap flexWrap='wrap'>
            {banks.map((item: any) => (
              <Bank
                key={item.id}
                bankLogo={item.bank.logo}
                bankName={item.bank.name}
                sx={{ cursor: 'pointer' }}
                onClick={e => toggleDrawer(isSmallerThanMd ? 'bottom' : 'right', true, <BankInfo data={item} />)(e)}
              />
            ))}
          </Stack>
        ) : (
          <Typography variant='body1'>Nenhum banco encontrado</Typography>
        )}
      </CardContent>
      <DrawerAnchor {...drawerProps} />
    </Card>
  )
}

export default Banks
