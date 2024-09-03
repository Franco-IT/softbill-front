import React, { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
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
  Box
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
import { banksOptions } from '../options'
import { getInitials, statusColorsMUI } from '../utils'

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

  const isSmallerThanMd = useMediaQuery((theme: any) => theme.breakpoints.down('md'))
  const isSmallerThanSm = useMediaQuery((theme: any) => theme.breakpoints.down('sm'))

  const { toggleDrawer } = useDrawer()

  const [status, setStatus] = React.useState<any>('PENDING')
  const [referenceDate, setReferenceDate] = React.useState<any>('2024-06-01')
  const [date, setDate] = React.useState<any>(new Date())

  const params = useMemo(() => ({ referenceDate }), [referenceDate])

  const {
    data: financialData,
    isLoading: isLoadingFinancial,
    isError: isErrorFinancial
  } = useQuery(
    ['financial-closing', router.query.id, params],
    async () => {
      const response = await api.get(
        `/monthlyFinancialCloseBanks/monthly-financial-close-accounting/${router.query.id}`,
        {
          params
        }
      )

      return response.data
    },
    {
      onSuccess: data => {
        setDate(dateProvider.adjustDate(data.referenceDate))
        setStatus(data.status)
      },
      enabled: router.isReady,
      keepPreviousData: true,
      staleTime: 1000 * 60 * 5
    }
  )

  const handleConvertDateToString = (date: Date | null) => {
    return date ? dateProvider.formatDate(date, 'yyyy/MM/dd') : null
  }

  useEffect(() => {
    setReferenceDate(handleConvertDateToString(date))
  }, [date])

  if (isLoadingFinancial || (!financialData && !isErrorFinancial))
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
                <CustomAvatar src={financialData?.clientAvatar} color={statusColorsMUI[financialData.status]} />
                <Typography variant='h5'>{financialData?.clientName}</Typography>
                {isSmallerThanSm ? (
                  <GlowIcon status={financialData?.status} />
                ) : (
                  <CustomChip
                    rounded
                    skin='light'
                    size='small'
                    label={statusValuesText[financialData.status]}
                    color={statusColorsMUI[financialData.status]}
                  />
                )}
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
                  <CustomAvatar src={financialData.monthlyFinancialCloseBank.bank.logo}>
                    {getInitials(financialData.monthlyFinancialCloseBank.bank.name)}
                  </CustomAvatar>
                  <CustomChip rounded skin='light' size='small' label='OFX' color='primary' />
                </Box>
              </Box>
            </Grid>
          </Grid>
        }
        action={
          <Box display={isSmallerThanSm ? 'flex' : 'none'} alignItems='center' justifyContent='center'>
            <IconButton
              disabled={statusValues[status]}
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
        <CustomChip
          rounded
          skin='light'
          size='small'
          label={'#' + dateProvider.getMonthFromDate(date).toUpperCase()}
          color='primary'
        />
      </Box>
      <CardActions>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} alignContent={'end'}>
            <CustomTextField select fullWidth label='Banco' placeholder='Selecione o Banco' value={'default'}>
              <MenuItem disabled value='default'>
                <em>selecione</em>
              </MenuItem>
              {banksOptions.map(bank => (
                <MenuItem key={bank.value} value={bank.value}>
                  {bank.label}
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
        </Grid>
      </CardActions>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <BankStepperInteractive bank={financialData.monthlyFinancialCloseBank} />
      </CardContent>
      <StatementsTable />
    </Card>
  )
}

export default Closure
