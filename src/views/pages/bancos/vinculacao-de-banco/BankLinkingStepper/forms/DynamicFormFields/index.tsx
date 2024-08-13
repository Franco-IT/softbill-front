import { useMemo } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { TypeMapEntry } from './dtos'
import { Grid } from '@mui/material'

export const DynamicFormFields = ({ typeMap, fields }: { typeMap: Record<string, TypeMapEntry>; fields: string[] }) => {
  const {
    control,
    formState: { errors }
  } = useFormContext()

  const typeMapFieldsLength = Object.keys(typeMap).length

  const calculateGridSize = useMemo(
    () => (index: number, fieldsLength: number, field: string) => {
      return (fieldsLength % 2 !== 0 && index === fieldsLength) || field === 'files'
        ? { xs: 12, sm: 12 }
        : { xs: 12, sm: 6 }
    },
    []
  )

  return (
    <Grid container spacing={5}>
      {fields.map((field, index) => {
        if (!typeMap[field]) return null

        const { Input, inputProps, options, startAdornment, endAdornment, mask } = typeMap[field]
        const gridSize = calculateGridSize(index, typeMapFieldsLength, field)

        return (
          <Grid item {...gridSize} key={field}>
            <Controller
              name={field}
              control={control}
              render={({ field: controllerField }) => {
                return (
                  <Input
                    {...controllerField}
                    field={field}
                    inputProps={inputProps}
                    options={options}
                    startAdornment={startAdornment}
                    endAdornment={endAdornment}
                    errors={errors}
                    mask={mask}
                  />
                )
              }}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}
