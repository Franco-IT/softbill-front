import { Box, Button, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material'

import IconifyIcon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'
import CustomTextField from 'src/@core/components/mui/text-field'

import GlowIcon from 'src/components/GlowIcon'
import { ColorType } from '../../types'
import { formatAmount } from 'src/utils/format'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDrawer } from 'src/hooks/useDrawer'
import { applyAccountNumberMask } from 'src/utils/inputs'
import { api } from 'src/services/api'
import { useQueryClient } from 'react-query'
import toast from 'react-hot-toast'

const schema = yup.object().shape({
  account: yup.string().required('Campo obrigatório'),
  conciliationDescription: yup.string().required('Campo obrigatório')
})

interface FormData {
  id: string
  account: string
  conciliationDescription: string
}

interface ConciliationItemProps {
  id: string
  status: string
  amount: number
  validated: string
  conciliationDescription: string
  creditAccount: string
  debitAccount: string
  extractDescription: string
  transactionTypeConciliation: string
}

const ConciliationItem = (props: ConciliationItemProps) => {
  const {
    id,
    status,
    amount,
    validated,
    conciliationDescription,
    creditAccount,
    debitAccount,
    extractDescription,
    transactionTypeConciliation
  } = props

  const { anchor, toggleDrawer } = useDrawer()
  const queryClient = useQueryClient()

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      id,
      account: transactionTypeConciliation === 'DEBIT' ? creditAccount : debitAccount,
      conciliationDescription
    } as FormData,
    resolver: yupResolver(schema),
    mode: 'onBlur'
  })

  const typeValues: { [key: string]: string } = {
    CREDIT: 'Crédito',
    DEBIT: 'Débito'
  }

  const typeColors: { [key: string]: ColorType } = {
    CREDIT: 'success',
    DEBIT: 'error'
  }

  const validatedValues: { [key: string]: string } = {
    true: 'Aprovado',
    false: 'Pendente'
  }

  const handleCheckStatusColor = (status: string) => {
    type Values = 'REJECTED' | 'PENDING' | 'DONE'

    const statusValues: { [key: string]: Values } = {
      PENDING: 'REJECTED',
      PROCESSING: 'REJECTED',
      TRANSACTION_UNTRACKED: 'PENDING',
      WAITING_VALIDATION: 'DONE',
      DONE: 'DONE'
    }

    return statusValues[status]
  }

  const onSubmit = (data: FormData, e?: React.KeyboardEvent | React.MouseEvent) => {
    const bodyCredit = {
      creditAccount: data.account,
      conciliationDescription: data.conciliationDescription
    }

    const bodyDebit = {
      debitAccount: data.account,
      conciliationDescription: data.conciliationDescription
    }

    const requestBody = new Object()

    Object.assign(requestBody, transactionTypeConciliation === 'DEBIT' ? bodyCredit : bodyDebit)

    api
      .put('transactions/' + data.id, requestBody)
      .then(response => {
        if (response.status === 200) {
          queryClient.invalidateQueries(['conciliations'])
          queryClient.invalidateQueries(['financial-closing-dashboard'])
          queryClient.invalidateQueries(['financial-closing-list'])
          toast.success('Conciliação salva com sucesso')
          toggleDrawer(anchor, false, null)(e as React.KeyboardEvent | React.MouseEvent)
        }
      })
      .catch(() => {
        toast.error('Erro ao salvar conciliação')
      })
  }

  const handleCancel = (e?: React.KeyboardEvent | React.MouseEvent) => {
    toggleDrawer(anchor, false, null)(e as React.KeyboardEvent | React.MouseEvent)
  }

  return (
    <Card>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant='h5'>Conciliação</Typography>
            <GlowIcon status={handleCheckStatusColor(status)} />
          </Box>
        }
      />
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Tipo:</Typography>
          <CustomChip
            rounded
            skin='light'
            size='small'
            label={typeValues[transactionTypeConciliation]}
            color={typeColors[transactionTypeConciliation]}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Valor:</Typography>
          <CustomChip
            rounded
            skin='light'
            size='small'
            label={formatAmount(amount)}
            color={typeColors[transactionTypeConciliation]}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Status:</Typography>
          <CustomChip
            rounded
            skin='light'
            size='small'
            label={validatedValues[validated]}
            color={validated === 'true' ? 'success' : 'warning'}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Descrição:</Typography>
          <CustomTextField disabled multiline fullWidth value={extractDescription} />
        </Box>
      </CardContent>
      <CardActions>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Controller
              name='account'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, onBlur } }) => (
                <CustomTextField
                  fullWidth
                  required
                  value={value}
                  onBlur={onBlur}
                  onChange={e => onChange(applyAccountNumberMask(e.target.value))}
                  label={transactionTypeConciliation === 'DEBIT' ? 'Conta Crédito' : 'Conta Débito'}
                  placeholder='Ex: 12345678'
                  error={Boolean(errors.account)}
                  {...(errors.account && { helperText: errors.account.message })}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name='conciliationDescription'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  multiline
                  fullWidth
                  required
                  label='Origem'
                  placeholder='Digite a origem da transação'
                  error={Boolean(errors.conciliationDescription)}
                  {...(errors.conciliationDescription && { helperText: errors.conciliationDescription.message })}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              disabled={status === 'APPROVED'}
              startIcon={<IconifyIcon icon='tabler:x' fontSize='1.7rem' />}
              onClick={handleCancel}
            >
              Cancelar
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              startIcon={<IconifyIcon icon='tabler:input-check' fontSize='1.7rem' />}
              onClick={handleSubmit((data, e: any) => onSubmit(data, e))}
            >
              Salvar
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  )
}

export default ConciliationItem
