// React imports for managing component lifecycle, state, events, and memoization
import { Suspense, useEffect, useState, ChangeEvent, MouseEvent, useMemo, useCallback } from 'react'

// Next.js Link for client-side navigation
import Link from 'next/link'

// MUI components for UI structure and table management
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'

// Notification system (Toast)
import toast from 'react-hot-toast'

// Custom MUI components and error handling
import CustomChip from 'src/@core/components/mui/chip'
import Error from 'src/components/FeedbackAPIs/Error'

// Local components for table functionalities
import HeadCells from './HeadCells'
import RowOptions from './RowOptions'
import TableHeader from './TableHeader'
import TablePagination from './TablePagination'
import EnhancedTableHead from './EnhancedTableHead'

// Utility functions for formatting and user data validation
import { formatName } from 'src/utils/formatName'
import { formatDate } from 'src/@core/utils/format'
import { verifyUserStatus, verifyUserType } from 'src/@core/utils/user'

// Additional utility functions for sorting and data rendering
import { Loading, Order, getComparator, renderUser, stableSort } from 'src/utils/list'

// Theme type definitions
import { ThemeColor } from 'src/@core/layouts/types'

// Hooks for authentication and client data queries
import { useAuth } from 'src/hooks/useAuth'
import { useMutation, useQueryClient } from 'react-query'

// User and client controllers for API management
import { userController } from 'src/modules/users'
import { IClientDTO } from 'src/modules/clients/dtos/IClientDTO'
import { AppError } from 'src/shared/errors/AppError'
import { useClients } from 'src/hooks/clients/useClients'

// DTO for retrieving multiple clients
import { IGetClientsDTO } from 'src/modules/clients/dtos/IGetClientsDTO'

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
  const queryClient = useQueryClient()

  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof IClientDTO>('createdAt')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [filter, setFilter] = useState('')
  const [clients, setClients] = useState<IClientDTO[]>([])

  const params: IGetClientsDTO = useMemo(
    () => ({ accountingId: user?.id || '', type: 'CLIENT', page: page + 1, perPage: rowsPerPage, search: filter }),
    [user?.id, page, rowsPerPage, filter]
  )

  const {
    data: rows,
    isLoading,
    isError
  } = useClients(params, {
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
    refetchOnWindowFocus: false
  })

  const handleRequestSort = useCallback(
    (event: MouseEvent<unknown>, property: keyof IClientDTO) => {
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

  const visibleRows = useMemo(() => stableSort(clients, getComparator(order, orderBy)), [order, orderBy, clients])

  const handleConfirmDelete = useMutation(
    (id: string) => {
      return userController.delete({ id })
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['clients'])
        toast.success('Cliente deletado com sucesso!')
      },
      onError: error => {
        if (error instanceof AppError) toast.error(error.message)
      }
    }
  )

  useEffect(() => {
    if (rows) setClients(rows.data)
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
                        Nenhum cliente encontrado
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  visibleRows.map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`

                    return (
                      <TableRow hover tabIndex={-1} key={row.id}>
                        <TableCell component='th' id={labelId} scope='row' padding='none'>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {renderUser(row, {
                              sx: {
                                mr: 2.5,
                                width: 38,
                                height: 38,
                                fontWeight: 500,
                                fontSize: (theme: any) => theme.typography.body1.fontSize
                              }
                            })}
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                              <Typography
                                noWrap
                                component={Link}
                                href={`/clientes/${row.id}`}
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
                          <RowOptions
                            id={String(row.id)}
                            handleConfirmDelete={() => handleConfirmDelete.mutateAsync(row.id)}
                          />
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
