import Grid from '@mui/material/Grid'

import CustomInfoField from 'src/components/CustomInfoField'

import { applyCnpjMask } from 'src/utils/inputs'
import { ClientProps as ClientDataProps } from 'src/types/clients'

interface ClientProps {
  client: ClientDataProps
}

const Client = ({ client }: ClientProps) => {
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
    </Grid>
  )
}

export default Client
