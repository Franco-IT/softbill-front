import { Box, TableCell, TableHead, TableRow, TableSortLabel, useTheme } from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { HeadCellProps } from './HeadCells'
import { UserProps } from 'src/types/users'

type Order = 'asc' | 'desc'

interface EnhancedTableProps {
  headCells: HeadCellProps[]
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof UserProps) => void
  order: Order
  orderBy: string
  rowCount: number
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { order, orderBy, onRequestSort, headCells } = props

  const theme = useTheme()

  const createSortHandler = (property: keyof UserProps) => (event: React.MouseEvent<unknown>) => {
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
              onClick={createSortHandler(headCell.id as keyof UserProps)}
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
}

export default EnhancedTableHead
