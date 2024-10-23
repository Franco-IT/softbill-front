// React
import { memo } from 'react'

// MUI
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
        labelRowsPerPage={isSmallerThanSm ? '' : 'Contas por página'}
        rowsPerPageOptions={rowsPerPageOptions}
        component='div'
        count={rowsTotal}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          '& .MuiToolbar-root': {
            p: 0
          },
          '& .MuiInputBase-root': {
            mr: '20px',
            ml: 0
          },
          '& .MuiTablePagination-actions': {
            ml: '20px'
          }
        }}
      />
    )
  }
)

export default Pagination
