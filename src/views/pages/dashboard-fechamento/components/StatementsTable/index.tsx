import { Suspense, useState, ChangeEvent, MouseEvent, useMemo, useEffect, useCallback } from 'react'
import { Box, Paper, Table, TableContainer, TablePagination } from '@mui/material'

import { HeadCellsOFX } from './HeadCells'
import TableHeader from './TableHeader'
import EnhancedTableHead from './EnhancedTableHead'

import { Loading, Order, getComparator, stableSort } from 'src/utils/list'

import { BankAccountListDataProps } from 'src/types/banks'
import useGetDataApi from 'src/hooks/useGetDataApi'
import { useAuth } from 'src/hooks/useAuth'
import { ClientsListProps } from 'src/types/clients'

import { useAppSelector } from 'src/hooks/useAppSelector'
import { useAppDispatch } from 'src/hooks/useAppDispatch'
import { setStatements } from 'src/store/modules/statement/reducer'
import Rows from './Rows'

export type OperationTypeProps = 'INTEGRATION' | 'IMPORT' | null

const StatementsTable = () => {
  const { user } = useAuth()

  const clientId = useAppSelector(state => state.StatementsReducer.clientId)
  const operationType = useAppSelector(state => state.StatementsReducer.operationType)
  const bankId = useAppSelector(state => state.StatementsReducer.operations.integration.bankId)
  const statements = useAppSelector(state => state.StatementsReducer.statements)

  const dispatch = useAppDispatch()

  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<any>('createdAt')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [totalRows, setTotalRows] = useState(0)

  const [filter, setFilter] = useState('')

  const { data: clients } = useGetDataApi<ClientsListProps>({
    url: `/users?accountingId=${user?.id}&type=CLIENT`,
    params: { perPage: 10000 }
  })

  const { data: clientBanks, handleResetData: handleResetClientBanks } = useGetDataApi<BankAccountListDataProps>({
    url: `/bankAccounts/by-client/${clientId}`,
    params: { withBanks: true },
    callInit: !!clientId
  })

  const {
    data: rows,
    loading,
    handleResetData: handleResetRows
  } = useGetDataApi<any>({
    url: `/bankAccounts/get-bank-data/${bankId}`,
    params: { page: page + 1, perPage: rowsPerPage, search: filter, withBanks: true },
    callInit: !!bankId
  })

  const handleRequestSort = (event: MouseEvent<unknown>, property: any) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const visibleRows = useMemo(() => stableSort(statements, getComparator(order, orderBy)), [statements, order, orderBy])

  const handleRenderFileImported = (rows: any) => {
    return (
      <>
        <EnhancedTableHead
          headCells={HeadCellsOFX}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          rowCount={totalRows || 0}
        />
        <Suspense fallback={<Loading />}>
          <Rows visibleRows={rows} loading={loading} />
        </Suspense>
      </>
    )
  }

  const handleSetStatements = useCallback(
    (operationType: string, rows: any) => {
      switch (operationType) {
        case 'INTEGRATION':
          return dispatch(setStatements(rows.listaLancamento || []))
        case 'IMPORT':
          return dispatch(setStatements(rows.preview || []))
        default:
          return null
      }
    },
    [dispatch]
  )

  useEffect(() => {
    if (!bankId && rows) return handleResetRows()

    if (bankId && rows) handleSetStatements(operationType || '', rows)
  }, [clientId, bankId, dispatch, rows, handleResetRows, handleSetStatements, operationType])

  const filterProps = {
    filter,
    handleFilter: setFilter
  }

  const clientProps = {
    clients: clients?.data || []
  }

  const paginationProps = {
    page: page + 1,
    perPage: rowsPerPage,
    setTotalPages: setTotalRows
  }

  const clientBanksProps = {
    clientBanks: clientBanks?.data || [],
    handleResetClientBanks
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableHeader
          filterProps={filterProps}
          clientProps={clientProps}
          paginationProps={paginationProps}
          clientBanksProps={clientBanksProps}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={'medium'}>
            {handleRenderFileImported(visibleRows || [])}
          </Table>
        </TableContainer>
        {visibleRows.length > 0 && (
          <TablePagination
            labelRowsPerPage='Linhas por página:'
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={totalRows || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Paper>
    </Box>
  )
}

export default StatementsTable
