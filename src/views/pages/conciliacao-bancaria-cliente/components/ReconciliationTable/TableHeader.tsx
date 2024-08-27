import { memo } from 'react'
import { CardHeader, Grid, MenuItem } from '@mui/material'

import CustomTextField from 'src/@core/components/mui/text-field'

interface SearchProps {
  search: string
  handleSearch: (value: string) => void
  status: string
  handleStatus: (value: string) => void
  type: string
  handleType: (value: string) => void
  bank: string
  handleBank: (value: string) => void
}

interface TableHeaderProps {
  searchProps: SearchProps
}

const TableHeader = memo(({ searchProps }: TableHeaderProps) => {
  const { handleSearch, search, handleStatus, status, handleType, type, handleBank, bank } = searchProps

  return (
    <Grid container gap={3} paddingX={6} paddingY={4}>
      <Grid item xs={12}>
        <CardHeader
          sx={{
            padding: 0
          }}
          title='Conciliação Bancária'
        />
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <CustomTextField
              fullWidth
              label='Buscar'
              value={search}
              placeholder='Buscar Conciliação'
              onChange={e => handleSearch(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <CustomTextField
              select
              fullWidth
              label='Status'
              placeholder='Selecione'
              value={status || 'default'}
              onChange={e => handleStatus(e.target.value)}
            >
              <MenuItem disabled value='default'>
                <em>selecione</em>
              </MenuItem>
              <MenuItem value='PENDING'>Pendente</MenuItem>
              <MenuItem value='APPROVED'>Aprovado</MenuItem>
            </CustomTextField>
          </Grid>

          <Grid item xs={12} md={3}>
            <CustomTextField
              select
              fullWidth
              label='Tipo'
              placeholder='Selecione'
              value={type || 'default'}
              onChange={e => handleType(e.target.value)}
            >
              <MenuItem disabled value='default'>
                <em>selecione</em>
              </MenuItem>
              <MenuItem value='CREDIT'>Crédito</MenuItem>
              <MenuItem value='DEBIT'>Débito</MenuItem>
            </CustomTextField>
          </Grid>

          <Grid item xs={12} md={3}>
            <CustomTextField
              select
              fullWidth
              label='Banco'
              placeholder='Selecione'
              value={bank || 'default'}
              onChange={e => handleBank(e.target.value)}
            >
              <MenuItem disabled value='default'>
                <em>selecione</em>
              </MenuItem>
              <MenuItem value='BANCO DO BRASIL'>Banco do Brasil</MenuItem>
              <MenuItem value='BRADESCO'>Bradesco</MenuItem>
              <MenuItem value='ITAU'>Itaú</MenuItem>
              <MenuItem value='SANTANDER'>Santander</MenuItem>
            </CustomTextField>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
})

export default TableHeader
