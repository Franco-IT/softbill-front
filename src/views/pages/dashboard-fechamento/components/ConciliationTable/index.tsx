import { useState, ChangeEvent, MouseEvent, useMemo, useCallback, useEffect } from 'react'
import { Box } from '@mui/material'

import { Order, getComparator, stableSort } from 'src/utils/list'

import { useQuery } from 'react-query'
import Error from 'src/components/FeedbackAPIs/Error'
import Table from './Table'
import { useAppSelector } from 'src/hooks/useAppSelector'
import { api } from 'src/services/api'

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

  const {
    data: rows,
    isLoading,
    isError
  } = useQuery(
    ['conciliations', params],
    async () => {
      const response = await api.get(
        '/transactions/by-monthly-financial-close/' + monthlyFinancialClose.monthlyFinancialCloseId,
        {
          params
        }
      )

      return response.data
    },
    {
      staleTime: 1000 * 60 * 5,
      keepPreviousData: true,
      enabled: showConciliations
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
