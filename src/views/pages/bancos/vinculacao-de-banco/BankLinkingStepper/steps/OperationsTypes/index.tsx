import { SyntheticEvent, useCallback, useMemo, useState } from 'react'

import {
  Grid,
  Box,
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

import Banks from './operations/Banks'
import OFX from './operations/OFX'

import { UseFormReturn } from 'react-hook-form'

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

interface BanksProps {
  bank: { id: string; name: string }
  handleSelectBank: (bankId: string, banks: any) => void
}

interface OperationsTypesProps {
  methods: UseFormReturn<any, any>
  operationType: string | null
  handleSetOperationType: (value: string | null) => void
  banksProps: BanksProps
}

const OperationsTypes = ({ banksProps, methods, operationType, handleSetOperationType }: OperationsTypesProps) => {
  const [expanded, setExpanded] = useState<string | false>('panel1')

  const handleChange = useCallback(
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    },
    []
  )

  const handleSelectOperationType = useCallback(
    (value: string) => {
      if (operationType === value) return null

      switch (value) {
        case 'INTEGRATION':
          handleSetOperationType('INTEGRATION')
          break
        case 'IMPORT':
          handleSetOperationType('IMPORT')
          break
        default:
          handleSetOperationType(null)
      }
    },
    [handleSetOperationType, operationType]
  )

  const handleCheckOperationType = useMemo(
    () => (operationType: string | null) => {
      if (!operationType) return null

      return operationType === 'INTEGRATION' ? 'Integração' : 'Importação'
    },
    []
  )

  const handleCheckOperationTypeSelected = useMemo(
    () => (operationType: string | null) => {
      if (!operationType) return null

      return operationType === 'INTEGRATION'
        ? 'Selecione o banco desejado para a vinculação de conta'
        : 'Selecione o banco desejado para a vinculação via OFX'
    },
    []
  )

  const bankProps = useMemo(
    () => ({
      bank: banksProps.bank,
      handleSelectBank: banksProps.handleSelectBank,
      methods
    }),
    [banksProps.bank, banksProps.handleSelectBank, methods]
  )

  const OFXProps = useMemo(
    () => ({
      operationType
    }),
    [operationType]
  )

  return (
    <Grid container pb={4} justifyContent={'space-between'}>
      <Grid item xs={12}>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary
            expandIcon={<Icon icon='tabler:chevron-down' />}
            id='form-layouts-collapsible-header-2'
            aria-controls='form-layouts-collapsible-content-2'
          >
            <Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
              {handleCheckOperationType(operationType) ||
                'Selecione o tipo de operação para acessar as opções disponíveis'}
            </Typography>
          </AccordionSummary>
          <Divider sx={{ m: '0 !important' }} />
          <AccordionDetails sx={{ pt: 6, pb: 6 }}>
            <BoxWrapper
              sx={operationType === 'INTEGRATION' ? { borderColor: 'primary.main' } : {}}
              onClick={() => alert('Integração desabilitada')}

              // onClick={() => handleSelectOperationType('INTEGRATION')}
            >
              <Radio
                value='Integração'
                checked={operationType === 'INTEGRATION'}
                name='form-layouts-collapsible-options-radio'
                inputProps={{ 'aria-label': 'INTEGRATION' }}
                sx={{ mr: 2, ml: -2.5, mt: -2.5, alignItems: 'flex-start' }}
                disabled={true}
              />
              <Box sx={{ width: '100%' }}>
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontWeight: 500 }}>Integração</Typography>
                </Box>
                <Typography variant='body2'>
                  Selecione um banco e cadastre as informações necessárias para a vinculação.
                </Typography>
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
                </Box>
                <Typography variant='body2'>Selecione um banco e faça a vinculação.</Typography>
              </Box>
            </BoxWrapper>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={12}>
        <Accordion expanded={!!operationType} onChange={handleChange('panel3')} disabled={!operationType}>
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
          {operationType === 'INTEGRATION' && <Banks {...bankProps} />}
          {operationType === 'IMPORT' && <OFX {...OFXProps} />}
        </Accordion>
      </Grid>
    </Grid>
  )
}

export default OperationsTypes
