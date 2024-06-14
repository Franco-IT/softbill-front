import { useRouter } from 'next/router'

import { CardHeader, Grid, Box, Button, IconButton } from '@mui/material'

import CustomTextField from 'src/@core/components/mui/text-field'

import Icon from 'src/@core/components/icon'
import CustomDatePicker from 'src/components/CustomDatePicker'
import IconifyIcon from 'src/@core/components/icon'

type DateType = Date | null | undefined

interface TableHeaderProps {
  filter: string
  handleFilter: (val: string) => void
  startDate: DateType
  handleFilterStartDate: (date: Date) => void
  endDate: DateType
  handleFilterEndDate: (date: Date) => void
}

const TableHeader = (props: TableHeaderProps) => {
  const router = useRouter()

  const { handleFilter, filter, endDate, handleFilterEndDate, startDate, handleFilterStartDate } = props

  const handleCreateBank = () => {
    router.push(`/bancos/vinculacao-de-banco/${router.query.id}`)
  }

  const handleClickBack = () => {
    router.push({
      pathname: '/clientes/[id]',
      query: { id: router.query.client, tab: 'banks' }
    })
  }

  return (
    <Grid container gap={3} paddingX={6} paddingY={4} justifyContent={'space-between'}>
      <Box display='flex'>
        <CardHeader
          title='Extrato Bancário'
          avatar={
            <IconButton title='Voltar' aria-label='Voltar' onClick={handleClickBack}>
              <IconifyIcon icon='material-symbols:arrow-back' />
            </IconButton>
          }
          sx={{
            padding: 0
          }}
        />
      </Box>

      <Grid container gap={4} justifyContent={'space-between'}>
        <Grid item xs={12} md={4}>
          <CustomTextField fullWidth value={filter} placeholder='Buscar' onChange={e => handleFilter(e.target.value)} />
        </Grid>

        <Grid item xs={12} md={2}>
          <CustomDatePicker value={startDate} onChange={handleFilterStartDate} placeholderText='Inicio' />
        </Grid>
        <Grid item xs={12} md={2}>
          <CustomDatePicker value={endDate} onChange={handleFilterEndDate} placeholderText='Fim' />
        </Grid>

        <Grid item xs={12} md={3}>
          <Button fullWidth variant='contained' sx={{ '& svg': { mr: 2 } }} onClick={handleCreateBank}>
            <Icon fontSize='1.125rem' icon='tabler:plus' />
            Exportar
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default TableHeader
