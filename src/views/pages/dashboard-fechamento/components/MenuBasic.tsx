import { MouseEvent, useState } from 'react'

import Menu, { MenuProps } from '@mui/material/Menu'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'

interface MenuBasicProps extends MenuProps {
  label: string
  menuItems: {
    label: string
    action: () => void
  }[]
}

const MenuBasic = ({ label, menuItems }: MenuBasicProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button variant='text' aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick}>
        {label}
      </Button>
      <Menu keepMounted id='simple-menu' anchorEl={anchorEl} onClose={handleClose} open={Boolean(anchorEl)}>
        {menuItems.map((item, index) => (
          <MenuItem key={index} onClick={item.action}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default MenuBasic
