import Accordion from '@mui/material/Accordion'
import Typography from '@mui/material/Typography'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

import Icon from 'src/@core/components/icon'
import { Avatar, Button } from '@mui/material'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import { bankProps } from '../types'
import { statusColorsMUI } from '../utils'
import GlowIcon from './GlowIcon'

interface CustomBankAccordionProps {
  bank: bankProps
}

const CustomBankAccordion = ({ bank }: CustomBankAccordionProps) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar src={bank.avatar} sx={{ width: '2rem', height: '2rem', mr: 2 }} />
          <Button variant='text' onClick={e => e.stopPropagation()}>
            {bank.name}
          </Button>
          <GlowIcon status={bank.status} />
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box width='100%' px={3}>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color={statusColorsMUI[bank.extract]} />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Box
                sx={{
                  mb: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
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
              <TimelineDot color={statusColorsMUI[bank.conciliation]} />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Box
                sx={{
                  mb: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
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
              <TimelineDot color={statusColorsMUI[bank.validation]} />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Box
                sx={{
                  mb: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
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
      </AccordionDetails>
    </Accordion>
  )
}

export default CustomBankAccordion
