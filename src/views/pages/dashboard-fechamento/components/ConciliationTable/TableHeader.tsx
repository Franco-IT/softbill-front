// React
import { memo } from 'react'

// MUI components
import { CardHeader, Grid, MenuItem, Button } from '@mui/material'

// Custom components
import CustomTextField from 'src/@core/components/mui/text-field'
import IconifyIcon from 'src/@core/components/icon'

// Hooks and services
import { useQueryClient } from 'react-query'
import { useAppSelector } from 'src/hooks/useAppSelector'
import { api } from 'src/services/api'

// Notifications
import toast from 'react-hot-toast'

interface SearchProps {
  search: string
  handleSearch: (value: string) => void
  status: string
  handleStatus: (value: string) => void
  type: string
  handleType: (value: string) => void
  validated: string
  handleValidated: (value: string) => void
}

interface TableHeaderProps {
  searchProps: SearchProps
}

const TableHeader = memo(({ searchProps }: TableHeaderProps) => {
  const { handleSearch, search, handleStatus, status, handleType, type, validated, handleValidated } = searchProps

  const monthlyFinancialClose = useAppSelector(state => state.ClosingReducer.monthlyFinancialClose) as any

  const { monthlyFinancialCloseBankId, validated: validatedBank } = monthlyFinancialClose.monthlyFinancialCloseBank

  const queryClient = useQueryClient()

  const handleValidate = (id: string) => {
    api
      .put('monthlyFinancialCloseBanks/' + id, {
        validated: true
      })
      .then(response => {
        if (response.status === 200) {
          queryClient.invalidateQueries(['conciliations'])
          queryClient.invalidateQueries(['financial-closing'])
          toast.success('Conciliações validadas com sucesso.')
        }
      })
      .catch(error => {
        if (error.response.status === 409) {
          toast.error('Erro ao validar conciliações, ainda existem conciliações pendentes.')
        } else {
          toast.error('Erro ao validar conciliações.')
        }
      })
  }

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
          <Grid item xs={12} md={12} xl={3}>
            <CustomTextField
              fullWidth
              label='Buscar'
              value={search}
              placeholder='Buscar Conciliação'
              onChange={e => handleSearch(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6} xl={2}>
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
              <MenuItem value=''>Todos</MenuItem>
              <MenuItem value='PENDING'>Pendente</MenuItem>
              <MenuItem value='WAITING_REVIEW'>Aguardando Revisão</MenuItem>
              <MenuItem value='DONE'>Aprovado</MenuItem>
            </CustomTextField>
          </Grid>

          <Grid item xs={12} md={6} xl={2}>
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

          <Grid item xs={12} md={6} xl={2}>
            <CustomTextField
              select
              fullWidth
              label='Validação'
              placeholder='Selecione'
              value={validated || 'default'}
              onChange={e => handleValidated(e.target.value)}
            >
              <MenuItem disabled value='default'>
                <em>selecione</em>
              </MenuItem>
              <MenuItem value=''>Todos</MenuItem>
              <MenuItem value='true'>Validado</MenuItem>
              <MenuItem value='false'>Não Validado</MenuItem>
            </CustomTextField>
          </Grid>

          <Grid item xs={12} md={6} xl={3} alignSelf={'end'}>
            <Button
              fullWidth
              variant='contained'
              color={'warning'}
              disabled={validatedBank}
              title={validatedBank ? 'Todas as Conciliações Validadas' : 'Validar Todas as Conciliações Informadas'}
              sx={{
                '&:disabled': {
                  backgroundColor: theme => theme.palette.success.main,
                  color: theme => theme.palette.common.white,
                  opacity: 0.7
                }
              }}
              startIcon={<IconifyIcon icon='tabler:check' fontSize='1.7rem' />}
              onClick={() => handleValidate(monthlyFinancialCloseBankId)}
            >
              {validatedBank ? 'Conciliações Validadas' : 'Validar Conciliações'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
})

export default TableHeader
