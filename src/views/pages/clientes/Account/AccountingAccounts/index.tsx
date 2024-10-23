// React and Hooks
import { Suspense, useEffect, useState, ChangeEvent, MouseEvent, useMemo, useCallback } from 'react'
import { useRouter } from 'next/router'

// MUI
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'

// Internal Components
import CustomChip from 'src/@core/components/mui/chip'

// Utilities
import { Loading, Order, getComparator, stableSort } from 'src/utils/list'

// Feedback Components
import Error from 'src/components/FeedbackAPIs/Error'
import TableHeader from './TableHeader'
import EnhancedTableHead from './EnhancedTableHead'
import RowOptions from './RowOptions'
import HeadCells from './HeadCells'
import Pagination from './Pagination'

// DTOs
import { IGetAccountingAccountsByClientDTO } from 'src/modules/accountingAccounts/dtos/IGetAccountingAccountsByClientDTO'
import { IAccountingAccountDTO } from 'src/modules/accountingAccounts/dtos/IAccountingAccountDTO'

// Hooks
import { useAccountingAccountsByClient } from 'src/hooks/accountingAccounts/useAccountingAccountsByClient'

// Providers
import { dateProvider } from 'src/shared/providers'

// Input Utilities
import { applyAccountNumberMask } from 'src/utils/inputs'

export type ColorType = 'primary' | 'error' | 'success' | 'secondary' | 'info' | 'warning' | undefined

const typeValues: { [key: string]: string } = {
  CREDIT: 'Crédito',
  DEBIT: 'Débito'
}

const RowItemLimited = ({ item }: { item: string }) => {
  const limitItem = (value: string) => (value.length > 20 ? value.substring(0, 20) + '...' : value)

  return (
    <Typography noWrap sx={{ color: 'text.secondary' }}>
      {limitItem(item)}
    </Typography>
  )
}

const AccountingAccounts = () => {
  const router = useRouter()

  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof IAccountingAccountDTO>('createdAt')
  const [transactionType, setTransactionType] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [search, setSearch] = useState('')
  const [number, setNumber] = useState('')
  const [accountingAccounts, setAccountingAccounts] = useState<IAccountingAccountDTO[]>([])

  const params: IGetAccountingAccountsByClientDTO['params'] = useMemo(
    () => ({ page: page + 1, perPage: rowsPerPage, search, number, transactionType }),
    [page, rowsPerPage, search, transactionType, number]
  )

  const requestParams: IGetAccountingAccountsByClientDTO = useMemo(
    () => ({ clientId: router.query.id as string, params }),
    [router.query.id, params]
  )

  const {
    data: rows,
    isLoading,
    isError
  } = useAccountingAccountsByClient(requestParams, {
    enabled: router.isReady,
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true
  })

  const handleRequestSort = (event: MouseEvent<unknown>, property: any) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage)
  }, [])

  const handleChangeRowsPerPage = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }, [])

  const visibleRows: IAccountingAccountDTO[] = useMemo(
    () => stableSort(accountingAccounts, getComparator(order, orderBy)),
    [order, orderBy, accountingAccounts]
  )

  const handleCheckRowValue = (value: string) => {
    return value ? value : 'Não Informado'
  }

  useEffect(() => {
    if (rows) setAccountingAccounts(rows.data)
  }, [rows])

  const tableHeaderProps = useMemo(
    () => ({
      search,
      handleSearch: setSearch,
      transactionType,
      handleTransactionType: setTransactionType,
      number,
      handleNumber: setNumber
    }),
    [search, transactionType, number]
  )

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
        <TableHeader {...tableHeaderProps} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={'medium'}>
            <EnhancedTableHead
              headCells={HeadCells}
              order={order}
              orderBy={orderBy}
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
                        Nenhuma conta encontrada
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
                            {handleCheckRowValue(applyAccountNumberMask(row.number))}
                          </Typography>
                        </TableCell>
                        <TableCell align='left'>
                          <CustomChip
                            rounded
                            skin='light'
                            size='small'
                            label={handleCheckRowValue(typeValues[row.transactionType])}
                            color={'secondary'}
                            sx={{
                              minWidth: 85,
                              '& .MuiChip-label': {
                                fontWeight: 'bold'
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell align='left'>
                          <RowItemLimited item={handleCheckRowValue(row.description)} />
                        </TableCell>
                        <TableCell align='left'>
                          <Typography noWrap sx={{ color: 'text.secondary' }}>
                            {dateProvider.formatDate(new Date(row.createdAt), "d 'de' MMM 'de' yyyy")}
                          </Typography>
                        </TableCell>
                        <TableCell align='left'>
                          <RowOptions data={row} />
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Suspense>
          </Table>
        </TableContainer>
        <Pagination {...paginationProps} />
      </Paper>
    </Box>
  )
}

export default AccountingAccounts
