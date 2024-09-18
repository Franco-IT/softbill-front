// Material UI Imports
import { CardContent, Grid } from '@mui/material'

// Custom Components
import BankStepper from '../BankStepper'

interface ContentProps {
  banks: any
}

const Content = ({ banks }: ContentProps) => {
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
        {banks.map((bank: any, index: number) => (
          <Grid item xs={12} key={index}>
            <BankStepper bank={bank} />
          </Grid>
        ))}
      </Grid>
    </CardContent>
  )
}

export default Content
