// React e Next.js
import { Fragment, MouseEvent, useState } from 'react'
import { useRouter } from 'next/router'

// React Query
import { useQueryClient } from 'react-query'

// MUI Components
import {
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Button,
  Box,
  Divider,
  useMediaQuery,
  IconButton
} from '@mui/material'
import { TimelineDot, TimelineItem, TimelineContent, TimelineSeparator, TimelineConnector } from '@mui/lab'

// Custom Components
import Icon from 'src/@core/components/icon'
import GlowIcon from 'src/components/GlowIcon'
import CustomChip from 'src/@core/components/mui/chip'
import IconifyIcon from 'src/@core/components/icon'
import DialogAlert from 'src/@core/components/dialogs/dialog-alert'

// Hooks e Utilidades
import useToast from 'src/hooks/useToast'
import { bankStatusLabel, statusColorsMUI, statusMap } from '../utils'
import { getInitials } from 'src/utils/getInitials'
import { formatName } from 'src/utils/format'

// Tipos e Serviços
import { ColorType, StatusMapProps, SubStatusProps } from '../types'
import { financialCloseController } from 'src/modules/financialClose'

// Erros
import { AppError } from 'src/shared/errors/AppError'

interface CustomBankAccordionProps {
  bank: any
}

const CustomBankAccordion = ({ bank }: CustomBankAccordionProps) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { toastSuccess, toastError } = useToast()
  const isSmallerThan550 = useMediaQuery('(max-width:550px)')
  const isSmallerThanMd = useMediaQuery((theme: any) => theme.breakpoints.down('md'))

  const [openDelete, setOpenDelete] = useState(false)

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

  const handleClickDeleteClosureBank = (id: string) => {
    financialCloseController
      .deleteMonthlyFinancialCloseBank({ id })
      .then(() => {
        queryClient.invalidateQueries(['closures'])
        queryClient.invalidateQueries(['financial-closing'])
        queryClient.invalidateQueries(['financial-closing-list'])
        queryClient.invalidateQueries(['financial-closing-dashboard'])
        toastSuccess('Fechamento Bancário excluído com sucesso!')
      })
      .catch(error => {
        if (error instanceof AppError) toastError(error.message)
      })
      .finally(() => setOpenDelete(false))
  }

  return (
    <Fragment>
      {openDelete && (
        <DialogAlert
          open={openDelete}
          setOpen={setOpenDelete}
          question={`Deseja realmente deletar este fechamento bancário?`}
          description='Essa ação não poderá ser desfeita.'
          handleConfirmDelete={() => handleClickDeleteClosureBank(bank.id)}
        />
      )}
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
            <IconButton title='Deletar fechamento bancário'>
              <IconifyIcon icon='tabler:trash' fontSize={20} onClick={() => setOpenDelete(true)} />
            </IconButton>
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
    </Fragment>
  )
}

export default CustomBankAccordion
