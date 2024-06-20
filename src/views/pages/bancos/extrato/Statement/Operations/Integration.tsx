import { AccordionDetails, Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'

import Icon from 'src/@core/components/icon'
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomDatePicker from 'src/components/CustomDatePicker'

import { BankAccountProps } from 'src/types/banks'
import { ActionsIntegration, StateIntegrationProps } from '../reducers/integrationReducer'
import { Dispatch } from 'react'

interface FilterProps {
  filter: string
  handleFilter: (val: string) => void
}

interface ClientProps {
  clientId: string | null
  clientBanks: BankAccountProps[]
}

interface IntegrationStateProps {
  stateIntegration: StateIntegrationProps
  dispatchStateIntegration: Dispatch<ActionsIntegration>
}

interface IntegrationProps {
  filterProps: FilterProps
  clientProps: ClientProps
  integrationStateProps: IntegrationStateProps
}

const Integration = ({ filterProps, clientProps, integrationStateProps }: IntegrationProps) => {
  const { filter, handleFilter } = filterProps
  const { clientId, clientBanks } = clientProps
  const { stateIntegration, dispatchStateIntegration } = integrationStateProps

  const { bankId, startDate, endDate } = stateIntegration

  return (
    <AccordionDetails sx={{ py: 4 }}>
      <Grid container spacing={5} justifyContent={'space-between'}>
        <Grid item xs={12} md={6} xl={2}>
          <FormControl size='small' fullWidth>
            <InputLabel>Bancos</InputLabel>
            <Select
              label='Bancos'
              value={bankId ?? ''}
              onChange={e =>
                dispatchStateIntegration({
                  type: 'SET_BANK_ID',
                  payload: e.target.value
                })
              }
            >
              <MenuItem value='' disabled>
                {clientId ? 'Selecione' : 'Selecione um cliente'}
              </MenuItem>
              {clientBanks.map(bank => (
                <MenuItem key={bank._id} value={bank._id}>
                  {bank.bank.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} xl={2}>
          <CustomDatePicker
            value={startDate}
            onChange={e =>
              dispatchStateIntegration({
                type: 'SET_START_DATE',
                payload: e
              })
            }
            placeholderText='Inicio'
          />
        </Grid>
        <Grid item xs={12} md={6} xl={2}>
          <CustomDatePicker
            value={endDate}
            onChange={e =>
              dispatchStateIntegration({
                type: 'SET_END_DATE',
                payload: e
              })
            }
            placeholderText='Fim'
          />
        </Grid>
        <Grid item xs={12} md={6} xl={2}>
          <CustomTextField fullWidth value={filter} placeholder='Buscar' onChange={e => handleFilter(e.target.value)} />
        </Grid>
        <Grid item xs={12} md={6} xl={2}>
          <Button
            fullWidth
            variant='contained'
            sx={{ '& svg': { mr: 2 } }}
            onClick={() =>
              dispatchStateIntegration({
                type: 'EXPORT_FILE',
                payload: {
                  bankId: bankId || '',
                  startDate,
                  endDate
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

export default Integration
