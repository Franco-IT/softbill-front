import { useEffect } from 'react'

import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import { Grid, LinearProgress } from '@mui/material'

import Account from 'src/views/pages/usuarios/Account'
import Tabs from 'src/views/pages/usuarios/Account/Tabs'

import themeConfig from 'src/configs/themeConfig'

import useGetDataApi from 'src/hooks/useGetDataApi'
import { UserDataProps } from 'src/types/users'

export default function User() {
  const router = useRouter()

  const { id } = router.query

  const {
    data: user,
    loading,
    error,
    refresh,
    setRefresh
  } = useGetDataApi<UserDataProps>({ url: `/users/${id}`, callInit: router.isReady })

  useEffect(() => {
    if (!loading) error && router.push('/404')
  }, [error, loading, router])

  if (loading) return <LinearProgress />

  if (user) {
    return (
      <>
        <NextSeo
          title={`${themeConfig.templateName} - ${user.data.name}`}
          description={`${themeConfig.templateName} - ${user.data.name}`}
        />
        <Grid container spacing={6}>
          <Grid item xs={12} xl={4}>
            <Account data={user.data} refresh={refresh} setRefresh={setRefresh} />
          </Grid>
          <Grid item xs={12} xl={8}>
            <Tabs data={user.data} />
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
