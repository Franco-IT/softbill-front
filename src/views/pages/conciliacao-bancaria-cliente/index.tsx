import { useState, ChangeEvent, MouseEvent, useMemo, useCallback } from 'react'
import { Box } from '@mui/material'

import { Order, getComparator, stableSort } from 'src/utils/list'

import { bankController } from 'src/modules/banks'
import { useQuery } from 'react-query'
import Error from 'src/components/FeedbackAPIs/Error'
import ReconciliationTable from './components/ReconciliationTable'
import { conciliations } from './utils'

const ReconciliationList = () => {
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof any>('createdAt')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [filter, setFilter] = useState('')
  const [bank, setBank] = useState('')
  const [status, setStatus] = useState('')
  const [type, setType] = useState('')

  const params = useMemo(() => ({ page: page + 1, perPage: rowsPerPage, search: filter }), [page, rowsPerPage, filter])

  const {
    data: rows,
    isLoading,
    isError
  } = useQuery(['banks', params], async () => bankController.getBanks(params), {
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true
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

  const visibleRows = useMemo(() => stableSort(conciliations, getComparator(order, orderBy)), [order, orderBy])

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

  const reconciliationProps = useMemo(
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
      bank,
      handleBank: setBank,
      order,
      orderBy,
      handleRequestSort,
      paginationProps
    }),
    [rows, visibleRows, isLoading, filter, status, type, bank, order, orderBy, handleRequestSort, paginationProps]
  )

  if (isError) return <Error />

  return (
    <Box sx={{ width: '100%' }}>
      <ReconciliationTable {...reconciliationProps} />
    </Box>
  )
}

export default ReconciliationList
