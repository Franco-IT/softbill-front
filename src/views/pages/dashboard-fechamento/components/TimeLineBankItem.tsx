import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import Typography from '@mui/material/Typography'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'

const TimeLineBankItem = () => {
  return (
    <Box
      sx={{
        width: '100%',
        p: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 5
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          alignSelf: 'flex-start',
          gap: 2
        }}
      >
        <Avatar src='/images/avatars/2.png' sx={{ width: '2rem', height: '2rem', mr: 2 }} />
        <Typography variant='h6'>Banco do Brasil</Typography>
      </Box>

      <Box width='100%' px={3}>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color='success' />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Box
              sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <Typography sx={{ mr: 2 }} variant='h6'>
                Extrato
              </Typography>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                6th October
              </Typography>
            </Box>
            <Typography variant='body2'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus quos, voluptates voluptas rem.
            </Typography>
            <Divider sx={{ borderStyle: 'dashed', my: theme => `${theme.spacing(3)} !important` }} />
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color='warning' />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Box
              sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <Typography sx={{ mr: 2 }} variant='h6'>
                Conciliação
              </Typography>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                6th October
              </Typography>
            </Box>
            <Typography variant='body2'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus quos, voluptates voluptas rem.
            </Typography>
            <Divider sx={{ borderStyle: 'dashed', my: theme => `${theme.spacing(3)} !important` }} />
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color='warning' />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Box
              sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <Typography sx={{ mr: 2 }} variant='h6'>
                Validação
              </Typography>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                4th October
              </Typography>
            </Box>
            <Typography variant='body2' sx={{ mb: 2 }}>
              Weekly review of freshly prepared design for our new application.
            </Typography>
          </TimelineContent>
        </TimelineItem>
      </Box>
    </Box>
  )
}

export default TimeLineBankItem
