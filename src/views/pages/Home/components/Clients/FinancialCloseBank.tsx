// React
import React, { Fragment, memo } from 'react'

// Hooks
import useGetFetchQuery from 'src/hooks/useGetFetchQuery'
import useToast from 'src/hooks/useToast'

// Material UI
import { Card, CardHeader, IconButton, Tooltip, Typography, useMediaQuery, Box } from '@mui/material'

// Utilities
import { getInitials } from 'src/utils/getInitials'
import { formatName } from 'src/utils/format'

// Custom Components
import CustomAvatar from 'src/components/CustomAvatar'
import CustomChip from 'src/@core/components/mui/chip'
import IconifyIcon from 'src/@core/components/icon'

// Controllers and Errors
import { financialCloseController } from 'src/modules/financialClose'
import { AppError } from 'src/shared/errors/AppError'

const statusValue: { [key: string]: string } = {
  PENDING: 'Pendente',
  DONE: 'Aprovado'
}

const statusColor: { [key: string]: 'warning' | 'success' } = {
  PENDING: 'warning',
  DONE: 'success'
}

interface FinancialCloseBankProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any
}

const FinancialCloseBank = memo(({ data }: FinancialCloseBankProps) => {
  const { toastError } = useToast()
  const dataCached = useGetFetchQuery<any>('client-dashboard')
  const isSmallerThanSm = useMediaQuery((theme: any) => theme.breakpoints.down('sm'))

  const bankAccount = dataCached?.bankAccounts?.find((item: any) => item.bankAccountId === data.bankAccountId) || null

  const handleClickDownloadImportedFile = async (fileId: string) => {
    try {
      const response = await financialCloseController.exportFile({ fileId })

      window.open(response.data)
    } catch (e) {
      e instanceof AppError && toastError(e.message)
    }
  }

  return (
    <Card>
      <CardHeader
        avatar={
          <Fragment>
            {!isSmallerThanSm && (
              <Tooltip title={bankAccount.bankName} sx={{ cursor: 'pointer' }}>
                <Box>
                  <CustomAvatar src={bankAccount.bankLogo} content={getInitials(bankAccount.bankName)} />
                </Box>
              </Tooltip>
            )}
          </Fragment>
        }
        title={
          <Tooltip title={bankAccount.bankName} placement='top' sx={{ width: 'max-content', cursor: 'pointer' }}>
            <Typography variant='h6'>{formatName(bankAccount.bankName, isSmallerThanSm ? 30 : 20)}</Typography>
          </Tooltip>
        }
        subheader={
          <CustomChip
            rounded
            skin='light'
            size='small'
            label={statusValue[data.status]}
            color={statusColor[data.status]}
          />
        }
        action={
          <Fragment>
            {data.importedFileId && (
              <Tooltip title={'Baixar arquivo importado'}>
                <IconButton onClick={() => handleClickDownloadImportedFile(data.importedFileId)}>
                  <IconifyIcon icon='tabler:download' fontSize={20} />
                </IconButton>
              </Tooltip>
            )}
          </Fragment>
        }
        sx={{
          px: isSmallerThanSm ? 0 : 4
        }}
      />
    </Card>
  )
})

export default FinancialCloseBank
