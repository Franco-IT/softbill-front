// Material UI Imports
import { Box, Button, IconButton } from '@mui/material'

// Utils
import { getInitials } from 'src/utils/getInitials'
import { formatName } from 'src/utils/format'

// Custom Components
import CustomAvatar from 'src/components/CustomAvatar'
import IconifyIcon from 'src/@core/components/icon'

// Hooks
import useToast from 'src/hooks/useToast'
import { useQueryClient } from 'react-query'

// Services
import { financialCloseController } from 'src/modules/financialClose'

interface BankWithoutClosureProps {
  bank: any
  monthlyFinancialCloseId: string
  referenceDate: string
}

const BankWithoutClosure = ({ bank, monthlyFinancialCloseId, referenceDate }: BankWithoutClosureProps) => {
  const queryClient = useQueryClient()
  const { toastPromise } = useToast()

  const handleAddBankOnClosure = (
    bankAccountId: string,
    clientId: string,
    monthlyFinancialCloseId: string,
    referenceDate: string
  ) => {
    const myPromise = financialCloseController
      .createMonthlyFinancialCloseBank({
        bankAccountId,
        clientId,
        monthlyFinancialCloseId,
        referenceDate
      })
      .then(() => {
        queryClient.invalidateQueries(['financial-closing-list'])
        queryClient.invalidateQueries(['financial-closing-dashboard'])
      })

    toastPromise(
      myPromise,
      'Criando fechamento bancário...',
      'Fechamento bancário adicionado com sucesso!',
      'Erro ao criar fechamento bancário!'
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column'
        },
        justifyContent: 'space-between',
        gap: 2
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <CustomAvatar src={bank.bank.logo} content={getInitials(bank.bank.name)} />
          <Button variant='text' color='inherit' title={bank.bank.name}>
            {formatName(bank.bank.name)}
          </Button>
        </Box>
        <IconButton
          title='Adicionar ao fechamento atual'
          onClick={() => handleAddBankOnClosure(bank.id, bank.clientId, monthlyFinancialCloseId, referenceDate)}
        >
          <IconifyIcon icon='tabler:plus' fontSize={20} />
        </IconButton>
      </Box>
    </Box>
  )
}

export default BankWithoutClosure
