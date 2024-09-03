import { Box, Button } from '@mui/material'
import Avatar from 'src/@core/components/mui/avatar'
import CustomStepperInteractive from './CustomStepperInteractive'
import { useState, useEffect, memo, useMemo } from 'react'
import { statusMap } from '../utils'
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
        <Avatar src={bank.bank.logo} />
        <Button variant='text' color='inherit'>
          {bank.bank.name}
        </Button>
      </Box>
      <CustomStepperInteractive {...customStepperInteractiveProps} />
    </Box>
  )
})

export default BankStepperInteractive
