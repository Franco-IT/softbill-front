import { useRouter } from 'next/router'

import { CardHeader, Grid, Button } from '@mui/material'

import CustomTextField from 'src/@core/components/mui/text-field'

import Icon from 'src/@core/components/icon'

interface TableHeaderProps {
  value: string
  handleFilter: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  const router = useRouter()

  const { handleFilter, value } = props

  const handleCreateBank = () => {
    router.push(`/bancos/vinculacao-de-banco/${router.query.id}`)
  }

  return (
    <Grid container gap={{ xs: 3, md: 0 }} paddingX={6} paddingY={4} justifyContent={'space-between'}>
      <Grid item xs={12}>
        <CardHeader
          sx={{
            padding: 0
          }}
          title='Bancos do Cliente'
        />
      </Grid>

      <Grid item xs={12}>
        <Grid container gap={3} justifyContent={'end'}>
          <Grid item xs={12} md={3}>
            <CustomTextField
              fullWidth
              value={value}
              placeholder='Buscar Banco'
              onChange={e => handleFilter(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={4} xl={3}>
            <Button fullWidth variant='contained' sx={{ '& svg': { mr: 2 } }} onClick={handleCreateBank}>
              <Icon fontSize='1.125rem' icon='tabler:plus' />
              Adicionar Banco
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default TableHeader
