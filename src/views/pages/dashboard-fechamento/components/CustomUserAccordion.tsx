// React Imports
import { SyntheticEvent, useState } from 'react'

// Next.js Imports
import Link from 'next/link'

// Material UI Imports
import { Button, styled, IconButton, useMediaQuery } from '@mui/material'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import MuiAccordionDetails, { AccordionDetailsProps } from '@mui/material/AccordionDetails'

// Custom Components
import TimelineBank from './TimelineBank'
import Icon from 'src/@core/components/icon'
import GlowIcon from 'src/components/GlowIcon'
import CustomAvatar from 'src/components/CustomAvatar'
import ExportOnDashboard from './DrawerComponents/ExportOnDashboard'
import CustomBankAccordionWithoutClosure from './CustomBankAccordionWithoutClosure'

// Hooks
import { useDrawer } from 'src/hooks/useDrawer'

// Utils
import { getInitials } from 'src/utils/getInitials'
import { formatName } from 'src/utils/format'

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
  data: any
}

const CustomUserAccordion = ({ data }: CustomUserAccordionProps) => {
  const { toggleDrawer } = useDrawer()
  const isSmallerThanMd = useMediaQuery((theme: any) => theme.breakpoints.down('md'))

  const closureData = data.monthlyFinancialClose

  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const expandIcon = (value: string) => <Icon icon={expanded === value ? 'tabler:minus' : 'tabler:plus'} />

  const exportOnDashboardProps = {
    monthlyFinancialCloseId: closureData.monthlyFinancialCloseId
  }

  const customBankAccordionWithoutClosureProps = {
    monthlyFinancialCloseId: closureData.monthlyFinancialCloseId,
    referenceDate: closureData.referenceDate
  }

  return (
    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
      <AccordionSummary
        expandIcon={expandIcon('panel1')}
        sx={{
          '& .MuiAccordionSummary-content': {
            gap: '1rem',
            justifyContent: 'flex-start'
          }
        }}
      >
        <CustomAvatar src={closureData.clientAvatar} content={getInitials(closureData.clientName)} />
        <GlowIcon status={closureData.status} />
        <Button
          LinkComponent={Link}
          href={`/clientes/${closureData.clientId}`}
          onClick={e => e.stopPropagation()}
          target='_blank'
          variant='text'
          color='inherit'
          title={closureData.clientName}
        >
          {formatName(closureData.clientName, !isSmallerThanMd ? 100 : 20)}
        </Button>
        {closureData.status === 'DONE' && (
          <IconButton
            onClick={e =>
              toggleDrawer(
                isSmallerThanMd ? 'bottom' : 'right',
                true,
                <ExportOnDashboard {...exportOnDashboardProps} />
              )(e)
            }
          >
            <Icon icon='tabler:download' fontSize='1.5rem' />
          </IconButton>
        )}
      </AccordionSummary>
      <AccordionDetails>
        {closureData.monthlyFinancialCloseBanks.map((item: any) => (
          <TimelineBank key={item.id} bank={item} />
        ))}
        {data.banksNotIncluded &&
          data.banksNotIncluded.map((item: any) => (
            <CustomBankAccordionWithoutClosure key={item.id} bank={item} {...customBankAccordionWithoutClosureProps} />
          ))}
      </AccordionDetails>
    </Accordion>
  )
}

export default CustomUserAccordion
