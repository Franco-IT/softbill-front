import * as React from 'react'
import { MenuItem, Menu, IconButton } from '@mui/material'
import Icon from 'src/@core/components/icon'

interface MenuItemProps {
  label: string
  icon?: React.ReactNode
  action?: () => void
  actionWithParam?: (param: any) => void
}

interface ClosureBankOptionsProps {
  menuItems: MenuItemProps[]
}

const ClosureBankOptions: React.FC<ClosureBankOptionsProps> = React.memo(({ menuItems }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenuItemClick = (item: MenuItemProps, event: React.MouseEvent<HTMLLIElement>) => {
    if (item.action) item.action()

    if (item.actionWithParam) item.actionWithParam(event)

    handleClose()
  }

  return (
    <div>
      <IconButton size='small' onClick={handleClick}>
        <Icon icon='tabler:dots-vertical' />
      </IconButton>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        {menuItems.map((item, index) => (
          <MenuItem sx={{ '& svg': { mr: 2 } }} key={index} onClick={e => handleMenuItemClick(item, e)}>
            {item.icon && item.icon}
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
})

export default ClosureBankOptions
