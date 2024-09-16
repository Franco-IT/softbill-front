import { memo } from 'react'
import { CardHeader, Grid, MenuItem } from '@mui/material'

import CustomTextField from 'src/@core/components/mui/text-field'

// import CustomDatePicker from 'src/components/CustomDatePicker'
// import { dateProvider } from 'src/shared/providers'
// import { useAuth } from 'src/hooks/useAuth'
// import { api } from 'src/services/api'
// import { useQuery } from 'react-query'

// import IconifyIcon from 'src/@core/components/icon'
// import { useQueryClient } from 'react-query'
// import { id } from 'date-fns/locale'
// import toast from 'react-hot-toast'
// import { api } from 'src/services/api'

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

  // const { user } = useAuth()

  // const [date, setDate] = useState<any>(new Date())

  // const handleConvertDateToString = (date: Date | null) => {
  //   return date ? dateProvider.formatDate(date, 'yyyy-MM-dd') : null
  // }

  // const params = useMemo(() => ({ referenceDate: handleConvertDateToString(date) }), [date])

  // const { data, isLoading, isError } = useQuery(
  //   ['client-monthly-financial-close', params],
  //   async () => {
  //     const response = await api.get('monthlyFinancialCloses/find-by-client/' + user?.id, {
  //       params
  //     })

  //     return response.data
  //   },
  //   {
  //     staleTime: 1000 * 60 * 5,
  //     keepPreviousData: true,
  //     enabled: !!user
  //   }
  // )

  return (
    <Grid container gap={3} paddingX={6} paddingY={4}>
      <Grid item xs={12}>
        <CardHeader
          sx={{
            padding: 0
          }}
          title='Transações Bancárias'
        />
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <CustomTextField
              fullWidth
              label='Buscar'
              value={search}
              placeholder='Buscar por descrição ou origem'
              onChange={e => handleSearch(e.target.value)}
            />
          </Grid>
          {/* <Grid item xs={12} md={3}>
            <CustomDatePicker
              label='Mês de Referência'
              value={date}
              onChange={e => setDate(e)}
              placeholderText='Escolha o mês'
              maxDate={new Date()}
              dateFormat='MMMM'
              showMonthYearPicker
            />
          </Grid> */}
          <Grid item xs={12} md={3}>
            <CustomTextField
              select
              fullWidth
              label='Bancos'
              placeholder='Selecione'
              value={validated || 'default'}
              onChange={e => handleValidated(e.target.value)}
              disabled
            >
              <MenuItem disabled value='default'>
                <em>selecione</em>
              </MenuItem>
              <MenuItem value=''>Todos</MenuItem>
              <MenuItem value='true'>Validado</MenuItem>
              <MenuItem value='false'>Não Validado</MenuItem>
            </CustomTextField>
          </Grid>

          <Grid item xs={12} md={3}>
            <CustomTextField
              select
              fullWidth
              label='Status'
              placeholder='Selecione'
              value={status || 'default'}
              onChange={e => handleStatus(e.target.value)}
              disabled
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

          <Grid item xs={12} md={3}>
            <CustomTextField
              select
              fullWidth
              label='Tipo'
              placeholder='Selecione'
              value={type || 'default'}
              onChange={e => handleType(e.target.value)}
              disabled
            >
              <MenuItem disabled value='default'>
                <em>selecione</em>
              </MenuItem>
              <MenuItem value=''>Todos</MenuItem>
              <MenuItem value='CREDIT'>Crédito</MenuItem>
              <MenuItem value='DEBIT'>Débito</MenuItem>
            </CustomTextField>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
})

export default TableHeader
