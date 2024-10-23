import { useEffect } from 'react'

import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import { Grid, LinearProgress } from '@mui/material'

import Account from 'src/views/pages/usuarios/Account'
import Tabs from 'src/views/pages/usuarios/Account/Tabs'

import themeConfig from 'src/configs/themeConfig'

import { useUser } from 'src/hooks/users/useUser'

export default function User() {
  const router = useRouter()

  const { id } = router.query

  const {
    data: user,
    isLoading,
    isError
  } = useUser(id as string, {
    enabled: router.isReady,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (!isLoading) isError && router.push('/404')
  }, [isError, isLoading, router])

  if (isLoading) return <LinearProgress />

  if (user) {
    return (
      <>
        <NextSeo
          title={`${themeConfig.templateName} - ${user.name}`}
          description={`${themeConfig.templateName} - ${user.name}`}
        />
        <Grid container spacing={6}>
          <Grid item xs={12} xl={4}>
            <Account data={user} />
          </Grid>
          <Grid item xs={12} xl={8}>
            <Tabs data={user} />
          </Grid>
        </Grid>
      </>
    )
  }
}

User.acl = {
  action: 'manage',
  subject: 'ADMIN'
}
