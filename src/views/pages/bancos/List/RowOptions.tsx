import { useState, MouseEvent, memo, useCallback } from 'react'
import { Button, IconButton, Menu, MenuItem, useMediaQuery, Box } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { api } from 'src/services/api'
import toast from 'react-hot-toast'
import DialogAlert from 'src/@core/components/dialogs/dialog-alert'

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
  refreshData: () => void
}

const RowOptions = memo(({ id, status, refreshData }: RowOptionsProps) => {
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

  const handleActionActiveOrInactive = useCallback(() => {
    api
      .put(`/banks/${id}`, { status: status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' })
      .then(() => refreshData())
      .catch(() => toast.error('Erro ao alterar status do banco'))
      .finally(() => setOpen(false))
  }, [id, refreshData, status])

  const handleActiveOrInactive = useCallback(() => {
    switch (status) {
      case 'ACTIVE':
        setOpen(true)
        break
      case 'INACTIVE':
        handleActionActiveOrInactive()
        break
      default:
        break
    }
  }, [handleActionActiveOrInactive, status])

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
          <Button size='small' variant='outlined' color='primary' onClick={handleActiveOrInactive}>
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
            <MenuItem onClick={handleActiveOrInactive}>{banckStatus[status]}</MenuItem>
          </Menu>
        </>
      )}

      {open && (
        <DialogAlert
          id={id}
          open={open}
          setOpen={setOpen}
          question={`Deseja realmente ${status === 'ACTIVE' ? 'inativar' : 'ativar'} este banco?`}
          description='Essa ação é irreversível, e todos os usuários vinculados a este banco serão afetados.'
          handleConfirmDelete={handleActionActiveOrInactive}
        />
      )}
    </>
  )
})

export default RowOptions
