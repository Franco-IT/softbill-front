import { Box, Button, useMediaQuery } from '@mui/material'

import GlowIcon from 'src/components/GlowIcon'
import Chip from 'src/@core/components/mui/chip'

import { formatNameBank } from 'src/utils/format'
import CustomAvatar from 'src/components/CustomAvatar'
import { getInitials } from 'src/utils/getInitials'
import { Fragment } from 'react'

interface BanksProps {
  bankAccountId: string
  bankLogo: string
  bankName: string
  monthlyFinancialCloseBankId: string
  monthlyFinancialCloseBankSubStatus: string
}

interface PendingsContentProps {
  bankAccounts: BanksProps[] | []
}

export type ColorType = 'primary' | 'error' | 'success' | 'secondary' | 'info' | 'warning' | undefined

export const statusColorsMUI: { [key: string]: ColorType } = {
  DONE: 'success',
  PENDING: 'warning'
}

export const bankStatusLabel: { [key: string]: string } = {
  DONE: 'Recebido',
  PENDING: 'Não Recebido'
}

const PendingsContent = ({ bankAccounts }: PendingsContentProps) => {
  const isSmallerThan550 = useMediaQuery('(max-width:550px)')

  const checkStatus = (status: string): 'DONE' | 'PENDING' => {
    return status === 'PENDING' ? status : 'DONE'
  }

  return (
    <Fragment>
      {bankAccounts.map((item, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <CustomAvatar content={getInitials(item.bankName)} src={item.bankLogo} color='secondary' />
          <Button variant='text' color='inherit' onClick={e => e.stopPropagation()}>
            {formatNameBank(item.bankName)}
          </Button>
          {isSmallerThan550 ? (
            <GlowIcon status={checkStatus(item.monthlyFinancialCloseBankSubStatus)} />
          ) : (
            <Chip
              rounded
              skin='light'
              size='small'
              label={bankStatusLabel[checkStatus(item.monthlyFinancialCloseBankSubStatus)]}
              color={statusColorsMUI[checkStatus(item.monthlyFinancialCloseBankSubStatus)]}
              sx={{ textTransform: 'capitalize', minWidth: 85 }}
            />
          )}
        </Box>
      ))}
    </Fragment>
  )
}

export default PendingsContent
