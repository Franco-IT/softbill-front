import { useFormContext, Controller } from 'react-hook-form'
import { TypeMapEntry } from './dtos'
import { Grid } from '@mui/material'

export const DynamicFormFields = ({ typeMap, fields }: { typeMap: Record<string, TypeMapEntry>; fields: string[] }) => {
  const {
    control,
    formState: { errors }
  } = useFormContext()

  return (
    <Grid container spacing={5}>
      {fields.map(field => {
        if (!typeMap[field]) return null

        const { Input, inputProps, options, startAdornment, endAdornment, mask } = typeMap[field]

        if (field === 'files') {
          return (
            <Grid item xs={12} key={field}>
              <Controller
                name={field}
                control={control}
                render={({ field: controllerField }) => {
                  return <Input {...controllerField} field={field} inputProps={inputProps} errors={errors} />
                }}
              />
            </Grid>
          )
        }

        return (
          <Grid item xs={12} sm={6} key={field}>
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
