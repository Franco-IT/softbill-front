import { memo } from 'react'
import { TablePagination, useMediaQuery } from '@mui/material'

interface PaginationProps {
  rowsTotal: number
  rowsPerPage: number
  rowsPerPageOptions: number[]
  page: number
  handleChangePage: (event: unknown, newPage: number) => void
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Pagination = memo(
  ({
    rowsTotal,
    rowsPerPage,
    rowsPerPageOptions,
    page,
    handleChangePage,
    handleChangeRowsPerPage
  }: PaginationProps) => {
    const isSmallerThanSm = useMediaQuery((theme: any) => theme.breakpoints.down('sm'))

    return (
      <TablePagination
        labelRowsPerPage={isSmallerThanSm ? '' : 'Fechamentos por página'}
        rowsPerPageOptions={rowsPerPageOptions}
        component='div'
        count={rowsTotal}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    )
  }
)

export default Pagination
