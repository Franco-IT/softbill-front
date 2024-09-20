// React Query
import { useQueryClient } from 'react-query'

// MUI
import { Accordion, AccordionSummary, Avatar, Button, Box, useMediaQuery, IconButton } from '@mui/material'

// Componentes internos
import IconifyIcon from 'src/@core/components/icon'

// Utilidades e hooks
import { getInitials } from 'src/utils/getInitials'
import { formatName } from 'src/utils/format'
import useToast from 'src/hooks/useToast'

// Serviços
import { api } from 'src/services/api'

interface CustomBankAccordionWithoutClosureProps {
  bank: any
  monthlyFinancialCloseId: string
  referenceDate: string
}

const CustomBankAccordionWithoutClosure = ({
  bank,
  monthlyFinancialCloseId,
  referenceDate
}: CustomBankAccordionWithoutClosureProps) => {
  const queryClient = useQueryClient()
  const { toastSuccess, toastError } = useToast()
  const isSmallerThanMd = useMediaQuery((theme: any) => theme.breakpoints.down('md'))

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
    <Accordion>
      <AccordionSummary>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 2 }}>
          <Avatar src={bank.bank.logo}>{getInitials(bank.bank.name)}</Avatar>
          <Button title={bank.bank.name} variant='text' color='inherit'>
            {formatName(bank.bank.name, !isSmallerThanMd ? 100 : 20)}
          </Button>
          <IconButton
            title='Adicionar ao fechamento atual'
            onClick={() => handleAddBankOnClosure(bank.id, bank.clientId, monthlyFinancialCloseId, referenceDate)}
          >
            <IconifyIcon icon='tabler:plus' fontSize={20} />
          </IconButton>
        </Box>
      </AccordionSummary>
    </Accordion>
  )
}

export default CustomBankAccordionWithoutClosure