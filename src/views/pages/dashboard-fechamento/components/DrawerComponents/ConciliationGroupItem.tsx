// React Imports
import { Fragment, memo, useMemo, useState } from 'react'

// Next Imports
import { useRouter } from 'next/router'

// Material UI Imports
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  Typography
} from '@mui/material'

// Custom Components
import GlowIcon from 'src/components/GlowIcon'
import IconifyIcon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'

// React Hook Form Imports
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// Hooks
import useToast from 'src/hooks/useToast'
import { useQueryClient } from 'react-query'
import { useDrawer } from 'src/hooks/useDrawer'
import { useAppSelector } from 'src/hooks/useAppSelector'
import { useAccountingAccountsByClient } from 'src/hooks/accountingAccounts/useAccountingAccountsByClient'

// Services
import { api } from 'src/services/api'

// Utils
import { formatAmount } from 'src/utils/format'

// Controllers and DTOs
import { IGetAccountingAccountsByClientDTO } from 'src/modules/accountingAccounts/dtos/IGetAccountingAccountsByClientDTO'

// Errors
import { AppError } from 'src/shared/errors/AppError'

const schema = yup.object().shape({
  account: yup.string().required('Campo obrigatório'),
  conciliationDescription: yup.string().required('Campo obrigatório'),
  accountingAccountDescription: yup.string().required('Campo obrigatório')
})

interface FormData {
  id: string
  account: string
  conciliationDescription: string
  accountingAccountDescription: string
}

type Options = {
  id: string
  label: string
  description: string
}

interface ConciliationGroupItemProps {
  id: string
  status: string
  amount: number
  validated: string
  conciliationDescription: string
  creditAccount: string
  debitAccount: string
  extractDescription: string
  transactionTypeConciliation: string
  accountingAccountDescription: string
  bankAccountId: string
}

const ConciliationGroupItem = memo((props: ConciliationGroupItemProps) => {
  const {
    id,
    status,
    amount,
    validated,
    conciliationDescription,
    creditAccount,
    debitAccount,
    extractDescription,
    transactionTypeConciliation,
    accountingAccountDescription,
    bankAccountId
  } = props

  const router = useRouter()
  const queryClient = useQueryClient()
  const { anchor, toggleDrawer } = useDrawer()
  const { toastError, toastSuccess } = useToast()

  const monthlyFinancialClose = useAppSelector(state => state.ClosingReducer.monthlyFinancialClose) as any

  const [options, setOptions] = useState<Options[]>([])
  const [search, setSearch] = useState(accountingAccountDescription)

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    defaultValues: {
      id,
      account: transactionTypeConciliation === 'DEBIT' ? creditAccount : debitAccount,
      conciliationDescription,
      accountingAccountDescription
    } as FormData,
    resolver: yupResolver(schema),
    mode: 'onBlur'
  })

  const params = useMemo(
    () => ({
      clientId: router.query.clientId as string,
      params: {
        search,
        perPage: 50000
      }
    }),
    [router.query.clientId, search]
  )

  const { isFetching } = useAccountingAccountsByClient(params as unknown as IGetAccountingAccountsByClientDTO, {
    onSuccess: data => {
      const arrayOptions: Options[] = []

      if (data.data.length > 0) {
        for (const item of data.data) {
          arrayOptions.push({ id: item.id, label: item.number, description: item.description })
        }
      }

      if (search) {
        setOptions(arrayOptions)
      }

      arrayOptions.length > 0 && setOptions(arrayOptions)
    },
    onError: () => setOptions([]),
    refetchOnWindowFocus: false,
    enabled: !!params
  })

  const typeValues: { [key: string]: string } = {
    CREDIT: 'Crédito',
    DEBIT: 'Débito'
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
      WAITING_REVIEW: 'PENDING',
      WAITING_VALIDATION: 'DONE',
      DONE: 'DONE'
    }

    return statusValues[status]
  }

  const handleSelectAccount = (account: Options | null) => {
    if (!account) {
      setValue('account', '')
      setValue('accountingAccountDescription', '')
    } else {
      setValue('account', account.label)
      setValue('accountingAccountDescription', account.description)
    }
  }

  const onSubmit = (formData: FormData, e?: React.KeyboardEvent | React.MouseEvent) => {
    const bodyCredit = {
      creditAccount: formData.account,
      conciliationDescription: formData.conciliationDescription,
      accountingAccountDescription: formData.accountingAccountDescription
    }

    const bodyDebit = {
      debitAccount: formData.account,
      conciliationDescription: formData.conciliationDescription,
      accountingAccountDescription: formData.accountingAccountDescription
    }

    const reqBody = {
      description: extractDescription,
      monthlyFinancialCloseId: monthlyFinancialClose.monthlyFinancialCloseId,
      bankAccountId,
      transactionType: transactionTypeConciliation,
      updatedData: {
        validated: true
      }
    }

    Object.assign(reqBody.updatedData, {
      ...reqBody.updatedData,
      ...(transactionTypeConciliation === 'DEBIT' ? bodyCredit : bodyDebit)
    })

    api
      .put('transactions/by-description', reqBody)
      .then(response => {
        if (response.status === 200) {
          queryClient.invalidateQueries(['conciliations'])
          queryClient.invalidateQueries(['conciliations-by-group'])
          queryClient.invalidateQueries(['financial-closing-dashboard'])
          queryClient.invalidateQueries(['financial-closing-list'])
          toastSuccess('Transação salva com sucesso')
          toggleDrawer(anchor, false, null)(e as React.KeyboardEvent | React.MouseEvent)
        }
      })
      .catch(error => error instanceof AppError && toastError(error.message))
  }

  const handleCancel = (e?: React.KeyboardEvent | React.MouseEvent) => {
    toggleDrawer(anchor, false, null)(e as React.KeyboardEvent | React.MouseEvent)
  }

  const handleCheckValue = (value: string) => {
    if (
      options.includes({
        id,
        label: value,
        description: watch('accountingAccountDescription')
      })
    ) {
      return options.find(option => option.label === value)
    }

    if (!value) {
      return null
    }

    return {
      id,
      label: value,
      description: watch('accountingAccountDescription')
    }
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
            color='secondary'
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Valor:</Typography>
          <CustomChip rounded skin='light' size='small' label={formatAmount(amount)} color='secondary' />
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
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Descrição da Transação</Typography>
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
              render={({ field }) => (
                <CustomAutocomplete
                  options={options}
                  loading={isFetching}
                  onInputChange={(event, newInputValue) => {
                    if (!field.value) {
                      setSearch(newInputValue.split(' - ')[1])
                    }
                  }}
                  noOptionsText={
                    options.length === 0
                      ? 'Nenhum resultado encontrado'
                      : options.length === 0 && search
                      ? 'Nenhum resultado encontrado'
                      : 'Digite para buscar'
                  }
                  loadingText='Carregando...'
                  getOptionLabel={option => option.label + ' - ' + option.description}
                  onBlur={field.onBlur}
                  onChange={(event, newValue) => {
                    handleSelectAccount(newValue)
                  }}
                  value={handleCheckValue(field.value)}
                  renderInput={params => (
                    <CustomTextField
                      {...params}
                      fullWidth
                      required
                      value={options.find(option => option.id === field.value)?.label || ''}
                      onChange={e => {
                        if (!field.value) {
                          setSearch(e.target.value)
                        }
                      }}
                      label={'Conta Contábil'}
                      placeholder='Ex: 1 - Fornecedor 1'
                      error={Boolean(errors.account)}
                      {...(errors.account && { helperText: errors.account.message })}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <Fragment>
                            {isFetching ? <CircularProgress size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </Fragment>
                        ),
                        readOnly: !!field.value
                      }}
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name='accountingAccountDescription'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  multiline
                  fullWidth
                  required
                  disabled
                  label='Descrição Conta Contábil'
                  placeholder='Escolha a conta contábil'
                  error={Boolean(errors.accountingAccountDescription)}
                  {...(errors.accountingAccountDescription && {
                    helperText: errors.accountingAccountDescription.message
                  })}
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
                  label='Histórico'
                  placeholder='Digite o histórico da conciliação'
                  error={Boolean(errors.conciliationDescription)}
                  {...(errors.conciliationDescription && { helperText: errors.conciliationDescription.message })}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              variant='tonal'
              color='error'
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
})

export default ConciliationGroupItem
