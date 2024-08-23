import React, { memo } from 'react'
import { Avatar, CardHeader, Box, Typography } from '@mui/material'

interface HeaderProps {
  avatar: string | undefined
  title: string
  subtitle: {
    label: string
    value: string
  }
}

const Header = ({ avatar, title, subtitle }: HeaderProps) => {
  const { label, value } = subtitle

  return (
    <CardHeader
      avatar={<Avatar src={avatar} sx={{ width: '2rem', height: '2rem' }} />}
      title={title}
      subheader={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant='body2' color='text.secondary'>
            {label}
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              backgroundColor: '#655BD3',
              width: 'fit-content',
              padding: '0 8px',
              borderRadius: '4px',
              color: 'white'
            }}
          >
            {value}
          </Typography>
        </Box>
      }
    />
  )
}

export default memo(Header)
