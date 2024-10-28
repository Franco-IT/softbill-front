// Material UI Imports
import { Box, Button, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material'

// Custom Components
import IconifyIcon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'
import CustomTextField from 'src/@core/components/mui/text-field'
import GlowIcon from 'src/components/GlowIcon'

// React Hook Form Imports
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// Hooks
import { useDrawer } from 'src/hooks/useDrawer'
import { useQueryClient } from 'react-query'

// Utils
import { formatAmount } from 'src/utils/format'

// Services
import { api } from 'src/services/api'

// Notifications
import toast from 'react-hot-toast'

export type ColorType = 'primary' | 'error' | 'success' | 'secondary' | 'info' | 'warning' | undefined

const schema = yup.object().shape({
  conciliationDescription: yup.string().required('Campo obrigatório')
})

interface FormData {
  id: string
  account: string
  conciliationDescription: string
}

interface EditTransactionProps {
  id: string
  status: string
  amount: number
  validated: string
  conciliationDescription: string
  creditAccount: string
  debitAccount: string
  extractDescription: string
  transactionTypeExtract: string
  transactionTypeConciliation: string
}

const EditTransaction = (props: EditTransactionProps) => {
  const { id, status, amount, validated, conciliationDescription, extractDescription, transactionTypeExtract } = props

  const { anchor, toggleDrawer } = useDrawer()
  const queryClient = useQueryClient()

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      id,
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
    true: 'Informado',
    false: 'Não Informado'
  }

  const handleCheckStatusColor = (status: string) => {
    type Values = 'REJECTED' | 'PENDING' | 'DONE'

    const statusValues: { [key: string]: Values } = {
      PENDING: 'PENDING',
      PROCESSING: 'PENDING',
      TRANSACTION_UNTRACKED: 'PENDING',
      WAITING_VALIDATION: 'DONE',
      DONE: 'DONE'
    }

    return statusValues[status]
  }

  const onSubmit = (data: FormData, e?: React.KeyboardEvent | React.MouseEvent) => {
    api
      .put('transactions/' + data.id, data)
      .then(response => {
        if (response.status === 200) {
          queryClient.invalidateQueries(['client-pending-transactions-list'])
          queryClient.invalidateQueries(['client-transactions-list'])
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
            <Typography variant='h5'>Transação</Typography>
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
            label={typeValues[transactionTypeExtract]}
            color={typeColors[transactionTypeExtract]}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Valor:</Typography>
          <CustomChip
            rounded
            skin='light'
            size='small'
            label={formatAmount(amount, transactionTypeExtract === 'DEBIT' ? 'negative' : 'positive')}
            color={typeColors[transactionTypeExtract]}
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
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Descrição no Extrato</Typography>
          <CustomTextField disabled multiline fullWidth value={extractDescription} />
        </Box>
      </CardContent>
      <CardActions>
        <Grid container spacing={5}>
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
                  value={field.value || ''}
                  label='Nova Descrição'
                  placeholder='Digite a nova descrição'
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

export default EditTransaction
