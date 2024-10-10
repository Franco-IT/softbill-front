import { memo } from 'react'
import { Avatar, Box, BoxProps, Tooltip } from '@mui/material'
import { getInitials } from 'src/utils/getInitials'

interface BankProps extends BoxProps {
  bankLogo: string
  bankName: string
}

const Bank = memo(({ bankLogo, bankName, ...rest }: BankProps) => {
  return (
    <Box {...rest}>
      <Tooltip title={bankName} placement='top'>
        <Avatar src={bankLogo} color='primary'>
          {getInitials(bankName)}
        </Avatar>
      </Tooltip>
    </Box>
  )
})

export default Bank
