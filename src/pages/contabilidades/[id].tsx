// Effect hook for managing side effects in functional components
import { useEffect } from 'react'

// Router hook for navigating between pages in Next.js
import { useRouter } from 'next/router'

// SEO component for managing the document head in Next.js
import { NextSeo } from 'next-seo'

// Material UI components for layout and progress indicators
import { Grid, LinearProgress } from '@mui/material'

// Tabs component for displaying different views or categories within the Account page
import Tabs from 'src/views/pages/contabilidades/Account/Tabs'

// Main Account component for handling accounting features
import Account from 'src/views/pages/contabilidades/Account'

// Theme configuration settings for the application
import themeConfig from 'src/configs/themeConfig'

// Custom hook for accessing accounting data and functionalities
import { useAccounting } from 'src/hooks/accountings/useAccounting'

export default function Accounting() {
  const router = useRouter()

  const { id } = router.query

  const {
    data: accounting,
    isLoading,
    isError
  } = useAccounting(id as string, {
    enabled: router.isReady,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (!isLoading) isError && router.push('/404')
  }, [isError, isLoading, router])

  if (isLoading) return <LinearProgress />

  if (accounting) {
    return (
      <>
        <NextSeo
          title={`${themeConfig.templateName} - ${accounting.name}`}
          description={`${themeConfig.templateName} - ${accounting.name}`}
        />
        <Grid container spacing={6}>
          <Grid item xs={12} xl={4}>
            <Account data={accounting} />
          </Grid>
          <Grid item xs={12} xl={8}>
            <Tabs data={accounting} />
          </Grid>
        </Grid>
      </>
    )
  }
}

Accounting.acl = {
  action: 'manage',
  subject: 'ADMIN'
}
