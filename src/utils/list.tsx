import { TableBody, TableCell, TableRow, Typography } from '@mui/material'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'

export type Order = 'asc' | 'desc'

const descendingComparator = <T,>(a: T, b: T, orderBy: keyof T): number => {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }

  return 0
}

const getComparator = <Key extends keyof any>(
  order: Order,
  orderBy: Key
): ((a: { [key in Key]: string }, b: { [key in Key]: string }) => number) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

const stableSort = <T,>(array: any[], comparator: (a: T, b: T) => number) => {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }

    return a[1] - b[1]
  })

  return stabilizedThis.map(el => el[0])
}

const Loading = () => (
  <TableBody>
    <TableRow>
      <TableCell colSpan={6} align='center'>
        <Typography variant='h6'>Carregando...</Typography>
      </TableCell>
    </TableRow>
  </TableBody>
)

const removeRowFromList = (id: string, array: any[], param: string) => {
  return array.filter((item: any) => item[param] !== id)
}

const renderInitials = (row: any) => {
  return (
    <CustomAvatar
      skin='light'
      color={row.avatarColor}
      sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
    >
      {getInitials(row.name)}
    </CustomAvatar>
  )
}

const renderDevicesInitials = (row: any) => {
  return (
    <CustomAvatar
      skin='light'
      color={row.avatarColor}
      sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
    >
      {getInitials(row.modelName)}
    </CustomAvatar>
  )
}

export { removeRowFromList, renderInitials, renderDevicesInitials, getComparator, stableSort, Loading }
