import { Box, TableBody, TableCell, TableRow, Typography } from '@mui/material'
import RowOptions from '../../../RowOptions'
import { checkEmpty } from 'src/utils/list'
import { formatDate } from 'src/@core/utils/format'
import CustomTypography from 'src/components/CustomTypography'

interface StatementsTableBBProps {
  visibleRows: any[]
  loading: boolean
}

const StatementsTableBB = ({ visibleRows, loading }: StatementsTableBBProps) => {
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
              <TableCell component='th' id={labelId} scope='row' padding='none'>
                <Box sx={{ color: 'text.secondary' }}>
                  <CustomTypography noWrap data={row.indicadorTipoLancamento} />
                </Box>
              </TableCell>
              <TableCell align='left'>
                <CustomTypography
                  noWrap
                  data={formatDate(new Date(row.dataLancamento))}
                  sx={{ color: 'text.secondary' }}
                />
              </TableCell>
              <TableCell align='left'>
                <CustomTypography
                  noWrap
                  data={formatDate(new Date(row.dataMovimento))}
                  sx={{ color: 'text.secondary' }}
                />
              </TableCell>
              <TableCell align='left'>
                <CustomTypography noWrap data={row.codigoAgenciaOrige} sx={{ color: 'text.secondary' }} />
              </TableCell>
              <TableCell align='left'>
                <CustomTypography noWrap data={row.numeroLote} sx={{ color: 'text.secondary' }} />
              </TableCell>
              <TableCell align='left'>
                <Typography noWrap sx={{ color: 'text.secondary' }}>
                  {checkEmpty(row.numeroDocumento)}
                </Typography>
              </TableCell>
              <TableCell align='left'>
                <Typography noWrap sx={{ color: 'text.secondary' }}>
                  {checkEmpty(row.codigoHistorico)}
                </Typography>
              </TableCell>
              <TableCell align='left'>
                <Typography noWrap sx={{ color: 'text.secondary' }}>
                  {checkEmpty(row.textoDescricaoHistorico)}
                </Typography>
              </TableCell>
              <TableCell align='left'>
                <Typography noWrap sx={{ color: 'text.secondary' }}>
                  {checkEmpty(row.valorLancamento)}
                </Typography>
              </TableCell>
              <TableCell align='left'>
                <Typography noWrap sx={{ color: 'text.secondary' }}>
                  {checkEmpty(row.indicadorSinalLancamento)}
                </Typography>
              </TableCell>
              <TableCell align='left'>
                <Typography noWrap sx={{ color: 'text.secondary' }}>
                  {checkEmpty(row.textoInformacaoComplementar)}
                </Typography>
              </TableCell>
              <TableCell align='left'>
                <Typography noWrap sx={{ color: 'text.secondary' }}>
                  {checkEmpty(row.numeroCpfCnpjContrapartida)}
                </Typography>
              </TableCell>
              <TableCell align='left'>
                <Typography noWrap sx={{ color: 'text.secondary' }}>
                  {checkEmpty(row.indicadorTipoPessoaContrapartida)}
                </Typography>
              </TableCell>
              <TableCell align='left'>
                <Typography noWrap sx={{ color: 'text.secondary' }}>
                  {checkEmpty(row.codigoBancoContrapartida)}
                </Typography>
              </TableCell>
              <TableCell align='left'>
                <Typography noWrap sx={{ color: 'text.secondary' }}>
                  {checkEmpty(row.codigoAgenciaContrapartida)}
                </Typography>
              </TableCell>
              <TableCell align='left'>
                <Typography noWrap sx={{ color: 'text.secondary' }}>
                  {checkEmpty(row.numeroContaContrapartida)}
                </Typography>
              </TableCell>
              <TableCell align='left'>
                <Typography noWrap sx={{ color: 'text.secondary' }}>
                  {checkEmpty(row.textoDvContaContrapartida)}
                </Typography>
              </TableCell>
              <TableCell align='left'>
                <RowOptions data={row} />
              </TableCell>
            </TableRow>
          )
        })
      )}
    </TableBody>
  )
}

export default StatementsTableBB
