// Pacotes externos
import { Suspense, useEffect, useState, ChangeEvent, MouseEvent, useMemo, useCallback } from 'react'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import { useQuery } from 'react-query'

import CustomChip from 'src/@core/components/mui/chip'
import Error from 'src/components/FeedbackAPIs/Error'
import HeadCells from './HeadCells'
import TableHeader from './TableHeader'
import TablePagination from './TablePagination'
import EnhancedTableHead from './EnhancedTableHead'

import { Loading, Order, getComparator, stableSort } from 'src/utils/list'

import { ThemeColor } from 'src/@core/layouts/types'
import { useAppSelector } from 'src/hooks/useAppSelector'
import { api } from 'src/services/api'
import { dateProvider } from 'src/shared/providers'
import { formatAmount } from 'src/utils/format'

interface ColorsType {
  [key: string]: ThemeColor
}

const transactionTypeColors: ColorsType = {
  DEBIT: 'error',
  CREDIT: 'success'
}

interface TransactionType {
  [key: string]: string
}

const transactionType: TransactionType = {
  DEBIT: 'Débito',
  CREDIT: 'Crédito'
}

const List = () => {
  const showStatements = useAppSelector(state => state.ClosingReducer.showStatements)
  const monthlyFinancialClose = useAppSelector(state => state.ClosingReducer.monthlyFinancialClose) as any
  const { monthlyFinancialCloseBank } = monthlyFinancialClose

  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof any>('createdAt')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [statements, setStatements] = useState<any[]>([])
  const [filter, setFilter] = useState('')

  const params = useMemo(
    () => ({
      step: 'IMPORT',
      page: page + 1,
      perPage: rowsPerPage,
      Search: filter,
      bankAccountId: monthlyFinancialCloseBank.bankAccountId
    }),
    [filter, monthlyFinancialCloseBank.bankAccountId, page, rowsPerPage]
  )

  const {
    data: rows,
    isLoading,
    isError
  } = useQuery(
    ['financial-statements', params],
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
      keepPreviousData: true,
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      enabled: showStatements
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

  const visibleRows = useMemo(() => stableSort(statements, getComparator(order, orderBy)), [order, orderBy, statements])

  useEffect(() => {
    if (rows) setStatements(rows.data)
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

  if (isError) return <Error />

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableHeader value={filter} handleFilter={setFilter} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={'medium'}>
            <EnhancedTableHead
              headCells={HeadCells}
              order={order}
              orderBy={orderBy as string}
              onRequestSort={handleRequestSort}
              rowCount={rows?.total || 0}
            />
            <Suspense fallback={<Loading />}>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Typography noWrap variant='h6' sx={{ color: 'text.secondary' }}>
                        Carregando...
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : visibleRows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Typography noWrap variant='h6' sx={{ color: 'text.secondary' }}>
                        Nenhuma transação encontrada
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  visibleRows.map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`

                    return (
                      <TableRow hover tabIndex={-1} key={row.id}>
                        <TableCell component='th' id={labelId} scope='row' padding='none'>
                          <Typography noWrap sx={{ color: 'text.secondary' }}>
                            {dateProvider.formatDate(new Date(row.date), "d 'de' MMM 'de' yyyy")}
                          </Typography>
                        </TableCell>
                        <TableCell align='left'>
                          <CustomChip
                            rounded
                            skin='light'
                            size='small'
                            label={transactionType[row.transactionTypeExtract]}
                            color={transactionTypeColors[row.transactionTypeExtract]}
                            sx={{ minWidth: 107, textTransform: 'capitalize' }}
                          />
                        </TableCell>
                        <TableCell align='left'>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <CustomChip
                              rounded
                              skin='light'
                              size='small'
                              label={formatAmount(
                                row.amount,
                                row.transactionTypeExtract === 'DEBIT' ? 'negative' : 'positive'
                              )}
                              color={transactionTypeColors[row.transactionTypeExtract]}
                            />
                          </Box>
                        </TableCell>
                        <TableCell align='left'>
                          <Typography noWrap sx={{ color: 'text.secondary' }}>
                            {row.extractDescription}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Suspense>
          </Table>
        </TableContainer>
        <TablePagination {...paginationProps} />
      </Paper>
    </Box>
  )
}

export default List
