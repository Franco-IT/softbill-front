import { useState, useEffect, useMemo } from 'react'
import { Box, Button } from '@mui/material'

import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomStepperInteractive from './CustomStepperInteractive'

import { getInitials, statusMap } from '../utils'
import { StatusMapProps, StatusProps } from '../types'
import { useAppSelector } from 'src/hooks/useAppSelector'

const BankStepperInteractive = () => {
  const monthlyFinancialClose = useAppSelector(state => state.ClosingReducer.monthlyFinancialClose) as any
  const { monthlyFinancialCloseBank } = monthlyFinancialClose

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
    if (statusMap[monthlyFinancialCloseBank.subStatus as keyof StatusMapProps])
      setStatusObj(statusMap[monthlyFinancialCloseBank.subStatus as keyof StatusMapProps])
  }, [monthlyFinancialCloseBank])

  const customStepperInteractiveProps = useMemo(
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
        <CustomAvatar src={monthlyFinancialCloseBank.bank.logo}>
          {getInitials(monthlyFinancialCloseBank.bank.name)}
        </CustomAvatar>
        <Button variant='text' color='inherit'>
          {monthlyFinancialCloseBank.bank.name}
        </Button>
      </Box>
      <CustomStepperInteractive {...customStepperInteractiveProps} />
    </Box>
  )
}

export default BankStepperInteractive
