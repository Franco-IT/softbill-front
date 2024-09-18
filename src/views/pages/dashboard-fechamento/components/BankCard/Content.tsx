// Material UI Imports
import { CardContent, Grid } from '@mui/material'

// Custom Components
import BankStepper from '../BankStepper'
import BankWithoutClosure from '../BankWithoutClosure'

interface ContentProps {
  data: any
  referenceDate: string
}

const Content = ({ data, referenceDate }: ContentProps) => {
  return (
    <CardContent
      sx={{
        maxHeight: '240px',
        height: '100%',
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          width: '0.2em'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: theme => theme.palette.grey[300],
          borderRadius: 10
        }
      }}
    >
      <Grid container spacing={3}>
        {data.monthlyFinancialClose.monthlyFinancialCloseBanks.map((bank: any, index: number) => (
          <Grid item xs={12} key={index}>
            <BankStepper bank={bank} />
          </Grid>
        ))}
        {data.banksNotIncluded &&
          data.banksNotIncluded.map((bank: any, index: number) => (
            <Grid item xs={12} key={index}>
              <BankWithoutClosure
                bank={bank}
                monthlyFinancialCloseId={data.monthlyFinancialClose.monthlyFinancialCloseId}
                referenceDate={referenceDate}
              />
            </Grid>
          ))}
      </Grid>
    </CardContent>
  )
}

export default Content
