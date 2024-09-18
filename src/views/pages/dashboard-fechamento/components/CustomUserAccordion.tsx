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
import Icon from 'src/@core/components/icon'
import GlowIcon from 'src/components/GlowIcon'
import CustomAvatar from 'src/components/CustomAvatar'
import TimelineBank from './TimelineBank'
import NoBanks from './NoBanks'

// Utils
import { getInitials } from 'src/utils/getInitials'
import { formatName } from 'src/utils/format'
import { useDrawer } from 'src/hooks/useDrawer'
import ExportOnDashboard from './DrawerComponents/ExportOnDashboard'

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

  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const expandIcon = (value: string) => <Icon icon={expanded === value ? 'tabler:minus' : 'tabler:plus'} />

  const handleClickAddBanks = (clientId: string) => window.open(`/bancos/vinculacao-de-banco/${clientId}`, '_blank')

  const exportOnDashboardProps = {
    monthlyFinancialCloseId: data.monthlyFinancialCloseId
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
        <CustomAvatar src={data.clientAvatar} content={getInitials(data.clientName)} />
        <GlowIcon status={data.status} />
        <Button
          LinkComponent={Link}
          href={`/clientes/${data.clientId}`}
          onClick={e => e.stopPropagation()}
          target='_blank'
          variant='text'
          color='inherit'
          title={data.clientName}
        >
          {formatName(data.clientName, !isSmallerThanMd ? 100 : 20)}
        </Button>
        {data.status === 'DONE' && (
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
        {data.monthlyFinancialCloseBanks.length > 0 ? (
          data.monthlyFinancialCloseBanks.map((item: any) => <TimelineBank key={item.id} bank={item} />)
        ) : (
          <NoBanks onClickButton={() => handleClickAddBanks(data.clientId)} />
        )}
      </AccordionDetails>
    </Accordion>
  )
}

export default CustomUserAccordion
