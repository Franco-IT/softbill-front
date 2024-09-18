// Material UI Imports
import { CardContent, Grid } from '@mui/material'

// Custom Components
import BankStepper from '../BankStepper'
import NoBanks from '../NoBanks'

interface ContentProps {
  clientId: string
  banks: any
}

const Content = ({ banks, clientId }: ContentProps) => {
  const handleClickAddBanks = (clientId: string) => window.open(`/bancos/vinculacao-de-banco/${clientId}`, '_blank')

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
        {banks.length > 0 ? (
          banks.map((bank: any, index: number) => (
            <Grid item xs={12} key={index}>
              <BankStepper bank={bank} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <NoBanks onClickButton={() => handleClickAddBanks(clientId)} />
          </Grid>
        )}
      </Grid>
    </CardContent>
  )
}

export default Content
