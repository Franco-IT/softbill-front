import Icon from 'src/@core/components/icon'
import GlowIcon from 'src/components/GlowIcon'
import CustomChip from 'src/@core/components/mui/chip'

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
import { useRouter } from 'next/router'

const statusMap: any = {
  PENDING: {
    extract: { status: false, isError: true },
    conciliation: { status: false, isError: true },
    validation: { status: false, isError: true }
  },
  PROCESSING: {
    extract: { status: true, isError: false },
    conciliation: { status: false, isError: false },
    validation: { status: false, isError: false }
  },
  TRANSACTION_UNTRACKED: {
    extract: { status: true, isError: false },
    conciliation: { status: true, isError: true },
    validation: { status: false, isError: false }
  },
  WAITING_VALIDATION: {
    extract: { status: true, isError: false },
    conciliation: { status: true, isError: false },
    validation: { status: false, isError: false }
  },
  DONE: {
    extract: { status: true, isError: false },
    conciliation: { status: true, isError: false },
    validation: { status: true, isError: false }
  }
}

interface CustomBankAccordionProps {
  bank: any
}

const CustomBankAccordion = ({ bank }: CustomBankAccordionProps) => {
  const router = useRouter()
  const isSmallerThan550 = useMediaQuery('(max-width:550px)')

  // Aplicando statusMap ao bank
  const bankStatus = statusMap[bank.subStatus] || {}

  const handleCheckColor = (status: boolean, isError: boolean) => {
    if (isError) return 'error'

    return status ? 'success' : 'warning'
  }

  return (
    <Accordion>
      <AccordionSummary expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 2 }}>
          <Avatar src={bank.bank.logo} sx={{ width: '2rem', height: '2rem', mr: 2 }} />
          <Button
            variant='text'
            color='inherit'
            onClick={() =>
              router.push({
                pathname: '/dashboard-fechamento/fechamento/[id]',
                query: { id: bank.id }
              })
            }
          >
            {formatNameBank(bank.bank.name)}
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
              <TimelineDot color={handleCheckColor(bankStatus.extract?.status, bankStatus.extract?.isError)} />
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
                {/* <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                  6th October
                </Typography> */}
              </Box>
              <CustomChip
                rounded
                skin='light'
                size='small'
                label={bankStatusLabel[bankStatus.extract?.status ? 'DONE' : 'PENDING']}
                color={handleCheckColor(bankStatus.extract?.status, bankStatus.extract?.isError)}
                sx={{ textTransform: 'capitalize', minWidth: 85 }}
              />
              <Divider sx={{ borderStyle: 'dashed', my: theme => `${theme.spacing(3)} !important` }} />
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot
                color={handleCheckColor(bankStatus.conciliation?.status, bankStatus.conciliation?.isError)}
              />
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
                {/* <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                  6th October
                </Typography> */}
              </Box>
              <CustomChip
                rounded
                skin='light'
                size='small'
                label={bankStatusLabel[bankStatus.conciliation?.status ? 'DONE' : 'PENDING']}
                color={handleCheckColor(bankStatus.conciliation?.status, bankStatus.conciliation?.isError)}
                sx={{ textTransform: 'capitalize', minWidth: 85 }}
              />
              <Divider sx={{ borderStyle: 'dashed', my: theme => `${theme.spacing(3)} !important` }} />
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color={handleCheckColor(bankStatus.validation?.status, bankStatus.validation?.isError)} />
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
                {/* <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                  4th October
                </Typography> */}
              </Box>
              <CustomChip
                rounded
                skin='light'
                size='small'
                label={bankStatusLabel[bankStatus.validation?.status ? 'DONE' : 'PENDING']}
                color={handleCheckColor(bankStatus.validation?.status, bankStatus.validation?.isError)}
                sx={{ textTransform: 'capitalize', minWidth: 85 }}
              />
            </TimelineContent>
          </TimelineItem>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default CustomBankAccordion
