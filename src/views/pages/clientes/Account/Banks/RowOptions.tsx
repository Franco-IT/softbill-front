import { useState, MouseEvent } from 'react'
import { Button, IconButton, Menu, MenuItem, useMediaQuery, Box } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { api } from 'src/services/api'
import toast from 'react-hot-toast'
import DialogAlert from 'src/@core/components/dialogs/dialog-alert'
import Edit from './Edit'

interface RowOptionsProps {
  data: any
  openEdit: boolean
  setOpenEdit: (open: boolean) => void
  refreshData: () => void
}

const RowOptions = ({ data, refreshData, openEdit, setOpenEdit }: RowOptionsProps) => {
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

  const handleClickDelete = () => {
    setOpen(true)
  }

  const handleDelete = () => {
    api
      .delete(`/bankAccounts/${data._id}`)
      .then(() => refreshData())
      .catch(() => toast.error('Erro ao deletar banco'))
      .finally(() => setOpen(false))
  }

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
          <Button size='small' variant='outlined' color='primary'>
            Extrato
          </Button>
          <Button size='small' variant='outlined' color='primary' onClick={handleClickDelete}>
            Deletar
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
            <MenuItem>Extrato</MenuItem>
            <MenuItem onClick={handleClickDelete}>Deletar</MenuItem>
          </Menu>
        </>
      )}

      <Edit data={data} openEdit={openEdit} handleEditClose={() => setOpenEdit(false)} />

      <DialogAlert
        id={data._id}
        open={open}
        setOpen={setOpen}
        question={`Deseja realmente deletar este banco?`}
        description='Essa ação não poderá ser desfeita.'
        handleConfirmDelete={handleDelete}
      />
    </>
  )
}

export default RowOptions
