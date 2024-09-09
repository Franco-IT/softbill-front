import Icon from 'src/@core/components/icon'
import Avatar from 'src/@core/components/mui/avatar'

import { Box, Button, CardHeader, IconButton } from '@mui/material'

import { statusColorsMUI } from '../../utils'
import GlowIcon from 'src/components/GlowIcon'

interface HeaderProps {
  client: any
}

const Header = ({ client }: HeaderProps) => {
  return (
    <CardHeader
      title={
        <Button variant='text' color='inherit'>
          {client.clientName}
        </Button>
      }
      avatar={<Avatar src={client.clientAvatar} color={statusColorsMUI[client.status]} />}
      action={
        <Box display='flex' alignItems='center' gap={3}>
          {client.status === 'DONE' && (
            <IconButton>
              <Icon icon='tabler:download' fontSize='1.5rem' />
            </IconButton>
          )}
          <GlowIcon status={client.status} />
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
