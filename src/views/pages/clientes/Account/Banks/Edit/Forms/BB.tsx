import { useState } from 'react'

import Icon from 'src/@core/components/icon'
import CustomTextField from 'src/@core/components/mui/text-field'
import { IconButton, InputAdornment, Grid, Button, Box } from '@mui/material'

import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import toast from 'react-hot-toast'
import { api } from 'src/services/api'
import { BankAccountProps } from 'src/types/banks'
import { applyAccountNumberMask, applyAgencyNumberMask } from 'src/utils/inputs'

const schema = yup.object().shape({
  bankClientId: yup.string().required('Campo obrigatório'),
  bankClientSecret: yup.string().required('Campo obrigatório'),
  accountNumber: yup.string().required('Campo obrigatório'),
  agencyNumber: yup.string().required('Campo obrigatório').min(4, 'Mínimo de 4 caracteres')
})

interface FormData {
  bankClientId: string
  bankClientSecret: string
  accountNumber: string
  agencyNumber: string
  bankId: string
  clientId: string
  status: 'ACTIVE' | 'INACTIVE'
}

interface BBProps {
  handleEditClose: () => void
  data: BankAccountProps
}

const BB = ({ data, handleEditClose }: BBProps) => {
  const [showBankClientSecret, setShowBankClientSecret] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      bankClientId: '',
      bankClientSecret: '',
      accountNumber: data.accountNumber,
      agencyNumber: data.agencyNumber,
      bankId: data.bankId,
      clientId: data.clientId,
      status: data.status
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (formData: FormData) => {
    const reqBody = new FormData()
    reqBody.append('clientId', formData.clientId)
    reqBody.append('bankId', formData.bankId)
    reqBody.append('bankClientId', formData.bankClientId)
    reqBody.append('bankClientSecret', formData.bankClientSecret)
    reqBody.append('accountNumber', formData.accountNumber)
    reqBody.append('agencyNumber', formData.agencyNumber)

    api
      .put(`/bankAccounts/${data._id}`, reqBody, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        if (response.status === 201) {
          toast.success('Dados atualizados com sucesso!')
        }
      })
      .catch(() => {
        toast.error('Erro ao atualizar dados, tente novamente mais tarde')
      })
      .finally(() => handleEditClose())
  }

  return (
    <form noValidate autoComplete='off'>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <Controller
            name='bankClientId'
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <CustomTextField
                fullWidth
                label='Código do Cliente'
                value={value || ''}
                onBlur={onBlur}
                onChange={onChange}
                placeholder='Código do Cliente'
                variant='outlined'
                error={Boolean(errors.bankClientId)}
                {...(errors.bankClientId && { helperText: errors.bankClientId.message as any })}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name='bankClientSecret'
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <CustomTextField
                fullWidth
                value={value || ''}
                onBlur={onBlur}
                label='Chave Secreta do Banco'
                onChange={onChange}
                placeholder='Chave Secreta'
                error={Boolean(errors.bankClientSecret)}
                {...(errors.bankClientSecret && { helperText: errors.bankClientSecret.message as any })}
                type={showBankClientSecret ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => setShowBankClientSecret(!showBankClientSecret)}
                      >
                        <Icon fontSize='1.25rem' icon={showBankClientSecret ? 'tabler:eye' : 'tabler:eye-off'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name='accountNumber'
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <CustomTextField
                fullWidth
                label='Número da Conta'
                value={value || ''}
                onBlur={onBlur}
                onChange={e => onChange(applyAccountNumberMask(e.target.value))}
                placeholder='Número da Conta'
                error={Boolean(errors.accountNumber)}
                {...(errors.accountNumber && { helperText: errors.accountNumber.message as any })}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name='agencyNumber'
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <CustomTextField
                fullWidth
                label='Número da Agência'
                value={value || ''}
                onBlur={onBlur}
                onChange={e => onChange(applyAgencyNumberMask(e.target.value))}
                placeholder='Número da Agência'
                error={Boolean(errors.agencyNumber)}
                {...(errors.agencyNumber && { helperText: errors.agencyNumber.message as any })}
              />
            )}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            paddingLeft: '0 !important'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 2
            }}
          >
            <Button variant='tonal' color='secondary' onClick={handleEditClose}>
              Cancelar
            </Button>
            <Button variant='contained' sx={{ ml: 2 }} onClick={handleSubmit(onSubmit)}>
              Salvar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  )
}

export default BB
