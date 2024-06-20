import React, { Dispatch, useCallback, useEffect } from 'react'
import { AccordionDetails, Button, Grid, Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import InputFileUpload from 'src/components/InputFileUpload'
import { StateImportProps, ActionsImport } from '../reducers/importReducer'
import { api } from 'src/services/api'
import toast from 'react-hot-toast'
import router from 'next/router'

interface ClientProps {
  clientId: string | null
}

interface PaginationProps {
  page: number
  perPage: number
  setTotalPages: (totalPages: number) => void
}

interface ImportStateProps {
  stateImport: StateImportProps
  dispatchStateImport: Dispatch<ActionsImport>
}

interface ImportProps {
  clientProps: ClientProps
  paginationProps: PaginationProps
  importStateProps: ImportStateProps
}

const Import = ({ importStateProps, clientProps, paginationProps }: ImportProps) => {
  const { clientId } = clientProps
  const { page, perPage, setTotalPages } = paginationProps
  const { stateImport, dispatchStateImport } = importStateProps

  const handleSetFile = (file: File | null) => {
    dispatchStateImport({ type: 'SET_FILE', payload: file })
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
          dispatchStateImport({ type: 'SET_PREVIEW', payload: preview.data })
        })
        .catch(() => toast.error('Erro ao gerar preview, tente novamente mais tarde.'))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatchStateImport, page, perPage]
  )

  const handleExportFile = async (file: File, clientId: string) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('clientId', clientId)

    try {
      const response = await api.post('/bankAccounts/ofx-export', formData)
      router.push(response.data)
    } catch (error) {
      toast.error('Erro ao exportar arquivo, tente novamente mais tarde.')
    }
  }

  useEffect(() => {
    const { preview } = stateImport

    if (preview.length > 0) handleGeneratePreview(stateImport.file as File)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleGeneratePreview, page, perPage])

  return (
    <AccordionDetails sx={{ py: 4 }}>
      <Grid container spacing={5} justifyContent={'space-between'}>
        <Grid item xs={12} md={6} xl={4}>
          {!stateImport.file ? (
            <InputFileUpload
              text='Importar arquivo OFX'
              accept='.ofx'
              IconComponent={CloudUploadIcon}
              onChange={e => handleSetFile(e.target.files ? e.target.files[0] : null)}
            />
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button fullWidth variant='contained' onClick={() => handleSetFile(null)}>
                  Cancelar
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant='contained'
                  startIcon={<Icon icon='tabler:eye' />}
                  onClick={() => handleGeneratePreview(stateImport.file as File)}
                >
                  Preview
                </Button>
              </Grid>
            </Grid>
          )}
          <Typography variant='body2' color='text.secondary' mt={2}>
            {stateImport.file ? stateImport.file.name : 'Nenhum arquivo selecionado'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} xl={4}>
          <Button
            fullWidth
            variant='contained'
            disabled={!stateImport.file}
            sx={{ '& svg': { mr: 2 } }}
            onClick={() => handleExportFile(stateImport.file as File, clientId as string)}
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
