import { Dispatch } from 'react'
import { AccordionDetails, Button, Grid, Typography } from '@mui/material'

import Icon from 'src/@core/components/icon'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

import InputFileUpload from 'src/components/InputFileUpload'

import { StateImportProps, ActionsImport } from '../reducers/importReducer'

interface ClientProps {
  clientId: string | null
}

interface ImportStateProps {
  stateImport: StateImportProps
  dispatchStateImport: Dispatch<ActionsImport>
}

interface ImportProps {
  importStateProps: ImportStateProps
  clientProps: ClientProps
}

const Import = ({ importStateProps, clientProps }: ImportProps) => {
  const { stateImport, dispatchStateImport } = importStateProps
  const { clientId } = clientProps

  return (
    <AccordionDetails sx={{ py: 4 }}>
      <Grid container spacing={5} justifyContent={'space-between'}>
        <Grid item xs={12} md={6} xl={4}>
          {!stateImport.file ? (
            <InputFileUpload
              text='Importar arquivo OFX'
              accept='.ofx'
              IconComponent={CloudUploadIcon}
              onChange={e =>
                dispatchStateImport({
                  type: 'SET_FILE',
                  payload: e.target.files ? e.target.files[0] : null
                })
              }
            />
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant='contained'
                  onClick={() =>
                    dispatchStateImport({
                      type: 'SET_FILE',
                      payload: null
                    })
                  }
                >
                  Cancelar
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant='contained'
                  startIcon={<Icon icon='tabler:eye' />}
                  onClick={() =>
                    dispatchStateImport({
                      type: 'SEND_FILE',
                      payload: stateImport.file as File
                    })
                  }
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
            onClick={() =>
              dispatchStateImport({
                type: 'EXPORT_FILE',
                payload: {
                  file: stateImport.file as File,
                  clientId: clientId as string
                }
              })
            }
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
