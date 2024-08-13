import * as React from 'react'
import { useMediaQuery, MenuItem, Menu, Button, IconButton } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Icon from 'src/@core/components/icon'

interface MenuItemProps {
  label: string
  icon?: React.ReactNode
  action: () => void
}

interface CustomBasicMenuProps {
  buttonLabel: string
  menuItems: MenuItemProps[]
}

const CustomBasicMenu: React.FC<CustomBasicMenuProps> = React.memo(({ buttonLabel, menuItems }) => {
  const matches = useMediaQuery('(min-width:600px)')

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      {matches ? (
        <Button
          id='basic-button'
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
          variant='contained'
        >
          {buttonLabel}
        </Button>
      ) : (
        <IconButton size='small' onClick={handleClick}>
          <Icon icon='tabler:dots-vertical' />
        </IconButton>
      )}
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
          <MenuItem sx={{ '& svg': { mr: 2 } }} key={index} onClick={() => item.action()}>
            {item.icon && item.icon}
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
})

export default CustomBasicMenu
