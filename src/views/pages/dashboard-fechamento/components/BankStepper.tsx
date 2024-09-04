import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Button } from '@mui/material'

import Avatar from 'src/@core/components/mui/avatar'
import CustomStepper from './CustomStepper'

import { statusMap } from '../utils'
import { StatusMapProps, StatusProps } from '../types'

interface BankStepperProps {
  bank: any
}

const BankStepper = ({ bank }: BankStepperProps) => {
  const router = useRouter()

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
              query: { id: bank.id, clientId: bank.clientId }
            })
          }
        >
          {bank.bank.name}
        </Button>
      </Box>
      <CustomStepper {...customStepperProps} />
    </Box>
  )
}

export default BankStepper
