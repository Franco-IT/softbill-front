import { SyntheticEvent, useEffect, useState } from 'react'

import {
  CardHeader,
  Grid,
  Box,
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

import Icon from 'src/@core/components/icon'

import { OperationTypeProps } from '.'
import { ClientProps } from 'src/types/clients'
import { BankAccountProps } from 'src/types/banks'

import Import from './Operations/Import'
import Integration from './Operations/Integration'

import { useAppDispatch } from 'src/hooks/useAppDispatch'
import { setClientId, setBankId, setOperationType, setFile, setStatements } from 'src/store/modules/statement/reducer'
import { useAppSelector } from 'src/hooks/useAppSelector'

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

interface FilterProps {
  filter: string
  handleFilter: (val: string) => void
}

interface PaginationProps {
  page: number
  perPage: number
  setTotalPages: (totalPages: number) => void
}

interface ClientComponentProps {
  clients: ClientProps[]
}

interface ClientBanksProps {
  clientBanks: BankAccountProps[]
  handleResetClientBanks: () => void
}

interface TableHeaderProps {
  filterProps: FilterProps
  paginationProps: PaginationProps
  clientProps: ClientComponentProps
  clientBanksProps: ClientBanksProps
}

const TableHeader = ({ filterProps, clientProps, paginationProps, clientBanksProps }: TableHeaderProps) => {
  const { clients } = clientProps
  const { clientBanks, handleResetClientBanks } = clientBanksProps

  const clientId = useAppSelector(state => state.StatementsReducer.clientId)
  const operationType = useAppSelector(state => state.StatementsReducer.operationType)

  const dispatch = useAppDispatch()

  const [expanded, setExpanded] = useState<string | false>('panel1')

  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleSelectClient = (val: string) => {
    if (!val) {
      dispatch(setBankId(null))
      dispatch(setClientId(null))
      dispatch(setOperationType(null))
      dispatch(setFile({ fileOFX: null }))
      dispatch(setStatements([]))

      handleResetClientBanks()

      return
    }

    dispatch(setClientId(val))
  }

  const handleSelectOperationType = (val: OperationTypeProps) => {
    if (operationType === val) return null

    dispatch(setStatements([]))

    switch (val) {
      case 'INTEGRATION':
        dispatch(setOperationType('INTEGRATION'))
        dispatch(
          setFile({
            fileOFX: null
          })
        )
        break
      case 'IMPORT':
        dispatch(setBankId(null))
        dispatch(setOperationType('IMPORT'))
        break
      default:
        dispatch(setOperationType(null))
    }
  }

  const handleCheckOperationType = (operationType: string | null) => {
    if (!operationType) return null

    return operationType === 'INTEGRATION' ? 'Integração' : 'Importação'
  }

  const handleCheckOperationTypeSelected = (operationType: string | null) => {
    if (!operationType) return null

    return operationType === 'INTEGRATION'
      ? 'Selecione um banco já vinculado ao cliente'
      : 'Importe o arquivo OFX que você deseja exportar'
  }

  useEffect(() => {
    if (!clientId && !operationType) setExpanded(false)

    if (clientId && !operationType) setExpanded('panel2')

    if (clientId && operationType) setExpanded('panel3')
  }, [clientId, operationType])

  const operationClientProps = {
    clientId,
    clientBanks
  }

  return (
    <Grid container gap={4} paddingX={6} paddingY={5} justifyContent={'space-between'}>
      <Box display='flex'>
        <CardHeader title='Extrato Bancário' sx={{ padding: 0 }} />
      </Box>
      <Grid container pb={4} justifyContent={'space-between'}>
        <Grid item mb={2} xs={12} md={6} xl={4}>
          <FormControl size='small' fullWidth>
            <InputLabel>Clientes</InputLabel>
            <Select label='Clientes' value={clientId || ''} onChange={e => handleSelectClient(e.target.value)}>
              <MenuItem disabled>Selecione</MenuItem>
              <MenuItem value=''>Nenhum</MenuItem>
              {clients.map(client => (
                <MenuItem key={client.id} value={client.id}>
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
                {handleCheckOperationType(operationType) ||
                  'Opções de Operações (selecione um cliente para acessar as opções)'}
              </Typography>
            </AccordionSummary>
            <Divider sx={{ m: '0 !important' }} />
            <AccordionDetails sx={{ pt: 6, pb: 6 }}>
              <BoxWrapper
                onClick={() => handleSelectOperationType('INTEGRATION')}
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
                onClick={() => handleSelectOperationType('IMPORT')}
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
        <Grid item xs={12}>
          <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} disabled={!operationType}>
            <AccordionSummary
              expandIcon={<Icon icon='tabler:chevron-down' />}
              id='form-layouts-collapsible-header-2'
              aria-controls='form-layouts-collapsible-content-2'
            >
              <Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
                {handleCheckOperationTypeSelected(operationType) || 'Selecione uma operação para acessar as opções'}
              </Typography>
            </AccordionSummary>
            <Divider sx={{ m: '0 !important' }} />
            {operationType === 'INTEGRATION' && clientBanks && (
              <Integration filterProps={filterProps} clientProps={operationClientProps} />
            )}
            {operationType === 'IMPORT' && (
              <Import
                paginationProps={paginationProps}
                clientProps={{
                  clientId
                }}
              />
            )}
          </Accordion>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default TableHeader
