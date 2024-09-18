import { MouseEvent } from 'react'
import { useRouter } from 'next/router'

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

import { bankStatusLabel, statusColorsMUI, statusMap } from '../utils'
import { ColorType, StatusMapProps, SubStatusProps } from '../types'
import { getInitials } from 'src/utils/getInitials'
import { formatName } from 'src/utils/format'

interface CustomBankAccordionProps {
  bank: any
}

const CustomBankAccordion = ({ bank }: CustomBankAccordionProps) => {
  const router = useRouter()
  const isSmallerThan550 = useMediaQuery('(max-width:550px)')
  const isSmallerThanMd = useMediaQuery((theme: any) => theme.breakpoints.down('md'))

  const bankStatus = statusMap[bank.subStatus as keyof StatusMapProps] || {}

  const handleCheckStatus = (status: SubStatusProps): ColorType => {
    if (status.isError) return 'error'
    if (status.isPending) return 'warning'
    if (status.status) return 'success'
  }

  const handleClickBank = (e: MouseEvent<HTMLButtonElement>, bankId: string, clientId: string) => {
    e.stopPropagation()
    router.push({
      pathname: '/dashboard-fechamento/fechamento/[id]',
      query: { id: bankId, clientId }
    })
  }

  return (
    <Accordion>
      <AccordionSummary expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 2 }}>
          <Avatar src={bank.bank.logo}>{getInitials(bank.bank.name)}</Avatar>
          <Button
            title={bank.bank.name}
            variant='text'
            color='inherit'
            onClick={e => handleClickBank(e, bank.id, bank.clientId)}
          >
            {formatName(bank.bank.name, !isSmallerThanMd ? 100 : 20)}
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
              <TimelineDot color={handleCheckStatus(bankStatus.extract)} />
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
              </Box>
              <CustomChip
                rounded
                skin='light'
                size='small'
                label={bankStatusLabel[bankStatus.extract?.status ? 'DONE' : 'PENDING']}
                color={handleCheckStatus(bankStatus.extract)}
                sx={{ textTransform: 'capitalize', minWidth: 85 }}
              />
              <Divider sx={{ borderStyle: 'dashed', my: theme => `${theme.spacing(3)} !important` }} />
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color={handleCheckStatus(bankStatus.conciliation)} />
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
              </Box>
              <CustomChip
                rounded
                skin='light'
                size='small'
                label={bankStatusLabel[bankStatus.conciliation?.status ? 'DONE' : 'PENDING']}
                color={handleCheckStatus(bankStatus.conciliation)}
                sx={{ textTransform: 'capitalize', minWidth: 85 }}
              />
              <Divider sx={{ borderStyle: 'dashed', my: theme => `${theme.spacing(3)} !important` }} />
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color={handleCheckStatus(bankStatus.validation)} />
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
              </Box>
              <CustomChip
                rounded
                skin='light'
                size='small'
                label={bankStatusLabel[bankStatus.validation?.status ? 'DONE' : 'PENDING']}
                color={handleCheckStatus(bankStatus.validation)}
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
