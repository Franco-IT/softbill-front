import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  MenuItem,
  Typography,
  useMediaQuery
} from '@mui/material'
import { Box } from '@mui/system'
import GlowIcon from '../components/GlowIcon'
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

const Closure = () => {
  const router = useRouter()

  const isSmallerThanMd = useMediaQuery((theme: any) => theme.breakpoints.down('md'))
  const isSmallerThanSm = useMediaQuery((theme: any) => theme.breakpoints.down('sm'))

  const { toggleDrawer } = useDrawer()

  const [status, setStatus] = React.useState<any>('PENDING')
  const [user, setUser] = React.useState<any>(null)
  const [bank, setBank] = React.useState<any>(null)

  useEffect(() => {
    const getUser = async () => fetch(`http://localhost:3002/users/${router.query.id}`)

    if (router.isReady) {
      getUser()
        .then(response => response.json())
        .then(data => {
          setUser(data)
          setStatus(data.status)

          const banks = data.banks

          setBank(banks.filter((bank: any) => bank.id === router.query.bankId)[0])
        })
        .catch(error => console.error(error))
    }
  }, [router.isReady, router.query.bankId, router.query.id])

  return (
    <Card>
      <CardHeader
        title={
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Box display='flex' alignItems='center' gap={4}>
                <Avatar src={user?.avatar} color={statusColorsMUI[status]} />
                <Typography variant='h5'>{user?.name}</Typography>
                <GlowIcon status={status} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display='flex' flexDirection={'column'} alignItems={isSmallerThanSm ? 'start' : 'end'}>
                <Box display='flex' flexDirection={isSmallerThanSm ? 'row' : 'column'} alignItems={'center'} gap={2}>
                  <Avatar src={bank?.avatar} />
                  <CustomChip rounded skin='light' size='small' label='OFX' color='primary' />
                </Box>
              </Box>
            </Grid>
          </Grid>
        }
      />
      <CardActions>
        <Grid container spacing={3} justifyContent='space-between'>
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
            <CustomTextField select fullWidth label='Periodo' placeholder='Selecione Periodo' value={'default'}>
              <MenuItem disabled value='default'>
                <em>selecione</em>
              </MenuItem>
              {monthsOptions.map(month => (
                <MenuItem key={month.value} value={month.value}>
                  {month.label}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>

          <Grid item xs={12} md={3} alignContent={'end'}>
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
                <MenuItem value='REJECTED'>Rejeitado</MenuItem>
              </CustomTextField>
            </Box>
          </Grid>

          <Grid item xs={12} md={3} alignContent={'end'}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              }}
            >
              <Typography variant='subtitle2' color='text.secondary'>
                Modelo de Exportação
              </Typography>
              <Button
                size='small'
                variant='outlined'
                color='inherit'
                endIcon={<IconifyIcon icon='tabler:eye' width={24} height={24} />}
                onClick={e => toggleDrawer(isSmallerThanMd ? 'bottom' : 'right', true, <Export />)(e)}
              >
                Padrão
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardActions>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {bank && <BankStepperInteractive bank={bank} />}
      </CardContent>
      <StatementsTable />
    </Card>
  )
}

export default Closure
