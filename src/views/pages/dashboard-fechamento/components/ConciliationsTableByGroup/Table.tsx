// React Imports
import { Suspense, useMemo, memo, useState, useEffect, Fragment } from 'react'

// Material UI Imports
import {
  Box,
  Paper,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useMediaQuery
} from '@mui/material'

// Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import DrawerAnchor from 'src/components/DrawerAnchor'
import ConciliationItem from '../DrawerComponents/ConciliationItem'

// Local Components
import HeadCells from './HeadCells'
import TableHeader from './TableHeader'
import TablePagination from './TablePagination'
import EnhancedTableHead from './EnhancedTableHead'

// Hooks
import { useDrawer } from 'src/hooks/useDrawer'

// Utils
import { Loading, Order, renderInitials } from 'src/utils/list'
import { formatAmount } from 'src/utils/format'
import { formatNameBank } from '../../utils'
import { applyAccountNumberMask } from 'src/utils/inputs'
import { useSettings } from 'src/@core/hooks/useSettings'
import CustomConciliationGroupAccordion from '../CustomConciliationGroupAccordion'

const typeValues: { [key: string]: string } = {
  CREDIT: 'Crédito',
  DEBIT: 'Débito'
}

const rowColor: {
  [key: string]: { [key: string]: string }
} = {
  light: {
    DONE: '#DCF6E8',
    PENDING: '#FCE4E4',
    WAITING_REVIEW: '#FFF0E1'
  },
  dark: {
    DONE: '#2D4B4F',
    PENDING: '#4D394B',
    WAITING_REVIEW: '#504548'
  }
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
  visibleRowsGroup: any
  paginationProps: any
}

const Table = memo(
  ({
    rows,
    visibleRowsGroup,
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
    const { settings } = useSettings()
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

      const item = visibleRowsGroup.filter((item: any) => {
        let itemSelected = item.id === newSelected[0]

        if (!itemSelected) {
          itemSelected = item.data?.some((itemData: any) => itemData.id === newSelected[0])
        }

        return itemSelected
      })[0]

      toggleDrawer(isSmallerThanMd ? 'bottom' : 'right', true, <ConciliationItem {...item} />)(e)
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
                    <TableCell colSpan={7}>
                      <Typography noWrap variant='h6' sx={{ color: 'text.secondary' }}>
                        Carregando...
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : visibleRowsGroup.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <Typography noWrap variant='h6' sx={{ color: 'text.secondary' }}>
                        Nenhuma conciliação encontrada
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  visibleRowsGroup.map((row: any, index: number) => {
                    const isItemSelected = isSelected(row.id)
                    const labelId = `enhanced-MuiTable-checkbox-${index}`

                    const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, id: string) => {
                      handleClick(e, id)
                    }

                    if (!row.data) {
                      return (
                        <TableRow
                          hover
                          tabIndex={-1}
                          key={row.id}
                          onClick={event => handleRowClick(event, row.id)}
                          selected={isItemSelected}
                          sx={{
                            backgroundColor: rowColor[settings.mode][row.status],
                            cursor: 'pointer',
                            '&:hover': {
                              backgroundColor: `${rowColor[settings.mode][row.status]} !important`,
                              filter: 'brightness(0.9)',
                              transition: 'filter 0.3s'
                            }
                          }}
                        >
                          <TableCell component='th' id={labelId} scope='row' padding='none'>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {renderInitials(row.bankName, {
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
                                  sx={{
                                    fontWeight: 500,
                                    textDecoration: 'none',
                                    color: 'text.secondary'
                                  }}
                                >
                                  {formatNameBank(row.bankName)}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell align='left'>
                            <Typography noWrap sx={{ color: 'text.secondary' }}>
                              {handleCheckRowValue(applyAccountNumberMask(row.creditAccount))}
                            </Typography>
                          </TableCell>
                          <TableCell align='left'>
                            <Typography noWrap sx={{ color: 'text.secondary' }}>
                              {handleCheckRowValue(applyAccountNumberMask(row.debitAccount))}
                            </Typography>
                          </TableCell>
                          <TableCell align='left'>
                            <CustomChip
                              rounded
                              skin='light'
                              size='small'
                              label={handleCheckRowValue(typeValues[row.transactionTypeConciliation])}
                              color={'secondary'}
                              sx={{ textTransform: 'uppercase', minWidth: 85 }}
                            />
                          </TableCell>
                          <TableCell align='left'>
                            <CustomChip
                              rounded
                              skin='light'
                              size='small'
                              label={formatAmount(row.amount)}
                              color={'secondary'}
                              sx={{ textTransform: 'capitalize', minWidth: 85 }}
                            />
                          </TableCell>
                          <TableCell align='left'>
                            <RowItemLimited item={handleCheckRowValue(row.extractDescription)} />
                          </TableCell>
                          <TableCell align='left'>
                            <RowItemLimited item={handleCheckRowValue(row.conciliationDescription)} />
                          </TableCell>
                        </TableRow>
                      )
                    }

                    return (
                      <TableRow key={row.id}>
                        <TableCell colSpan={7}>
                          <CustomConciliationGroupAccordion data={row}>
                            <Fragment>
                              {row.data.map((rowItem: any) => (
                                <TableRow
                                  hover
                                  key={row.id}
                                  onClick={event => handleRowClick(event, rowItem.id)}
                                  selected={isItemSelected}
                                  sx={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    '& > *': { flex: 1 },
                                    backgroundColor: rowColor[settings.mode][rowItem.status],
                                    cursor: 'pointer',
                                    '&:hover': {
                                      backgroundColor: `${rowColor[settings.mode][rowItem.status]} !important`,
                                      filter: 'brightness(0.9)',
                                      transition: 'filter 0.3s'
                                    }
                                  }}
                                >
                                  <TableCell component='th' id={labelId} align='left' scope='row' padding='none'>
                                    <Box sx={{ display: 'flex', alignItems: 'center', py: 1.5 }}>
                                      {renderInitials(rowItem.bankName, {
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
                                          sx={{
                                            fontWeight: 500,
                                            textDecoration: 'none',
                                            color: 'text.secondary'
                                          }}
                                        >
                                          {formatNameBank(rowItem.bankName)}
                                        </Typography>
                                      </Box>
                                    </Box>
                                  </TableCell>
                                  <TableCell align='left'>
                                    <Typography noWrap sx={{ color: 'text.secondary' }}>
                                      {handleCheckRowValue(applyAccountNumberMask(rowItem.creditAccount))}
                                    </Typography>
                                  </TableCell>
                                  <TableCell align='left'>
                                    <Typography noWrap sx={{ color: 'text.secondary' }}>
                                      {handleCheckRowValue(applyAccountNumberMask(rowItem.debitAccount))}
                                    </Typography>
                                  </TableCell>
                                  <TableCell align='left'>
                                    <CustomChip
                                      rounded
                                      skin='light'
                                      size='small'
                                      label={handleCheckRowValue(typeValues[rowItem.transactionTypeConciliation])}
                                      color={'secondary'}
                                      sx={{ textTransform: 'uppercase', minWidth: 85 }}
                                    />
                                  </TableCell>
                                  <TableCell align='left'>
                                    <CustomChip
                                      rounded
                                      skin='light'
                                      size='small'
                                      label={formatAmount(rowItem.amount)}
                                      color={'secondary'}
                                      sx={{ textTransform: 'capitalize', minWidth: 85 }}
                                    />
                                  </TableCell>
                                  <TableCell align='left'>
                                    <RowItemLimited item={handleCheckRowValue(rowItem.extractDescription)} />
                                  </TableCell>
                                  <TableCell align='left'>
                                    <RowItemLimited item={handleCheckRowValue(rowItem.conciliationDescription)} />
                                  </TableCell>
                                </TableRow>
                              ))}
                            </Fragment>
                          </CustomConciliationGroupAccordion>
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
