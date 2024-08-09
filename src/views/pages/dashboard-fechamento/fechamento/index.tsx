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
import React from 'react'

const Closure = () => {
  const isSmallerThanMd = useMediaQuery((theme: any) => theme.breakpoints.down('md'))

  const { toggleDrawer } = useDrawer()

  const [status, setStatus] = React.useState<any>('PENDING')

  return (
    <Card>
      <CardHeader
        title={
          <Box display='flex' alignItems='center' gap={4}>
            <Avatar src='/static/images/avatars/1.jpg' />
            <Typography variant='h5'>Apple Inc.</Typography>
            <GlowIcon status={status} />
          </Box>
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

      <CardContent>
        <BankStepperInteractive bank={{ name: 'OFX', avatar: '/static/images/avatars/1.jpg' }} />
      </CardContent>
    </Card>
  )
}

export default Closure
