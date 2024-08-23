import { Box, Button, CardActions } from '@mui/material'

import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import FileUploaderRestrictions from 'src/components/FileUploaderRestrictions'

export const FILE_TYPES: { [key: string]: string[] } = {
  'application/ofx': ['.ofx']
}

const MAX_FILE_SIZE = 2 * 1024 * 1024

const isValidFileType = (file: File | null): boolean => {
  if (!file) return false

  const allowedExtensions = FILE_TYPES[file.type || 'application/ofx']
  if (!allowedExtensions) return false

  const fileExtension = file.name.split('.').pop()

  return fileExtension ? allowedExtensions.includes(`.${fileExtension}`) : false
}

const schema = yup.object().shape({
  files: yup
    .array()
    .of(
      yup
        .mixed<File>()
        .required('Arquivos obrigatórios')
        .test('fileSize', 'O arquivo deve ter menos de 2MB', value => !value || value.size <= MAX_FILE_SIZE)
        .test('fileType', 'Tipo de arquivo não permitido', value => isValidFileType(value))
    )
    .required('Arquivos obrigatórios')
    .min(1, 'Você deve fornecer pelo menos um arquivo do tipo .ofx')
})

const Actions = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      files: []
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: any) => console.log(data)

  return (
    <CardActions
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4
      }}
    >
      <DropzoneWrapper
        sx={{
          width: '100%',
          border: theme => (!!errors.files ? `1px solid ${theme.palette.error.main}` : 'none')
        }}
      >
        <Controller
          name='files'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <FileUploaderRestrictions
              accept={FILE_TYPES}
              error={errors?.files?.message || errors?.files?.[0]?.message || ''}
              onChange={onChange}
              value={value}
              onError={!!errors.files}
              inputProps={{
                name: 'file'
              }}
            />
          )}
        />
      </DropzoneWrapper>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button variant='contained' color='primary' onClick={handleSubmit(onSubmit)}>
          Enviar
        </Button>
      </Box>
    </CardActions>
  )
}

export default Actions
