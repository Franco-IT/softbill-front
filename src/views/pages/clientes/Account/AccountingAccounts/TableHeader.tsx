import { CardHeader, Grid, Button, MenuItem } from '@mui/material'

import CustomTextField from 'src/@core/components/mui/text-field'

import Icon from 'src/@core/components/icon'
import { Fragment, useState } from 'react'
import Add from './Add'

interface TableHeaderProps {
  value: string
  handleFilter: (val: string) => void
  type: string
  handleType: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  const { handleFilter, value, handleType, type } = props

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
                value={value}
                placeholder='Buscar Conta'
                onChange={e => handleFilter(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={4}>
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
