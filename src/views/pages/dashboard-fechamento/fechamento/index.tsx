// React and Next.js
import React, { Fragment, useCallback, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'

// React Query
import { useQuery, useQueryClient } from 'react-query'

// MUI components
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Tooltip,
  Typography,
  useMediaQuery
} from '@mui/material'

// Custom components
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomChip from 'src/@core/components/mui/chip'
import CustomDatePicker from 'src/components/CustomDatePicker'
import GlowIcon from 'src/components/GlowIcon'
import IconifyIcon from 'src/@core/components/icon'
import BankStepperInteractive from '../components/BankStepperInteractive'
import StatementsTable from '../components/StatementsTable'
import Export from '../components/DrawerComponents/Export'
import LoadingCard from 'src/components/FeedbackAPIs/LoadingCard'
import Error from 'src/components/FeedbackAPIs/Error'
import DialogAlert from 'src/@core/components/dialogs/dialog-alert'
import ConciliationTable from '../components/ConciliationTable'

// Hooks
import useToast from 'src/hooks/useToast'
import { useDrawer } from 'src/hooks/useDrawer'
import { useAppDispatch } from 'src/hooks/useAppDispatch'
import { useAppSelector } from 'src/hooks/useAppSelector'

// Services and utilities
import { api } from 'src/services/api'
import { dateProvider } from 'src/shared/providers'
import { getInitials } from 'src/utils/getInitials'
import { statusColorsMUI, typesIntegration } from '../utils'

// Redux actions
import { setMonthlyFinancialClose, setShowConciliations, setShowStatements } from 'src/store/modules/closing/reducer'

// Types
import { ClosureOptionsProps, StatusValue } from '../types'
import { formatNameUser } from 'src/utils/format'

const closureSituation: Record<StatusValue, string> = {
  PENDING: 'Extrato Pendente',
  PROCESSING: 'Processando Extrato',
  TRANSACTION_UNTRACKED: 'Transação não Rastreada',
  WAITING_VALIDATION: 'Aguardando Validação',
  PROCESSED: 'Aguardando Validação',
  DONE: 'Exportar'
}

const statusValues: any = {
  PENDING: true,
  DONE: false
}

const statusValuesText: any = {
  PENDING: 'Pendente',
  DONE: 'Aprovado'
}

const Closure = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { toastError, toastSuccess } = useToast()

  const dispatch = useAppDispatch()
  const monthlyFinancialClose = useAppSelector(state => state.ClosingReducer.monthlyFinancialClose) as any
  const showStatements = useAppSelector(state => state.ClosingReducer.showStatements)
  const showConciliations = useAppSelector(state => state.ClosingReducer.showConciliations)

  const isSmallerThanMd = useMediaQuery((theme: any) => theme.breakpoints.down('md'))
  const isSmallerThanSm = useMediaQuery((theme: any) => theme.breakpoints.down('sm'))

  const { toggleDrawer } = useDrawer()

  const [referenceDate, setReferenceDate] = React.useState<any>('')
  const [closuresOptions, setClosuresOptions] = React.useState<ClosureOptionsProps[]>([])
  const [closureSelected, setClosureSelected] = React.useState('')
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)

  const handleCheckClosureId = useMemo(
    () => (closureId: string, paramId: string) => {
      if (!closureId) return paramId

      return closureId === paramId ? paramId : closureId
    },
    []
  )

  const paramsFinancialClosing = useMemo(() => ({ referenceDate }), [referenceDate])

  const {
    data: financialData,
    isLoading: isLoadingFinancial,
    isError: isErrorFinancial
  } = useQuery(
    ['financial-closing', handleCheckClosureId(closureSelected, router.query.id as string), paramsFinancialClosing],
    async () => {
      const response = await api.get(
        `/monthlyFinancialCloseBanks/monthly-financial-close-accounting/${handleCheckClosureId(
          closureSelected,
          router.query.id as string
        )}`,
        {
          params: paramsFinancialClosing
        }
      )

      return response.data
    },
    {
      enabled: router.isReady,
      keepPreviousData: true,
      staleTime: 1000 * 60 * 5
    }
  )

  const paramsClosures = useMemo(() => ({ clientId: router.query.clientId, perPage: 1000 }), [router.query.clientId])

  const { isError: isErrorClosures, isFetching: isLoadingClosures } = useQuery(
    ['closures', router.query.clientId, paramsClosures],
    async () => {
      const response = await api.get(`/monthlyFinancialCloseBanks`, {
        params: paramsClosures
      })

      return response.data
    },
    {
      onSuccess: response => {
        setClosuresOptions([])

        response.data.map((item: any) => {
          setClosuresOptions(prev => [
            ...prev,
            {
              id: item.id,
              label: item.bank.name,
              logo: item.bank.logo
            }
          ])
        })
      },
      enabled: router.isReady,
      refetchOnWindowFocus: false
    }
  )

  const handleCheckClosuresStatus = (
    isLoadingClosures: boolean,
    isErrorClosures: boolean,
    closuresOptions: ClosureOptionsProps[],
    closureSelected: string
  ) => {
    if (isLoadingClosures) return 'loading'
    if (isErrorClosures) return 'error'
    if (closuresOptions.length === 0 || closureSelected === '') return 'default'

    return closureSelected
  }

  const handleConvertDateToString = (date: Date | null) => {
    return date ? dateProvider.formatDate(date, 'yyyy-MM-dd') : null
  }

  const handleInvalidationQueries = useCallback(() => {
    queryClient.invalidateQueries(['closures'])
    queryClient.invalidateQueries(['financial-closing'])
  }, [queryClient])

  const handleClickDelete = () => setOpenDeleteDialog(true)

  const handleConfirmDelete = (id: string) => {
    api
      .delete('monthlyFinancialCloseBanks/' + id)
      .then(() => {
        toastSuccess('Fechamento excluído com sucesso!')

        router.push('/dashboard-fechamento').then(() => {
          dispatch(setMonthlyFinancialClose(null))
          setClosureSelected('')
          setClosuresOptions([])
          queryClient.invalidateQueries(['closures'])
          queryClient.invalidateQueries(['financial-closing'])
          queryClient.invalidateQueries(['financial-closing-list'])
          queryClient.invalidateQueries(['financial-closing-dashboard'])
        })
      })
      .catch(() => toastError('Erro ao excluir Fechamento!'))
      .finally(() => setOpenDeleteDialog(false))
  }

  useEffect(() => {
    if (financialData) {
      setReferenceDate(handleConvertDateToString(dateProvider.adjustDate(financialData.referenceDate)))
      dispatch(setMonthlyFinancialClose(financialData))
      dispatch(setShowStatements(false))
      dispatch(setShowConciliations(false))
    }
  }, [dispatch, financialData])

  useEffect(() => {
    if (closuresOptions.length > 0 && monthlyFinancialClose) {
      setClosureSelected(monthlyFinancialClose.monthlyFinancialCloseBank.monthlyFinancialCloseBankId)
    }
  }, [closuresOptions, monthlyFinancialClose])

  useEffect(() => {
    const resetStates = () => {
      setClosureSelected('')
      dispatch(setMonthlyFinancialClose(null))
    }

    router.events.on('routeChangeStart', resetStates)

    return () => {
      router.events.off('routeChangeStart', resetStates)
    }
  }, [dispatch, router.events])

  if (isLoadingFinancial || (!monthlyFinancialClose && !isErrorFinancial))
    return (
      <LoadingCard title='Carregando...' subtitle='Aguarde um momento' avatarColor='primary' icon='tabler:loader-2' />
    )

  if (isErrorFinancial) return <Error />

  return (
    <Fragment>
      <Card>
        <CardHeader
          title={
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <Box display='flex' alignItems='center' gap={4}>
                  <CustomAvatar
                    src={monthlyFinancialClose?.clientAvatar}
                    color={statusColorsMUI[monthlyFinancialClose.status]}
                  />
                  <Typography variant='h5'>{formatNameUser(monthlyFinancialClose?.clientName)}</Typography>
                  <CustomChip
                    rounded
                    skin='light'
                    size='small'
                    label={
                      '#' +
                      dateProvider.getMonthFromDate(dateProvider.adjustDate(financialData.referenceDate)).toUpperCase()
                    }
                    color='primary'
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box
                  display={'flex'}
                  alignItems={isSmallerThanSm ? 'end' : 'start'}
                  justifyContent={isSmallerThanSm ? 'start' : 'end'}
                  gap={2}
                >
                  <Tooltip
                    title={closureSituation[monthlyFinancialClose.monthlyFinancialCloseBank.subStatus as StatusValue]}
                  >
                    <Box display={isSmallerThanSm ? 'none' : 'flex'} alignItems='center' justifyContent='center'>
                      <IconButton
                        onClick={e => toggleDrawer(isSmallerThanMd ? 'bottom' : 'right', true, <Export />)(e)}
                        disabled={statusValues[monthlyFinancialClose.monthlyFinancialCloseBank.status]}
                      >
                        <IconifyIcon icon='tabler:file-download' fontSize='1.7rem' color='primary' />
                      </IconButton>
                    </Box>
                  </Tooltip>
                  <Box
                    display='flex'
                    flexDirection={isSmallerThanSm ? 'row' : 'column'}
                    alignItems={isSmallerThanSm ? 'end' : 'center'}
                    gap={2}
                  >
                    <CustomAvatar src={monthlyFinancialClose.monthlyFinancialCloseBank.bank.logo}>
                      {getInitials(monthlyFinancialClose.monthlyFinancialCloseBank.bank.name)}
                    </CustomAvatar>
                    <CustomChip
                      rounded
                      skin='light'
                      size='small'
                      label={typesIntegration[monthlyFinancialClose.monthlyFinancialCloseBank.bankAccount.generatedBy]}
                      color='primary'
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          }
          action={
            <Tooltip title={closureSituation[monthlyFinancialClose.monthlyFinancialCloseBank.subStatus as StatusValue]}>
              <Box display={isSmallerThanSm ? 'flex' : 'none'} alignItems='center' justifyContent='center'>
                <IconButton
                  disabled={statusValues[monthlyFinancialClose.monthlyFinancialCloseBank.status]}
                  onClick={e => toggleDrawer(isSmallerThanMd ? 'bottom' : 'right', true, <Export />)(e)}
                >
                  <IconifyIcon icon='tabler:file-download' fontSize='1.7rem' color='primary' />
                </IconButton>
              </Box>
            </Tooltip>
          }
        />
        <Divider />
        <Box display='flex' alignItems='center' gap={2} p={'24px 24px 0px'}>
          <Typography variant='h5'>Fechamento</Typography>

          {isSmallerThanSm ? (
            <GlowIcon status={monthlyFinancialClose.monthlyFinancialCloseBank.status} />
          ) : (
            <CustomChip
              rounded
              skin='light'
              size='small'
              label={statusValuesText[monthlyFinancialClose.monthlyFinancialCloseBank.status]}
              color={statusColorsMUI[monthlyFinancialClose.monthlyFinancialCloseBank.status]}
            />
          )}
        </Box>
        <CardActions>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3} alignContent={'end'}>
              <CustomTextField
                select
                fullWidth
                label='Banco'
                placeholder='Selecione o Banco'
                value={handleCheckClosuresStatus(isLoadingClosures, isErrorClosures, closuresOptions, closureSelected)}
                onChange={e => setClosureSelected(e.target.value)}
              >
                <MenuItem disabled value='default'>
                  <em>selecione</em>
                </MenuItem>
                {isLoadingClosures && (
                  <MenuItem disabled value='loading'>
                    Carregando...
                  </MenuItem>
                )}
                {isErrorClosures && (
                  <MenuItem disabled value='error'>
                    Ocorreu um erro, tente novamente.
                  </MenuItem>
                )}
                {closuresOptions.map(closuresItem => (
                  <MenuItem key={closuresItem.id} value={closuresItem.id}>
                    {closuresItem.label}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={12} md={3} alignContent={'end'}>
              <CustomDatePicker
                label='Mês de Referência'
                value={dateProvider.adjustDate(financialData.referenceDate)}
                placeholderText='Escolha o mês'
                maxDate={new Date()}
                dateFormat='MMMM'
                showMonthYearPicker
                disabled
              />
            </Grid>
            <Grid item xs={12} md={1} alignContent={'end'}>
              {isSmallerThanMd ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    fullWidth
                    variant='contained'
                    color='primary'
                    startIcon={<IconifyIcon icon='tabler:refresh' fontSize='1.7rem' />}
                    onClick={handleInvalidationQueries}
                  >
                    Atualizar Dados
                  </Button>
                  <Button
                    fullWidth
                    variant='tonal'
                    color='error'
                    startIcon={<IconifyIcon icon='tabler:trash' fontSize='1.7rem' />}
                    onClick={handleClickDelete}
                  >
                    Deletar Fechamento
                  </Button>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <IconButton onClick={handleInvalidationQueries} title='Atualizar Dados'>
                    <IconifyIcon icon='tabler:refresh' fontSize='1.7rem' />
                  </IconButton>
                  <IconButton onClick={handleClickDelete} title='Deletar Fechamento' color='error'>
                    <IconifyIcon icon='tabler:trash' fontSize='1.7rem' />
                  </IconButton>
                </Box>
              )}
            </Grid>
          </Grid>
        </CardActions>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <BankStepperInteractive />
        </CardContent>
        <Divider />
        {showStatements && <StatementsTable />}
        {showConciliations && <ConciliationTable />}
      </Card>

      {openDeleteDialog && (
        <DialogAlert
          open={openDeleteDialog}
          setOpen={setOpenDeleteDialog}
          question={`Deseja realmente deletar este fechamento?`}
          description='Essa ação não poderá ser desfeita.'
          handleConfirmDelete={() =>
            handleConfirmDelete(handleCheckClosureId(closureSelected, router.query.id as string))
          }
        />
      )}
    </Fragment>
  )
}

export default Closure
