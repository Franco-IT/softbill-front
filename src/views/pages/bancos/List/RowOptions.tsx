import { memo, MouseEvent } from 'react'
import { Button, useMediaQuery } from '@mui/material'

import Icon from 'src/@core/components/icon'
import { useDrawer } from 'src/hooks/useDrawer'
import DrawerAnchor from 'src/components/DrawerAnchor'
import EditBank from '../components/DrawerComponents/EditBank'

interface RowOptionsProps {
  bankData: any
}

const RowOptions = memo(({ bankData }: RowOptionsProps) => {
  const { anchor, open, toggleDrawer, children } = useDrawer()
  const isSmallerThanMd = useMediaQuery((theme: any) => theme.breakpoints.down('md'))

  const handleClickEdit = (e: MouseEvent<HTMLButtonElement, any>, bankData: any) => {
    toggleDrawer(isSmallerThanMd ? 'bottom' : 'right', true, <EditBank data={bankData} />)(e)
  }

  const drawerProps = {
    anchor,
    open,
    toggleDrawer,
    children
  }

  return (
    <>
      <Button
        size='small'
        variant='contained'
        color='primary'
        startIcon={<Icon icon='tabler:edit' />}
        onClick={e => handleClickEdit(e, bankData)}
      >
        Editar
      </Button>

      <DrawerAnchor {...drawerProps} />
      {/* {matches ? (
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            padding: '0 8 0 0 '
          }}
        >

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
      )} */}

      {/* <Button
        size='small'
        variant='outlined'
        color='primary'
        startIcon={<Icon icon='tabler:edit' />}
        onClick={() => handleActiveOrInactive(status, id)}
      >
        {banckStatus[status]}
      </Button> */}
    </>
  )
})

export default RowOptions
