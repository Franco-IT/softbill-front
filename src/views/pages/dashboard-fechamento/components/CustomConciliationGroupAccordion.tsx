// React Imports
import { memo, SyntheticEvent, useState, MouseEvent } from 'react'

// Material UI Imports
import { styled, IconButton, useMediaQuery, Box, Typography, Badge, BadgeProps } from '@mui/material'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import MuiAccordionDetails, { AccordionDetailsProps } from '@mui/material/AccordionDetails'

// Custom Components
import Icon from 'src/@core/components/icon'

// Hooks
import { useDrawer } from 'src/hooks/useDrawer'

// Utils
import { formatName } from 'src/utils/format'
import { renderInitials } from 'src/utils/list'
import IconifyIcon from 'src/@core/components/icon'
import ConciliationGroupItem from './DrawerComponents/ConciliationGroupItem'

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -15,
    top: 10,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px'
  }
}))

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

interface CustomConciliationGroupAccordionProps {
  children: React.ReactNode
  data: any
}

const CustomConciliationGroupAccordion = memo(({ children, data }: CustomConciliationGroupAccordionProps) => {
  const { toggleDrawer } = useDrawer()
  const isSmallerThanMd = useMediaQuery((theme: any) => theme.breakpoints.down('md'))

  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const expandIcon = (value: string) => <Icon icon={expanded === value ? 'tabler:minus' : 'tabler:plus'} />

  const handleClickGroup = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    toggleDrawer(isSmallerThanMd ? 'bottom' : 'right', true, <ConciliationGroupItem {...data} />)(e)
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
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 2 }}>
          {renderInitials(data.bankName, {
            sx: {
              mr: 2.5,
              width: 38,
              height: 38,
              fontWeight: 500,
              fontSize: (theme: any) => theme.typography.body1.fontSize
            }
          })}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <StyledBadge badgeContent={data.totalTransactions} color='primary'>
              <Typography
                noWrap
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary'
                }}
              >
                {formatName(data.extractDescription, !isSmallerThanMd ? 100 : 20)}
              </Typography>
            </StyledBadge>
          </Box>
          <IconButton
            title='Preencher conciliações desse grupo'
            color={data.validated === data.totalValidated ? 'success' : 'error'}
            sx={{ ml: 4 }}
            onClick={handleClickGroup}
          >
            <IconifyIcon icon={data.validated === data.totalValidated ? 'tabler:check' : 'tabler:x'} fontSize={20} />
          </IconButton>
        </Box>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  )
})

export default CustomConciliationGroupAccordion
