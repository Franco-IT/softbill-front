// React Imports
import { memo } from 'react'

// Next.js Imports
import Link from 'next/link'

// Material UI Imports
import { Button, CardHeader } from '@mui/material'

// Custom Components
import CustomAvatar from 'src/components/CustomAvatar'

// Utils
import { getInitials } from 'src/utils/getInitials'
import { formatName } from 'src/utils/format'

interface HeaderProps {
  client: any
}

const Header = memo(({ client }: HeaderProps) => {
  return (
    <CardHeader
      title={
        <Button
          LinkComponent={Link}
          href={`/clientes/${client.id}`}
          target='_blank'
          variant='text'
          color='inherit'
          title={client.name}
        >
          {formatName(client.name)}
        </Button>
      }
      avatar={<CustomAvatar src={client.avatar} content={getInitials(client.name)} />}
      sx={{
        '& .MuiCardHeader-action': {
          display: 'contents'
        }
      }}
    />
  )
})

export default Header
