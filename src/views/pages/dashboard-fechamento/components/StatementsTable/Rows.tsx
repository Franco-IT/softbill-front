import { TableBody, TableCell, TableRow, Typography } from '@mui/material'
import CustomTypography from 'src/components/CustomTypography'
import { formatDate } from 'src/@core/utils/format'

interface RowsProps {
  visibleRows: any[]
  loading: boolean
}

const Rows = ({ visibleRows, loading }: RowsProps) => {
  const handleFormatDate = (date: string) => {
    if (!date) return null

    const year = parseInt(date.substring(0, 4), 10)
    const month = parseInt(date.substring(4, 6), 10) - 1
    const day = parseInt(date.substring(6, 8), 10)
    const hour = parseInt(date.substring(8, 10), 10)
    const minute = parseInt(date.substring(10, 12), 10)
    const second = parseInt(date.substring(12, 14), 10)

    return formatDate(new Date(year, month, day, hour, minute, second))
  }

  return (
    <TableBody>
      {loading ? (
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
              Nenhum dado encontrado
            </Typography>
          </TableCell>
        </TableRow>
      ) : (
        visibleRows.map((row, index) => {
          const labelId = `enhanced-table-checkbox-${index}`

          return (
            <TableRow hover tabIndex={-1} key={index}>
              <TableCell align='left'>
                <CustomTypography noWrap data={handleFormatDate(row.DTPOSTED)} sx={{ color: 'text.secondary' }} />
              </TableCell>
              <TableCell component='th' id={labelId} scope='row' padding='none'>
                <CustomTypography noWrap data={row.TRNTYPE} sx={{ color: 'text.secondary' }} />
              </TableCell>
              <TableCell component='th' id={labelId} scope='row' padding='none'>
                <CustomTypography noWrap data={row.TRNAMT} sx={{ color: 'text.secondary' }} />
              </TableCell>
              <TableCell component='th' id={labelId} scope='row' padding='none'>
                <CustomTypography noWrap data={row.MEMO} sx={{ color: 'text.secondary' }} />
              </TableCell>
            </TableRow>
          )
        })
      )}
    </TableBody>
  )
}

export default Rows
