import Icon from 'src/@core/components/icon'
import Avatar from 'src/@core/components/mui/avatar'

import { Box, Button, CardHeader, IconButton } from '@mui/material'

import { statusColorsMUI } from '../../utils'
import GlowIcon from 'src/components/GlowIcon'

interface HeaderProps {
  user: any
}

const Header = ({ user }: HeaderProps) => {
  return (
    <CardHeader
      title={
        <Button variant='text' color='inherit'>
          {user.name}
        </Button>
      }
      avatar={<Avatar src={user.avatar} color={statusColorsMUI[user.status]} />}
      action={
        <Box display='flex' alignItems='center' gap={3}>
          {user.status === 'APPROVED' && (
            <IconButton>
              <Icon icon='tabler:download' fontSize='1.5rem' />
            </IconButton>
          )}
          <GlowIcon status={user.status} />
        </Box>
      }
      sx={{
        '& .MuiCardHeader-action': {
          display: 'contents'
        }
      }}
    />
  )
}

export default Header
