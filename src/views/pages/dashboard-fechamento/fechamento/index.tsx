import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Typography,
  useMediaQuery
} from '@mui/material'
import { Box } from '@mui/system'
import GlowIcon from 'src/components/GlowIcon'
import Avatar from 'src/@core/components/mui/avatar'
import CustomTextField from 'src/@core/components/mui/text-field'
import { banksOptions, monthsOptions } from '../options'
import { statusColorsMUI } from '../utils'
import IconifyIcon from 'src/@core/components/icon'
import BankStepperInteractive from '../components/BankStepperInteractive'
import { useDrawer } from 'src/hooks/useDrawer'
import Export from '../components/DrawerComponents/Export'
import React, { useEffect } from 'react'
import StatementsTable from '../components/StatementsTable'
import CustomChip from 'src/@core/components/mui/chip'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { api } from 'src/services/api'
import Error from 'src/components/FeedbackAPIs/Error'
import CustomDatePicker from 'src/components/CustomDatePicker'

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
  const [date, setDate] = React.useState<any>()

  const {
    data: financialData,
    isLoading: isLoadingFinancial,
    isError: isErrorFinancial
  } = useQuery(
    'financial',
    async () => {
      const response = await api.get(
        `/monthlyFinancialCloseBanks/monthly-financial-close-accounting/${router.query.id}`
      )

      return response.data
    },
    {
      onSuccess: data => {
        setDate(data.referenceDate)
        setStatus(data.status)
      },
      enabled: router.isReady
    }
  )

  const handleConvertStringToDate = (date: string | null) => {
    return date ? new Date(date) : null
  }

  const handleConvertDateToString = (date: Date | null) => {
    return date ? date.toISOString() : null
  }

  if (isErrorFinancial || !financialData) return <Error />

  return (
    <Card>
      <CardHeader
        title={
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Box display='flex' alignItems='center' gap={4}>
                <Avatar src={financialData?.clientAvatar} color={statusColorsMUI[financialData.status]} />
                <Typography variant='h5'>{financialData?.clientName}</Typography>
                {isSmallerThanSm ? (
                  <GlowIcon status={financialData.status} />
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
                  <Avatar src={financialData.monthlyFinancialCloseBank.bank.logo} />
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
        <CustomChip rounded skin='light' size='small' label='#SETEMBRO' color='primary' />
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
              value={handleConvertStringToDate(date)}
              onChange={e => setDate(handleConvertDateToString(e))}
              placeholderText='Escolha o mês'
              maxDate={new Date()}
              dateFormat='MMMM'
              showMonthYearPicker
            />
          </Grid>

          {/* <Grid item xs={12} md={3} alignContent={'end'}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              }}
            >
              <CustomTextField
                select
                fullWidth
                label='Revisão'
                placeholder='Selecione'
                value={status || 'default'}
                onChange={e => setStatus(e.target.value)}
                color={statusColorsMUI[status]}
                focused={!!statusColorsMUI[status]}
              >
                <MenuItem disabled value='default'>
                  <em>selecione</em>
                </MenuItem>
                <MenuItem value='PENDING'>Pendente</MenuItem>
                <MenuItem value='APPROVED'>Aprovado</MenuItem>
              </CustomTextField>
            </Box>
          </Grid> */}
        </Grid>
      </CardActions>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {financialData && <BankStepperInteractive bank={financialData.monthlyFinancialCloseBank} />}
      </CardContent>
      <StatementsTable />
    </Card>
  )
}

export default Closure
