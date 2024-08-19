import { SyntheticEvent, useState } from 'react'

import { Button, useMediaQuery, styled, IconButton } from '@mui/material'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import MuiAccordionDetails, { AccordionDetailsProps } from '@mui/material/AccordionDetails'

import Icon from 'src/@core/components/icon'
import Avatar from 'src/@core/components/mui/avatar'

import GlowIcon from './GlowIcon'
import TimelineBank from './TimelineBank'

import { statusColorsMUI } from '../utils'

import { DataProps } from '../types'
import { formatName } from 'src/utils/formatName'

const Accordion = styled(MuiAccordion)<AccordionProps>(({ theme }) => ({
  margin: 0,
  borderRadius: 0,
  boxShadow: 'none !important',
  border:
    theme.palette.mode === 'light' ? `1px solid ${theme.palette.grey[300]}` : `1px solid ${theme.palette.divider}`,
  '&:not(:last-of-type), &:last-child .MuiAccordionSummary-root:not(.Mui-expanded)': {
    borderBottom: 0
  },
  '&:before': {
    display: 'none'
  },
  '&.Mui-expanded': {
    margin: 'auto'
  },
  '&:first-of-type': {
    '& .MuiButtonBase-root': {
      borderTopLeftRadius: theme.shape.borderRadius,
      borderTopRightRadius: theme.shape.borderRadius
    }
  },
  '&:last-of-type': {
    '& .MuiAccordionSummary-root:not(.Mui-expanded)': {
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius
    }
  }
}))

const AccordionSummary = styled(MuiAccordionSummary)<AccordionSummaryProps>(({ theme }) => ({
  marginBottom: -1,
  padding: theme.spacing(0, 4),
  minHeight: theme.spacing(12),
  transition: 'min-height 0.15s ease-in-out',
  backgroundColor: theme.palette.action[theme.palette.mode === 'light' ? 'hover' : 'selected'],
  borderBottom:
    theme.palette.mode === 'light' ? `1px solid ${theme.palette.grey[300]}` : `1px solid ${theme.palette.divider}`,
  '&.Mui-expanded': {
    minHeight: theme.spacing(12)
  },
  '& .MuiAccordionSummary-content': {
    alignItems: 'center',
    '&.Mui-expanded': {
      margin: '13px 0'
    }
  },
  '& .MuiTypography-root': {
    fontWeight: 400
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    color: theme.palette.text.secondary
  }
}))

const AccordionDetails = styled(MuiAccordionDetails)<AccordionDetailsProps>(({ theme }) => ({
  padding: ` ${theme.spacing(4)} !important`
}))

interface CustomUserAccordionProps {
  user: DataProps
}

const CustomUserAccordion = ({ user }: CustomUserAccordionProps) => {
  const isSmallerThan550 = useMediaQuery('(max-width:550px)')
  const { avatar, banks, name, status } = user

  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const expandIcon = (value: string) => <Icon icon={expanded === value ? 'tabler:minus' : 'tabler:plus'} />

  return (
    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
      <AccordionSummary
        expandIcon={expandIcon('panel1')}
        sx={{
          '& .MuiAccordionSummary-content': {
            gap: '1rem',
            justifyContent: !isSmallerThan550 ? 'flex-start' : 'space-between'
          }
        }}
      >
        <Avatar src={avatar} color={statusColorsMUI[status]} />
        <Button
          variant='text'
          color='inherit'
          onClick={e => e.stopPropagation()}
          sx={{
            p: 0
          }}
        >
          {formatName(name)}
        </Button>
        <GlowIcon status={status as any} />
        {user.status === 'APPROVED' && (
          <IconButton>
            <Icon icon='tabler:download' fontSize='1.5rem' />
          </IconButton>
        )}
      </AccordionSummary>
      <AccordionDetails>
        {banks.map(bank => (
          <TimelineBank key={bank.name} bank={bank} />
        ))}
      </AccordionDetails>
    </Accordion>
  )
}

export default CustomUserAccordion
