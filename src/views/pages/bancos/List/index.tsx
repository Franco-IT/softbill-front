import { Suspense, useEffect, useState, useMemo, useCallback, ChangeEvent, MouseEvent } from 'react'

import Link from 'next/link'

import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'

import { useMutation, useQuery, useQueryClient } from 'react-query'

import CustomChip from 'src/@core/components/mui/chip'
import Icon from 'src/@core/components/icon'
import CustomBadgeAvatar from 'src/components/CustomBadgeAvatar'
import ImageCropper from 'src/components/ImageCropper'
import Error from 'src/components/FeedbackAPIs/Error'

import HeadCells from './HeadCells'
import RowOptions from './RowOptions'
import TableHeader from './TableHeader'
import TablePagination from './TablePagination'
import EnhancedTableHead from './EnhancedTableHead'

import { formatName } from 'src/utils/formatName'
import { formatDate } from 'src/@core/utils/format'
import { Loading, Order, getComparator, stableSort } from 'src/utils/list'
import { getInitials } from 'src/@core/utils/get-initials'

import { ThemeColor } from 'src/@core/layouts/types'
import { IBankDTO } from 'src/modules/banks/dtos/IBankDTO'
import { ISetBankLogoDTO } from 'src/modules/banks/dtos/ISetBankLogoDTO'
import { bankController } from 'src/modules/banks'
import { AppError } from 'src/shared/errors/AppError'

import toast from 'react-hot-toast'

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
  const queryClient = useQueryClient()

  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof IBankDTO>('createdAt')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [filter, setFilter] = useState('')
  const [banks, setBanks] = useState<IBankDTO[]>([])
  const [bankData, setBankData] = useState<IBankDTO | null>(null)

  const [openImageCropper, setOpenImageCropper] = useState<boolean>(false)

  const params = useMemo(() => ({ page: page + 1, perPage: rowsPerPage, search: filter }), [page, rowsPerPage, filter])

  const {
    data: rows,
    isLoading,
    isError
  } = useQuery(['banks', params], async () => bankController.getBanks(params), {
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true
  })

  const handleRequestSort = useCallback(
    (event: MouseEvent<unknown>, property: keyof IBankDTO) => {
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

  const visibleRows = useMemo(() => stableSort(banks, getComparator(order, orderBy)), [order, orderBy, banks])

  const handleClickEdit = (data: IBankDTO) => {
    setOpenImageCropper(true)
    setBankData(data)
  }

  const handleSetAvatar = useMutation(
    ({ file, data }: { file: File; data: IBankDTO }) => {
      const formData: ISetBankLogoDTO = {
        file,
        bankId: data.id,
        uploadType: 'BANK_LOGO'
      }

      return bankController.setBankLogo(formData)
    },
    {
      onSuccess: response => {
        if (response) {
          if (response.status === 201) {
            queryClient.invalidateQueries(['banks'])
            toast.success('Imagem alterada com sucesso!')
          }
        }
      },
      onError: error => {
        if (error instanceof AppError) toast.error(error.message)
      },
      onSettled: () => {
        setOpenImageCropper(false)
      }
    }
  )

  const onSubmit = async (file: any) => handleSetAvatar.mutateAsync({ file, data: bankData as IBankDTO })

  useEffect(() => {
    if (rows) setBanks(rows.data)
  }, [rows])

  useEffect(() => {
    if (!openImageCropper) setBankData(null)
  }, [openImageCropper])

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
                        Nenhum banco encontrado
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
                            <CustomBadgeAvatar
                              icon={<Icon fontSize='1.4rem' icon='tabler:edit' />}
                              initials={getInitials(row.name)}
                              src={row.logo}
                              sx={{
                                mr: 2.5,
                                width: 38,
                                height: 38,
                                fontWeight: 500,
                                fontSize: (theme: any) => theme.typography.body1.fontSize
                              }}
                              onClick={() => handleClickEdit(row)}
                            />
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
                          <RowOptions id={String(row.id)} status={row.status} />
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

      {openImageCropper && (
        <ImageCropper open={openImageCropper} onClose={() => setOpenImageCropper(false)} onSubmit={onSubmit} />
      )}
    </Box>
  )
}

export default List
