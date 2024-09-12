import Link from 'next/link'
import Icon from 'src/@core/components/icon'

import { Box, Button, CardHeader, IconButton } from '@mui/material'

import GlowIcon from 'src/components/GlowIcon'
import CustomAvatar from 'src/components/CustomAvatar'
import { getInitials } from 'src/utils/getInitials'
import { formatName } from 'src/utils/format'

interface HeaderProps {
  client: any
}
const Header = ({ client }: HeaderProps) => {
  return (
    <CardHeader
      title={
        <Button
          LinkComponent={Link}
          href={`/clientes/${client.clientId}`}
          target='_blank'
          variant='text'
          color='inherit'
          title={client.clientName}
        >
          {formatName(client.clientName)}
        </Button>
      }
      avatar={<CustomAvatar src={client.clientAvatar} content={getInitials(client.clientName)} />}
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
