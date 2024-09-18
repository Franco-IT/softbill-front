// React Imports
import { memo } from 'react'

// Next.js Imports
import Link from 'next/link'

// Material UI Imports
import { Box, Button, CardHeader, IconButton, useMediaQuery } from '@mui/material'

// Custom Components
import Icon from 'src/@core/components/icon'
import GlowIcon from 'src/components/GlowIcon'
import CustomAvatar from 'src/components/CustomAvatar'
import ExportOnDashboard from '../DrawerComponents/ExportOnDashboard'

// Hooks
import { useDrawer } from 'src/hooks/useDrawer'

// Utils
import { getInitials } from 'src/utils/getInitials'
import { formatName } from 'src/utils/format'

interface HeaderProps {
  client: any
  monthlyFinancialCloseId: string
}
const Header = memo(({ client, monthlyFinancialCloseId }: HeaderProps) => {
  const { toggleDrawer } = useDrawer()
  const isSmallerThanMd = useMediaQuery((theme: any) => theme.breakpoints.down('md'))

  const exportOnDashboardProps = {
    monthlyFinancialCloseId
  }

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
            <IconButton
              onClick={e =>
                toggleDrawer(
                  isSmallerThanMd ? 'bottom' : 'right',
                  true,
                  <ExportOnDashboard {...exportOnDashboardProps} />
                )(e)
              }
            >
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
})

export default Header
