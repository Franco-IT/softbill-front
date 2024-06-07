import { Suspense, useEffect, useState, ChangeEvent, MouseEvent, useMemo } from 'react'
import Link from 'next/link'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material'
import CustomChip from 'src/@core/components/mui/chip'

import HeadCells from './HeadCells'
import RowOptions from './RowOptions'
import TableHeader from './TableHeader'
import EnhancedTableHead from './EnhancedTableHead'

import { formatName } from 'src/utils/formatName'
import { formatDate } from 'src/@core/utils/format'
import { Loading, Order, getComparator, renderInitials, stableSort } from 'src/utils/list'

import { ThemeColor } from 'src/@core/layouts/types'
import { BankListDataProps, BankProps } from 'src/types/banks'
import useGetDataApi from 'src/hooks/useGetDataApi'

interface BankStatusColor {
  [key: string]: ThemeColor
}

const bankStatusObj: BankStatusColor = {
  ACTIVE: 'success',
  INACTIVE: 'secondary'
}

interface BankStatusType {
  [key: string]: string
}

const banckStatus: BankStatusType = {
  ACTIVE: 'Ativo',
  INACTIVE: 'Inativo'
}

const List = () => {
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof BankProps>('createdAt')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [filter, setFilter] = useState('')
  const [banks, setBanks] = useState<BankProps[]>([])

  const { data: rows, setRefresh } = useGetDataApi<BankListDataProps>({
    url: '/banks',
    params: { page: page + 1, perPage: rowsPerPage, search: filter }
  })

  const handleRequestSort = (event: MouseEvent<unknown>, property: keyof BankProps) => {
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

  useEffect(() => {
    if (rows) setBanks(rows.data)
  }, [rows])

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableHeader value={filter} handleFilter={setFilter} />
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
                {visibleRows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Typography noWrap variant='h6' sx={{ color: 'text.secondary' }}>
                        Nenhum banco encontrado
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
                {visibleRows.map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow hover tabIndex={-1} key={row._id}>
                      <TableCell component='th' id={labelId} scope='row' padding='none'>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {renderInitials(row)}
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Typography
                              noWrap
                              component={Link}
                              href={`/usuarios/${row._id}`}
                              sx={{
                                fontWeight: 500,
                                textDecoration: 'none',
                                color: 'text.secondary',
                                '&:hover': { color: 'primary.main' }
                              }}
                            >
                              {formatName(row.name)}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography noWrap sx={{ color: 'text.secondary' }}>
                          {formatDate(new Date(row.createdAt))}
                        </Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <CustomChip
                          rounded
                          skin='light'
                          size='small'
                          label={banckStatus[row.status]}
                          color={bankStatusObj[row.status]}
                          sx={{ textTransform: 'capitalize', minWidth: 85 }}
                        />
                      </TableCell>
                      <TableCell align='left'>
                        <RowOptions
                          id={String(row._id)}
                          status={row.status}
                          refreshData={() => setRefresh(current => !current)}
                        />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Suspense>
          </Table>
        </TableContainer>
        <TablePagination
          labelRowsPerPage='Linhas por página:'
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={rows?.total || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}

export default List
