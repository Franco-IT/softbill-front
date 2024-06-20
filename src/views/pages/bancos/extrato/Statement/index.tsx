import { Suspense, useState, ChangeEvent, MouseEvent, useMemo, useEffect, useReducer, useCallback } from 'react'
import { Box, Paper, Table, TableContainer, TablePagination } from '@mui/material'

import { HeadCellsBB, HeadCellsOFX } from './HeadCells'
import TableHeader from './TableHeader'
import EnhancedTableHead from './EnhancedTableHead'

import { Loading, Order, getComparator, stableSort } from 'src/utils/list'

import { BankAccountListDataProps, BankAccountProps } from 'src/types/banks'
import useGetDataApi from 'src/hooks/useGetDataApi'
import { useAuth } from 'src/hooks/useAuth'
import { ClientsListProps } from 'src/types/clients'
import StatementsTableBB from './Tables/Banks/BB'
import { iniitialStateIntegration, reducerIntegration } from './reducers/integrationReducer'
import { iniitialStateImport, reducerImport } from './reducers/importReducer'
import StatementsOFX from './Tables/OFX'

export type OperationTypeProps = 'INTEGRATION' | 'IMPORT' | null

const StatementsTable = () => {
  const { user } = useAuth()

  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof BankAccountProps>('createdAt')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [totalRows, setTotalRows] = useState(0)

  const [filter, setFilter] = useState('')
  const [clientId, setClientId] = useState<string | null>(null)
  const [statements, setStatements] = useState<any[]>([])
  const [stateIntegration, dispatchStateIntegration] = useReducer(reducerIntegration, iniitialStateIntegration)
  const [stateImport, dispatchStateImport] = useReducer(reducerImport, iniitialStateImport)
  const [operationType, setOperationType] = useState<OperationTypeProps>(null)

  const { bankId } = stateIntegration

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

  const handleRequestSort = (event: MouseEvent<unknown>, property: keyof BankAccountProps) => {
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

  const handleFilterBank = (val: string | null, banks: BankAccountProps[] | null) => {
    if (!val || !banks) return null

    const filteredBanks = banks.filter(bank => bank._id == val)[0]

    return filteredBanks ? filteredBanks.bank.slug : null
  }

  const handleRenderStatementBank = (bank: string, rows: any) => {
    switch (bank) {
      case 'BB':
        return (
          <>
            <EnhancedTableHead
              headCells={HeadCellsBB}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows?.quantidadeRegistroPaginaAtual || 0}
            />
            <Suspense fallback={<Loading />}>
              <StatementsTableBB visibleRows={rows} loading={loading} />
            </Suspense>
          </>
        )

      default:
        return null
    }
  }

  const handleRenderFileImported = (rows: any) => {
    if (rows.length == 0) return null

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
          <StatementsOFX visibleRows={rows} loading={loading} />
        </Suspense>
      </>
    )
  }

  const handleSetStatements = useCallback(
    (operationType: string, rows: any) => {
      switch (operationType) {
        case 'INTEGRATION':
          return setStatements(rows.listaLancamento || [])
        case 'IMPORT':
          return setStatements(stateImport.preview || [])
        default:
          return null
      }
    },
    [stateImport.preview]
  )

  const handleRenderRowsForOperationType = (operationType: OperationTypeProps) => {
    switch (operationType) {
      case 'INTEGRATION':
        return handleRenderStatementBank(handleFilterBank(bankId, clientBanks?.data || null) || '', visibleRows || [])
      case 'IMPORT':
        return handleRenderFileImported(visibleRows || [])
      default:
        return null
    }
  }

  useEffect(() => {
    if (!clientId) return setStatements([])

    if (!bankId && rows) {
      handleResetRows()
      setStatements([])

      return
    }

    if (rows || stateImport.preview) handleSetStatements(operationType || '', rows || stateImport.preview)
  }, [bankId, clientId, handleResetRows, handleSetStatements, operationType, rows, stateImport.preview])

  const filterProps = {
    filter,
    handleFilter: setFilter
  }

  const paginationProps = {
    page: page + 1,
    perPage: rowsPerPage,
    setTotalPages: setTotalRows
  }

  const clientProps = {
    clientId,
    setClientId,
    clients: clients?.data || []
  }

  const clientBanksProps = {
    clientBanks: clientBanks?.data || [],
    handleResetClientBanks
  }

  const OperationTypePropsValues = {
    operationType,
    setOperationType
  }

  const stateIntegrationProps = {
    stateIntegration,
    dispatchStateIntegration
  }

  const stateImportProps = {
    stateImport,
    dispatchStateImport
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableHeader
          filterProps={filterProps}
          clientProps={clientProps}
          paginationProps={paginationProps}
          clientBanksProps={clientBanksProps}
          importStateProps={stateImportProps}
          stateIntegrationProps={stateIntegrationProps}
          OperationTypePropsValues={OperationTypePropsValues}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={'medium'}>
            {handleRenderRowsForOperationType(operationType)}
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
