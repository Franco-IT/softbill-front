// React Imports
import { ChangeEvent, MouseEvent, useCallback, useEffect, useMemo, useState } from 'react'

// Material UI Imports
import { Box } from '@mui/material'

// Third-Party Imports
import { useQuery } from 'react-query'

// Custom Components
import Error from 'src/components/FeedbackAPIs/Error'
import Table from './Table'

// Hooks
import { useAppSelector } from 'src/hooks/useAppSelector'

// Utils
import { getComparator, Order, stableSort } from 'src/utils/list'

// Services
import { api } from 'src/services/api'

const ConciliationsTableByGroup = () => {
  const showConciliationsByGroup = useAppSelector(state => state.ClosingReducer.showConciliationsByGroup)
  const monthlyFinancialClose = useAppSelector(state => state.ClosingReducer.monthlyFinancialClose) as any
  const { monthlyFinancialCloseBank } = monthlyFinancialClose

  const [order, setOrder] = useState<Order>('desc')
  const [orderBy, setOrderBy] = useState<keyof any>('createdAt')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [filter, setFilter] = useState('')
  const [status, setStatus] = useState('')
  const [type, setType] = useState('')
  const [conciliations, setConciliations] = useState([])
  const [validated, setValidated] = useState('')

  const params = useMemo(
    () => ({
      page: page + 1,
      perPage: rowsPerPage,
      search: filter,
      validated,
      status,
      transactionTypeConciliation: type,
      bankAccountId: monthlyFinancialCloseBank.bankAccountId,
      step: 'MONTHLY_FINANCIAL_CLOSE'
    }),
    [page, rowsPerPage, filter, validated, status, type, monthlyFinancialCloseBank.bankAccountId]
  )

  const data = useMemo(
    () => ({
      monthlyFinancialCloseId: monthlyFinancialClose.monthlyFinancialCloseId,
      params
    }),
    [monthlyFinancialClose.monthlyFinancialCloseId, params]
  )

  const {
    data: rows,
    isLoading,
    isError
  } = useQuery(
    ['conciliations-by-group', params],
    () =>
      api.get('transactions/by-monthly-financial-close-grouped/' + data.monthlyFinancialCloseId, {
        params
      }),
    {
      staleTime: 1000 * 60 * 5,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      enabled: showConciliationsByGroup
    }
  )

  const handleRequestSort = useCallback(
    (event: MouseEvent<unknown>, property: keyof any) => {
      const isAsc = orderBy === property && order === 'asc'
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(property)
    },
    [order, orderBy]
  )

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage)
  }, [])

  const handleChangeRowsPerPage = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }, [])

  const visibleRowsGroup = useMemo(
    () => stableSort(conciliations, getComparator(order, orderBy)),
    [order, orderBy, conciliations]
  )

  useEffect(() => {
    if (rows) setConciliations(rows.data.data)
  }, [rows])

  const paginationProps = useMemo(() => {
    return {
      rowsTotal: rows?.data?.total || 0,
      rowsPerPage,
      rowsPerPageOptions: [5, 10, 25],
      page,
      handleChangePage,
      handleChangeRowsPerPage
    }
  }, [rows?.data.total, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage])

  const rowsProps = useMemo(
    () => ({
      rows,
      visibleRowsGroup,
      isLoading,
      search: filter,
      handleSearch: setFilter,
      status,
      handleStatus: setStatus,
      type,
      handleType: setType,
      validated,
      handleValidated: setValidated,
      order,
      orderBy,
      handleRequestSort,
      paginationProps
    }),
    [
      rows,
      visibleRowsGroup,
      isLoading,
      filter,
      status,
      type,
      validated,
      order,
      orderBy,
      handleRequestSort,
      paginationProps
    ]
  )

  if (isError) return <Error />

  return (
    <Box sx={{ width: '100%' }}>
      <Table {...rowsProps} />
    </Box>
  )
}

export default ConciliationsTableByGroup
