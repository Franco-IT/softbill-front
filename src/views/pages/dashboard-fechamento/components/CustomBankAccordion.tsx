import Icon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'

import GlowIcon from './GlowIcon'

import {
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Button,
  Box,
  Divider,
  useMediaQuery
} from '@mui/material'
import { TimelineDot, TimelineItem, TimelineContent, TimelineSeparator, TimelineConnector } from '@mui/lab'

import { bankStatusLabel, formatNameBank, statusColorsMUI } from '../utils'

import { bankProps } from '../types'

interface CustomBankAccordionProps {
  bank: bankProps
}

const CustomBankAccordion = ({ bank }: CustomBankAccordionProps) => {
  const isSmallerThan550 = useMediaQuery('(max-width:550px)')

  return (
    <Accordion>
      <AccordionSummary expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar src={bank.avatar} sx={{ width: '2rem', height: '2rem', mr: 2 }} />
          <Button variant='text' onClick={e => e.stopPropagation()}>
            {formatNameBank(bank.name)}
          </Button>
          {isSmallerThan550 ? (
            <GlowIcon status={bank.status} />
          ) : (
            <CustomChip
              rounded
              skin='light'
              size='small'
              label={bankStatusLabel[bank.status]}
              color={statusColorsMUI[bank.status]}
              sx={{ textTransform: 'capitalize', minWidth: 85 }}
            />
          )}
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
