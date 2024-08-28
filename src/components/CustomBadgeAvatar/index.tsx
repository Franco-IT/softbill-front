import * as React from 'react'
import { styled, Avatar, AvatarProps } from '@mui/material'

const HoverableAvatar = styled(Avatar)(({}) => ({
  position: 'relative',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.4rem',
  '& .icon-overlay': {
    position: 'absolute',
    opacity: 0,
    transition: 'opacity 0.3s ease'
  },
  '&:hover .icon-overlay': {
    opacity: 1
  },
  '& .initials': {
    transition: 'opacity 0.3s ease'
  },
  '&:hover .initials': {
    opacity: 0
  }
}))

interface CustomBadgeAvatarProps extends AvatarProps {
  icon: React.ReactNode
  initials: string
}

function CustomBadgeAvatar({ icon, initials, ...rest }: CustomBadgeAvatarProps) {
  return (
    <HoverableAvatar {...rest}>
      <span className='initials'>{initials}</span>
      <span className='icon-overlay'>{icon}</span>
    </HoverableAvatar>
  )
}

export default React.memo(CustomBadgeAvatar)
