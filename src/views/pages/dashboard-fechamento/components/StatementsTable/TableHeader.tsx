import { CardHeader, Grid, Box } from '@mui/material'

import { ClientProps } from 'src/types/clients'
import { BankAccountProps } from 'src/types/banks'

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TableHeader = ({ filterProps, clientProps, paginationProps, clientBanksProps }: TableHeaderProps) => {
  
  return (
    <Grid container gap={4} paddingX={6} paddingY={5} justifyContent={'space-between'}>
      <Box display='flex'>
        <CardHeader title='Extrato Bancário' subheader='Pré Visualização' sx={{ padding: 0 }} />
      </Box>
    </Grid>
  )
}

export default TableHeader
