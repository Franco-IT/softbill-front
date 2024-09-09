import { AccordionDetails, Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'

import Icon from 'src/@core/components/icon'
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomDatePicker from 'src/components/CustomDatePicker'

import { BankAccountProps } from 'src/types/banks'

import { useAppSelector } from 'src/hooks/useAppSelector'
import { setBankId, setStartDate, setEndDate, handleExportFile } from 'src/store/modules/statement/reducer'
import { useAppDispatch } from 'src/hooks/useAppDispatch'
import toast from 'react-hot-toast'

interface FilterProps {
  filter: string
  handleFilter: (val: string) => void
}

interface ClientProps {
  clientId: string | null
  clientBanks: BankAccountProps[]
}

interface IntegrationProps {
  filterProps: FilterProps
  clientProps: ClientProps
}

const Integration = ({ filterProps, clientProps }: IntegrationProps) => {
  const { filter, handleFilter } = filterProps
  const { clientId, clientBanks } = clientProps

  const bankId = useAppSelector(state => state.StatementsReducer.operations.integration.bankId)
  const startDate = useAppSelector(state => state.StatementsReducer.operations.integration.startDate)
  const endDate = useAppSelector(state => state.StatementsReducer.operations.integration.endDate)

  const dispatch = useAppDispatch()

  const handleConvertStringToDate = (date: string | null) => {
    return date ? new Date(date) : null
  }

  const handleConvertDateToString = (date: Date | null) => {
    return date ? date.toISOString() : null
  }

  return (
    <AccordionDetails sx={{ py: 4 }}>
      <Grid container spacing={5} justifyContent={'space-between'}>
        <Grid item xs={12} md={6} xl={2}>
          <FormControl size='small' fullWidth>
            <InputLabel>Bancos</InputLabel>
            <Select label='Bancos' value={bankId ?? ''} onChange={e => dispatch(setBankId(e.target.value))}>
              <MenuItem value='' disabled>
                {clientId ? 'Selecione' : 'Selecione um cliente'}
              </MenuItem>
              {clientBanks.map(bank => (
                <MenuItem key={bank.id} value={bank.id}>
                  {bank.bank.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} xl={2}>
          <CustomDatePicker
            value={handleConvertStringToDate(startDate)}
            onChange={e => dispatch(setStartDate(handleConvertDateToString(e)))}
            placeholderText='Inicio'
          />
        </Grid>
        <Grid item xs={12} md={6} xl={2}>
          <CustomDatePicker
            value={handleConvertStringToDate(endDate)}
            onChange={e => dispatch(setEndDate(handleConvertDateToString(e)))}
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
              toast.promise(dispatch(handleExportFile({ bankId, startDate, endDate })).unwrap(), {
                loading: 'Exportando arquivo...',
                success: 'Arquivo exportado com sucesso!',
                error: 'Erro ao exportar arquivo, tente novamente mais tarde.'
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
