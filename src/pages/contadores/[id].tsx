// React and Next.js
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

// Material UI Components
import { Grid, LinearProgress } from '@mui/material'

// Custom Components
import Tabs from 'src/views/pages/contadores/Account/Tabs'
import Account from 'src/views/pages/contadores/Account'

// Configurations
import themeConfig from 'src/configs/themeConfig'

// Hooks
import { useAccountant } from 'src/hooks/accountants/useAccountant'

export default function Accounting() {
  const router = useRouter()

  const { id } = router.query

  const {
    data: accounting,
    isLoading,
    isError
  } = useAccountant(id as string, {
    enabled: router.isReady,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5
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
  action: ['read', 'update', 'delete'],
  subject: 'ACCOUNTING'
}
