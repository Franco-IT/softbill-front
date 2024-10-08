// React and Material UI
import { Suspense, useMemo, memo, useState, useEffect } from 'react'
import {
  Box,
  Paper,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useMediaQuery,
  Tooltip
} from '@mui/material'

// Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import DrawerAnchor from 'src/components/DrawerAnchor'
import EditTransaction from 'src/components/DrawerComponents/client/EditTransaction'
import CustomAvatar from 'src/components/CustomAvatar'

// Hooks
import { useDrawer } from 'src/hooks/useDrawer'

// Utilities
import { Loading, Order } from 'src/utils/list'
import { formatAmount, formatNameBank } from 'src/utils/format'
import { getInitials } from 'src/utils/getInitials'
import { dateProvider } from 'src/shared/providers'

// Table-related Components
import HeadCells from './HeadCells'
import TableHeader from './TableHeader'
import TablePagination from './TablePagination'
import EnhancedTableHead from './EnhancedTableHead'

export type ColorType = 'primary' | 'error' | 'success' | 'secondary' | 'info' | 'warning' | undefined

const typeValues: { [key: string]: string } = {
  CREDIT: 'Crédito',
  DEBIT: 'Débito'
}

const typeColors: { [key: string]: ColorType } = {
  CREDIT: 'success',
  DEBIT: 'error'
}

const RowItemLimited = ({ item }: { item: string }) => {
  const limitItem = (value: string) => (value.length > 25 ? value.substring(0, 25) + '...' : value)

  return (
    <Typography noWrap sx={{ color: 'text.secondary' }}>
      {limitItem(item)}
    </Typography>
  )
}

interface TableProps {
  rows: any
  isLoading: boolean
  search: string
  handleSearch: (value: string) => void
  status: string
  handleStatus: (value: string) => void
  type: string
  handleType: (value: string) => void
  validated: string
  handleValidated: (value: string) => void
  order: Order
  orderBy: any
  handleRequestSort: (event: React.MouseEvent<unknown>, property: keyof any) => void
  visibleRows: any
  paginationProps: any
}

const Table = memo(
  ({
    rows,
    visibleRows,
    isLoading,
    search,
    handleSearch,
    handleStatus,
    handleType,
    status,
    type,
    validated,
    handleValidated,
    handleRequestSort,
    order,
    orderBy,
    paginationProps
  }: TableProps) => {
    const { anchor, open, toggleDrawer, children } = useDrawer()
    const isSmallerThanMd = useMediaQuery((theme: any) => theme.breakpoints.down('md'))

    const [selected, setSelected] = useState<readonly string[]>([])

    const handleClick = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, id: string) => {
      const selectedIndex = selected.indexOf(id)
      let newSelected: readonly string[] = []

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id)
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1))
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1))
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
      }
      setSelected(newSelected)

      const item = visibleRows.filter((item: any) => {
        return item.id === newSelected[0]
      })[0]

      toggleDrawer(isSmallerThanMd ? 'bottom' : 'right', true, <EditTransaction {...item} />)(e)
    }

    const isSelected = (id: string) => selected.indexOf(id) !== -1

    const handleCheckRowValue = (value: string) => {
      return value ? value : 'Não Informado'
    }

    const tableHeaderProps = useMemo(
      () => ({
        search,
        handleSearch,
        status,
        handleStatus,
        type,
        handleType,
        validated,
        handleValidated
      }),
      [search, handleSearch, status, handleStatus, type, handleType, validated, handleValidated]
    )

    const drawerProps = {
      anchor,
      open,
      toggleDrawer,
      children
    }

    useEffect(() => {
      if (!open) setSelected([])
    }, [open])

    return (
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableHeader searchProps={tableHeaderProps} />
        <TableContainer>
          <MuiTable sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={'medium'}>
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
                        Nenhuma transação encontrada
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  visibleRows.map((row: any, index: number) => {
                    const isItemSelected = isSelected(row.id)
                    const labelId = `enhanced-MuiTable-checkbox-${index}`

                    const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, id: string) => {
                      handleClick(e, id)
                    }

                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={row.id}
                        onClick={event => handleRowClick(event, row.id)}
                        selected={isItemSelected}
                      >
                        <TableCell component='th' id={labelId} scope='row' padding='none'>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CustomAvatar
                              src={row.bankLogo}
                              content={getInitials(row.bankName)}
                              sx={{
                                mr: 2.5,
                                width: 38,
                                height: 38,
                                fontWeight: 500,
                                fontSize: (theme: any) => theme.typography.body1.fontSize
                              }}
                            />
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                              <Tooltip title={row.bankName} placement='top'>
                                <Typography
                                  noWrap
                                  sx={{
                                    fontWeight: 500,
                                    textDecoration: 'none',
                                    color: 'text.secondary'
                                  }}
                                >
                                  {formatNameBank(row.bankName)}
                                </Typography>
                              </Tooltip>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align='left'>
                          <CustomChip
                            rounded
                            skin='light'
                            size='small'
                            label={handleCheckRowValue(typeValues[row.transactionTypeExtract])}
                            color={typeColors[row.transactionTypeExtract]}
                            sx={{
                              minWidth: 85,
                              '& .MuiChip-label': {
                                fontWeight: 'bold'
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell align='left'>
                          <CustomChip
                            rounded
                            skin='light'
                            size='small'
                            label={formatAmount(
                              row.amount,
                              row.transactionTypeExtract === 'DEBIT' ? 'negative' : 'positive'
                            )}
                            color={typeColors[row.transactionTypeExtract]}
                            sx={{ textTransform: 'capitalize', minWidth: 85 }}
                          />
                        </TableCell>
                        <TableCell align='left'>
                          <Typography noWrap sx={{ color: 'text.secondary' }}>
                            {dateProvider.formatDate(new Date(row.date), "d 'de' MMM 'de' yyyy")}
                          </Typography>
                        </TableCell>
                        <TableCell align='left'>
                          <RowItemLimited item={handleCheckRowValue(row.extractDescription)} />
                        </TableCell>
                        <TableCell align='left'>
                          <RowItemLimited item={handleCheckRowValue(row.conciliationDescription)} />
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Suspense>
          </MuiTable>
        </TableContainer>
        <TablePagination {...paginationProps} />
        <DrawerAnchor {...drawerProps} />
      </Paper>
    )
  }
)

export default Table
