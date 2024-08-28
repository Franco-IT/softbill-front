import { Suspense, useMemo, memo, useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useMediaQuery
} from '@mui/material'
import CustomChip from 'src/@core/components/mui/chip'

import HeadCells from './HeadCells'
import TableHeader from './TableHeader'
import TablePagination from './TablePagination'
import EnhancedTableHead from './EnhancedTableHead'

import { formatName } from 'src/utils/formatName'
import { Loading, Order, renderInitials } from 'src/utils/list'
import DrawerAnchor from 'src/components/DrawerAnchor'
import { useDrawer } from 'src/hooks/useDrawer'
import Conciliation from '../DrawerComponents/Conciliation'

interface ReconciliationTableProps {
  rows: any
  isLoading: boolean
  search: string
  handleSearch: (value: string) => void
  status: string
  handleStatus: (value: string) => void
  type: string
  handleType: (value: string) => void
  bank: string
  handleBank: (value: string) => void
  order: Order
  orderBy: any
  handleRequestSort: (event: React.MouseEvent<unknown>, property: keyof any) => void
  visibleRows: any
  paginationProps: any
}

const ReconciliationTable = memo(
  ({
    rows,
    visibleRows,
    isLoading,
    search,
    handleSearch,
    bank,
    handleBank,
    handleStatus,
    handleType,
    status,
    type,
    handleRequestSort,
    order,
    orderBy,
    paginationProps
  }: ReconciliationTableProps) => {
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

      const conciliationProps = {
        item
      }

      toggleDrawer(isSmallerThanMd ? 'bottom' : 'right', true, <Conciliation {...conciliationProps} />)(e)
    }

    const isSelected = (id: string) => selected.indexOf(id) !== -1

    const tableHeaderProps = useMemo(
      () => ({
        search,
        handleSearch,
        status,
        handleStatus,
        type,
        handleType,
        bank,
        handleBank
      }),
      [search, handleSearch, status, handleStatus, type, handleType, bank, handleBank]
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
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  visibleRows.map((row: any, index: number) => {
                    const isItemSelected = isSelected(row.id)
                    const labelId = `enhanced-table-checkbox-${index}`

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
                            {renderInitials(row.bank, {
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
                                {formatName(row.bank)}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align='left'>
                          <Typography noWrap sx={{ color: 'text.secondary' }}>
                            {row.cc}
                          </Typography>
                        </TableCell>
                        <TableCell align='left'>
                          <Typography noWrap sx={{ color: 'text.secondary' }}>
                            {row.cd}
                          </Typography>
                        </TableCell>
                        <TableCell align='left'>
                          <CustomChip
                            rounded
                            skin='light'
                            size='small'
                            label={row.type}
                            color='primary'
                            sx={{ textTransform: 'capitalize', minWidth: 85 }}
                          />
                        </TableCell>
                        <TableCell align='left'>
                          <CustomChip
                            rounded
                            skin='light'
                            size='small'
                            label={row.value}
                            color='primary'
                            sx={{ textTransform: 'capitalize', minWidth: 85 }}
                          />
                        </TableCell>
                        <TableCell align='left'>
                          <Typography noWrap sx={{ color: 'text.secondary' }}>
                            {row.description}
                          </Typography>
                        </TableCell>
                        <TableCell align='left'>
                          <Typography noWrap sx={{ color: 'text.secondary' }}>
                            {row.origin ? row.origin : 'Não informado'}
                          </Typography>
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
        <DrawerAnchor {...drawerProps} />
      </Paper>
    )
  }
)

export default ReconciliationTable
