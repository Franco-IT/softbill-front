import { Box, Button } from '@mui/material'
import Avatar from 'src/@core/components/mui/avatar'
import CustomStepperInteractive from './CustomStepperInteractive'

interface BankStepperInteractiveProps {
  bank: any
}

const BankStepperInteractive = ({ bank }: BankStepperInteractiveProps) => {
  const CustomStepperProps = {
    extract: bank.extract,
    conciliation: bank.conciliation,
    exportation: bank.validation
  }

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
        <Avatar src={bank.avatar} />
        <Button variant='text' color='inherit'>
          {bank.name}
        </Button>
      </Box>
      <CustomStepperInteractive {...CustomStepperProps} />
    </Box>
  )
}

export default BankStepperInteractive
