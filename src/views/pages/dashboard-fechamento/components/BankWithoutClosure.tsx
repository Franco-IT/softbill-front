import { useRouter } from 'next/router'
import { Box, Button, IconButton } from '@mui/material'

import { getInitials } from 'src/utils/getInitials'
import CustomAvatar from 'src/components/CustomAvatar'
import { formatName } from 'src/utils/format'
import { api } from 'src/services/api'
import useToast from 'src/hooks/useToast'
import { useQueryClient } from 'react-query'
import IconifyIcon from 'src/@core/components/icon'

interface BankWithoutClosureProps {
  bank: any
  monthlyFinancialCloseId: string
  referenceDate: string
}

const BankWithoutClosure = ({ bank, monthlyFinancialCloseId, referenceDate }: BankWithoutClosureProps) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { toastSuccess, toastError } = useToast()

  const handleAddBankOnClosure = (
    bankAccountId: string,
    clientId: string,
    monthlyFinancialCloseId: string,
    referenceDate: string
  ) => {
    api
      .post('monthlyFinancialCloseBanks', {
        bankAccountId,
        clientId,
        monthlyFinancialCloseId,
        referenceDate
      })
      .then(() => {
        queryClient.invalidateQueries(['financial-closing-list'])
        toastSuccess('Fechamento bancário adicionado com sucesso!')
      })
      .catch(() => toastError('Erro ao adicionar Fechamento Bancário!'))
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
          <Button
            variant='text'
            color='inherit'
            title={bank.bank.name}
            onClick={() =>
              router.push({
                pathname: '/dashboard-fechamento/fechamento/[id]',
                query: { id: bank.id, clientId: bank.clientId }
              })
            }
          >
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