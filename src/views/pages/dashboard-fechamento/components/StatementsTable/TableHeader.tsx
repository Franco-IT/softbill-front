import { memo } from 'react'

import { CardHeader, Grid, Box } from '@mui/material'

import CustomTextField from 'src/@core/components/mui/text-field'

interface TableHeaderProps {
  value: string
  handleFilter: (val: string) => void
}

const TableHeader = memo((props: TableHeaderProps) => {
  const { handleFilter, value } = props

  return (
    <Grid container gap={{ xs: 3, md: 0 }} paddingX={6} paddingY={4} justifyContent={'space-between'}>
      <Box display='flex'>
        <CardHeader
          sx={{
            padding: 0
          }}
          title='Transações'
        />
      </Box>

      <Grid item xs={12} md={10}>
        <Grid container gap={3} justifyContent={'end'}>
          <Grid item xs={12} md={3} xl={2}>
            <CustomTextField
              fullWidth
              value={value}
              placeholder='Buscar Transação'
              onChange={e => handleFilter(e.target.value)}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
})

export default TableHeader
