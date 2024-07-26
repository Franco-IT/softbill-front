import { Fragment } from 'react'

import Icon from 'src/@core/components/icon'

import { Box, List, Button, ListItem, Typography, IconButton } from '@mui/material'

import toast from 'react-hot-toast'
import { useDropzone } from 'react-dropzone'

interface FileProp {
  name: string
  type: string
  size: number
}

interface FileUploaderRestrictionsProps {
  accept: Record<string, string[]>
  onChange: (files: any) => void
  value: File[]
  inputProps?: any
  onError: boolean
}

const FileUploaderRestrictions = ({
  accept,
  onChange,
  value: files,
  onError,
  inputProps
}: FileUploaderRestrictionsProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 2,
    maxSize: 20000000,
    accept,
    onDrop: (acceptedFiles: File[]) => {
      const fileExists = files.some(file => acceptedFiles.some(acceptedFile => acceptedFile.name === file.name))
      if (fileExists) {
        return toast.error('Arquivo já adicionado.', {
          duration: 2000
        })
      }
      const newFile = [...files, ...acceptedFiles]

      onChange(newFile)
    },
    onDropRejected: () => {
      toast.error('Ocorreu um erro, verifique o tipo ou tamanho do arquivo.', {
        duration: 2000
      })
    }
  })

  const renderFilePreview = (file: FileProp) => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file as any)} />
    } else {
      return <Icon icon='tabler:file-description' />
    }
  }

  const handleRemoveFile = (file: FileProp) => {
    const filtered = files.filter((i: File) => i.name !== file.name)
    filtered.length ? onChange(filtered) : onChange(undefined)
  }

  const fileList = files.map((file: FileProp) => (
    <ListItem key={file.name}>
      <div className='file-details'>
        <div className='file-preview'>{renderFilePreview(file)}</div>
        <div>
          <Typography className='file-name'>{file.name}</Typography>
          <Typography className='file-size' variant='body2'>
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <Icon icon='tabler:x' fontSize={20} />
      </IconButton>
    </ListItem>
  ))

  const handleRemoveAllFiles = () => {
    onChange(undefined)
  }

  return (
    <Fragment>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Box
            sx={{
              mb: 8.75,
              width: 48,
              height: 48,
              display: 'flex',
              borderRadius: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.08)`
            }}
          >
            <Icon icon='tabler:upload' fontSize='1.75rem' />
          </Box>
          <Typography variant='h4' sx={{ mb: 2.5 }} color={onError ? '#ea5455' : ''}>
            {!onError ? inputProps.label : 'É necessário adicionar os arquivos solicitados'}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Aceita arquivos do tipo {'  '}
            {Object.keys(accept)
              .map(type => `*${accept[type].join(', *')}`)
              .join(', ')}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Tamanho máximo 2 MB</Typography>
        </Box>
      </div>
      {files.length ? (
        <Fragment>
          <List>{fileList}</List>
          <div className='buttons'>
            <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
              Remover Todos
            </Button>
          </div>
        </Fragment>
      ) : null}
    </Fragment>
  )
}

export default FileUploaderRestrictions
