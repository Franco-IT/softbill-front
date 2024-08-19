import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'

type Anchor = 'top' | 'left' | 'bottom' | 'right'

interface DrawerAnchorProps {
  anchor: Anchor
  open: boolean
  toggleDrawer: (
    anchor: Anchor,
    open: boolean,
    currentChildren: React.ReactNode
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void
  children: React.ReactNode | null
}

export default function DrawerAnchor({ open, anchor, toggleDrawer, children }: DrawerAnchorProps) {
  const renderChildren = (anchor: Anchor) => {
    const drawerWidth = anchor === 'left' || anchor === 'right' ? 400 : 'auto'
    const drawerHeight = anchor === 'bottom' || anchor === 'top' ? '80vh' : 'auto'

    return (
      <Box sx={{ width: drawerWidth, height: drawerHeight }} role='presentation'>
        {children}
      </Box>
    )
  }

  return (
    <div>
      {(['left', 'right', 'top', 'bottom'] as const).map(currentAnchor => (
        <React.Fragment key={currentAnchor}>
          <Drawer
            anchor={currentAnchor}
            open={open && anchor === currentAnchor}
            onClose={toggleDrawer(currentAnchor, false, null)}
          >
            {renderChildren(currentAnchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  )
}
