// React
import { memo, useCallback } from 'react'

// MUI components
import { AppBar, Toolbar, Button } from '@mui/material'

// Providers
import { dateProvider } from 'src/shared/providers'

interface CalendarNavbarProps {
  date: Date
  setDate: (date: Date) => void
}

const CalendarNavbar = memo(({ date, setDate }: CalendarNavbarProps) => {
  const { formatDate, getPreviousMonths, getLaterMonths, getMonthFromDate } = dateProvider

  const previousMonth = getPreviousMonths(date, 1)
  const nextMonth = getLaterMonths(date, 1)

  const handleMonthChange = (months: number) => {
    setDate(getLaterMonths(date, months))
  }

  const currentMonthIsCurrentSelected = useCallback(
    (currentMonth: Date) => {
      return formatDate(currentMonth, 'MMMM yyyy') === formatDate(date, 'MMMM yyyy')
    },
    [date, formatDate]
  )

  const handleFormatMonth = (month: string) => {
    return month.charAt(0).toUpperCase() + month.slice(1)
  }

  return (
    <AppBar position='static' color='inherit'>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Button title='Mês anterior' variant='tonal' color='primary' onClick={() => handleMonthChange(-1)}>
          {handleFormatMonth(getMonthFromDate(previousMonth))}
        </Button>

        <Button title='Mês selecionado' variant='tonal' color='success'>
          {handleFormatMonth(getMonthFromDate(date))}
        </Button>

        <Button
          title='Mês posterior'
          variant='tonal'
          color={'primary'}
          onClick={() => handleMonthChange(1)}
          disabled={currentMonthIsCurrentSelected(new Date())}
        >
          {handleFormatMonth(getMonthFromDate(nextMonth))}
        </Button>
      </Toolbar>
    </AppBar>
  )
})

export default CalendarNavbar
