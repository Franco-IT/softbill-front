// React imports for state and effect management
import { Suspense, useEffect, useState, ChangeEvent, MouseEvent, useMemo, useCallback } from 'react'

// Link component for navigation
import Link from 'next/link'

// Material UI components
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'

// Custom chip component
import CustomChip from 'src/@core/components/mui/chip'

// Local components for table rendering
import HeadCells from './HeadCells'
import RowOptions from './RowOptions'
import TableHeader from './TableHeader'
import TablePagination from './TablePagination'
import EnhancedTableHead from './EnhancedTableHead'

// Utility functions for formatting
import { formatName } from 'src/utils/formatName'
import { formatDate } from 'src/@core/utils/format'
import { verifyUserStatus, verifyUserType } from 'src/@core/utils/user'

// Utilities for sorting and rendering
import { Loading, Order, getComparator, renderUser, stableSort } from 'src/utils/list'

// Theme color type
import { ThemeColor } from 'src/@core/layouts/types'

// Toast notifications for feedback
import toast from 'react-hot-toast'

// React Query for data fetching
import { useMutation, useQueryClient } from 'react-query'

// User controller for API interactions
import { userController } from 'src/modules/users'

// Error handling component
import Error from 'src/components/FeedbackAPIs/Error'

// User DTO for type safety
import { IUserDTO } from 'src/modules/users/dtos/IUserDTO'

// Application error handling
import { AppError } from 'src/shared/errors/AppError'

// Custom hook for fetching users
import { useUsers } from 'src/hooks/users/useUsers'

interface ColorsType {
  [key: string]: ThemeColor
}

const roleColors: ColorsType = {
  ADMIN: 'info'
}

interface UserStatusType {
  [key: string]: ThemeColor
}

const userStatusObj: UserStatusType = {
  ACTIVE: 'success',
  INACTIVE: 'secondary'
}

const List = () => {
  const queryClient = useQueryClient()

  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof IUserDTO>('createdAt')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [filter, setFilter] = useState('')
  const [users, setUsers] = useState<IUserDTO[]>([])

  const params = useMemo(
    () => ({ type: 'ADMIN', page: page + 1, perPage: rowsPerPage, search: filter }),
    [page, rowsPerPage, filter]
  )

  const {
    data: rows,
    isLoading,
    isError
  } = useUsers(params, {
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
    refetchOnWindowFocus: false
  })

  const handleRequestSort = useCallback(
    (event: MouseEvent<unknown>, property: keyof IUserDTO) => {
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

  const visibleRows = useMemo(() => stableSort(users, getComparator(order, orderBy)), [order, orderBy, users])

  const handleConfirmDelete = useMutation(
    async (id: string) => {
      return userController.delete({ id })
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['users'])
        toast.success('Usuário deletado com sucesso!')
      },
      onError: error => {
        if (error instanceof AppError) toast.error(error.message)
      }
    }
  )

  useEffect(() => {
    if (rows) setUsers(rows.data)
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
                        Nenhum usuário encontrado
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
                                href={`/usuarios/${row.id}`}
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
                            color={userStatusObj[String(row.status)]}
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
