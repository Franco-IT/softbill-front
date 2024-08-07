import { Box, Button, CardContent, Grid } from '@mui/material'
import Avatar from 'src/@core/components/mui/avatar'
import CustomStepper from '../CustomStepper'

interface ContentProps {
  banks: any
}

const Content = ({ banks }: ContentProps) => {
  return (
    <CardContent
      sx={{
        maxHeight: '354px',
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
        {banks.map((bank: any, index: number) => {
          const CustomStepperProps = {
            extract: bank.extract,
            conciliation: bank.conciliation,
            exportation: bank.validation
          }

          return (
            <Grid item xs={12} key={index}>
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
            </Grid>
          )
        })}
      </Grid>
    </CardContent>
  )
}

export default Content
