import React from 'react'

import { IconButton, InputAdornment, MenuItem } from '@mui/material'

import Icon from 'src/@core/components/icon'
import CustomTextField from 'src/@core/components/mui/text-field'

import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import FileUploaderRestrictions from 'src/components/FileUploaderRestrictions'
import { TypeMapEntry } from './dtos'
import { Message, MultipleFieldErrors, Ref } from 'react-hook-form'
import { filesTypesBanks } from './schemas'

type FieldError = {
  type: string
  ref?: Ref
  types?: MultipleFieldErrors
  message?: Message
}

interface InputProps extends TypeMapEntry {
  errors: {
    [key: string]: FieldError
  }
  field: string
}

export const NumberInput = React.forwardRef(
  ({ field, errors, onChange, inputProps, onBlur, value, startAdornment }: InputProps, ref) => {
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
  }
)

export const SelectInput = React.forwardRef(
  ({ field, errors, options, onChange, inputProps, onBlur, value }: InputProps, ref) => {
    const selectedValue = value !== undefined ? value : ''

    return (
      <CustomTextField
        ref={ref}
        fullWidth
        select
        label={inputProps.label}
        placeholder={inputProps.placeholder}
        error={!!errors[field]}
        value={selectedValue}
        onChange={onChange}
        onBlur={onBlur}
      >
        <MenuItem value='' disabled>
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
  }
)

export const StringInput = React.forwardRef(
  ({ field, errors, inputProps, endAdornment, mask, value, onChange, onBlur }: InputProps, ref) => {
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
  }
)

export const SensitiveInput = React.forwardRef(
  ({ field, errors, inputProps, onChange, onBlur, value }: InputProps, ref) => {
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
  }
)

export const FileInput = React.forwardRef(({ field, errors, inputProps, onChange, value }: InputProps, ref) => {
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
