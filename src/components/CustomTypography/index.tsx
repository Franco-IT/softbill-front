import { Typography, TypographyProps } from '@mui/material'
import { checkEmpty } from 'src/utils/list'

interface CustomTypographyProps extends TypographyProps {
  data: any
}

const CustomTypography = ({ data, ...rest }: CustomTypographyProps) => {
  return <Typography {...rest}>{checkEmpty(data)}</Typography>
}

export default CustomTypography
