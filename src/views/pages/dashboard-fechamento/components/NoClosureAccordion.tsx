// React Imports
import { SyntheticEvent, useState } from 'react'

// Next.js Imports
import Link from 'next/link'

// Material UI Imports
import { Button, styled, useMediaQuery, Box, Typography } from '@mui/material'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import MuiAccordionDetails, { AccordionDetailsProps } from '@mui/material/AccordionDetails'

// Custom Components
import Icon from 'src/@core/components/icon'
import CustomAvatar from 'src/components/CustomAvatar'

// Hooks
import { useQueryClient } from 'react-query'
import useToast from 'src/hooks/useToast'

// Utils
import { getInitials } from 'src/utils/getInitials'
import { formatName } from 'src/utils/format'

// Providers and Controllers
import { dateProvider } from 'src/shared/providers'
import { financialCloseController } from 'src/modules/financialClose'

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

interface NoClosureAccordionProps {
  data: any
  referenceDate: string
}

const NoClosureAccordion = ({ data, referenceDate }: NoClosureAccordionProps) => {
  const { toastPromise } = useToast()
  const queryClient = useQueryClient()
  const isSmallerThanMd = useMediaQuery((theme: any) => theme.breakpoints.down('md'))

  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const expandIcon = (value: string) => <Icon icon={expanded === value ? 'tabler:minus' : 'tabler:plus'} />

  const handleCreateClosure = (clientId: string, referenceDate: string) => {
    const myPromise = financialCloseController
      .createMonthlyFinancialClose({
        clientId,
        referenceDate
      })
      .then(() => {
        queryClient.invalidateQueries(['financial-closing-list'])
        queryClient.invalidateQueries(['financial-closing-dashboard'])
      })

    toastPromise(myPromise, 'Criando fechamento...', 'Fechamento criado com sucesso!', 'Erro ao criar fechamento!')
  }

  const handleCheckMonth = (referenceDate: string) => {
    const [year, month, day] = referenceDate.split('-')

    return dateProvider.getMonthFromDate(new Date(Number(year), Number(month) - 1, Number(day)))
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
        <CustomAvatar src={data.clientAvatar} content={getInitials(data.client.name)} />
        <Button
          LinkComponent={Link}
          href={`/clientes/${data.clientId}`}
          onClick={e => e.stopPropagation()}
          target='_blank'
          variant='text'
          color='inherit'
          title={data.client.name}
        >
          {formatName(data.client.name, !isSmallerThanMd ? 100 : 20)}
        </Button>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 2
          }}
        >
          <Typography variant='h5' color='textSecondary'>
            Este cliente ainda não possui um fechamento para o mês de {handleCheckMonth(referenceDate)}
          </Typography>
          <Button variant='contained' onClick={() => handleCreateClosure(data.client.id, referenceDate)}>
            Criar Fechamento
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default NoClosureAccordion
