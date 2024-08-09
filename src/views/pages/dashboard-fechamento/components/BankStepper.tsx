import { Box, Button } from '@mui/material'
import Avatar from 'src/@core/components/mui/avatar'
import CustomStepper from './CustomStepper'

interface BankStepperProps {
  bank: any
}

const BankStepper = ({ bank }: BankStepperProps) => {
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
      <CustomStepper {...CustomStepperProps} />
    </Box>
  )
}

export default BankStepper
