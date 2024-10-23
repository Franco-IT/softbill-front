// Navigation hook from Next.js for routing
import { useRouter } from 'next/router'

// SEO component for setting page metadata
import { NextSeo } from 'next-seo'

// MUI components for layout and progress indicators
import { Grid, LinearProgress } from '@mui/material'

// Theme configuration for application styling
import themeConfig from 'src/configs/themeConfig'

// Account component for displaying client account information
import Account from 'src/views/pages/clientes/Account'

// Tabs component for managing different views in the client account
import Tabs from 'src/views/pages/clientes/Account/Tabs'

// Error interface for application error handling
import { IAppError } from 'src/shared/errors/AppError'

// Custom hook for fetching client data
import { useClient } from 'src/hooks/clients/useClient'

export default function Client() {
  const router = useRouter()

  const { id } = router.query

  const getClientProps = {
    id: id as string
  }

  const { data: client, isLoading } = useClient(getClientProps.id, {
    onError: (error: IAppError) => {
      router.push(error.statusCode === 404 ? '/404' : '/500')
    },
    enabled: router.isReady,
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true
  })

  if (isLoading) return <LinearProgress />

  if (client) {
    return (
      <>
        <NextSeo
          title={`${themeConfig.templateName} - ${client.name}`}
          description={`${themeConfig.templateName} - ${client.name}`}
        />
        <Grid container spacing={6}>
          <Grid item xs={12} xl={4}>
            <Account data={client} />
          </Grid>
          <Grid item xs={12} xl={8}>
            <Tabs data={client} />
          </Grid>
        </Grid>
      </>
    )
  }
}

Client.acl = {
  action: ['read', 'update', 'delete'],
  subject: ['ACCOUNTING', 'ACCOUNTANT']
}
