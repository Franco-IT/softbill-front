import { useRouter } from 'next/router'

import {
  CardHeader,
  Grid,
  Box,
  Button,
  IconButton,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Accordion,
  AccordionSummary,
  Typography,
  Divider,
  AccordionDetails,
  BoxProps,
  styled,
  Radio
} from '@mui/material'

import CustomTextField from 'src/@core/components/mui/text-field'

import Icon from 'src/@core/components/icon'
import CustomDatePicker from 'src/components/CustomDatePicker'
import IconifyIcon from 'src/@core/components/icon'
import { ClientProps } from 'src/types/clients'
import { BankAccountProps } from 'src/types/banks'
import { StateIntegrationProps } from './reducers/integrationReducer'
import { SyntheticEvent, useState } from 'react'
import { OperationTypeProps } from '.'
import { api } from 'src/services/api'
import toast from 'react-hot-toast'

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  borderWidth: 1,
  display: 'flex',
  cursor: 'pointer',
  borderStyle: 'solid',
  padding: theme.spacing(5),
  borderColor: theme.palette.divider,
  '&:first-of-type': {
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius
  },
  '&:last-of-type': {
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius
  }
}))

interface TableHeaderProps {
  filter: string
  handleFilter: (val: string) => void
  clients: ClientProps[]
  clientId: string
  setClientId: (val: string | null) => void
  clientBanks: BankAccountProps[]
  handleResetClientBanks: () => void
  stateIntegration: StateIntegrationProps
  dispatchStateIntegration: any
  operationType: OperationTypeProps
  setOperationType: (val: OperationTypeProps) => void
}

const TableHeader = (props: TableHeaderProps) => {
  const router = useRouter()

  const {
    handleFilter,
    filter,
    clientId,
    clients,
    setClientId,
    clientBanks,
    handleResetClientBanks,
    stateIntegration,
    dispatchStateIntegration,
    operationType,
    setOperationType
  } = props

  const { bankId, startDate, endDate } = stateIntegration

  const [expanded, setExpanded] = useState<string | false>('panel1')

  const handleClickExport = () => {
    api
      .get(`/bankAccounts/export-bank-data/${bankId}?exportFileType=CSV`, { params: { startDate, endDate } })
      .then(response => {
        router.push(response.data)
      })
      .catch(() => {
        toast.error('Erro ao exportar arquivo.')
      })
  }

  const OperationIntegration = (clientBanks: BankAccountProps[]) => (
    <>
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
        <Button fullWidth variant='contained' sx={{ '& svg': { mr: 2 } }} onClick={handleClickExport}>
          <Icon fontSize='1.125rem' icon='tabler:file-export' />
          Exportar
        </Button>
      </Grid>
    </>
  )

  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleSelectClient = (val: string) => {
    if (!val) {
      setClientId(null)
      dispatchStateIntegration({
        type: 'SET_BANK_ID',
        payload: null
      })
      handleResetClientBanks()

      return
    }

    setClientId(val)
  }

  const handleClickBack = () => {
    if (router.query.client)
      router.push({
        pathname: '/clientes/[id]',
        query: { id: router.query.client, tab: 'banks' }
      })
  }

  return (
    <Grid container gap={3} paddingX={6} paddingY={4} justifyContent={'space-between'}>
      <Box display='flex'>
        <CardHeader
          title='Extrato Bancário'
          avatar={
            <IconButton title='Voltar' aria-label='Voltar' onClick={handleClickBack}>
              <IconifyIcon icon='material-symbols:arrow-back' />
            </IconButton>
          }
          sx={{
            padding: 0
          }}
        />
      </Box>

      <Grid container spacing={5} justifyContent={'space-between'}>
        <Grid item xs={12} md={6} xl={4}>
          <FormControl size='small' fullWidth>
            <InputLabel>Clientes</InputLabel>
            <Select label='Clientes' value={clientId || ''} onChange={e => handleSelectClient(e.target.value)}>
              <MenuItem disabled>Selecione</MenuItem>
              <MenuItem value=''>Nenhum</MenuItem>
              {clients.map(client => (
                <MenuItem key={client._id} value={client._id}>
                  {client.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} disabled={!clientId}>
            <AccordionSummary
              expandIcon={<Icon icon='tabler:chevron-down' />}
              id='form-layouts-collapsible-header-2'
              aria-controls='form-layouts-collapsible-content-2'
            >
              <Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
                Opções de Operações (selecione um cliente para acessar as opções)
              </Typography>
            </AccordionSummary>
            <Divider sx={{ m: '0 !important' }} />
            <AccordionDetails sx={{ pt: 6, pb: 6 }}>
              <BoxWrapper
                onClick={() => setOperationType('INTEGRATION')}
                sx={operationType === 'INTEGRATION' ? { borderColor: 'primary.main' } : {}}
              >
                <Radio
                  value='Integração'
                  checked={operationType === 'INTEGRATION'}
                  name='form-layouts-collapsible-options-radio'
                  inputProps={{ 'aria-label': 'INTEGRATION' }}
                  sx={{ mr: 2, ml: -2.5, mt: -2.5, alignItems: 'flex-start' }}
                />
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontWeight: 500 }}>Integração</Typography>
                    <Typography sx={{ fontWeight: 500 }}>Grátis</Typography>
                  </Box>
                  <Typography variant='body2'>Selecione um banco já vinculado ao cliente.</Typography>
                </Box>
              </BoxWrapper>
              <BoxWrapper
                onClick={() => setOperationType('IMPORT')}
                sx={operationType === 'IMPORT' ? { borderColor: 'primary.main' } : {}}
              >
                <Radio
                  value='IMPORT'
                  checked={operationType === 'IMPORT'}
                  name='form-layouts-collapsible-options-radio'
                  inputProps={{ 'aria-label': 'Importação' }}
                  sx={{ mr: 2, ml: -2.5, mt: -2.5, alignItems: 'flex-start' }}
                />
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontWeight: 500 }}>Importação</Typography>
                    <Typography sx={{ fontWeight: 500 }}>Grátis</Typography>
                  </Box>
                  <Typography variant='body2'>Importe o arquivo que você deseja formatar e exportar.</Typography>
                </Box>
              </BoxWrapper>
            </AccordionDetails>
          </Accordion>
        </Grid>
        {operationType === 'INTEGRATION' && clientBanks && OperationIntegration(clientBanks)}
      </Grid>
    </Grid>
  )
}

export default TableHeader
