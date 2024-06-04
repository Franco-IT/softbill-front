import { useRouter } from 'next/router'

import { Box, Button, Card, CardContent, CardHeader, Grid, InputAdornment, MenuItem } from '@mui/material'
import CustomTextField from 'src/@core/components/mui/text-field'

import toast from 'react-hot-toast'

import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { api } from 'src/services/api'

import { delay } from 'src/utils/delay'
import { useAuth } from 'src/hooks/useAuth'

enum StatesEnum {
  AC = 'AC',
  AL = 'AL',
  AP = 'AP',
  AM = 'AM',
  BA = 'BA',
  CE = 'CE',
  DF = 'DF',
  ES = 'ES',
  GO = 'GO',
  MA = 'MA',
  MT = 'MT',
  MS = 'MS',
  MG = 'MG',
  PA = 'PA',
  PB = 'PB',
  PR = 'PR',
  PE = 'PE',
  PI = 'PI',
  RJ = 'RJ',
  RN = 'RN',
  RS = 'RS',
  RO = 'RO',
  RR = 'RR',
  SC = 'SC',
  SP = 'SP',
  SE = 'SE',
  TO = 'TO'
}

const schema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  documentType: yup.string().required('Tipo de documento obrigatório'),
  documentNumber: yup
    .string()
    .required('Número do documento obrigatório')
    .when('documentType', ([documentType], schema) => {
      switch (documentType) {
        case 'CPF':
          return schema.matches(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/, 'CPF inválido')
        case 'CNPJ':
          return schema.matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ inválido')
        default:
          return schema.min(9, 'Documento inválido')
      }
    }),
  status: yup.string().required('Status obrigatório'),
  phone: yup.string(),
  cellphone: yup.string(),
  cep: yup
    .string()
    .required('CEP obrigatório')
    .matches(/([\d]{2})\.?([\d]{3})\-?([\d]{3})/, 'CEP inválido'),
  city: yup.string().required('Cidade obrigatória'),
  address: yup.string().required('Endereço obrigatório'),
  neighborhood: yup.string().required('Bairro obrigatório'),
  state: yup
    .string()
    .required('Estado obrigatório')
    .oneOf(Object.values(StatesEnum), 'Estado inválido, informe a sigla do estado'),
  number: yup
    .number()
    .typeError('Número do endereço deve conter apenas números')
    .required('Número do endereço obrigatório'),
  complement: yup.string()
})

interface FormData {
  name: string
  email: string
  documentNumber: string
  documentType: string
  status: string
  phone: string
  cellphone: string
  cep: string
  city: string
  address: string
  neighborhood: string
  state: string
  number: number
  complement: string
  accountingId: string
}

const CreateClient = () => {
  const router = useRouter()
  const { user } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      status: 'ACTIVE',
      phone: '',
      cellphone: '',
      cep: '',
      city: '',
      address: '',
      neighborhood: '',
      state: '',
      complement: '',
      accountingId: user?.id
    } as FormData,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: FormData) => {
    api
      .post('/clients', data)
      .then(response => {
        if (response.status === 201) {
          toast.success('Cliente adicionado com sucesso!')
          delay(2000).then(() => {
            router.push('/clientes')
          })
        }
      })
      .catch(() => {
        toast.error('Erro ao adicionar cliente!')
      })
  }

  return (
    <Card>
      <CardHeader title='Adicionar Cliente' />
      <CardContent>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} lg={4} xl={3}>
              <Controller
                name='name'
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    label='Nome'
                    required
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder='Nome'
                    error={Boolean(errors.name)}
                    {...(errors.name && { helperText: errors.name.message })}
                    InputProps={{ startAdornment: <InputAdornment position='start'>@</InputAdornment> }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4} xl={3}>
              <Controller
                name='email'
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    type='email'
                    label='E-mail'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder='E-mail'
                    error={Boolean(errors.email)}
                    {...(errors.email && { helperText: errors.email.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4} xl={3}>
              <Controller
                name='documentType'
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    label='Tipo de Documento'
                    required
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.documentType)}
                    {...(errors.documentType && { helperText: errors.documentType.message })}
                  >
                    <MenuItem value='CPF'>CPF</MenuItem>
                    <MenuItem value='CNPJ'>CNPJ</MenuItem>
                    <MenuItem value='OTHER'>Outro</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4} xl={3}>
              <Controller
                name='documentNumber'
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    onBlur={onBlur}
                    label='Número do Documento'
                    onChange={onChange}
                    placeholder='Número do Documento'
                    error={Boolean(errors.documentNumber)}
                    {...(errors.documentNumber && { helperText: errors.documentNumber.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4} xl={3}>
              <Controller
                name='cep'
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    label='CEP'
                    required
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder='CEP'
                    error={Boolean(errors.cep)}
                    {...(errors.cep && { helperText: errors.cep.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4} xl={3}>
              <Controller
                name='address'
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    label='Endereço'
                    required
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder='Endereço'
                    error={Boolean(errors.address)}
                    {...(errors.address && { helperText: errors.address.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4} xl={3}>
              <Controller
                name='number'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    label='Número do Endereço'
                    required
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder='Número do Endereço'
                    error={Boolean(errors.number)}
                    {...(errors.number && { helperText: errors.number.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4} xl={3}>
              <Controller
                name='neighborhood'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    label='Bairro'
                    required
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder='Bairro'
                    error={Boolean(errors.neighborhood)}
                    {...(errors.neighborhood && { helperText: errors.neighborhood.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4} xl={3}>
              <Controller
                name='city'
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    label='Cidade'
                    required
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder='Cidade'
                    error={Boolean(errors.city)}
                    {...(errors.city && { helperText: errors.city.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4} xl={3}>
              <Controller
                name='state'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    label='Estado'
                    required
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder='Estado'
                    error={Boolean(errors.state)}
                    {...(errors.state && { helperText: errors.state.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4} xl={3}>
              <Controller
                name='complement'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    label='Complemento'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder='Complemento'
                    error={Boolean(errors.complement)}
                    {...(errors.complement && { helperText: errors.complement.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4} xl={3}>
              <Controller
                name='cellphone'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    label='Telefone'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder='Telefone'
                    error={Boolean(errors.cellphone)}
                    {...(errors.cellphone && { helperText: errors.cellphone.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4} xl={3}>
              <Controller
                name='phone'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    label='Telefone Fixo'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder='Telefone Fixo'
                    error={Boolean(errors.phone)}
                    {...(errors.phone && { helperText: errors.phone.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Box sx={{ display: 'flex', alignItems: 'end', justifyContent: 'end' }}>
                <Button variant='outlined' sx={{ mr: 2 }} onClick={() => router.push('/clientes')}>
                  Cancelar
                </Button>
                <Button type='submit' variant='contained' sx={{ mr: 2 }}>
                  Adicionar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

CreateClient.acl = {
  action: 'create',
  subject: 'ACCOUNTING'
}

export default CreateClient