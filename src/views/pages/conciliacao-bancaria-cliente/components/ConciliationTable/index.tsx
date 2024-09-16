import { useState, ChangeEvent, MouseEvent, useMemo, useCallback, useEffect } from 'react'
import { Box } from '@mui/material'

import { Order, getComparator, stableSort } from 'src/utils/list'

import { useQuery } from 'react-query'
import Error from 'src/components/FeedbackAPIs/Error'
import Table from './Table'
import { api } from 'src/services/api'
import { useAuth } from 'src/hooks/useAuth'

const ConciliationTable = () => {
  const { user } = useAuth()

  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof any>('date')
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
      status,
      validated,
      transactionTypeConciliation: type,
      step: 'MONTHLY_FINANCIAL_CLOSE'
    }),
    [page, rowsPerPage, filter, status, validated, type]
  )

  const {
    data: rows,
    isLoading: isLoadingRows,
    isError: isErrorRows
  } = useQuery(
    ['client-transactions-list', params],
    async () => {
      const response = await api.get('transactions/by-client/' + user?.id, {
        params
      })

      return response.data
    },
    {
      staleTime: 1000 * 60 * 5,
      keepPreviousData: true,
      enabled: !!user
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
      isLoading: isLoadingRows,
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
      visibleRows,
      isLoadingRows,
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

  if (isErrorRows) return <Error />

  return (
    <Box sx={{ width: '100%' }}>
      <Table {...rowsProps} />
    </Box>
  )
}

export default ConciliationTable
