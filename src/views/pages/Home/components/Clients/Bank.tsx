import { Avatar, Box, BoxProps } from '@mui/material'

type BankProps = BoxProps

const Bank = ({ ...rest }: BankProps) => {
  return (
    <Box {...rest}>
      <Avatar src='https://raichu-uploads.s3.amazonaws.com/logo_inter_XNlYcp.png' color='primary' />
    </Box>
  )
}

export default Bank
