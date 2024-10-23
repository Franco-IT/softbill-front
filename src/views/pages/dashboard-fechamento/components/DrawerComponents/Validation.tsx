// Material UI Imports
import { Box, Card, CardActions, CardContent, CardHeader, MenuItem, Typography } from '@mui/material'

// Custom Components
import GlowIcon from 'src/components/GlowIcon'
import CustomChip from 'src/@core/components/mui/chip'
import CustomTextField from 'src/@core/components/mui/text-field'

// Hooks
import { useAppSelector } from 'src/hooks/useAppSelector'
import useToast from 'src/hooks/useToast'
import { useQueryClient } from 'react-query'

// Utils
import { statusColorsMUI } from '../../utils'

// Types and Controllers
import { ChangeEvent } from 'react'
import { financialCloseController } from 'src/modules/financialClose'

// import { useDrawer } from 'src/hooks/useDrawer'

const Validation = () => {
  const { toastPromise } = useToast()
  const queryClient = useQueryClient()

  // const { anchor, toggleDrawer } = useDrawer()

  const monthlyFinancialClose = useAppSelector(state => state.ClosingReducer.monthlyFinancialClose) as any

  const status = monthlyFinancialClose.monthlyFinancialCloseBank.status
  const subStatus = monthlyFinancialClose.monthlyFinancialCloseBank.subStatus
  const monthlyFinancialCloseBankId = monthlyFinancialClose.monthlyFinancialCloseBank.monthlyFinancialCloseBankId

  const statusValuesText: any = {
    PENDING: 'Pendente',
    REJECTED: 'Pendente',
    DONE: 'Aprovado'
  }

  const handleCheckStatus = (status: string, subStatus: string) => {
    const rejectValues = ['PENDING', 'TRANSACTION_UNTRACKED']

    if (status === 'PENDING' && rejectValues.includes(subStatus)) return 'REJECTED'

    if (status === 'DONE') return 'DONE'

    return 'PENDING'
  }

  const handleDisableInput = (subStatus: string) => (subStatus === 'DONE' || subStatus === 'PROCESSED' ? false : true)

  const handleChangeStatus = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = (e.target as HTMLInputElement).value

    const reqBody = {
      validated: value === 'DONE'
    }

    const data = {
      monthlyFinancialCloseBankId,
      reqBody
    }

    const myPromise = financialCloseController.updateMonthlyFinancialCloseBank(data).then(() => {
      queryClient.invalidateQueries(['financial-closing'])
      queryClient.invalidateQueries(['financial-closing-dashboard"'])
    })

    toastPromise(myPromise, 'Validando...', 'Validado com sucesso.', 'Erro ao Validar, tente novamente mais tarde.')
  }

  return (
    <Card>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant='h5'>Validação</Typography>
            <GlowIcon status={handleCheckStatus(status, subStatus)} />
          </Box>
        }
      />
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Status:</Typography>
          <CustomChip
            rounded
            skin='light'
            size='small'
            label={statusValuesText[handleCheckStatus(status, subStatus)]}
            color={statusColorsMUI[handleCheckStatus(status, subStatus)]}
          />
        </Box>
      </CardContent>
      <CardActions>
        <CustomTextField
          select
          fullWidth
          label='Status'
          placeholder='Selecione Status'
          disabled={handleDisableInput(subStatus)}
          value={status || 'default'}
          onChange={e => handleChangeStatus(e)}
          color={statusColorsMUI[handleCheckStatus(status, subStatus)]}
          focused={!!statusColorsMUI[handleCheckStatus(status, subStatus)]}
        >
          <MenuItem disabled value='default'>
            <em>selecione</em>
          </MenuItem>
          <MenuItem value='PENDING'>Pendente</MenuItem>
          <MenuItem value='DONE'>Aprovado</MenuItem>
        </CustomTextField>
      </CardActions>
    </Card>
  )
}

export default Validation
