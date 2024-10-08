// React e hooks
import { Suspense, useEffect, useState, ChangeEvent, MouseEvent, useMemo, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

// MUI
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'

// Componentes internos
import CustomChip from 'src/@core/components/mui/chip'

// Utilidades
import { formatNameBank } from 'src/utils/format'
import { formatDate } from 'src/@core/utils/format'
import { getInitials } from 'src/utils/getInitials'
import { Loading, Order, getComparator, stableSort } from 'src/utils/list'

// Tipos e layouts
import { ThemeColor } from 'src/@core/layouts/types'
import { IBankAccountDTO } from 'src/modules/banks/dtos/IBankAccountDTO'

// Controladores e serviços
import { bankController } from 'src/modules/banks'

// Componentes de feedback
import Error from 'src/components/FeedbackAPIs/Error'
import CustomAvatar from 'src/components/CustomAvatar'
import TableHeader from './TableHeader'
import EnhancedTableHead from './EnhancedTableHead'
import RowOptions from './RowOptions'
import HeadCells from './HeadCells'
import Pagination from './Pagination'

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

const AccountingAccounts = () => {
  const router = useRouter()

  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof IBankAccountDTO>('createdAt')
  const [type, setType] = useState<string>('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [filter, setFilter] = useState('')
  const [banks, setBanks] = useState<IBankAccountDTO[]>([])

  const params = useMemo(
    () => ({ page: page + 1, perPage: rowsPerPage, search: filter, withBanks: true }),
    [page, rowsPerPage, filter]
  )

  const requestParams = useMemo(() => ({ id: router.query.id as string, params }), [router.query.id, params])

  const {
    data: rows,
    isLoading,
    isError
  } = useQuery<any>(['bank-accounts', params], () => bankController.getBanksByClientId(requestParams), {
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

  const visibleRows = useMemo(() => stableSort(banks, getComparator(order, orderBy)), [order, orderBy, banks])

  useEffect(() => {
    if (rows) setBanks(rows.data)
  }, [rows])

  const tableHeaderProps = useMemo(
    () => ({
      value: filter,
      handleFilter: setFilter,
      type,
      handleType: setType
    }),
    [filter, type]
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
                        Nenhum banco encontrado
                      </Typography>+
                    </TableCell>
                  </TableRow>
                ) : (
                  visibleRows.map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`

                    return (
                      <TableRow hover tabIndex={-1} key={row.id}>
                        <TableCell component='th' id={labelId} scope='row' padding='none'>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CustomAvatar
                              src={row.bank.logo}
                              content={getInitials(row?.bank?.name)}
                              sx={{
                                mr: 2.5,
                                width: 38,
                                height: 38,
                                fontWeight: 500,
                                fontSize: (theme: any) => theme.typography.body1.fontSize
                              }}
                            />
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                              <Typography
                                noWrap
                                sx={{
                                  fontWeight: 500,
                                  textDecoration: 'none',
                                  color: 'text.secondary'
                                }}
                              >
                                {formatNameBank(row?.bank?.name || 'Nome não informado')}
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
