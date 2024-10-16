// React
import React, { memo } from 'react'

// Material-UI
import { TablePagination } from '@mui/material'

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
    return (
      <TablePagination
        labelRowsPerPage='Linhas por página:'
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
