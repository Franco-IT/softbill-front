import Grid from '@mui/material/Grid'
import CustomTextField from 'src/@core/components/mui/text-field'
import { Controller, useFormContext } from 'react-hook-form'
import { IconButton, InputAdornment } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { useState } from 'react'

const BB = () => {
  const [showBankClientSecret, setShowBankClientSecret] = useState<boolean>(false)

  const {
    control: control,
    formState: { errors }
  } = useFormContext()

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={6}>
        <Controller
          name='bankClientId'
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <CustomTextField
              fullWidth
              autoFocus
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
              onChange={onChange}
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
              onChange={onChange}
              placeholder='Número da Agência'
              error={Boolean(errors.agencyNumber)}
              {...(errors.agencyNumber && { helperText: errors.agencyNumber.message as any })}
            />
          )}
        />
      </Grid>
    </Grid>
  )
}

export default BB
