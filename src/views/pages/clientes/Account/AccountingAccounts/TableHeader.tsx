// React and Hooks
import { Fragment, useState } from 'react'

// Material UI
import { CardHeader, Grid, Button, MenuItem } from '@mui/material'

// Internal Components
import CustomTextField from 'src/@core/components/mui/text-field'
import Icon from 'src/@core/components/icon'
import Add from './Add'

interface TableHeaderProps {
  search: string
  handleSearch: (val: string) => void
  transactionType: string
  handleTransactionType: (val: string) => void
  number: string
  handleNumber: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  const { handleNumber, number, handleTransactionType, transactionType } = props

  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <Grid container gap={3} paddingX={6} paddingY={4}>
        <Grid item xs={12}>
          <CardHeader
            sx={{
              padding: 0
            }}
            title='Contas Contábeis'
          />
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={4} alignSelf={`end`}>
            <Grid item xs={12} md={4}>
              <CustomTextField
                fullWidth
                label='Buscar Conta'
                value={number}
                placeholder='Buscar Conta'
                onChange={e => handleNumber(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <CustomTextField
                select
                fullWidth
                label='Tipo'
                placeholder='Selecione'
                value={transactionType || 'default'}
                onChange={e => handleTransactionType(e.target.value)}
              >
                <MenuItem disabled value='default'>
                  <em>selecione</em>
                </MenuItem>
                <MenuItem value=''>Todos</MenuItem>
                <MenuItem value='CREDIT'>Crédito</MenuItem>
                <MenuItem value='DEBIT'>Débito</MenuItem>
              </CustomTextField>
            </Grid>

            <Grid item xs={12} md={4} alignSelf={'flex-end'}>
              <Button fullWidth variant='contained' sx={{ '& svg': { mr: 2 } }} onClick={() => setOpen(true)}>
                <Icon fontSize='1.125rem' icon='tabler:plus' />
                Adicionar C. Contábil
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {open && <Add open={open} handleClose={() => setOpen(false)} />}
    </Fragment>
  )
}

export default TableHeader
