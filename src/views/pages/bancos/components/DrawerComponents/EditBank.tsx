// React e React Hooks
import { Fragment, useCallback, useState } from 'react'

// React Query
import { useMutation, useQueryClient } from 'react-query'

// Material UI Imports
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  Grid,
  Switch,
  Tooltip,
  Typography
} from '@mui/material'

// Custom Components
import IconifyIcon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'
import DialogAlert from 'src/@core/components/dialogs/dialog-alert'
import Icon from 'src/@core/components/icon'

// Hooks
import { useDrawer } from 'src/hooks/useDrawer'

// Notifications
import toast from 'react-hot-toast'

// Services e Providers
import { bankController } from 'src/modules/banks'
import { dateProvider } from 'src/shared/providers'

// Utils e Errors
import { formatName } from 'src/utils/format'
import { AppError } from 'src/shared/errors/AppError'

export type ColorType = 'primary' | 'error' | 'success' | 'secondary' | 'info' | 'warning' | undefined

interface BankStatusType {
  [key: string]: string
}

const banckStatus: BankStatusType = {
  ACTIVE: 'Inativar',
  INACTIVE: 'Ativar'
}

interface BankStatusColorType {
  [key: string]: ColorType
}

const bankStatusColor: BankStatusColorType = {
  ACTIVE: 'success',
  INACTIVE: 'error'
}

interface BankStatusValue {
  [key: string]: string
}

const bankStatusValue: BankStatusValue = {
  ACTIVE: 'Ativo',
  INACTIVE: 'Inativo'
}

interface EditBankProps {
  data: any
}

const EditBank = ({ data }: EditBankProps) => {
  const queryClient = useQueryClient()
  const { anchor, toggleDrawer } = useDrawer()

  const [open, setOpen] = useState(false)
  const [avaliableForIntegration, setAvaliableForIntegration] = useState(data.integrated)
  const [status, setStatus] = useState(data.status)

  const handleActionActiveOrInactive = useMutation(
    ({ id, status }: { id: string; status: string }) => {
      return bankController.changeBankStatus({ id, status })
    },
    {
      onSuccess: () => {
        toast.success('Status alterado com sucesso!')
        setStatus(status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE')
        queryClient.invalidateQueries(['banks'])
      },
      onError: (error: any) => {
        if (error instanceof AppError) toast.error(error.message)
      },
      onSettled: () => setOpen(false)
    }
  )

  const handleActiveOrInactive = useCallback(
    (status: string, id: string) => {
      switch (status) {
        case 'ACTIVE':
          setOpen(true)
          break
        case 'INACTIVE':
          handleActionActiveOrInactive.mutateAsync({
            id,
            status: 'ACTIVE'
          })
          break
        default:
          break
      }
    },
    [handleActionActiveOrInactive]
  )

  const handleSetAvailabilityForIntegration = useMutation(
    ({ id, integrated }: { id: string; integrated: boolean }) => {
      return bankController.changeBankDisponibility({ id, integrated })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['banks'])
        setAvaliableForIntegration(!avaliableForIntegration)
        toast.success('Disponibilidade alterada com sucesso!')
      },
      onError: (error: any) => {
        if (error instanceof AppError) toast.error(error.message)
      },
      onSettled: () => setOpen(false)
    }
  )

  const handleCancel = (e?: React.KeyboardEvent | React.MouseEvent) => {
    toggleDrawer(anchor, false, null)(e as React.KeyboardEvent | React.MouseEvent)
  }

  return (
    <Fragment>
      <Card>
        <CardHeader
          title={
            <Tooltip title={data.name} placement='bottom'>
              <Typography>{formatName(data.name, 25)}</Typography>
            </Tooltip>
          }
          subheader='Informações sobre o banco'
          avatar={
            <Box>
              {data.logo ? (
                <Avatar src={data.logo} alt={data.name} />
              ) : (
                <Avatar
                  sx={{
                    fontSize: 20
                  }}
                >
                  {data.name.charAt(0).toUpperCase()}
                </Avatar>
              )}
            </Box>
          }
        />
        <Divider />
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Código:</Typography>
            <CustomChip rounded skin='light' size='small' label={data.code} color='primary' />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Status:</Typography>
            <CustomChip
              rounded
              skin='light'
              size='small'
              label={bankStatusValue[status]}
              color={bankStatusColor[status]}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Data de Criação:</Typography>
            <CustomChip
              rounded
              skin='light'
              size='small'
              label={dateProvider.formatDate(new Date(data.createdAt))}
              color='primary'
            />
          </Box>
          <Box>
            <FormControlLabel
              label='Disponivel via API:'
              control={
                <Switch
                  checked={avaliableForIntegration}
                  onChange={e =>
                    handleSetAvailabilityForIntegration.mutateAsync({
                      id: data.id,
                      integrated: e.target.checked
                    })
                  }
                />
              }
              labelPlacement='start'
              sx={{ m: 0 }}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant='contained'
                color={status === 'ACTIVE' ? 'error' : 'success'}
                startIcon={
                  <Icon icon={status === 'ACTIVE' ? 'tabler:lock-cancel' : 'tabler:lock-check'} fontSize={20} />
                }
                onClick={() => handleActiveOrInactive(status, data.id)}
              >
                {banckStatus[status]}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant='contained'
                color='primary'
                startIcon={<IconifyIcon icon='tabler:x' fontSize={20} />}
                onClick={handleCancel}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>

      {open && (
        <DialogAlert
          open={open}
          setOpen={setOpen}
          question={`Deseja realmente ${banckStatus[data.status]} este banco?`}
          description='Todos os usuários vinculados a este banco serão afetados.'
          handleConfirmDelete={() =>
            handleActionActiveOrInactive.mutateAsync({
              id: data.id,
              status: data.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
            })
          }
        />
      )}
    </Fragment>
  )
}

export default EditBank
