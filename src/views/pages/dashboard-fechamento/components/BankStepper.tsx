import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Button } from '@mui/material'
import Avatar from 'src/@core/components/mui/avatar'
import CustomStepper from './CustomStepper'

const statusMap: { [key: string]: any } = {
  PENDING: {
    extract: { status: false, isError: true },
    conciliation: { status: false, isError: true },
    exportation: { status: false, isError: true }
  },
  PROCESSING: {
    extract: { status: true, isError: false },
    conciliation: { status: false, isError: false },
    exportation: { status: false, isError: false }
  },
  TRANSACTION_UNTRACKED: {
    extract: { status: true, isError: false },
    conciliation: { status: true, isError: true },
    exportation: { status: false, isError: false }
  },
  WAITING_VALIDATION: {
    extract: { status: true, isError: false },
    conciliation: { status: true, isError: false },
    exportation: { status: false, isError: false }
  },
  DONE: {
    extract: { status: true, isError: false },
    conciliation: { status: true, isError: false },
    exportation: { status: true, isError: false }
  }
}

interface BankStepperProps {
  bank: any
}

const BankStepper = ({ bank }: BankStepperProps) => {
  const router = useRouter()

  const [statusObj, setStatusObj] = useState({
    extract: {
      status: false,
      isError: false
    },
    conciliation: {
      status: false,
      isError: false
    },
    exportation: {
      status: false,
      isError: false
    }
  })

  useEffect(() => {
    if (statusMap[bank.subStatus]) setStatusObj(statusMap[bank.subStatus])
  }, [bank.subStatus])

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
          gap: 2
        }}
      >
        <Avatar src={bank.bank.logo} />
        <Button
          variant='text'
          color='inherit'
          onClick={() =>
            router.push({
              pathname: '/dashboard-fechamento/fechamento/[id]',
              query: { id: bank.id }
            })
          }
        >
          {bank.bank.name}
        </Button>
      </Box>
      <CustomStepper {...statusObj} />
    </Box>
  )
}

export default BankStepper
