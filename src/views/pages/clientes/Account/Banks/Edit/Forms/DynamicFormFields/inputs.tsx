import React, { Fragment, memo, useEffect } from 'react'

import { IconButton, InputAdornment, MenuItem } from '@mui/material'

import Icon from 'src/@core/components/icon'
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'

import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import FileUploaderRestrictions from 'src/components/FileUploaderRestrictions'
import { TypeMapEntry } from './dtos'
import { Message, MultipleFieldErrors, Ref } from 'react-hook-form'
import { filesTypesBanks } from './schemas'

import CircularProgress from '@mui/material/CircularProgress'

import { useQuery } from 'react-query'
import { api } from 'src/services/api'

type FieldError = {
  type: string
  ref?: Ref
  types?: MultipleFieldErrors
  message?: Message
}

interface InputProps extends TypeMapEntry {
  errors: {
    [key: string]: FieldError | any
  }
  field: string
}

export const NumberInput = memo(
  React.forwardRef(({ field, errors, onChange, inputProps, onBlur, value, startAdornment }: InputProps, ref) => {
    return (
      <CustomTextField
        ref={ref}
        fullWidth
        type='number'
        label={inputProps.label}
        placeholder={inputProps.placeholder}
        error={!!errors[field]}
        helperText={errors[field]?.message}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        InputProps={{
          startAdornment: startAdornment
        }}
      />
    )
  })
)

export const ImportedBanksInput = memo(
  React.forwardRef(
    ({ field, errors, inputProps, onChange: onChangeValue, onBlur, value: currentValue }: InputProps, ref) => {
      const [open, setOpen] = React.useState<boolean>(false)
      const [options, setOptions] = React.useState<any[]>([])
      const [search, setSearch] = React.useState<string>('')

      const {
        data: banks,
        isLoading: isLoadingBanks,
        isError: isErrorBanks
      } = useQuery(
        ['bank-options', search],
        async () => {
          const response = await api.get('/banks', { params: { search } })

          return response.data
        },
        {
          enabled: !!search
        }
      )

      const {
        data: bank,
        isLoading: isLoadingBank,
        isError: isErrorBank
      } = useQuery(
        ['bank-option', currentValue],
        async () => {
          const response = await api.get('/banks/' + currentValue)

          return response.data
        },
        {
          enabled: !search && !!currentValue
        }
      )

      useEffect(() => {
        if (isErrorBanks || isErrorBank) {
          setOptions([])
        } else if (banks) {
          setOptions(banks.data)
        } else if (bank) {
          setOptions([bank.data])
        }
      }, [bank, banks, isErrorBank, isErrorBanks])

      useEffect(() => {
        if (!open) {
          setOptions([])
        }
      }, [open])

      return (
        <CustomAutocomplete
          ref={ref}
          open={open}
          options={options}
          loading={isLoadingBanks || isLoadingBank}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          getOptionLabel={option => option.name || ''}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          noOptionsText={search ? 'Nenhum resultado encontrado' : 'Digite para buscar'}
          loadingText='Carregando...'
          onInputChange={(event, newInputValue) => setSearch(newInputValue)}
          onChange={(event, newValue) => {
            if (onChangeValue)
              onChangeValue({
                id: newValue?.id || undefined,
                name: newValue?.name || undefined
              })
          }}
          value={currentValue}
          renderInput={params => (
            <CustomTextField
              {...params}
              label={inputProps.label}
              placeholder={inputProps.placeholder}
              onBlur={onBlur}
              error={!!errors[field]}
              helperText={errors[field]?.message || errors[field]?.id?.message || errors[field]?.name?.message}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <Fragment>
                    {isLoadingBanks ? <CircularProgress size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </Fragment>
                )
              }}
            />
          )}
        />
      )
    }
  )
)

export const SelectInput = memo(
  React.forwardRef(({ field, errors, options, onChange, inputProps, onBlur, value }: InputProps, ref) => {
    const selectedValue = value !== undefined ? value : 'default'

    return (
      <CustomTextField
        ref={ref}
        fullWidth
        select
        label={inputProps.label}
        placeholder={inputProps.placeholder}
        required={inputProps.required}
        error={!!errors[field]}
        helperText={errors[field]?.message}
        value={selectedValue}
        onChange={onChange}
        onBlur={onBlur}
      >
        <MenuItem value='default' disabled>
          Selecione
        </MenuItem>
        {options &&
          options.map((option: any) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
      </CustomTextField>
    )
  })
)

export const StringInput = memo(
  React.forwardRef(({ field, errors, inputProps, endAdornment, mask, value, onChange, onBlur }: InputProps, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = event.target.value

      if (mask) newValue = mask(newValue)

      onChange && onChange(newValue)
    }

    return (
      <CustomTextField
        ref={ref}
        fullWidth
        label={inputProps.label}
        placeholder={inputProps.placeholder}
        error={!!errors[field]}
        helperText={errors[field]?.message}
        onChange={(e: any) => handleChange(e)}
        value={value || ''}
        onBlur={onBlur}
        InputProps={{
          endAdornment: endAdornment
        }}
      />
    )
  })
)

export const SensitiveInput = memo(
  React.forwardRef(({ field, errors, inputProps, onChange, onBlur, value }: InputProps, ref) => {
    const [showSensitiveText, setShowSensitiveText] = React.useState(false)

    return (
      <CustomTextField
        ref={ref}
        fullWidth
        type={showSensitiveText ? 'text' : 'password'}
        label={inputProps.label}
        placeholder={inputProps.placeholder}
        error={!!errors[field]}
        helperText={errors[field]?.message}
        value={value || ''}
        onChange={onChange}
        onBlur={onBlur}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                edge='end'
                onMouseDown={e => e.preventDefault()}
                onClick={() => setShowSensitiveText(!showSensitiveText)}
              >
                <Icon fontSize='1.25rem' icon={showSensitiveText ? 'tabler:eye' : 'tabler:eye-off'} />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    )
  })
)

export const FileInput = memo(
  React.forwardRef(({ field, errors, inputProps, onChange, value }: InputProps, ref) => {
    const handleOnChange = (files: any) => {
      onChange && onChange(files)
    }

    return (
      <DropzoneWrapper
        ref={ref}
        style={{
          border: !!errors[field] ? '1px solid #ea5455' : 'none'
        }}
      >
        <FileUploaderRestrictions
          accept={filesTypesBanks[inputProps.bank as string]}
          onChange={handleOnChange}
          value={value || []}
          inputProps={inputProps}
          onError={!!errors[field]}
          error={errors[field]?.message}
        />
      </DropzoneWrapper>
    )
  })
)