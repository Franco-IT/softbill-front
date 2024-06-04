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

import { Loading, Order, getComparator, removeRowFromList, renderInitials, stableSort } from 'src/utils/list'
import { verifyUserStatus, verifyUserType } from 'src/@core/utils/user'
import { formatDate } from 'src/@core/utils/format'

import { ThemeColor } from 'src/@core/layouts/types'
import { ClientProps, ClientsListProps } from 'src/types/clients'

import toast from 'react-hot-toast'
import { api } from 'src/services/api'
import { useAuth } from 'src/hooks/useAuth'
import useGetDataApi from 'src/hooks/useGetDataApi'

interface ColorsType {
  [key: string]: ThemeColor
}

const roleColors: ColorsType = {
  CLIENT: 'success'
}

interface ClientStatusType {
  [key: string]: ThemeColor
}

const clientStatusObj: ClientStatusType = {
  ACTIVE: 'success',
  INACTIVE: 'secondary'
}

const List = () => {
  const { user } = useAuth()
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof ClientProps>('createdAt')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [filter, setFilter] = useState('')
  const [clients, setClients] = useState<ClientProps[]>([])

  const { data: rows } = useGetDataApi<ClientsListProps>({
    url: `/clients/by-accounting/${user?.id}`,
    params: { page: page + 1, perPage: rowsPerPage, search: filter }
  })

  const handleRequestSort = (event: MouseEvent<unknown>, property: keyof ClientProps) => {
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

  const visibleRows = useMemo(() => stableSort(clients, getComparator(order, orderBy)), [order, orderBy, clients])

  const handleConfirmDelete = async (id: string) => {
    api
      .delete(`/clients/${id}`)
      .then(response => {
        if (response.status === 200) {
          const updatedListClients = removeRowFromList(id, clients, '_id')
          setClients(updatedListClients)
          toast.success('Cliente deletado com sucesso!')
        }
      })
      .catch(() => {
        toast.error('Erro ao deletar cliente!')
      })
  }

  useEffect(() => {
    if (rows) setClients(rows.data)
  }, [rows])

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableHeader filter={filter} handleFilter={setFilter} />
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
                        Nenhum cliente encontrado
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
                              href={`/clientes/${row._id}`}
                              sx={{
                                fontWeight: 500,
                                textDecoration: 'none',
                                color: 'text.secondary',
                                '&:hover': { color: 'primary.main' }
                              }}
                            >
                              {row.name}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align='left'>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography noWrap variant='body2' sx={{ color: 'text.secondary' }}>
                            {row.email}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align='left'>
                        <CustomChip
                          rounded
                          skin='light'
                          size='small'
                          label={verifyUserType(String(row.type))}
                          color={roleColors[String(row.type)]}
                          sx={{ minWidth: 107, textTransform: 'capitalize' }}
                        />
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
                          label={verifyUserStatus(String(row.status))}
                          color={clientStatusObj[String(row.status)]}
                          sx={{ textTransform: 'capitalize', minWidth: 85 }}
                        />
                      </TableCell>
                      <TableCell align='left'>
                        <RowOptions id={String(row._id)} handleConfirmDelete={() => handleConfirmDelete(row._id)} />
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
