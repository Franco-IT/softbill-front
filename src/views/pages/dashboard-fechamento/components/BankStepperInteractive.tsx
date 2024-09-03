import { useState, useEffect, useMemo, memo } from 'react'
import { Box, Button } from '@mui/material'

import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomStepperInteractive from './CustomStepperInteractive'

import { getInitials, statusMap } from '../utils'
import { StatusMapProps, StatusProps } from '../types'

interface BankStepperInteractiveProps {
  bank: any
}

const BankStepperInteractive = memo(({ bank }: BankStepperInteractiveProps) => {
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

  const customStepperInteractiveProps = useMemo(
    () => ({
      status: statusObj,
      data: bank
    }),
    [bank, statusObj]
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
        <CustomAvatar src={bank.bank.logo}>{getInitials(bank.bank.name)}</CustomAvatar>
        <Button variant='text' color='inherit'>
          {bank.bank.name}
        </Button>
      </Box>
      <CustomStepperInteractive {...customStepperInteractiveProps} />
    </Box>
  )
})

export default BankStepperInteractive
