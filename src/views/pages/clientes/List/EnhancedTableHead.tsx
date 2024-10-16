// React library for building user interfaces
import React, { memo } from 'react'

// Material UI components for layout and styling of tables
import { Box, TableCell, TableHead, TableRow, TableSortLabel, useTheme } from '@mui/material'

// Utility for visually hiding elements but keeping them accessible for screen readers
import { visuallyHidden } from '@mui/utils'

// Type definitions for the head cell properties in the table
import { HeadCellProps } from './HeadCells'

// DTO for accounting data structure
import { IClientDTO } from 'src/modules/clients/dtos/IClientDTO'

type Order = 'asc' | 'desc'

interface EnhancedTableProps {
  headCells: HeadCellProps[]
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IClientDTO) => void
  order: Order
  orderBy: string
  rowCount: number
}

const EnhancedTableHead = memo((props: EnhancedTableProps) => {
  const { order, orderBy, onRequestSort, headCells } = props

  const theme = useTheme()

  const createSortHandler = (property: keyof IClientDTO) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead
      sx={{
        backgroundColor: theme.palette.mode === 'light' ? '#F6F6F7' : '#4A5072'
      }}
    >
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id as keyof IClientDTO)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
})

export default EnhancedTableHead
