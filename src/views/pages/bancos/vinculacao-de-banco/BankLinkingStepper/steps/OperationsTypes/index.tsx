import { SyntheticEvent, useCallback, useMemo, useState } from 'react'

import {
  Grid,
  Box,
  Accordion,
  AccordionSummary,
  Typography,
  Divider,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material'

import Icon from 'src/@core/components/icon'

import Banks from './operations/Banks'
import OFX from './operations/OFX'

import { UseFormReturn } from 'react-hook-form'

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

  const handleCheckOperationTypeSelected = useMemo(
    () => (operationType: string | null) => {
      if (!operationType) return null

      return operationType === 'INTEGRATION'
        ? 'Selecione o banco desejado para a vinculação de conta'
        : 'Selecione o banco desejado para a vinculação via OFX'
    },
    []
  )

  const handleChangeOperation = (event: React.MouseEvent<HTMLElement>, operation: string) => {
    handleSelectOperationType(operation)
  }

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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            pb: 4
          }}
        >
          <Typography variant='h6' sx={{ fontWeight: 500 }}>
            Selecione o tipo de operação
          </Typography>
          <ToggleButtonGroup color='primary' value={operationType} exclusive onChange={handleChangeOperation}>
            <ToggleButton value='INTEGRATION'>Integração</ToggleButton>
            <ToggleButton value='IMPORT'>Importação</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Accordion
          expanded={!!operationType && expanded === 'panel1'}
          onChange={handleChange('panel1')}
          disabled={!operationType}
        >
          <AccordionSummary expandIcon={<Icon icon='tabler:chevron-down' />}>
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
