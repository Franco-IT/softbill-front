import React, { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useQuery, useQueryClient } from 'react-query'
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Typography,
  useMediaQuery,
  Box,
  Button
} from '@mui/material'

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

import { useDrawer } from 'src/hooks/useDrawer'
import { api } from 'src/services/api'
import { dateProvider } from 'src/shared/providers'
import { getInitials, statusColorsMUI, typesIntegration } from '../utils'
import { ClosureOptionsProps } from '../types'
import { useAppDispatch } from 'src/hooks/useAppDispatch'
import { useAppSelector } from 'src/hooks/useAppSelector'
import { setMonthlyFinancialClose, setShowConciliations, setShowStatements } from 'src/store/modules/closing/reducer'
import ConciliationTable from '../components/ConciliationTable'

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

  const dispatch = useAppDispatch()
  const monthlyFinancialClose = useAppSelector(state => state.ClosingReducer.monthlyFinancialClose) as any
  const showStatements = useAppSelector(state => state.ClosingReducer.showStatements)
  const showConciliations = useAppSelector(state => state.ClosingReducer.showConciliations)

  const isSmallerThanMd = useMediaQuery((theme: any) => theme.breakpoints.down('md'))
  const isSmallerThanSm = useMediaQuery((theme: any) => theme.breakpoints.down('sm'))

  const { toggleDrawer } = useDrawer()

  const [referenceDate, setReferenceDate] = React.useState<any>('2024-06-01')
  const [date, setDate] = React.useState<any>(new Date())
  const [closuresOptions, setClosuresOptions] = React.useState<ClosureOptionsProps[]>([])
  const [closureSelected, setClosureSelected] = React.useState('')

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

  const { isLoading: isLoadingClosures, isError: isErrorClosures } = useQuery(
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
      keepPreviousData: true,
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
    return date ? dateProvider.formatDate(date, 'yyyy/MM/dd') : null
  }

  const handleInvalidationQueries = () => {
    queryClient.invalidateQueries(['financial-closing'])
  }

  useEffect(() => {
    if (financialData) {
      setDate(dateProvider.adjustDate(financialData.referenceDate))
      dispatch(setMonthlyFinancialClose(financialData))
      dispatch(setShowStatements(false))
      dispatch(setShowConciliations(false))
    }
  }, [dispatch, financialData])

  useEffect(() => {
    setReferenceDate(handleConvertDateToString(date))
  }, [date])

  useEffect(() => {
    if (closuresOptions.length > 0 && monthlyFinancialClose) {
      setClosureSelected(monthlyFinancialClose.monthlyFinancialCloseBank.monthlyFinancialCloseBankId)
    }
  }, [closuresOptions, monthlyFinancialClose])

  if (isLoadingFinancial || (!monthlyFinancialClose && !isErrorFinancial))
    return (
      <LoadingCard title='Carregando...' subtitle='Aguarde um momento' avatarColor='primary' icon='tabler:loader-2' />
    )

  if (isErrorFinancial) return <Error />

  return (
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
                <Typography variant='h5'>{monthlyFinancialClose?.clientName}</Typography>
                <CustomChip
                  rounded
                  skin='light'
                  size='small'
                  label={'#' + dateProvider.getMonthFromDate(date).toUpperCase()}
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
                <Box display={isSmallerThanSm ? 'none' : 'flex'} alignItems='center' justifyContent='center'>
                  <IconButton
                    title='Exportar'
                    onClick={e => toggleDrawer(isSmallerThanMd ? 'bottom' : 'right', true, <Export />)(e)}
                    disabled={statusValues[monthlyFinancialClose.monthlyFinancialCloseBank.status]}
                  >
                    <IconifyIcon icon='tabler:file-download' fontSize='1.7rem' color='primary' />
                  </IconButton>
                </Box>
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
          <Box display={isSmallerThanSm ? 'flex' : 'none'} alignItems='center' justifyContent='center'>
            <IconButton
              disabled={statusValues[monthlyFinancialClose.monthlyFinancialCloseBank.status]}
              title='Exportar'
              onClick={e => toggleDrawer(isSmallerThanMd ? 'bottom' : 'right', true, <Export />)(e)}
            >
              <IconifyIcon icon='tabler:file-download' fontSize='1.7rem' color='primary' />
            </IconButton>
          </Box>
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
              value={date}
              onChange={e => setDate(e)}
              placeholderText='Escolha o mês'
              maxDate={new Date()}
              dateFormat='MMMM'
              showMonthYearPicker
              disabled
            />
          </Grid>
          <Grid item xs={12} md={3} alignContent={'end'}>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              startIcon={<IconifyIcon icon='tabler:refresh' fontSize='1.7rem' />}
              onClick={handleInvalidationQueries}
            >
              Atualizar
            </Button>
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
  )
}

export default Closure
