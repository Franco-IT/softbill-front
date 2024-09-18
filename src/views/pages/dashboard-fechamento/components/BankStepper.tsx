import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Button } from '@mui/material'

import CustomStepper from './CustomStepper'

import { statusMap } from '../utils'
import { getInitials } from 'src/utils/getInitials'
import { StatusMapProps, StatusProps } from '../types'
import CustomAvatar from 'src/components/CustomAvatar'
import { formatName } from 'src/utils/format'
import ClosureBankOptions from './ClosureBankOptions'
import Icon from 'src/@core/components/icon'
import { api } from 'src/services/api'
import useToast from 'src/hooks/useToast'
import { useQueryClient } from 'react-query'
import DialogAlert from 'src/@core/components/dialogs/dialog-alert'

interface BankStepperProps {
  bank: any
}

const BankStepper = ({ bank }: BankStepperProps) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { toastSuccess, toastError } = useToast()

  const [openDelete, setOpenDelete] = useState(false)
  const [statusObj, setStatusObj] = useState<StatusProps>({
    extract: {
      status: false,
      isError: false,
      isPending: false
    },
    conciliation: {
      status: false,
      isError: false,
      isPending: false
    },
    validation: {
      status: false,
      isError: false,
      isPending: false
    }
  })

  const handleClickDeleteClosureBank = (id: string) => {
    api
      .delete('monthlyFinancialCloseBanks/' + id)
      .then(() => {
        queryClient.invalidateQueries(['financial-closing-list'])
        toastSuccess('Fechamento Bancário excluído com sucesso!')
      })
      .catch(() => toastError('Erro ao excluir Fechamento Bancário!'))
      .finally(() => setOpenDelete(false))
  }

  useEffect(() => {
    if (statusMap[bank.subStatus as keyof StatusMapProps])
      setStatusObj(statusMap[bank.subStatus as keyof StatusMapProps])
  }, [bank.subStatus])

  const customStepperProps = useMemo(
    () => ({
      status: statusObj
    }),
    [statusObj]
  )

  const menuItems = [
    {
      label: 'Deletar',
      icon: <Icon icon='tabler:trash' fontSize={20} />,
      action: () => setOpenDelete(true)
    }
  ]

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
        <ClosureBankOptions menuItems={menuItems} />
      </Box>
      <CustomStepper {...customStepperProps} />

      {openDelete && (
        <DialogAlert
          open={openDelete}
          setOpen={setOpenDelete}
          question={`Deseja realmente deletar este fechamento bancário?`}
          description='Essa ação não poderá ser desfeita.'
          handleConfirmDelete={() => handleClickDeleteClosureBank(bank.id)}
        />
      )}
    </Box>
  )
}

export default BankStepper
