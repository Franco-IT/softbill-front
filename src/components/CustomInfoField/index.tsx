import { Box, Typography } from '@mui/material'
import verifyDataValue from 'src/utils/verifyDataValue'

interface CustomInfoFieldProps {
  label: string
  value: string
}

const CustomInfoField = ({ label, value }: CustomInfoFieldProps) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{label}:</Typography>
      <Typography sx={{ color: 'text.secondary' }}>{verifyDataValue(value)}</Typography>
    </Box>
  )
}

export default CustomInfoField
