import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

import ptBR from 'date-fns/locale/pt-BR'

import CustomInput from './PickersCustomInput'
import { DatePickerProps } from '@mui/lab'

type DateType = Date | null | undefined

interface CustomDatePickerProps extends DatePickerProps<Date> {
  label?: string
  placeholderText?: string
  value?: DateType
  onChange?: (date: Date) => void
}

const CustomDatePicker = ({ label, placeholderText, value, onChange, ...rest }: CustomDatePickerProps) => {
  return (
    <DatePicker
      selected={value}
      locale={ptBR}
      onChange={(date: Date) => onChange && onChange(date)}
      popperPlacement='bottom-end'
      placeholderText={placeholderText || 'Selecione uma data'}
      customInput={<CustomInput label={label} fullWidth />}
      {...rest}
    />
  )
}

export default CustomDatePicker
