import React, { useCallback, useEffect } from 'react'
import { AccordionDetails, Button, Grid, Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import InputFileUpload from 'src/components/InputFileUpload'
import { api } from 'src/services/api'
import toast from 'react-hot-toast'

import { useAppDispatch } from 'src/hooks/useAppDispatch'
import { useAppSelector } from 'src/hooks/useAppSelector'
import { setFile, setStatements, handleExportFileOFX } from 'src/store/modules/statement/reducer'

interface ClientProps {
  clientId: string | null
}

interface PaginationProps {
  page: number
  perPage: number
  setTotalPages: (totalPages: number) => void
}

interface ImportProps {
  clientProps: ClientProps
  paginationProps: PaginationProps
}

const Import = ({ clientProps, paginationProps }: ImportProps) => {
  const { clientId } = clientProps
  const { page, perPage, setTotalPages } = paginationProps

  const fileOFX = useAppSelector(state => state.StatementsReducer.operations.import.fileOFX)
  const statements = useAppSelector(state => state.StatementsReducer.statements)

  const dispatch = useAppDispatch()

  const fileToJSON = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const fileData = {
          name: file.name,
          type: file.type,
          size: file.size,
          lastModified: file.lastModified,
          content: reader.result as string
        }
        resolve(JSON.stringify(fileData))
      }
      reader.onerror = error => reject(error)
      reader.readAsDataURL(file)
    })
  }

  const jsonToFile = (fileJSON: string): File => {
    const fileData = JSON.parse(fileJSON)
    const byteString = atob(fileData.content.split(',')[1])
    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }
    const blob = new Blob([ab], { type: fileData.type })

    return new File([blob], fileData.name, { lastModified: fileData.lastModified })
  }

  const handleSetFile = (file: File | null) => {
    if (!file) return dispatch(setFile({ fileOFX: null }))

    fileToJSON(file).then(file => dispatch(setFile({ fileOFX: file })))
  }

  const handleClickCancel = () => {
    dispatch(setFile({ fileOFX: null }))
    dispatch(setStatements([]))
  }

  const handleGeneratePreview = useCallback(
    (file: File) => {
      const formData = new FormData()
      formData.append('file', file)

      api
        .post('/bankAccounts/ofx-preview', formData, {
          params: {
            page,
            perPage
          }
        })
        .then(response => {
          const preview = response.data
          setTotalPages(preview.total)
          dispatch(setStatements(preview.data))
        })
        .catch(() => toast.error('Erro ao gerar preview, tente novamente mais tarde.'))
    },
    [dispatch, page, perPage, setTotalPages]
  )

  useEffect(() => {
    if (fileOFX && statements.length > 0) handleGeneratePreview(jsonToFile(fileOFX))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleGeneratePreview, page, perPage, statements.length])

  return (
    <AccordionDetails sx={{ py: 4 }}>
      <Grid container spacing={5} justifyContent={'space-between'}>
        <Grid item xs={12} md={6} xl={4}>
          {!fileOFX ? (
            <InputFileUpload
              text='Importar arquivo OFX'
              accept='.ofx'
              IconComponent={CloudUploadIcon}
              onChange={e => handleSetFile(e.target.files ? e.target.files[0] : null)}
            />
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button fullWidth variant='contained' onClick={handleClickCancel}>
                  Cancelar
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant='contained'
                  startIcon={<Icon icon='tabler:eye' />}
                  onClick={() => handleGeneratePreview(jsonToFile(fileOFX))}
                >
                  Preview
                </Button>
              </Grid>
            </Grid>
          )}
          <Typography variant='body2' color='text.secondary' mt={2}>
            {fileOFX ? jsonToFile(fileOFX).name : 'Nenhum arquivo selecionado'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} xl={4}>
          <Button
            fullWidth
            variant='contained'
            disabled={!fileOFX}
            sx={{ '& svg': { mr: 2 } }}
            onClick={() => {
              if (clientId && fileOFX) {
                toast.promise(dispatch(handleExportFileOFX({ clientId, fileOFX: jsonToFile(fileOFX) })).unwrap(), {
                  loading: 'Exportando arquivo...',
                  success: 'Arquivo exportado com sucesso!',
                  error: 'Erro ao exportar arquivo, tente novamente mais tarde.'
                })
              }
            }}
          >
            <Icon fontSize='1.125rem' icon='tabler:file-export' />
            Exportar
          </Button>
        </Grid>
      </Grid>
    </AccordionDetails>
  )
}

export default Import
