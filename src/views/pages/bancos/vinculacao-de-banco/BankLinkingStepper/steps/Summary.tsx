import Grid from '@mui/material/Grid'

import CustomInfoField from 'src/components/CustomInfoField'

import { ClientProps } from 'src/types/clients'
import { applyCnpjMask } from 'src/utils/inputs'

interface BankNameType {
  [key: string]: string
}

const bankName: BankNameType = {
  BB: 'Banco do Brasil',
  INTER: 'Banco Inter'
}

interface SummaryProps {
  client: ClientProps
  payload: any
}

const Summary = ({ client, payload }: SummaryProps) => {
  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={6}>
        <CustomInfoField label='Nome' value={client.name} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomInfoField label='E-mail' value={client.email} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomInfoField label='Nome Fantasia' value={client.additionalData.fantasyName} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomInfoField label='CNPJ' value={applyCnpjMask(client.documentNumber)} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomInfoField label='Banco' value={bankName[payload.importedBank]} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomInfoField label='Número da Conta' value={payload.accountNumber} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomInfoField label='Número da Agência' value={payload.agencyNumber} />
      </Grid>
    </Grid>
  )
}

export default Summary
