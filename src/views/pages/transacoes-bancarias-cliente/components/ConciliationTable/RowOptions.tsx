import { useState, MouseEvent, memo, useCallback } from 'react'
import { Button, IconButton, Menu, MenuItem, useMediaQuery, Box } from '@mui/material'
import { useMutation, useQueryClient } from 'react-query'
import toast from 'react-hot-toast'

import Icon from 'src/@core/components/icon'
import DialogAlert from 'src/@core/components/dialogs/dialog-alert'

import { bankController } from 'src/modules/banks'
import { AppError } from 'src/shared/errors/AppError'

interface BankStatusType {
  [key: string]: string
}

const banckStatus: BankStatusType = {
  ACTIVE: 'Inativar',
  INACTIVE: 'Ativar'
}

interface RowOptionsProps {
  id: string
  status: string
}

const RowOptions = memo(({ id, status }: RowOptionsProps) => {
  const queryClient = useQueryClient()
  const matches = useMediaQuery('(min-width:600px)')

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [open, setOpen] = useState(false)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleActionActiveOrInactive = useMutation(
    ({ id, status }: { id: string; status: string }) => {
      return bankController.changeBankStatus({ id, status })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['banks'])
        toast.success('Status alterado com sucesso!')
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

  return (
    <>
      {matches ? (
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            padding: '0 8 0 0 '
          }}
        >
          <Button size='small' variant='outlined' color='primary' onClick={() => handleActiveOrInactive(status, id)}>
            {banckStatus[status]}
          </Button>
        </Box>
      ) : (
        <>
          <IconButton size='small' onClick={handleRowOptionsClick}>
            <Icon icon='tabler:dots-vertical' />
          </IconButton>
          <Menu
            keepMounted
            anchorEl={anchorEl}
            open={rowOptionsOpen}
            onClose={handleRowOptionsClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            PaperProps={{ style: { minWidth: '8rem' } }}
          >
            <MenuItem onClick={() => handleActiveOrInactive(status, id)}>{banckStatus[status]}</MenuItem>
          </Menu>
        </>
      )}

      {open && (
        <DialogAlert
          id={id}
          open={open}
          setOpen={setOpen}
          question={`Deseja realmente ${status === 'ACTIVE' ? 'inativar' : 'ativar'} este banco?`}
          description='Todos os usuários vinculados a este banco serão afetados.'
          handleConfirmDelete={() =>
            handleActionActiveOrInactive.mutateAsync({ id, status: status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' })
          }
        />
      )}
    </>
  )
})

export default RowOptions
