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
import { financialCloseController } from 'src/modules/financialClose'

const ConciliationTable = () => {
  const showConciliations = useAppSelector(state => state.ClosingReducer.showConciliations)
  const monthlyFinancialClose = useAppSelector(state => state.ClosingReducer.monthlyFinancialClose) as any
  const { monthlyFinancialCloseBank } = monthlyFinancialClose

  const [order, setOrder] = useState<Order>('asc')
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
  } = useQuery(['conciliations', params], () => financialCloseController.getBankTransactions(data), {
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    enabled: showConciliations
  })

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

  const visibleRows = useMemo(
    () => stableSort(conciliations, getComparator(order, orderBy)),
    [order, orderBy, conciliations]
  )

  useEffect(() => {
    if (rows) setConciliations(rows.data)
  }, [rows])

  const paginationProps = useMemo(() => {
    return {
      rowsTotal: rows?.total || 0,
      rowsPerPage,
      rowsPerPageOptions: [5, 10, 25],
      page,
      handleChangePage,
      handleChangeRowsPerPage
    }
  }, [rows?.total, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage])

  const rowsProps = useMemo(
    () => ({
      rows,
      visibleRows,
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
    [rows, visibleRows, isLoading, filter, status, type, validated, order, orderBy, handleRequestSort, paginationProps]
  )

  if (isError) return <Error />

  return (
    <Box sx={{ width: '100%' }}>
      <Table {...rowsProps} />
    </Box>
  )
}

export default ConciliationTable
