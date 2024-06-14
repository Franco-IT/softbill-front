import { Suspense, useEffect, useState, ChangeEvent, MouseEvent, useMemo } from 'react'
import { Box, Paper, Table, TableContainer, TablePagination } from '@mui/material'

import { HeadCellsBB } from './HeadCells'
import TableHeader from './TableHeader'
import EnhancedTableHead from './EnhancedTableHead'

import { Loading, Order, getComparator, stableSort } from 'src/utils/list'

import { BankAccountProps } from 'src/types/banks'
import useGetDataApi from 'src/hooks/useGetDataApi'
import { useRouter } from 'next/router'
import StatementsTableBB from './Banks/BB'

const StatementsTable = () => {
  const router = useRouter()

  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof BankAccountProps>('createdAt')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [filter, setFilter] = useState('')
  const [startDate, setStartDate] = useState<Date | null | undefined>(null)
  const [endDate, setEndDate] = useState<Date | null | undefined>(null)
  const [banks, setBanks] = useState<BankAccountProps[]>([])

  const { data: rows, loading } = useGetDataApi<any>({
    url: `/bankAccounts/get-bank-data/${router.query.id}`,
    params: { page: page + 1, perPage: rowsPerPage, search: filter, withBanks: true },
    callInit: router.isReady
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

  const visibleRows = useMemo(() => stableSort(banks, getComparator(order, orderBy)), [order, orderBy, banks])

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

  useEffect(() => {
    if (rows) setBanks(rows.listaLancamento)
  }, [rows])

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableHeader
          filter={filter}
          handleFilter={setFilter}
          startDate={startDate}
          handleFilterStartDate={setStartDate}
          endDate={endDate}
          handleFilterEndDate={setEndDate}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={'medium'}>
            {handleRenderStatementBank((router.query.slug as string) || '', visibleRows)}
          </Table>
        </TableContainer>
        <TablePagination
          labelRowsPerPage='Linhas por página:'
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={rows?.quantidadeRegistroPaginaAtual || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}

export default StatementsTable
