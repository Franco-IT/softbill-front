// React
import { useState, MouseEvent, memo, useCallback } from 'react'

// Next
import { useRouter } from 'next/router'

// MUI
import { Button, IconButton, Menu, MenuItem, useMediaQuery, Box } from '@mui/material'

// Components
import Icon from 'src/@core/components/icon'
import DialogAlert from 'src/@core/components/dialogs/dialog-alert'

const RowOptions = memo(({ id, handleConfirmDelete }: { id: string; handleConfirmDelete: (id: string) => void }) => {
  const router = useRouter()

  const matches = useMediaQuery('(min-width:600px)')

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [open, setOpen] = useState(false)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = useCallback((event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const handleRowOptionsClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const handleViewProfileClick = useCallback(() => {
    router.push(`/usuarios/${id}`)
  }, [id, router])

  const handleDeleteProfileClick = useCallback(() => {
    setOpen(true)
  }, [])

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
          <Button size='small' variant='outlined' color='primary' onClick={handleViewProfileClick}>
            Ver Perfil
          </Button>
          <Button size='small' variant='outlined' color='primary' onClick={handleDeleteProfileClick}>
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
            <MenuItem sx={{ '& svg': { mr: 2 } }} onClick={handleViewProfileClick}>
              <Icon icon='tabler:eye' fontSize={20} />
              Ver Perfil
            </MenuItem>
            <MenuItem sx={{ '& svg': { mr: 2 } }} onClick={handleDeleteProfileClick}>
              <Icon icon='tabler:trash' fontSize={20} />
              Deletar
            </MenuItem>
          </Menu>
        </>
      )}

      {open && (
        <DialogAlert
          id={id}
          open={open}
          setOpen={setOpen}
          question={'Você tem certeza que deseja deletar este usuário?'}
          description={'Essa ação não poderá ser desfeita.'}
          handleConfirmDelete={() => handleConfirmDelete(id)}
        />
      )}
    </>
  )
})

export default RowOptions
